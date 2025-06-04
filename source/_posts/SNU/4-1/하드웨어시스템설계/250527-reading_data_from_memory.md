---
title: Reading Data from Memory
categories:
  - SNU
  - 4-1
  - 하드웨어시스템설계
date: 2025-05-27 10:05:45
tags:
---

# Memory Address Space

![Memory Address Space](memory_address_space.png)

User process uses virtual address space, while hardware such as memory uses physical address space.

Device has its own MMU (memory management unit) for virtual to physical address translation.

## Virtual address space

Because of memory fragmentation, large contiguous memory resource in physical address is hard to find.

Page table is used to keep virtual to physical address mapping information.  
It stores virtual page number, access rights, and its corresponding physical page number.  
The offset (usually 12 bits, page size is 4KB) remains the same for both the virtual and physical addresses.

To reduce size of page table, we often use hierarchical page table.  
e.g. 10-bit L1 index, 10-bit L2 index, 12-bit offset

## Translation Look-aside Buffers (TLB)

Address translation is very expensive!  
Hierarchical page table makes it worse, 2-level page table need 3 memory accesses for each physical memory access.
c.f.) This happens whenever we access hardware components!!

We cache translations in TLB. If TLB hits, only single memory access is needed!  
Usually we have seperate TLB for instruction and data.

But if TLB misses, we still need multiple memory accesses.  
We use MMU cache to store intermediate page table's cache.

## IOMMU

Each hardware devices (including CPU) has its own virtual address space and page table.

More than 15 years ago, each hardware device used a contiguous region of physical address directly.  
However, this wastes main memory resources if not all hardware devices are being used.  
Moreover, devices such as smartphones have so many hardware devices that we run out of main memory.

IOMMU provides demand paging, which enables better utilization of memory resource and offers more memory resource for user applications.

To reduce cost of page table and TLB miss, we share page table with CPU, and we use L2 TLB (shared by devices and CPU) as well as L1 TLB (local to device).

# Interconnect

## AXI (Advanced Extensable Interface) Protocol

- Write address channel (AW, input)
- Write data channel (W, input)
- Write response channel (B, output)
- Read address channel (AR, input)
- Read data channel (R, output)

Each channel have valid & ready signals. (handshake signals)

AXI can send 128 bit at once, but only use 32 bit as a data.  
Other bits are used for signals, e.g. handshake signals, burst length/size/type, protection type, write strobes, ...

## Burst transfer

Write address channel have signals that determines burst transfer.  
Burst transfer can send data over multiple cycles, while sending address information for only 1 cycle.

- AWADDR[31:0] Write addr ID
- AWLEN[3:0] Burst length
- AWSIZE[2:0] Burst size (Actually data is called beat, so this should be called beat size?)
- AWBURST[1:0] Burst type

We also have read version of burst transfer! (e.g. ARADDR, ARLEN, ...)

![Wide transfer](wide_transfer.png)

Wide transfer: Burst data's size is same as word size.

![Narrow transfer](narrow_transfer.png)

Narrow transfer: Burst data's size is smaller than word size.  
In narrow transfer, we can determine where data exists (e.g. whether it starts from MSB) by looking at address.

Of course, sending multiple data at once can save clock cycle.  
However, due to hardware limitations, data might not be available at once.

### Type of burst transfer

- INCR: Normal behavior, incrementing-address burst.
- FIXED: Fixed-address burst, for FIFOs.
- WRAP: Incrementing-address burst, but wraps to a lower address at the wrap boundary

### Multiple Outstanding Requests

![Multiple Outstanding Requests](multiple_outstanding_requests.png)

Because we merged multiple data requests into single burst transfer request, address channel have free cycles.

If we can use this free cycles and send another burst transfer request during burst transfer, we can reduce average memory latency.

If we can access multiple memory banks at once, and send multiple data at once, we can achieve parallelism!

e.g. Non-blocking caches!  
If cache can hit under multiple miss (cache can send hit data when fetching miss data), or miss under miss (cache can fetch multiple miss data in parallel), we can reduce effective miss penalty!

## Handshake signal

### Stop-and wait method

