# obmesh

open broadcast mesh [in progress]

## file under: `mad science experiment?`

## `overview`

A simple p2p feed shared by peers, it can be open to updates from any peer or `read-only`. 

## `detail`

This is an experiment in open broadcast mesh systems. An open broadcast mesh is a shared data feed that any peer can broadcast too. It ideally has no authentication or user management and as such can be open to SPAM.

This experiment uses has a persistent data structure (shared across peers) called expiry-model based on scuttlebutt. Collaborators connected to this stream over WebRTC can freely add messages to the feed without logging in.

There is also a node server peer that stores this data structure to disk as well maintaining a read-only view of the data inside a hyperdb instance.


## `todo & unsolved problems`

* How to stop SPAM and system abuse without needing user management.
* Explore nested mesh feeds within the viewer

## `live demo`

* temporarily running live [here](https://lense.space)

This example has the editable channel configured so anyone can make a broadcast.
 Its also possible to configure it to be in 'read-only' mode and disable public broadcasts.
