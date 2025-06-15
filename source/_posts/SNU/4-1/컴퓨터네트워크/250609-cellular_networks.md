---
title: Cellular networks
categories:
  - SNU
  - 4-1
  - 컴퓨터네트워크
abbrlink: 96
date: 2025-06-09 15:56:05
tags:
---

# 4G/5G cellular networks

The solution for wide-area mobile internet!  
We have more mobile-broadband-connected devices than fixed-broadband-connected devices.

Widespread deployment/use!  
4G is available 97% of the time in Korea!

## Comparison with wired internet

Similarities:

- Edge/core distinction, but both belong to same carrier
- Global cellular network: a network of networks
- Widespread use of protocols (e.g. HTTP, DNS, TCP, UCP, IP, data/control planes, SDN, ...)
- Actually interconnected to wired internet (After the AP, everything is wired!)

Differences

- Different wireless link layer
- Mobility as a first class service
- User identity via SIM card
- Business model: Users subscribe to a cellular provider
  - Roaming is needed on visited nets

## Elements of 4G LTE architecture

![LTE architecture](lte_architecture.png)

All of the wired network uses IP packet!

- Mobile device
  - Devices (e.g. smartphones) with 4G LTE radio.
  - 64-bit IMSI (INternational Mobile Subscriber Identity) stored on SIM (Subscriber Identity Module) card.  
    Similar to MAC address!
- Base station
  - Manages wireless radio resources, mobile devices in its coverage area (called cell).
  - Coordinates device authentication with other elements.
  - Similar to Wi-Fi AP, but:
    - Active role in user mobility
    - Coordinates with nearby base stations to optimize radio use (e.g. handover)
- Serving Gateway (S-GW)
  - Gateway between mobile cellular network and P-GW
- PDN Gateway (P-GW)
  - Gateway between mobile cellular network and internet
  - Looks like any other internet gateway router
  - Provides NAT services
- Home Subscriber Server (HSS)
  - Stores info about mobile devices for which the HSS's network is their home network
  - Works with MME in device authentication
- Mobility Management Entity (MME)
  - Device authentication coordinated with HSS
  - Manage mobile device (e.g. device handover, tracking/paging device location)
  - Path (tunneling) setup from mobile to P-GW
- Other routers
  - Used for tunneling

Cellular network have 3 authentications!  
Base station (eNode-B), HSS, and MME!

## Data/Control plane separation

![LTE data/control plane](lte_data_control_plane.png)

Data plane: Use IP tunneling between AP, S-GW, and P_GW.  
Control plane: Protocols between MME, HSS, S-GW, P-GW for mobility management, security, and authentication.

## LTE Protocols

- Packet Data Convergence: Header compression, encryption
- Radio Link Control (RLC): Fragmentation, reassembly, reliable data transfer
- Medium Access: Requesting, using radio transmission slots  
  Use OFDM (orthogonal frequency division multiplexing) which combines FDM and TDM.

## Associating with a BS

1. BS broadcasts primary synch signal every 5ms on all frequencies.
1. Mobile find a primary sync signal, then locates 2nd synch signal on this frequency.  
  Mobile gets info broadcast by BS, containing channel bandwidth, configurations, and BS's cellular carrier info.
1. Mobile selects which BS to associate with, then establishes connection.

## Sleep modes

LTE mobile may sleep to conserve battery.

- Light sleep: After hundreds of milliseconds of inactivity  
  Mobile wake up periodically (for hundreds of milliseconds) to check for downstream transmissions.
- Deep sleep: After 5~10 secs of inactivity  
  Mobile may change cells while deep sleeping, but it should re-establish association.

## Roaming

SIM card has ISMI, so any network can detect mobile's home network. (HSS, Home Subscriber Server)

