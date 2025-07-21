---
title: Link Layer
categories:
  - SNU
  - 4-1
  - 컴퓨터네트워크
abbrlink: 91
date: 2025-05-21 15:39:38
tags:
---

# Link layer

- Nodes: Hosts and routers
- Links: Communication channels that connect adjacent nodes along communication path
- Frame: Layer-2 packet that encapsulates datagram

Link layer has responsibility of transferring datagram from one node to physically adjacent node over a link.  
Link layer is implemented in each-and-every host, typically in network interface card (NIC) or on a chip.

## Context

- Datagram is tranferred by different link protocols over different links. (e.g. Wi-Fi, Ethernet)
- Each link protocol provides different services. (e.g. reliable/unreliable)

## Services

- Framing: Ecncapsulate datagram into frame, adding header and trailer
- Link access: Medium can be shared, channel access control needed. (e.g. MAC address)
- Reliable delivery between adjacent nodes
  - But if link has low bit-error rate, we don't use it and let the higher layer handle reliable delivery. (e.g. TCP)
  - Wireless link has high bit-error rate, so we need reliable delivery in link layer.
- Flow control: Pacing between adjacent sending and receiving nodes
- Error detection: Receiver detects errors caused by signal attenuation or noise, then it signals retransmission or drops frame.
- Error correction: Receiver identifies and corrects bit errors without retransmission.
- Half-duplex and full-duplex: Can both ends of link transmit at the same time?

# Error detection and correction

- D: Data bits that are protected by error checking, may include header fields
- EDC: Error detection (and correction) bits that detects errors.

## Parity checking

- Single bit parity: Can detect single bit errors
- Two-dimensional bit parity: Can detect all of 1, 2, 3 bit errors and most of 4 bit errors, and correct all of 1 bit errors.

Even parity: Set parity bit so there is an even number of 1's

## Recall) Internet checksum

Treat contents of UDP segment as a sequence of 16-bit integers.  
Checksum value is the addition of the segment content.

## Cyclic Redundancy Check (CRC)

- D: data bits
- G: bit pattern (called generator), of r+1 bits
- R: r bits of CRC