Traditional stop-and-wait method use request and acknowledge.

1. Sender sends request + data at clock 0.
1. Receiver receives, and set acknowledge at clock 1.
1. Now sender can send next request + data at clock 2.

Problem: Sender can't send data at each cycle!

### Single Credit-based Flow Control

Instead of acknowledge signal, receiver uses ready signal (credit).  
Receiver set ready signal if receiver have free space.

Sender can send next request + data if ready signal was set at the previous clock.  
We can send data at each cycle! 100% utilization can be achieved.

Data is transfered when valid (request signal) and ready signal are both set at the rising edge of the clock.

## Implementation of Interconnect

![Implementation of Interconnect](interconnect_implementaion.png)

Interconnect can be implemented with decoders and arbiters.  
Decoder send data to the desired output, and arbiter receive data from the desired input.

In practice, not all decoders and arbiters are connected.

### Arbitration scheme

What should we do when arbiter receive multiple inputs at once?

- Fixed priority: Easy, but starvation occurs at worst case
- Round robin: Cycle priority! Looks fine, but depending on the request pattern, this is actually not fair
- LRG (least recently granted): (We use hybrid method, so each group's priority is fixed.) If a master was granted access, that master will have the lowest priority in the group at the next cycle.

# DRAM

![DRAM](dram.png)

Data is stored in 2D array of memory cell.  
Row address decoder selects target row, then read the entire word.  
Column decoder selects bit line, then read/write specific bits.

Single DRAM consists multiple data bank, and each bank consists multiple 2D array of memory cell.  
To achieve parallelism, memory requests should be served by multiple banks, or by the same row.

## DRAM cell

![DRAM cell](dram_cell.png)

Each cell can be viewed as half full capacitor, switch, and capacitor that stores data (fully charged if data is 1, empty if data is 0).

1. Charge Sharing: Both capacitor shares charge.
1. Sensing & Amplification: Sense amplifier amplifies difference to make both capacitor full/empty.
1. Precharging: Switch is turn off, and capacitor is restored to the half full state.

We can read before amplification is fully finished!  
In fact, after row access, column access happens when we can read data from DRAM.

## DRAM Timing

- $t_{RC}$: Minimum time from the start of one row access to the start of the next row access. $t_{RC} = t_{RAS} + t_{RP}$
- $t_{RCD}$: Minimum time from row activation to column activation. (i.e. minimum time when data is available to read)
- $t_{CL}$: Column activation latency.
- $t_{RAS}$: Activation latency.
- $t_{RP}$: Precharge latency.

Usually DRAM timing is written as CL - $t_{RP}$ - $t_{RCD}$.  
e.g. 3-3-3 means 3 cycles for each of activation, read/write, and precharge.

## DRAM pin

Input/output pin is called DQ pin.  
It acts like a global bus, and multiple banks are connected to DQ.  
However, this means we cannot read multiple banks at once.

Currently DRAM reads data from memory banks in serial manner.  
~~Make it parallel and get the Turing Award!~~

DDR, DDR2, DDR3 means the clock cycle of the bus (DQ).  
DDR2 has 400MHz clock, DDR3 has 800MHz clock.  
This is easily achieved by reading more data at once, then send it using higher frequency clock.  
However, reducing internal latency is very hard because internal latency is proportional to the memory area.

## Reading a single tile from DRAM

Recall) We were doing matrix multiplication!  
How do we read 4x4 tile matrix?

![Bank interleaving](bank_interleaving.png)

Sending four read requests sequentially will give long latency of tile read.  
Instead of storing matrix in one bank, if we can store four rows in different banks, (bank interleaving) we can achieve higher memory utilization!

### Address mapping

How can we remap the original address for bank interleaving?

Conventionally, physical address is mapped as `<bank, row, column>`.  
However, if we remap as `<row, bank, column>`, we can naturally get bank interleaving!  
This is called RBC mapping.

### Spatial Locality

The best memory pattern is to store tile matrix in a single row of the bank.  
We only need a single activation stage!

This is usually done by modifing source code, compiler will do the rest!  
Hot and highly correlated arrays are allocated to the near memory addresses, i.e. on the same DRAM row.
