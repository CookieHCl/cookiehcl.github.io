---
title: Reliable Data Transfer
categories:
  - SNU
  - 4-1
  - 컴퓨터네트워크
date: 2025-04-02 16:34:36
tags:
---

# Reliable data transfer

Sender and receiver use reliable data transfer protocol to unreliable channel.  
Unreliable channel may lose, corrupt, or reorder data.  
Sender and receiver do not know the state of each other. e.g. Was a message received?

Assumes transport layer is reliable!  
i.e. data <-> packet is reliable

# rdt (Reliable data transfer) protocol

- `rdt_send()`: Application call it to send data.
- `udt_send()`: Called by rdt to transfer packet over unreliable channel to receiver
- `rdt_rcv()`: Called when packet arrives on receiver side of unreliable channel
- `deliver_data()`: Called by rdt to deliver data to application.

We consider only unidirectional data transfer, but control info will flow in both directions.  
We use FSMs to specify sender and receiver.

## rdt1.0: reliable transfer over a reliable channel

We have reliable channel, do nothing!

### Sender

```c
void rdt_send(data) {
  packet = make_pkt(data)
  udt_send(packet)
}
```

### Receiver

```c
void rdt_rcv(packet) {
  data = extract(packet)
  deliver_data(data)
}
```

## rdt2.0: channel with bit errors

Underlying channel may flip bits in packet!  
We can use checksum to detect bit errors.  
When error happens, we have to recover from errors!

We'll use stop and wait method - sender sends one packet, then waits for receiver response.

- ACK(Acknowledgements): receiver explicitly tells sender that packet was successfully received.  
- NAK(Negative acknowledgements): receiver explicitly tells sender that packet had errors.

Sender waits for receiver response, and retransmit packets on NAK.  
These are called **control packets**, it doesn't transmits actual data.

![rdt2.0](rdt2.0.png)

But this has a fatal flaw!  
What happens if ACK/NAK is corrupted?  
What should we do if ACK/NAK is corrupted?

## rdt2.1: sender handling garbled ACK/NAKs

Sender doesn't know what happened at receiver.  
We can't just retransmit: receiver doesn't know whether this is a retransmittion or a new transmittion.

We use sequence number!

- Sender adds sequence number to each packet.  
- Receiver checks sequence number and discard duplicate packet.  
- Sender retransmits current packet if ACK/NAK is corrupted.  
- Receiver **should send ACK** when duplicate packet arrive.

Still use stop and wait method - sender sends one packet, then waits for receiver response.

![rdt2.1](rdt2.1.png)

We can only use two sequence number (0, 1).  
We have twice as many states because we use two sequence number.

## rdt2.2: a NAK-free protocol

Actually, NAK is redundant!  
Instead of NAK, receiver sends ACK with sequence number of the last packet received.  
Duplicate ACK at sender results in same action as NAK: we retransmit current packet.

![rdt2.2](rdt2.2.png)

## rdt3.0: channel with errors and loss

Underlying channel may lose packets - data or control packets.
In practice, bit errors are rare these days, and loss and delay are much more problematic.

Approach: sender waits reasonable amount of time for ACK!

- Sender waits reasonable amount of time for ACK.
- Sender retransmits if no ACK is received in this time.

Packet can be just delayed, and retransmission will be duplicate.  
However, we're already handling duplicate packet!

![rdt3.0](rdt3.0.png)

Only sender maintains timeout. i.e. receiver don't have to retransmit ACKs.  
Receiver is same from rdt2.2!

### Performance of rdt3.0 (stop-and wait)

U: sender's utilization, i.e. fraction of time sender busy seding

Let's assume link has 1Gbps bandwidth, propagation delay is 15ms, and packet size is 8000 bits.

- Time to transmit packet into channel: 8000bits / 1Gbps = 8μs
- Round-trip time: 2 propagation delay = 30ms

Utilization = 8μs / (30ms + 8μs) = 0.00027  
Sender is almost always idle!

## Pipelining

Send multiple packets at once!  
Range of sequence numbers must be increased.  
Sender and receiver need buffering.

In theory, sender can send until it receive response.  
i.e. Sender can send bandwidth * RTT bits of packets!

### Go-Back-N

- Sender have a window up to N consecutive transmitted but unACKed packets.  
- On receiving ACK(n), move window forward to begin at n + 1.  
- Timeout should be checked only for oldest packet sent.  
- If timeout(n) happenes, retransmit every packet from n.

- Receiver always record highest in-order sequence number of correctly-received packet so far called `rcv_base`.
- On receipt of out-of-order packet, receiver can discard or buffer it.
  - Buffering is better, but sometimes you have to implement in hardware (e.g. RDMA), so it is possible for receiver to just discard packet.
- Receiver always ACK with `rcv_base` when it receives any packet.

### Selective repeat

- Sender uses a window up to N packets.
- Sender maintains timer for each unACKed packet.
- Sender timeout/retransmits indivually for unACKed packets.
- On receiving ACK(n), mark packet n as received.
- If n is the smallest unACKed sequence number, advance window to next unACKed sequence number.

- Receiver individually ACK all correctly received packets
- On receipt of out-of-order packet, receiver buffer it.
- On receipt of in-order packet, receiver deliver buffered, in-order packets to application, and remove packets from buffer.

Head-of-line blocking happens here!  
If the smallest unACKed packet is delayed, the whole transmission is delayed.

### Sequence number space

We can't increase number infinitely!

Go-Back-N use at least N + 1 sequence numbers.  
Selective repeat use at least 2N sequence numbers.

In reality, packets can sent and received out of order.  
Specification says that MSL (Maximum Segment Lifetime) should be 120s ~ 3 min.
