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
 gossip and conflict free replication. obmesh uses expiry-model (a subclass
 of scuttlebutt).

## `open broadcast mesh`

An open broadcast mesh is an announcement channel for p2p / http or
 any service. Broadcasts can also just be arbitrary information.

## `lifespans`

A message has a lifespan which is the time other peers will keep a record
 of the message in memory before dropping it.

## `security`

The read-only data view uses a hyperdb shared over webRTC so that peers can verify the integrity of the dataset. Any one with access to the editable or private channel can SPAM, DDOS or cause issues.

## `how it works`

The expiry model data structure is an array of messages, whenever this model changes
 a hyperdb instance is also updated. Currently this is just /mesh with the entire
model.history() (which could become huge!). Peers replicate the hyperdb to get the
 latest list. Authorized peers have access to the editable channel, direct access
to the model allows peers to add new messages.

## `infrastructure`

This could work entirely in the browser with no server infrastructure bar signalling servers. To persist messages I run a node server with wrtc (webRTC for node) and persists hyperdb and scuttlebutt models to disk.

```
see /obmesh/server.js
run with ./obmesh/node_test.js
```

## `spec`

* open message broadcasting
* moderation with editable & read-only channels
* works in the browser with webRTC peering
* gossip and conflict free data replication
* distributed database with expiring messages

## live

* running live at (https://lense.space)[https://lense.space]

This example has the editable channel configured so anyone can make a broadcast.
 Its also possible to configure a 'read-only' mesh.
