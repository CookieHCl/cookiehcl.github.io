---
title: Multiplexing & UDP
date: 2025-03-31 16:19:54
tags:
---

# Transport layer

Transport layer provide logical communication between application processes running on different hosts.  
Sender breaks application messages into segments, then passes to network layer.  
Receiver reassembles segments into messages, then passes to application layer.

## Transport layer and network layer

Transport layer is communication between processes. (TCP, UDP)  
Network layer is communication between hosts. (IP, Router)

## Multiplexing & Demultiplexing

Sender sends messages from any application to network layer.  
This is called multiplexing: Sender handle data from multiple sockets, then send it to single network.

Receiver must pass application message to matching application.  
This is called demultiplexing: Receiver chooses right socket (a.k.a. port number) and pass message to application.

### Transport header

Multiplexing & Demultiplexing is implemented using transport header.

Host receives IP datagrams:  
Each datagram has source IP address and destination IP address.  
Each datagram carries one trasport-layer segment (i.e. application data with transport header).  
Each segment has source port number and destination port number.

Host uses IP addresses & port number to direct segment to appropriate socket!

### Connectionless demultiplexing (UDP)

UDP only needs destination IP address and destination port number.  
Receiver uses destination IP address and destination port number to direct UDP segment to appropriate socket.

IP/UDP datagrams with same destination port number but different source IP address and/or source port numbers will be directed to same socket.

### Connection-oriented demultiplexing (TCP)

TCP socket is identified by 4-tuple: source IP address, source port number, destination IP address, destination port number.
Receiver uses all four values to direct TCP segment to appropriate socket.

Each TCP socket is associated with a different connecting client.  
Destination AND source should be same!  
Even if packets have same destination port number, it will be demultiplexed to different sockets if their source IP address is different.

## User Datagram Protocol (UDP)

- No connection state
- Small header size (8 bytes) - almost bare packet!
- No connection (handshaking), no congestion control
  - But congestion control is necessary, user (application layer) have to do it!
  - UDP has checksum, but its optional...
- UDP segments may be lost or delivered out-of-order even in best effort service.

UDP are used in:

- Streaming multimedia apps (discarding packet is better than retransmitting)
- DNS (but DNS can use TCP, UDP, or both)
- HTTP/3 (HTTP-over-QUIC) (but reliable transfer is needed - application layer has congestion control)
  - Actually Google wanted to make new protocol, but because of backward compatibility, it used UDP + congestion control

### UDP segment hader

- source port number
- destination port number
- length (in bytes, including header)
- checksum (optional)

### UDP checksum

UDP checksum detect errors like flipped bits. It's not error correction code!

Sender treat UDP segment (including UDP header and IP addresses) as sequence of 16-bit integers and sum it.  
Sender set checksum field value as 1's complement of sum. (i.e., if you add checksum to sum, it will be 0)
Receiver compute checksum and check if computed checksum equals checksum field value.

Theorically, checksum can be correct even if error happens in content (or even in checksum).  
But these days bit flip rarely happens, and checksum is useful!  
Also, it is simple so it can be implemented in hardware!

### Is UDP faster?

Actually, TCP can be faster!

UDP only sends limited number of packets at a time.  
If you're sending huge data, you need to split it into packets and send it.  
Because of context switching, sending lots of packet in UDP is actually slower than TCP!  
In TCP, kernel split data into packets so we have less context switching.
