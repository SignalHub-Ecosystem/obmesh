# obmesh

open broadcast mesh [in progress]

## `overview`

Experimentatal mesh networks may have different security goals and properties. An open broadcast mesh is an extremely permissive gossip network for announcing pretty much anything.

* general, abitrary messages
* urls, p2p resources

## read-only & editable channels

An obmesh has an editable and read-only channel. Anyone with access to the editable
 channel can broadcast. Peers connected to the read-only channel replicate a read-only
view.

The idea is that anyone can replicate the read-only view but only chosen
 peers can broadcast. Choosing 'chosen' peers must currently occur using a sidechannel.

## `gossip`

An open broadcast mesh is a shared replicable data structure that uses
 gossip and conflict free replication. obmesh uses expiry-mod
 el (a subclass
 of scuttlebutt).

## `open broadcast mesh`

An open broadcast mesh is an announcement channel for p2p / http or
 any service. Broadcasts can also just be arbitrary information.

## `lifespans`

A message has a lifespan which is the time other peers will keep a record
 of the message in memory before dropping it.

## `security`

The read-only data view uses a hypertrie shared over webRTC so that peers can verify the integrity
 of the dataset. Any one with access to the editable or private channel can SPAM, DDOS or cause issues.

## `infrastructure`

A node server runs using wrtc (webRTC for node) and persists hypertrie and scuttlebutt models to disk.
```
see /obmesh/server.js
```

## `spec`

* open message broadcasting
* moderation with editable & read-only channels
* works in the browser with webRTC peering
* gossip and conflict free data replication
* distributed database with expiring messages
