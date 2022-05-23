type TorrentStatesUnion =
  | 'downloading'
  | 'stalledDL'
  | 'metaDL'
  | 'forcedMetaDL'
  | 'forcedDL'
  | 'uploading'
  | 'stalledUP'
  | 'forcedUP'
  | 'queuedDL'
  | 'queuedUP'
  | 'checkingDL'
  | 'checkingUP'
  | 'queuedForChecking'
  | 'checkingResumeData'
  | 'pausedDL'
  | 'pausedUP'
  | 'moving'
  | 'missingFiles'
  | 'error'

type MainDataQueryResponse = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any
  full_update: boolean
  rid: number
  server_state: {
    alltime_dl: number
    alltime_ul: number
    average_time_queue: number
    connection_status: string
    dht_nodes: number
    dl_info_data: number
    dl_info_speed: number
    dl_rate_limit: number
    free_space_on_disk: number
    global_ratio: string
    queued_io_jobs: number
    queueing: boolean
    read_cache_hits: string
    read_cache_overload: string
    refresh_interval: number
    total_buffers_size: number
    total_peer_connections: number
    total_queued_size: number
    total_wasted_session: number
    up_info_data: number
    up_info_speed: number
    up_rate_limit: number
    use_alt_speeed_limits: boolean
    write_cache_overload: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tags: any[]
  torrents: {
    [key: string]: {
      added_on: number
      amount_left: number
      auto_tmm: boolean
      availability: number
      category: string
      completed: number
      completion_on: number
      content_path: string
      dl_limit: number
      dlspeed: number
      download_path: string
      downloaded: number
      downloaded_session: number
      eta: number
      f_l_piece_prio: boolean
      force_start: boolean
      infohash_v1: string
      infohash_v2: string
      last_activity: number
      magnet_uri: string
      max_ratio: number
      max_seeding_time: number
      name: string
      num_complete: number
      num_incomplete: number
      num_leechs: number
      num_seeds: number
      priority: number
      progress: number
      ratio: number
      ratio_limit: number
      save_path: string
      seeding_time: number
      seeding_time_limit: number
      seen_complete: number
      seq_dl: boolean
      size: number
      state: TorrentStatesUnion
      super_seeding: boolean
      tags: string
      time_active: number
      total_size: number
      tracker: string
      trackers_count: number
      up_limit: number
      uploaded: number
      uploaded_session: number
      upspeed: number
    }
  }
  trackers: {
    [tk: string]: string[]
  }
}

export type { MainDataQueryResponse }
