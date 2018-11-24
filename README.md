# obmesh

open broadcast mesh

## `overview`

Experimentatal mesh networks may have different security goals and properties. An open broadcast mesh is an extremely permissive gossip network for announcing pretty much anything.

* general, abitrary messages
* urls, p2p resources

## `gossip`

An open broadcast mesh is a shared replicable data structure that uses
 gossip and conflict free replication. obmesh uses expiry-model (a subclass
 of scuttlebutt).

## `open broadcast mesh`

An open broadcast mesh is an announcement channel for p2p / http or
 any service. Broadcasts can also just be arbitrary information.

## `lifespans`

A message has a lifespan which is the time other peers will keep a record
 of the message in memory before dropping it.

## `security`

An open broadcast mesh may remove all barriers to getting a message out there
 but at the expense of security. There is no DDOS or SPAM protection of any
  kind in this system.

## `persistence`

peers that run with node can persist their local state to disk..
```
see /obmesh/server.js
```

## `conclusion`

* open message broadcasting
* works in the browser with webRTC peering
* gossip and conflict free data replication
* distributed database with expiring messages

## `further work`

* anti-dos / spam / backups
* anonymisation & anonymity
* crypto and secure channels
