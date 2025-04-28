---
title: Congestion Control
categories:
  - SNU
  - 4-1
  - 컴퓨터네트워크
abbrlink: 67
date: 2025-04-14 16:38:57
tags:
---

# Congestion

Too many sources are sending too much data too fast for network to handle!

Manifestations: long delays (queueing in router buffers), packet loss (buffer overflow at routers)

Different from flow control! Flow control is needed when one sender is too fast for one receiver.  
Congestion control is needed when too many senders are sending too fast.

## Congestion scenario 1: Two hosts

![Congestion scenario with two hosts](congestion_two_hosts.png)

Lets assume two hosts are using one link, sending at same input rate.

If input rate $\lambda_{in}$ approaches R/2? (half of link capacity)  
Output rate $\lambda_{out}$ is capped at R/2, and delay goes to infinite.

If we assume finite buffers, packet loss will happen.  
Even if application-layer input rate is $\lambda_{in}$, transport-layer input rate is higher $\lambda_{in}' \geq \lambda_{in}$ because it includes retransmissions.

Because of packet loss and unneeded duplicates (packet was sent but host didn't know), packets are retransmitted more often at high congestion.  
Even if $\lambda_{in}$ approaches to R/2, $\lambda_{out}$ can't reach R/2, thus decreasing maximum achievable throughput.

## Congestion scenario 2: Four hosts

![Congestion scenario with four hosts](congestion_four_hosts.png)

Lest assume four senders are sending to each other.

If red input rate $\lambda_{in}, \lambda_{in}'$ increases, the top link buffer will fill and packet loss will happen.  
However, since blue shares the same link, all arriving blue packets will be lost, making blue's throughput to 0.  
Congestion on one connection can starve other connections!

Also, when packet is dropped, any upstream transmission capacity and buffering used for that packet has been wasted.  
e.g. When blue packet is lost because the top link buffer was full, all the resources used on the left link to send the blue packet are wasted.  
Congestion on one link costs every link along the connection!

# Congestion control

## End-end congestion control

Congestion control without no explicit feedback from network.  
Host infers congestion from observed loss, delay.  
TCP already does this!

### TCP AIMD

Approach: senders can increase sending rate until packet loss occurs, then decrease sending rate on loss event.

- Additive Increase (AI): Increase sending rate by 1 MSS (maximum segment size) every RTT until loss detected.
- Multiplicative Decrease (MD): Cut sending rate at each loss event.
  - TCP Tahoe: Cut to 1 MSS when loss detected by timeout. Timeout have to wait too long time for congestion control.
  - TCP Reno: Cut in half on loss detected by triple duplicate ACK.  
  This is an improved version of TCP Tahoe!

![TCP AIMD](tcp_aimd.png)

AIMD probes for bandwidth in a sawtooth pattern.

#### Implementing AIMD

*cwnd* is TCP window size, indicating how many bytes can be in flight at any one time.  
i.e. (Last byte sent - Last byte ACKed) should be less than or equal to *cwnd*.  
The send rate of TCP is proportional to *cwnd*.

$$\text{Send rate} = \frac{\text{cwnd}}{\text{RTT}} \text{bytes/sec}$$

![Slow start and fast recovery of AIMD](tcp_aimd_slow_start_fast_recovery.png)

In practice, slow start and fast recovery is used.  
When connection begins, *cwnd* is set to 1 MSS, then *cwnd* is doubled every RTT.  
If *cwnd* reaches threshold *ssthresh*, switch to congestion avoidance. (Additive Increase)

When timeout is detected, *cwnd* is set to 1 MSS. (TCP Tahoe)  
Like slow start, *cwnd* is doubled until it reaches threshold.

Fast recovery is used when triple duplicate ACK is detected. (TCP Reno)  
Set *cwnd* and *ssthresh* to half of current *cwnd*, then increase *cwnd* by 3 MSS.  
Why? Triple duplicate ACK means that at least three packets have arrived. To maintain number of in flight packets, we increase *cwnd*.  
Also, *cwnd* is increased by 1 MSS for each duplicate ACK received.  
After new ACK is received, switch to congestion avoidance.

![Implementation of AIMD](tcp_aimd_implementation.png)

To double *cwnd* in the slow start state, we increase *cwnd* by 1 MSS for each new ACK.  
For every RTT, cwnd / MSS packets are ACKed, so *cwnd* will be increased by *cwnd*. (i.e. doubled)

But we need to increase *cwnd* linearly in the congestion avoidance state. To do this, we increase *cwnd* by (MSS * MSS /cwnd) for each new ACK.  
For every RTT, cwnd / MSS packets are ACKed, so *cwnd* will be increased by 1 MSS.

Since the internet is fast enough, we use inital *cwnd* as 10 MSS instead of 1 MSS.  
Also, we use scale factor to scale the initial *sshthresh*, so we can use (64K << scale factor) as the initial *sshthresh*.

### TCP CUBIC

Insight: Linear is too slow, how can we approach maximum sending rate faster?

Solution: Increase sending rate as a function of the cube of the distance between current time and K.  
K is tuneable point in time when TCP window size will reach W_{max}.

![TCP CUBIC](tcp_cubic.png)

- Larger increases when further away from K
- Smaller increases when near K

If good K is selected, TCP CUBIC will ramp up to the $W_{max}$ faster, but then approach $W_{max}$ slower than TCP AIMD.  
Most popular web servers use TCP CUBIC instead of TCP AIMD.

### Delay-based TCP congestion control

TCP AIMD, CUBIC increase TCP's sending rate until packet loss occurs at the bottleneck link.

Insight: Focus on congested bottleneck link!  
If we can keep the bottleneck link full, we can achieve maximum sending rate.

We guess congestion of bottleneck link by measuring RTT.  
We assume uncongested throughput with congestion window cwnd is $\frac{\text{cwnd}}{\text{RTT}_{\text{min}}}$.

If measured throughput is very close to uncongested throughput, increase cwnd linearly since path is not congested.  
If measured throughput is far below uncongested throughput, decrease cwnd linearly since path is congested.

Delay-based congestion control is less aggressive than loss-based congestion control.

### Google's backbone network (BBR)

BBR uses model-based congestion control to estimate the bottleneck link's bandwidth by probing.  
Earlier version (BBRv1) was much more aggressive than TCP CUBIC, so YouTube was able to use higher streaming bitrates ~~and starve other connections~~.

## Network-assisted congestion

TCP ECN, ATM (Asynchronous Transfer Mode), DECbit protocols used this.

Network-assisted congestion should alert congestion before buffer is full.  
Response packet should arrive to sender to control congestion!

### TCP ECN (Explicit congestion notification)

- Two ECN bits in IP header is marked by network router to indicate congestion.
- Destination checks congestion indication, and set ECE bit (in TCP header) on ACK segment to notify sender of congestion.

TCP header and IP header are both used!

It's rarely used...

# TCP fairness

Goal: If K TCP sessions share same bottleneck link of bandwidth R, each should have average rate of R/K.

![Fairness of TCP AIMD](tcp_aimd_fairness.png)

AIMD is fair!  
AI gives slope of 1, and MD decreases throughput proportionally, thus moving towards equal bandwidth share.

## Unfair network apps

Multimedia apps often se UDP, and send audio/video at constant rate, tolerating packet loss.  
This bypass TCP congestion control!

Web browsers usually open multiple parallel connections between two hosts.  
HTTP/2 uses one connection, but it's not forced.

# Evolving transport-layer functionality

In 1983/1/1, ARPANET was able to change every internet protocol from NCP to the TCP/IP.  
Nowdays, internet is too big, so it's nearly impossible to change protocol from TCP, UDP. (ossification)

There were many different flavors of TCP developed for specific scenarios.  
HTTP/3 moved to UDP because tweaking TCP was not enough.

- Long, fat pipes (Large data transfers): Many packets are in flight, loss can shutdown pipeline
- Wireless networks: Loss due to noisy wireless links, mobility
- Long-delay links: Extremely long RTTs
- Data center networks: Latency sensitive
- Background traffic flows: Have low priority, but still background TCP flows are needed.

## QUIC: Quick UDP Internet Connections

QUIC is an application-layer protocol on top of UDP, but it actually acts as a transport-layer protocol.  
QUIC increases performance of HTTP, and have more functionality. (e.g. migrating connection)  
Ultimately, it tries to replace HTTP (over TLS) over TCP.

- Error and congestion control: Parallel to well-known TCP congestion controls.
- Connection establishment: Reliability, congestion control, authentication, encryption, state are established in one RTT. (TCP + TLS need 2 serial handshakes, UDP merge these into 1 handshake!)
- Parallelism: Multiple application-level streams are multiplexed, no HOL blocking!

Clients doesn't know if server uses QUIC in advance.  
Solution: trial and error! Modern browser tries QUIC handshake over UDP. If QUIC failes, HTTP/2 or HTTP/1.1 over TCP is used.  
~~However, since Chrome is made from google, it knows that Google uses QUIC.~~

# TCP Throughput

Lets assume loss occurs when window size is $W$.  
Since window size is halved, average throughput is 3W/4 per RTT.

Can we get better representation?

## Periodic Model: Congestion Window Behavior

Lets say $W(i)$ is the number of segments sent during ith RTT, and loss occurs when $W_L$ segments are sent.

At the end of the ith RTT,

- $W(t) = W(t - 1) + 1$ if there was no packet loss.
- $W(t) = \frac{W_L}{2}$ if there was a packet loss.
- The period of window shrinkage is $T = \frac{W_L}{2} \cdot RTT$.

If $p$ is a loss probability, number of segments sent every $T$ is $N = \frac{1}{p}, \because N = p \cdot 1 + (1-p) \cdot (N + 1)$.  
We can also compute number of segments sent using $W(t)$: $N = \sum_{i=0}^{\frac{W_L}{2}} \left( \frac{W_L}{2} + i \right) = \frac{3W_L}{4}\left( \frac{W_L}{2} + 1 \right) \approx \frac{3W_L^2}{8}$

$$\therefore W_L = \sqrt{\frac{8}{3p}}$$

Therfore, average throughput is the total amount of bytes sent per period T is:

$$\bar{S} = \frac{N \cdot MSS}{\frac{W_L}{2} \cdot RTT} = \frac{MSS}{RTT} \sqrt{\frac{3}{2p}}$$
