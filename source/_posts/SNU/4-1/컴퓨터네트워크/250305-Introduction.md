---
title: Introduction
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
