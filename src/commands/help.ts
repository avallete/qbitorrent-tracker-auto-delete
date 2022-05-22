import { GluegunToolbox } from 'gluegun'

module.exports = {
  dashed: true,
  alias: ['h'],
  name: 'help',
  description: 'Display help',
  run: (toolbox: GluegunToolbox) => {
    const { print } = toolbox

    print.info(`Usage:
      qbitorrent-tracker-auto-delete [--url=http://localhost:8080] [--no-waitstart]`)
    print.info(`Options:
      --url: The base url of your qbitorrent webui server (default: http://localhost:8080)  
      --no-waitstart: Don't wait for torrent to start downloading before removing the trackers (default: false)
    `)
  },
}
