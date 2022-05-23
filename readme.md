# qbitorrent-tracker-auto-delete CLI

A CLI for qbitorrent-tracker-auto-delete which do exactly what he said. Autoremove trackers from your torrents.

## Install

First you must activate the WebUI in your qbitorrent, add toggle the "bypass authentication for localhost" option

![qbitorrent settings](https://user-images.githubusercontent.com/8771783/169672801-50188e5d-a17c-4302-8f46-6c193dd5da37.png)

### Via npm

```
npm install --global qbitorrent-tracker-auto-delete
```

### Via executable cli

```
```

## Usage

```
Usage:
      qbitorrent-tracker-auto-delete [--url=http://localhost:8080] [--no-waitstart]
Options:
      --url: The base url of your qbitorrent webui server (default: http://localhost:8080)
      --no-waitstart: Don't wait for torrent to start downloading before removing the trackers (default: false)
```

# License

MIT - see LICENSE

