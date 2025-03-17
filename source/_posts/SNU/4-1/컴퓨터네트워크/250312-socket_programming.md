---
title: Socket Programming
categories:
  - SNU
  - 4-1
  - 컴퓨터네트워크
abbrlink: 43
date: 2025-03-12 16:19:35
tags:
---

# Two types of packets

- UDP: unreliable datagram
- TCP: reliable byte stream

Actually it takes the same amount of time to send UDP packet and TCP packet!!  
Even streaming services uses TCP these days.

## UDP

- no handshaking before sending data (no connection!)
- sender explictly attaches IP destination address and port number to each packet
- receiver extracts sender IP address and port number from received packet

## Programming UDP

```c
int socket(PF_INET, SOCK_DGRM, IPPROTO_UDP);
int close(int socket);

int sendto(int socket, char *msg, int msg_len, int flags, const struct sockaddr* dest_addr, socklen_t addrlen);
int recvfrom(int socket, char *buff, int buff_len, int flags const struct sockaddr* src_addr, socklen_t* addrlen);
```

For historical reasons, intel uses little endian, and internet uses big endian... You need to tkae care endianness!

```c
int port;
struct sockaddr_in saddr;

saddr.sin_port = htons(port);
```

## Programming TCP

UDP just sends sockets.  
TCP must make connection before sending sockets!  
Usually server opens well-known port. (e.g. HTTP: 80)

1. Client contact server
1. Server creates new socket dedicated for that client
1. Client and server sends messages

```c
int connect(int socket, struct sockaddr *address,int addr_len);
int send(int socket, char *msg, int msg_len,int flags);
int recv(int socket, char *buff, int buff_len, int flags);

int listen(int socket, int backlog);
```

listen's arguments accepts queue size!  
Probably your server need 1024 queue size, if you're not accepting fast enough.

Unfortunately, listen use signle queue, and it's not designed with a multi-core environment in mind.
