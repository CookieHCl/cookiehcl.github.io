---
title: Introduction 3
categories:
  - SNU
  - 4-1
  - 컴퓨터네트워크
abbrlink: 41
date: 2025-03-12 15:26:24
tags:
---

# Packet loss

When queue is full, no packet can arrive.  
The most popular drop policy is tail drop - when queue is full, any arrived packets are dropped.  
Lost packet may be retransmitted by previous node, by source end system, or not at all.

# Throughtput

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
