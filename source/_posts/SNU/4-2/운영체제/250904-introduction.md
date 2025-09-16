---
title: Introduction
categories:
  - SNU
  - 4-2
  - 운영체제
abbrlink: 100
date: 2025-09-04 09:33:36
tags:
---

# Why OS?

To protect and to serve (from NYPD)

Operating System (kernel) is a software that converts hardware into a useful form for applications.  
Middleware, Software Development Environment (compilers, loaders, editors, libraries, ...) are not OS!

# History of OS

## 1G (1945 ~ 1955)

Vacuum tubes and plugboards

No programming/assembly languages!  
Obviously no OS (coded with 0 or 1)

## 2G (1955 ~ 1965)

Transistors and mainframes

Batch systems - Submit program and run it (e.g. using cards) Can run only one job at a time

OS is always resident in memory and merely transfers a control (just a library).

Problem) CPU is underutilized due to the bottleneck in I/O (e.g. Card readers, tape drivers, line printers)

## 3G (1965 ~ 1980)

IC (Integrated Circuits), disk drives

Multiprogrammed systems - Program as jobs, CPU utilization increased!

Now looks like a real OS:

- Job scheduling
- Memory management
- CPU scheduling
- Concurrency
- Protection
- Spooling

Even better: Time sharing systems - Program as process, response time improved!

More OS features:

- Sophisticated CPU scheduling
- Virtual memory and swapping
- File system
- Synchronization
- IPC (Interprocess communication)
- Interactive shell
- More protection

## 4G (1980 ~)

Microprocessors (LSIs, VLSIs)

Era of personal computers!

Modern OS features:

- GUI (Graphical User Interface)
- Multimedia
- Internet & Web (Network stack)
- Mobile / Networked / Distributed
- Threads
- Virtualization

## Multics

Multiplexed Information and Computing Service

First time-shared, multi-processor OS!  
Very influential; Nearly every feature was made from Multics!

They claimed they would create an OS that combined all existing technology at the time, but it failed... (c.f. second-system effect)

- Hierarchical file system
  - ACL (Access Control List)
  - Hard / symbolic links
- Virtual memory (segmentation and paging)
- User-level command shell
- Dynamic linking, shared memory
- Implemented in high-level language (PL/I)
- Logical disk volumes
- Supports every programming languages at that time (e.g. Fortran, Lisp, C, Cobol, ...)

## Unix

Bell labs was tired of slow development of Multics, so they quit and made Unix.

Motivation) Putting everything is impossible, only implement necessary features!

- Hierarchical file system
  - Special files: Everything is file (e.g. I/O, drivers, ...), we can use uniform I/O, naming, and protection
  - Removable file systems via mount/umount
  - i-node (metadata)
- Process control
  - e.g. fork, exec, wait, exit
  - Pipes for IPC
- Shells
  - Standard I/O and I/O redirection
  - Filters, shell scripts
- Signals

# OS

- Virtualization: How to make each application believe it has each resource to itself?
- Concurrency: How to handle concurrent events correctly and efficiently?
- Persistence: How to make information survive power loss?

## Application view

OS provides an abstract view of the underlying computer system.

Abstractions:

- CPU cores -> processes, threads
- Physical memory -> Virtual memory
- Storage -> Volumes, directories, files
- I/O devices -> Files

## System view

OS manages various resources of a computer system.

Manages resources:

- CPU
- Memory
- I/O devices
- Queues
- Energy

by:

- Sharing (time, space, ...)
- Protection
- Fairness
- Efficiency

## Implementation view

OS is highly-concurrent, event-driven software.

Two kinds of events:

- System calls (by software)
- Interrupts (by hardware)
