# obmesh

open broadcast mesh [in progress]

## `overview`

This is an experiment in open broadcast mesh systems. An open broadcast mesh is a shared data feed that holds information or references to other things. Use cases for this are aiming to be as generic as possible.

This experiment uses has a persistent data structure (shared across peers) called expiry-model based on scuttlebutt. Collaborators connected to this stream over WebRTC can freely add messages to the feed that currently expire after a day.

There is also a node server peer that stores this data structure to disk as well maintaining a read-only view of the data inside a hyperdb instance.

## `live demo`

* temporarily running live [here](https://lense.space)

This example has the editable channel configured so anyone can make a broadcast.
 Its also possible to configure it to be in 'read-only' mode and disable public broadcasts.
