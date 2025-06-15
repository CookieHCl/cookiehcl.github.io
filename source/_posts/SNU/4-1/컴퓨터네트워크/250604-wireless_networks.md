---
title: Wireless Networks
categories:
  - SNU
  - 4-1
  - 컴퓨터네트워크
abbrlink: 95
date: 2025-06-04 16:19:35
tags:
---

# Wireless and mobile networks

- More wireless (mobile) phone subscribers than fixed (wired) phone subscribers!
- More mobile-broadband-connected devices than fixed-broadband-connected devices.

Two important challenges:

- Wireless: Communication over wirelss link.
- Mobility: Handling the mobile user who changes point of attachment to network.

## Elements of a wireless network

- Wireless hosts: May be stationary (non-mobile) or mobile! e.g. Laptop, smartphone, IoT ...
- Base station: Typically connected to wired network, responsible for sending packets between wired network and wireless hosts in its area.
- Wireless link: Typically used to connect mobiles to base station.  
  Also used as a backbone link e.g. On the island, under the sea, ...  
  Wireless link standard started with 1 character (e.g. 802.11b, 802.11g), but is currently using 2 characters... (e.g. 802.11be)

There are two modes of a wireless network.

- Infrastructure mode: Base station connects mobiles into wired network.
  - Handoff: Mobiles change base station which provides connection into wired network.
- Ad hoc mode: No base stations! Nodes transmit to other nodes within link coverage. e.g. sensor network

## Characteristics of wireless link

- Decreased signal strength: Radio signal attenuates as it propagates through matter.
- Interference from other sources: Wireless network frequencies are shared by many devices. Note that you should **pay** if you want to use certain frequencies!
- Multipath propagation: Radio signal reflects off objects ground, arriving at destination at slightly different times.
- Connection transitivity: Based on terrains and distance, transitivity doesn't holds.  
i.e. Even though A, B are connected, and B, C are connected, A, C might not be conected.

### SNR (signal-to-noise ratio)

![SNR](snr.png)

Larger SNR means it is easier to extract signal from noise.

If physical layer is given, increasing power can increase SNR and decrease BER. (bit error rate)  
If SNR is given, we should choose physical layer that meets BER requirement.

# Wi-Fi (IEEE 802.11)

Wireless host communicates with base station (AP, Access point).  
Basic Service Set (BSS) (a.k.a. cell) in infrastructure mode contains:

- Wireless hosts
- Access point (AP)
- Ad hoc mode (hosts only)

## Channels

Spectrum is divided into channels at different frequencies.  
AP admin chooses frequency for AP.  
Arriving host must associate with an AP.

1. Host scans channels, listening for beacon frames containing AP's name (SSID) and MAC address.
1. Host selects AP to associate with.
1. Host perform authentication.
1. Host typically run DHCP to get IP address in AP's subnet.

Interference is possible! Channel can be same as that chosen by neighboring AP.  
In fact, other devices (e.g. microwave) might use Wi-Fi frequencies!  
Modern Wi-Fi AP choose different channel when interference happens.

### Passive/Active scanning

- Passive Scanning
    1. Beacon frames are sent from APs.
    1. Association request frame is sent from host to selected AP.
    1. Association response frame is sent from selected AP to host.
- Active Scanning
    1. Host broadcast request frame.
    1. AP probe request frame from host.
    1. Host probe response frames sent from APs.
    1. Association request frame is sent from host to selected AP.
    1. Association response frame is sent from selected AP to host.

## Multiple access

Wi-Fi have no collision detection!

- Due to fading, transmitting signal is high, but received signal is weak.
- Not all collisions can be sensed. e.g. fading, hidden terminal (A can see B, C can see B, but A can't see C)

### CSMA/CA

We use CSMA/CA to avoid collisions. (CA stands for Collision Avoidance!)

1. If sender sense channel idle for DIFS (Distributed Interframe Space), transmit entire frame.
1. If sender sence channel busy,
    1. Choose random backoff time. (with exponential backoff)
    1. Timer counts down while channel is idle.  
      Timer is frozen while channel is busy.
    1. Transmit entire frame when timer expires.
    1. If no ACK was received, double backoff and repeat this process.

Receiver should return ACK after SIFS (Short Interframe Space) passed.  
SIFS is shorter than DIFS, so other senders can check whether channel is busy.

### RTS-CTS exchange

Idea: sender reserves channel use for data frames using small reservation packets.

1. Sender transmits small RTS (request-to-send) packet to AP using CSMA.
1. AP broadcaasts CTS (clear-to-send) in response to RTS.
1. Sender transmits data frame.  
  Other stations defer transmissions until transmission is finished.
1. AP broadcast ACK in response to data frame.

RTS can collide, but we don't lose too much time because RTS is small.  
Exponential backoff is used for RTS.

## Addressing

Wi-Fi frame has four addresses.

- Address 1: MAC address of wireless host or AP that receives this frame
- Address 2: MAC address of wireless host or AP that transmits this frame
- Address 3: MAC address of router interface to which AP is attached
- Address 4: Only used in ad hoc mode

## Advanced features

### Mobility

Host can change AP while remaining in same IP subnet.  
IP address can remain same!

Switch will self-learn which AP is associated with H1.

### Rate adaptation

AP dynamically change transmission rate as mobile moves.  
SNR (Signal-to-noise ratio) will vary when mobile moves.  
BER (Bit error rate) increases as SNR decreases. (i.e. node moves away from AP)  
When BER becomes too high, AP switch to lower transmission rate to reduce BER.

### Power management

Node can send *"I am going to sleep until next beacon frame"* message to AP.  
AP will not transmit frames to this node. Frames destined to this node will be buffered.

Beacon frame contains list of mobiles with AP-to-mobile frames waiting to be sent.  
Node can stay awake only when frame destined to itself exists.

# Bluetooth

Famous personal area network! Only supports less than 10m.

- Master/Client device: Master polls clients, and grant requests for client transmissions.  
  Clients gets dedicated slots using TDM. (1 slot = 625 μs)
- Parked mode: Clients can go to sleep and later wakeup.
- FHSS (Frequency-hopping spread spectrum): Sender uses 79 frequency channels in known, with pseudo-random order. (FDM)  
  Other devices not in piconet will only interfere in some slots.
- Bootstrapping: Nodes detects master's hopping pattern and plug-and-play into piconet.
