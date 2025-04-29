---
title: Network Layer
categories:
  - SNU
  - 4-1
  - 컴퓨터네트워크
abbrlink: 69
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

## Router acrhitecture

Router has input ports, output ports, and high-speed switching fabric that connects input and output ports. (data plane)  
Routing processor controls high-speed switching fabric. (control plane)

Input port and output port can be same in real routers.

## Input port functions

- Physical layer: Check line termination
- Link layer: Check protocol (e.g. Ethernet)
- Decentralized switching: queueing & lookup output port & forwarding

Note that output port is exactly opposite!  
Buffer -> link layer (add protocol) -> add line termination

### Decentralized switching

Using header field values parsed from link layer, lookup output port using forwarding table in input port memeory.  
Input port queueing: If datagrams arrive faster than forwarding rate into switch fabric, we queue datagrams.

It's also called match (find) + action (forwarding).  
Goal: complete input port processing at line speed, i.e. input port's bandwidth.

Note that datagram can't arrive faster than line speed!  
That's the definition of bandwidth...

### Destination-based forwarding

- Destination-based forwarding: forward based only on destination IP address, traditional way
- Generalized forwarding: forward based only on any set of header field values.

![Longest prefix matching](longest_prefix_matching.png)

Destination-based forwarding use longest prefix matching!  
Use longest address prefix from forwarding table entry that matches destination address.  
There's a dedicated hardware called ternary content addressable memories. (TCAMs)  
TCAM can retrieve address in one clock cycle, regardless of table size!

## Switching fabric

Switching fabric transfer packet from input link to appropriate output link.

Switching rate is a rate at which packets can be transferred from inputs to outputs. It's often measured as a multiple of input/output line rate.  
If N input/output ports's desired rate is R, switching rate is NR.

### Switching via memory

First generation routers used CPU to control switching directly.  
Packet is copied to system's memory, but speed is limited by memory bandwidth.  
We need 2 system bus crossings per datagram.

### Switching via bus

Datagram from input port memory to output port memory via a shared bus.  
Switching speed is limited by bus bandwidth, and every port receives message because every port is connected to bus.

e.g. Cisco 5600 use 32Gbps bus, which is sufficient speed for access routers.

### Switching via interconnction network

Switching fabric can have interconnection network inside.

e.g. Crossbar network connects input port and output port like NxN array.  
e.g. Multistage switch use smaller sized switches to implement large sized switch.

Cisco CRS router use 8 switching "planes" in parallel, so we can speed up and scale up switching.

### Input port queueing

If switch fabric is slower than input port combined, input queueing occurs.

Head-of-the-Line (HOL) blocking: queued datagram at front of queue prevents others in queue from moving forward

- Output port contention: Only one datagram can be transferred to output port, other datagrams are blocked
- One packet time later: Packet inside input queue experience HOL blocking

### Output port queueing

If switch fabric is faster than link transmission rate, output port queueing occurs.

Drop policy/Scheduling discipline: choose which datagram should be drop/sent  
Datagram can be lost at output port!

RFC 3439: Average buffering should be equal to (typical) RTT times link capacity C.  
Recent recommendation says with N flows, buffering should be equal to $\frac{\text{RTT} \cdot C}{\sqrt{N}}$.

Too much buffering can increase delays!

- Long RTT has sluggish TCP response, poor performance for realtime apps
- Delay-based congestion control: TCP congestion control aims to keep bottlenectk link full

### Buffer Management

Drop: Which packet should be added to buffer, or dropped when buffer is full?

- Tail drop: Drop any arriving packets when full
- Priority: Drop/remove based on priority

c.f. RED (Random early detection) randomly drop packets when buffer is partially full.  
If marking is possible, instead of dropping packets, two ECN bits in IP header is marked to notify congestion.

### Packet scheduling

Packet scheduling decide which packet to send next on link.

- First come, first served
- Priority
- Round robin
- Weighted fair queueing

#### FCFS (First come, first served)

Packets are trasmitted in order of arrival to output port. Also known as FIFO. (First in, first out)  
FCFS is widely used in real life. e.g. standing in line

#### Priority

We have high priority queue and low priority queue.  
Arriving traffic is classified and queued by class.  
We send packet from high priority queue before sending packet from low priority queue.

Packet should be sent completely to send other packets.  
Arriving high priority packet isn't sent until low priority packet is sent completely.

#### Round robin

We have multiple queue, and header field is used for classification

Server cyclically scans class queues, sending one complete packet from each class (if available) in turn.

#### WFQ (Weighted fair queueing)

Generalized round robin!  
Each class i has weight $w_i$, and gets weighted amount of service $\frac{w_i}{\sum_i w_i}$ in each cycle.

~~Actually unfair queueing~~

# Network Neutrality

- Technical: How an ISP should share/allocation its resources?
- Social, economic: Encouraging innovation, competition, and protecting free speech

e.g. US regulation says ISP shouldn't prioritize paid users.
