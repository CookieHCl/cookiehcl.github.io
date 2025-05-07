---
title: Overview
categories:
  - SNU
  - 4-1
  - 컴퓨터네트워크
abbrlink: 34
date: 2025-03-05 15:24:05
tags:
---

# What is internet?

## Nuts and Bolts view

- Billions of connected computing devices (hosts)
- Packet switches that forawrds packets (routers, switches)
- Communication links (fiber, copper, radio, satellite)
- Networks: Collection of devices, routers, links that is managed by an organization

Internet is a network of networks - interconnected Internet Service Providers (ISPs)

- Protocols that defines format and order of the messages sent and received  
  e.g. HTTP, TCP, IP, Ethernet, etc.
- Internet standards
  - RFC: Request for Comments
  - IETF: Internet Engineering Task Force

## "Services" view

Internet is an infrastructure that provides services to applications.  
e.g. web, streaming video, email, games, etc.

Internet provides programming interface to distributed applications.

# A closer look at Internet

- Network edge: an end of network  
  Also called hosts: clients and servers
- Access networks, physical media: communication links, either wired or wireless
- Network core: interconnected routers  
  This makes network of networks!

## Access networks

Wired: uses cable, actually sometimes use telephone line  
Usually asymmetric! Download bandwidth is higher than upload bandwidth.

Wireless: connects via access point (AP)  
Wireless local area network (WLAN): Typically within building (Wi-Fi)  
Wide-area cellular access networks: Provided by mobile, cellular network operator (4G/5G)

There are some specialized networks like enterprise networks and data center networks!

## Packets

Hosts send application message in packets.  
Packets has fixed length - L bits.  
Host transmits packet into access network at transmission rate R. (Also called link transmission rate, link capacity, and link bandwith.)

## Links

- Guided media: signals propagate in solid media such as copper, fiber, and coax.
- Unguided media: signals propagate freely e.g. radio.

# Two key network-core functions

## Forwadring

Local action (In same network): move arriving packets from router's input link to appropriate router's output link.  
Uses local forwarding table!

## Routing

Global action (Across different network): determine source destination paths taken by packets.  
Uses routing algorithms!

# Packet switching

## store-and-forward

Store entire packet then transmit.

Most routers use this because of data integrity.

## cut-through

Send packet immediately!

Faster than store-and-forward... but network delay is already negligible, so we don't use this.

## queueing

Packets arrive too fast... We can queue packets!

If queue is full, packets are dropped/lost. (It will later be detected by the higher layer, and they will resend the packet.)

## statistical multiplexing

Multiplexing: multiple input, one output

Dynamically allocate resources on-demand - If only 1 input is used, allocate resources only for it.

Most efficient method!

# Circuit switching

Used in traditional telephone networks.

Each link has n circuits. If host make a "call", a circuit is dedicated to source and destination.  
They can't be shared (waste of resources if circuit is not used), but guarantees circuit-like performance.

## FDM and TDM

Frequency Division Multiplexing (FDM): Divide frequencies into frequency bands and allocate it.  
Time Division Multiplexing (TDM): Divide time into slots and allocate it.

## Why use packet switching?

Users aren't active 100% of time!

Circuit-switching has less avaliable users.  
Packet-switching can have more users, but with high probability.

Packet-switching is great for bursty data! (e.g. Youtube Shorts)  
But unlike circuit-switching, packets can be lost if buffer overflows!  
Packet-switching needs protocol for reliable data transfer and congestion control.

There are some techniques that try to provide circuit-like behavior with packet-switching, (implemented with virtual circuits) however it's not widely used.

# ISPs

How are we globally connected?

- Tier-1 ISP (Internet service Providers): Covers national and international networks.  
  There are only 16 Tier-1 ISPs, and they are fully connected! ~~but sometimes they disconnect each others~~  
  Tier-1 ISP don't charge each other, and they're connected with IXP (Internet exchange point).
- Content provider networks: Companies like google makes private networks that connects its data centers directly!  
  They pays Tier-1 ISPs ~~but tries to avoid paying regional ISPs~~.
- Regional ISP: Covers national networks.  
  They pays Tier-1 ISPs to provide international networks.

Interestingly, there is no qualification to become Tier-1 ISPs!  
The concept of Tier-1 ISPs emerged naturally, and the only way to become Tier-1 ISP is to be recognized by other Tier-1 ISPs.

# Packet delay

Packet delay happens when packet are queued and waits for transmission.  
Packet loss happens when queue of packets fills up.

## Four sources of packet delay

$$d_{nodal} = d_{proc} + d_{queue} + d_{trans} + d_{prop}$$

### processing delay

Nodal needs to process packet.  
e.g. check bit errors, determine output link

### queueing delay

Time waiting at output link for transmission.  
Depends on congestion level of router.

### transmission delay

$$d_{trans} = \frac{\text{packet legnth (bits)}}{\text{link trasmission rate (bps)}}$$

Time transmitting packet into the communication link.

### propagation delay

$$d_{prop} = \frac{\text{length of physical link (m)}}{\text{propagation speed (m/s)}}$$

Time sending packet from the sender to the receiver.  
Propagation speed is usually about $2 \times 10^8 m/s$ - nearly the speed of light!

## Traffic intensity

a: average packet arrival rate  
L: packet length (bits)  
R: link bandwidth (bit transmission rate)

$$\text{Traffic intensity} = \frac{La}{R} = \frac{\text{arrival rate of bits}}{\text{service rate of bits}}$$

If traffic intensity is near 0, queueing delay is small.  
If traffic intensity is near 1, queueing delay is large.  
If traffic intensity is over 1, queueing delay is infinite! More work arrives than can be serviced.

## Packet loss

When queue is full, no packet can arrive.  
The most popular drop policy is tail drop - when queue is full, any arrived packets are dropped.  
Lost packet may be retransmitted by previous node, by source end system, or not at all.

## Throughtput

Bandwidth is nominal capacity.  
Throughtput is actual capacity in applications. Also called effective bandwidth.

- Instantaneous throughput: rate at given point in time
- Average throughput: rate over longer period of time

Throughput has bottleneck link, the link with smallest bandwidth constrains end-end throughput.

# Protocol Layers

- Application: supporting network applications (HTTP, IMAP, SMTP, DNS)
- Transport: process-process data transfer (TCP, UDP)
- Network: routing of datagrams from source to destination (IP (IP address is NOT IP!!!!), routing protocols)
- Link: data trasfer between neighboring network elements (Ethernet, 802.11 (Wi-Fi), PPP)
- Physical: bits on the wire

Each layers need header to process data.  
Transport layer adds transport-layer header to application message (called transport-layer segment).  
Network layer adds network-layer header to transport-layer segment (called network-layer datagram).  
Link layer adds link-layer header to network-layer segment (called link-layer frame).
Finally, link-layer frame is sent through wire!

Switches unpack until link layer.  
Routers unpack until network layer.

## Why layering?

Network is extremely complex - we need modulariztaion.  
Changing one layer's implementation doesn't affect other layers!

But if you're really smart, you can ignore layers...  
e.g. TCP offload engine (TOE) makes network interface cards to process TCP/IP.

## OSI model

But aren't there 7 network layers?  
In OSI model, two layers are added between application layer and transport layer.

- Presentation: allow applications to interpret meaning of data, e.g., encryption, compression, machine-specific conventions
- Session: synchronization, checkpointing, recovery of data exchange

However, these are not in internet stack!  
They are not always needed!  
When you need these services, it should be implemented in application layer. (Especially HTTPS encrypts messages!!)
