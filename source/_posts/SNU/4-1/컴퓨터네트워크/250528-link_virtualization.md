---
title: Link Virtualization
categories:
  - SNU
  - 4-1
  - 컴퓨터네트워크
abbrlink: 93
date: 2025-05-28 04:34:41
tags:
---

# VLAN (Virtual Local Area Network)

## Motivation

If user change point of attachment, All layer-2 broadcast traffic must cross entire LAN. (e.g. ARP, DHCP, unknown MAC)  
Also, user might wants to remain logically attached to certain switch even when it moves.

## Port-based VLANs

Switch ports are grouped by switch management software.  
Single physical switch can operate as multiple virtual switches!

Ports can be dynamically assigned among VLANs, and forwarding between VLANs is done via routing. (Switchs and routers are combined!)

Trunk port: VLANs can be defined over multiple physical switches! Switches use trunk port to carries frames between VLANs.  
802.1Q protocol adds 12bit VLAN ID field for frame headers.

# Link Virtualization

## Multiprotocol label switching (MPLS)

For high-speed IP forwarding, we use fixed length label instead of longest prefix matching.

- Faster lookup than longest prefix matching
- Ideas from virtual circuit (VC) approach
- But IP datagram still keeps IP address!

MPLS header is included between ethernet header and IP datagram.

## MPLS capable routers

a.k.a. Label switched router

Forward packets to outgoing intreface based only on label value. (without IP address!!)  
MPLS forwarding table is distinct from IP forwarding tables.

MPLS forwarding decisions can differ from those of IP!  
It can use source address to route flows to same destination differently. (traffic engineering)  
It can also precompute backup paths and re-route flows quickly if link fails.

## MPLS signaling

Unlike OSPF or IS-IS link state flooding protocols, MPLS also carry info such as: link bandwidth, amount of reserved link bandwidth, etc.

# Datacenter networks

Over 100,000 hosts are connected! Often closely coupled, in close proximity.

- Multiple applications, each serving massive numbers of clients
- Reliability is hard
- Managing/balancing load, avoiding processing, networking, and data bottlenecks

## Datacenter network elements

![Datacenter network](datacenter_networks.png)

- Border router: Connections to outside of datacenters
- Tier-1 switch: Connecting to (about 16) tier-2 switches
- Tier-2 switch: Connecting to (about 16) TOR switches
- TOR (Top of rack) switch: One per each rack! 40 ~ 100 Gbps Ethernet
- Server racks: 20 ~ 40 server blades (hosts)

This structure makes rich interconnection among switches and racks!  
Multiple routing paths between same racks exists, so throughput and reliability is increased.

## Application-layer routing

Load balancer receives external client requests, then directs workload within data center.  
Results are returned to external client, while hiding data center internals from client.

## Datacenter protocols

- Link layer: RoCE (Remote DMA over converged Ethernet)
- Transport layer: ECN (Explicit congestion notification) is used for congestion control (currently experimenting hop-by-hop congestion control)
- Routing, management: SDN is widely used within/among organizations' datacenters.  
  Related services and datas are placed as close as possible (e.g. in same rack) to minimize tier-2, tier-1 communication.