We want to choose R such that `<D, R>` is divisble by G.  
Since `<D, R>` is divisible by G, $D \cdot 2^r \oplus R = nG$. Equivalently, $D \cdot 2^r = nG \oplus R$.  
Therefore, R should be the remainder of $D \cdot 2^r \div G$. (Real implementation doesn't use division.)

By choosing good G, we can detect all burst errors less than r+1 bits, and any odd bits errors.  
We can also detect burst errors greater than r+1 bits with probability of $1 - 2^{-r}$.
e.g. 32bit CRC uses G=100000100110000010001110110110111

# Multiple Access Protocols

- Interference: two or more simultaneous transmissions by nodes.
- Collision - A node received two or more signals at the same time.

Multiple access protocol is a distributed algorithm that determines how nodes share channel, or when node can transmit.  
Communication about channel sharing must use the channel itself!

Goal: When M nodes want to transmit and channel has send rate up to R bps, each nodes should send at rate R/M.

## Multiple access links

- Point-to-point: point-to-point link between ethernet switch
- Broadcast: Wire or medium is shared. e.g. Wi-Fi, 4G, satellite

## Channel partitioning

Divide channel into smaller pieces, and allocate piece to node for exclusive use.

### TDMA (Time division multiple access)

Each station gets fixed length (= packet transmission time) slot in each round.  
Unused slots go idle.

### FDMA (Frequency division multiple access)

Channel spectrum is divided into frequency bands.  
Each station is assigned fixed frequency band.  
Unused bands go idle.

## Random access

Channel is not divided, and collisions are allowed.  
Nodes should recover from collisions.

### Slotted ALOHA

Assumptions:

- All frames have same size
- Time is divided into equal size slots
- Nodes start to transmit only slot beginning
- Nodes are synchronized
- All nodes can detect collision (2 or more nodes transmit in same slot)

Each node transmit until collision happens.  
When collision happens, node retrnasmits frame with probability p until success.

If N nodes have many frames to send, and each transmit in slot with probability p,  
Probability of one node successfuly send in one slot is $p(1-p)^{N-1}$.  
Probability of any node successfuly send in one slot is $Np(1-p)^{N-1}$.
When $p = \frac{1}{N}$, probability is maximized. $\left( 1-\frac{1}{N} \right)^{N-1}$  
When N goes to infinity, we get max efficiency $\frac{1}{e} \approx 37\%$.

Pros:

- If only one node is active, it can transmit at full rate of channel
- Highly decentralized: only slots in nodes need to be in sync

Cons:

- Collision + Idle slots
- Nodes should be able to detect collision in less than time to transmit packet
- Clock should be synchronized.

### Pure ALOHA

Unslotted ALOHA! Without synchronization, we just transmit at any time.  
Frame sent at $t_0$ will collide with other frames sent in $[t_0 - 1, t_0 + 1]$.

Since time slot is doubled, probability of one node successfuly send in one slot is $p(1-p)^{2(N-1)}$.  
When $p = \frac{1}{2N-1}$, probability of any node successfuly send in one slot is maximized. $\frac{N}{2N-1}\left( 1-\frac{1}{2N-1} \right)^{2(N-1)}$  
Max efficiency is halved: $\frac{1}{2e} \approx 18\%$!

### CSMA/CD

Simple CSMA (Carrier sense multiple access): listen before transmit.  
If channel is idle, transmit the entire frame.  
If channel is busy, defer the transmission.

CSMA/CD: CSMA with collision detection!  
Because of propagation delay, two nodes may not hear each other's just started transmission, leading to collision.  
Without CD, entire packet transmission time is wasted.  
With CD, transmission is aborted on collision detection, so the amount of time wasted in collisions is reduced.

### Ethernet CSMA/CD algorithm

1. NIC receives datagram from network layer and creates frame.
1. If channel is idle, start frame transmission.  
  If channel is busy, wait until channel is idle, then transmit.
1. If NIC detects another transmission while sending (collision), abort and send jam signal.
1. After aborting, NIC enters binary (exponential) backoff.
    1. After $m$ th collsion, NIC chooses K at random from 0 ~ $2^m -1$. (0 is possible!!!)
    1. NIC waits $K \cdot 512$ bit times, then return to step 2.

Let $t_{prop}$ is the maximum propagation delay between two nodes in LAN,  
and $t_{trans}$ is the time to transmit max-size frame.  
Then the efficiency of CSMA/CD is:

$$e = \frac{t_{trans}}{t_{trans} + 5t_{prop}} = \frac{1}{1 + 5\frac{t_{prop}}{t_{trans}}}$$

(Collision detection $2t_{prop}$ + Jam signal $t_{prop}$ + Collision detection again $2t_{prop}$)

If $t_{prop} \to 0$ or $t_{trans} \to \infty$, $e \to 1$.  
Better performance than ALOHA with simple, cheap, decentralized algorithm!

Collision should be detected before whole frame is sent, so Etherenet defines least frame size. (eg. 64 byte in 10Mbps Ethernet)

## Taking turns

Nodes takes turns, but nodes with more to send can take longer turns.

### Polling

Controller node invites other nodes (clients) to transmit in turn.  
Typically used with *dumb* devices. e.g. Bluetooth.

Cons: Polling overhead, Latency (should wait for their turn), Single point of failure (controller)

### Token passing

We use a special message named token.  
Control token is passed from one node to next sequentially.  
The nodes forms a ring structure.

Cons: Token overhead, Latency (should wait until token arrives), Single point of failure (token)  
e.g. Machine with token can fail, token message can be lost  
Pros: Collision is always avoided.

# Cable access network

![Cable access network](cable_access_network.png)

Cable access network uses FDM, TDM, and random access!

- Mutliple downstream: Single CMTS transmits into FDM channels. No collision!
- Multiple upstream channels: Multiple clients transmits into TDM channels.
- Multiple access: Clients should send special message to CMTS before sending data (using random access). This message can have collision!  
  Clients assume that collision happened if they fail to receive response. They use exponential backoff until it receives response.

Random access is used in access request because message is small.  
TDM is used after time slot is reserved for fast transfer.

## DOCSIS (Data over cable service interface specification)

DOCSIS use FDM over downstream, and TDM over upstream.

Downstream MAP assigns some upstream slots.  
Upstream use allocated TDM slots, or use minislots (with random access) for slot requests.