Carrier networks are interconnected with each other, using IP.  
If mobile visits other network, visited mobile carrier network sends data to home mobile carrier network('s P-GW).

## 5G

10x increase in peak bitrate, 10x decrease in latency, 100x increase in traffic capacity over 4G!

5G NR (new radio) uses two frequency bands. (FR1: 450 MHz ~ 6 GHz, FR2: 24 GHz ~ 52 GHz)  
Not backward-compatible with 4G...

5G uses millimeter wave frequencies! It has much higher data rates, but over short distances.  
Only available for pico-cells, (10~100m diameter) so massive, dense deployment of new base stations is required.

# Mobility management

We want devices to move among APs (in one provider network or across multiple provider networks) while maintaining ongoing connections.

In fact, network routers can do this!  
Routers advertise well-known name, address, or number of visiting mobile node via routing table exchange.  
Routing tables can indicate where each mobile is located via longest prefix match.

However, we have billions of mobiles! Routers can't store every devices information in routing table.

Normally, end systems handles mobility management. Functionality at the edge!

- Indirect routing: Communication from correspondent to mobile goes through home network, then forwarded to remote mobile.
- Direct routing: Correspondent gets foreign address of mobile, then sends data directly to mobile.

## Mobility of ISP/Wi-Fi

We don't have a home network for ISP and Wi-Fi.  
If we attach to different ISP or Wi-Fi, we need different credentials and different connections. (No mobility...)

Architectures for 4G-like mobility exists, but it is not used.

## Registration

Home network needs to know where you are!  
Mobile associates with visited mobility manager.  
Visited mobility manager registers mobile's location with home HSS.

## Indirect routing

1. Correspondent uses home address as datagram destination address.
1. Home gateway forwards to remote (visited) gateway.
1. Visited gateway router forwards to mobile.
1. Mobile replies to visited network.
1. Visited gateway forwards reply to correspondent (via home network or directly).

Pros: Mobile is transparent to correspondent! Ongoing connections can be maintained automatically.  
Cons: Triangle routing: Inefficient when correspondent and mobile are in same network.

## Direct routing

1. Correspondent contacts home HSS, then gets mobile's visited network.
1. Correspondent uses foreign address as datagram destination address.
1. Visited gateway forwards to mobile, then forwards reply to correspondent directly.

Pros: Efficient (No triangle routing)  
Cons: Non-transparent to correspondent: Correspondent should remember foreign address, and handle when mobile changes its visited network.

## Mobility in 4G networks

1. Base station association: Mobile provides IMSI to identify itself.
1. Control-plane configuration: Visited network's MME and home network's HSS establish control-plane state.
1. Data-plane configuration: Visited network's MME configures forwarding tunnels for mobile. Visited network and home network establish tunnels from home P-GW to mobile.
1. Mobile handover: Mobile device changes its point of attachment to vsited network

### Configuring LTE control-plane elements

- Mobile communicates with visited MME via BS control-plane channel.
- MME uses mobile's IMSI info to contact mobile's home HSS.
- Visited BS and mobile select parameters for BS-mobile data-plane radio channel.

### Configuring LTE data-plane tunnels

- Visited S-GW to visited BS tunnel: Change endpoint IP address of tunnel
- Visited S-GW to home P-GW tunnel: Implementation of indirect routing

GPRS tunneling protocol (Tunneling via GTP): Mobile's datagram to streaming server is encapsulated using GTP inside UDP inside datagram.

### Handover between BSs in same cellular network

1. Source BS detects mobile might leave its coverage area.
1. Source (current) BS selects target BS, then sends handover request message to target BS.
1. Target BS pre-allocates radio time slots, and responds with HR ACK with info for mobile.
1. Source BS informs mobile of new BS. Mobile can now send via new BS!  
  Handover looks complete to mobile, but S-GW still forwards to source BS...
1. Source BS stops sending datagrams to mobile. Instead, it forwards to new BS.
1. Target BS informs MME that it is new BS for mobile.
1. MME instructs S-GW to change tunnel endpoint to be new BS.
1. Target BS ACKs back to source BS to inform handover complete.  
  Now source BS can release resources!
1. Mobile's datagrams now flow through new tunnel from target BS to S-GW.

## Mobile IP

Historic architecture that was standardized 20 years ago.  
Long before ubiquitous smartphones and 4G support!  
No wide deployment/use because Wi-Fi, 2G, 3G was enough at the time?

Home agent, foreign agent, tunneling existed.  
Similar to HSS, P-GW, MME, S-GW...

## Impact on higher layer protocols

Logically, impact is minimal! Best effort service model still remains unchanged.  
TCP and UDP can run over wireless and mobile networks.

But performance impact is high!

- Packet loss/delay due to bit-errors and handover loss.
- TCP interprets loss as congestion (not error of wireless network), so it will decrease congestion window unnecessarily.
- Real time traffic is delayed.
- Bandwidth is a scarce resource for wireless link, unlike wired link.
