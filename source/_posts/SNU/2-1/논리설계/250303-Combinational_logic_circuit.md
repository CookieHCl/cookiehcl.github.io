---
title: Combinational logic circuit
categories:
  - SNU
  - 2-1
  - 논리설계
date: 2025-03-03 02:23:12
tags:
---

# Random logic

Previously, logic gates (made with transistors) were hardwired to chips.  
However, we need to make design faster, and make engineering changes easier.

Solution: Regular logic!  
Regular logic refers to a flexible component that performs a specific high-level function.

# MUX (Multiplexer/Selector)

$$Z = A'B'I_0 + A'BI_1 + AB'I_2 + ABI_3$$

MUX takes $2^n$ data inputs and $n$ control inputs (called *selects*), and outputs 1 output.  
Control inputs are used to select 1 output from data inputs!

Large MUX can be made by combining smaller MUXs!  
e.g. 8:1 MUX can be implemented with one of following:

- two 4:1 MUXs into one 2:1 MUX
- four 2:1 MUXs into one 4:1 MUX

## MUX as general-purpose logic

Think differently: $2^n$ inputs are control inputs and $n$ inputs are data inputs.  
You can implement any function of $n$ variables with MUX!

$$F = A'B'C'I_0 + A'B'CI_1 + \cdots + ABCI_7$$

This is just sum of minterms!!!  
By setting $I_i$ to 0 or 1, you can choose which minterm to add!

We can go further! For given set of input $A$ and $B$, $F$ is one of the following: $0, 1, C, C'$  
Instead of setting $I_i$ to 0 or 1, you can set $I_i$ to $0, 1, C, C'$!  
A $2^{n-1}:1$ MUX can implement any function of $n$ variables!

# DEMUX (Demultiplexer/Decoder)

$$\begin{align*}
O_0 &= G \cdot S_1' \cdot S_0' \\
O_1 &= G \cdot S_1' \cdot S_0 \\
O_2 &= G \cdot S_1 \cdot S_0' \\
O_3 &= G \cdot S_1 \cdot S_0
\end{align*}$$

DEMUX takes 1 data inputs and $n$ control inputs, and outputs $2^n$ output.  
Control inputs are used to choose which input has to be connected to output!

Large DEMUX can be made by combining smaller DEMUXs!  
ex) 5:32 DEMUX can be implemented with one 2:4 DEMUX into four 3:8 DEMUXs

## DEMUX as general-purpose logic

Each output represents minterm!  
By setting input to 1 and ORing relevant minterms, $n:2^n$ DEMUX can implement any function of $n$ variables!

# Programmable logic array (PLA)

![PLA](/images/SNU/2-1/논리설계/PLA.svg)

PLA is a general implementation of sum of products of a logic function. (not necessarily minterms)

Inputs > AND array > OR array > outputs  
In reality, all AND and OR gates are NANDs.

Before programming, all connections are available.  
Unwanted connections are blown after programming.

- fuse: normally connected, break unwanted ones
- anti-fuse: normally disconnected, make wanted connections

## Programmable array logic (PAL)

Similar to PLA, but OR array has access to only a subset of the product terms.  
Less programmable, but OR plane becomes faster and smaller!

e.g. PAL can have exactly 4 product terms per each OR gate.  
If less than 4 product terms is used, you can set 0(FALSE) for unused product term.
To make 0, just leave the fuse as is. i.e. AND every inputs.

# Read-only memory (ROM)

Actually similar to PLA! Instead of AND plane, ROM uses $n:2^n$ decoder.  
$n$ inputs are address, and selected word goes to output!

# Comparing ROM, PLA, PAL

## ROMs

- Used when design time is short (no need to minimize output functions)
- Used when most input combinations are needed
- Cheap (high-volume component - ROMs are produced in  millions of units)
- Medium speed
- Can't exploit don't cares
- Size doubles for each additional input

## PAL

- Intermediate cost
- High speed (Only one programmable plane that is much smaller than ROM's decoder)
- Functions are limited by number of terms

## PLA

- Used when design tools are available for multi-output minimization
- Used when many minterms are shared
- Most expensive
- Slow speed (Two programmable planes)
- Can implement any function
