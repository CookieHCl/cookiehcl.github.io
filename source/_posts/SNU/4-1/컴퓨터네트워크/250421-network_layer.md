---
title: Network Layer
categories:
  - SNU
  - 4-1
  - 컴퓨터네트워크
date: 2025-04-21 16:21:39
tags:
---

# Network layer

Network layer transport segment from sending to receiving host.

Sender encapsulates segments into datagrams, passes to link layer.  
Receiver delivers segments to transport layer protocol.

Network layer protocols is in every internet device, including hosts and routers.  
Routers examine header fields in all IP datagrams passing through it.  
Then it moves datagrams from input ports to output ports to transfer datagrams along end-end path.

## Two key network-layer functions

Forwarding: Move packets from a router's input link to appropriate router output link.  
Routing: Determine route taken by packets from source to destination.

Forwarding determine route in single router.  
Routing determine route from source to destination.

There are two types of routing algorithms:

- Traditional routing algorithms: Implemented in routers.
- Software-defined networking (SDN): Implemented in remote servers, widely used in datacenters.

## Data plane, control plane

We can view this as a data plane and control plane.  
Data plane is local, per-router function that determines how datagram arriving on router input port is forwarded to router output port.  
Control plane is network-wide logic that determines how datagram is routed among routers from source host to destination host.

There are two types of control plane:

- Per-router control plane: Individual routing algorithm components in each and every router interact in the control plane.
- Software-defined networking (SDN) control plane: Remote controller computes, installs forwarding tables in routers.

SDN is a background process, it only updates forwarding tables only when the network topology changes.

# Network service model

Network architectures uses service model.  
e.g. ATM used constant bit rate model, that guarantees constant rate bandwidth.

Modern Internet uses best effort service model.  
It tries it best, but there are no guarantees on bandwidth, loss, order, timing, etc.

Best effort service model was very successful!

- Because of its simplicity, internet is widely deployed and adopted.
- Sufficient provisioning of bandwidth allows performance of real-time applications such as voice, video services.
- Replicated, application-layer distributed services (e.g. datacenters, CDNs) connecting close to clients' networks allow services to be provided from multiple locations.

# Routers
