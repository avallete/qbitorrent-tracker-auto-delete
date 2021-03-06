import { GluegunCommand } from 'gluegun'
import type { MainDataQueryResponse } from '../types'
import type { AxiosInstance } from 'axios'

type CommandArgs = {
  waitstart: boolean
  url: string
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function getMainData(axios: AxiosInstance) {
  const MAINDATA_URL = `/api/v2/sync/maindata`
  const result = await axios.get(MAINDATA_URL)
  return result.data as MainDataQueryResponse
}

async function removeTrackers(
  axios: AxiosInstance,
  torrentHash: string,
  trackerUrls: Array<string>
) {
  const REMOVETRACKER_URL = `/api/v2/torrents/removeTrackers `
  const params = new URLSearchParams()
  params.append('hash', torrentHash)
  params.append('urls', trackerUrls.join('|'))
  return await axios.post(REMOVETRACKER_URL, params)
}

function extractTrackersUrls(
  torrentHash: string,
  trackers: Record<string, Array<string>>
): string[] {
  const urlsToRemove = []
  for (const [key, torrentsHashs] of Object.entries(trackers)) {
    if (torrentsHashs.includes(torrentHash)) {
      urlsToRemove.push(key)
    }
  }
  return urlsToRemove
}

const command: GluegunCommand = {
  name: 'qbitorrent-tracker-auto-delete',
  description:
    'Run a deamon which will automatically remove the trackers from your torrents on qbitorrent',
  hidden: true,
  run: async (toolbox) => {
    const { print, parameters, http } = toolbox
    const argv = {
      waitstart: true,
      url: 'http://locahost:8080',
      ...parameters.options,
    } as unknown as CommandArgs
    print.info(`Watching qbitorrent web UI on ${argv.url}`)
    const axiosInstance = http.create({ baseURL: argv.url }).axiosInstance
    while (true) {
      await sleep(2000)
      try {
        const data = await getMainData(axiosInstance)
        const torrentsWithTrackers = Object.values(data.torrents).filter(
          (t) => t.trackers_count > 0
        )
        const torrentToClean = argv.waitstart
          ? torrentsWithTrackers.filter((t) => t.state === 'downloading')
          : torrentsWithTrackers
        if (torrentToClean.length > 0) {
          print.info(`Trackers to clean: ${torrentToClean.length}`)
          await Promise.all(
            torrentToClean.map((t) => {
              const hash = t.infohash_v1 ? t.infohash_v1 : t.infohash_v2
              const trackersUrls = extractTrackersUrls(hash, data.trackers)
              print.debug(
                `Trackers to remove on torrent ${hash}: ${trackersUrls.join(
                  '|'
                )}`
              )
              return removeTrackers(axiosInstance, hash, trackersUrls)
            })
          )
        }
      } catch (err) {
        print.error(err)
      }
    }
  },
}

module.exports = command
