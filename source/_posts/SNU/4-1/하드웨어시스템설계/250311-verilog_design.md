---
title: Verilog Design
categories:
  - SNU
  - 4-1
  - 하드웨어시스템설계
abbrlink: 39
date: 2025-03-11 09:01:00
tags:
---

# Google TPU

Google TPU Version 1.0 does 64,000 multiplication per cycle!  
It can multiply 256x256 matrix!

Two important things in parallel computing are making small unit and providing new data every cycle.  
How does Google TPU multiply 256x256 matrix?

## Systolic array

![Systolic Array](systolic_array.png)

Let's assume we'll multiply 3x3 matrix.  
Sytolic aray has 3x3 Multiply-Accumulate (MAC) units.  
MAC gets two input, multiply it, and add it to register (accumulate).  
Reset signal sets accumulator to 0.

The input will be received for 5 cycles from two directions!  
Each cycle, MAC does MAC, and pass inputs to corresponding direction.  
After 7 cycles, each MAC holds result!

# HDL-Based Design flow

1. Hardware Specification using C or Matlab
1. Behavioral/RTL Modeling (HDL)
1. Behavioral/RTL Modeling (HDL)
1. Synthesis
1. Gate-level Simulation
1. Place & Route (connecting wires)
1. Verify timing constraints (e.g. wire delays)
1. Bit-stream Generation
1. FPGA test
1. ASIC Design (Test passed, now make real hardware!)

# Verliog

## Values

Uses sized number e.g. 4'b11, 5'd3, etc.  
The size can be omitted for 32-bit numbers.

x value means conflicting drivers, i.e. connected to both supply voltage and ground.  
z value means floating state, i.e. not connected to both supply voltage and ground.  
Generally we use x for an unknown value.

## Data Types

### Wire

Represents connection. They don't hold values!

### Reg

Represents data storage.  
Behaves like memory - they hold values until assigned.  
Reg doesn't represents a physical register!

*integer* represents 32 bit signed reg.

### Time

Time is unsigned value that is at least 64 bits.  
Used for storing and manipulating simulation time.

### Vector

Size of wire or register.  
They can hold multiple bits!

### Array

Collection of single entities.  
`wire [7:0] x[3:0];` means 4 of 8 bit vectors.

## Operators

Arithmetic, Bitwise, etc.  
Some operators may not be synthesizable! (e.g. % (modulus), ** (exponent), <<<, >>> (arithmetic shift), =\==, !\== (case equality))

### Reduction operators

Carry out a bit-wise operation on vector and yield a 1-bit result.

e.g. &A, ^A, ~|A, etc.

### Equality operators

=\=, !\= yields x if any operand is x or z.  
=\==, !\== yields 1 if two operands exactly match. (including x or z!)

## Delay control

### Regular delay control

Defers the execution of the entire statement.  
Usually used for test bench. e.g. `#10 y = 1;`

### Intra-Assignment delay control

Defers the *assignment* to the left variable.  
In `y = #25 ~x;`, ~x is calculated at #0, and assignment happens at #25.

## Blocks

### initial block

All initial block run at #0 once.

### always block

Always block starts at #0, and executes continuously.  
We can trigger always block with signals.

```verilog
always @(posedge clock or negedge reset_n)
    if (!reset_n) q <= 1`b0;
    else          q <= d;
```

## Assignments

Blocking assignments (=) are executed in the program order.  
Non-Blocking assignment (<=) are executed concurrently.

## Parameterized Modules

Similar to generics!

```verilog
module hazard_static (x, y, z, f);
    parameter delay1 = 2, delay2 = 5;
    and #delay2 a1 (b, x, y);
    not #delay1 n1 (a, x);
    and #delay2 a2 (c, a, z);
    or #delay2 o2 (f, b, c);
endmodule 

defparam example1.delay1 = 4, example1.delay2 = 8;
hazard_static example1 (x, y, z, f);
hazard_static #(4, 8) example2 (x, y, z, f);
hazard_static #(.delay2(4), .delay1(6)) example3 (x, y, z, f);  
```

## loops

### while statement

```verilog
while (i <= 7) begin
    if (data[i] == 0) out = out + 1;
    i = i + 1; 
end
```

### for statement

```verilog
for (i = 0; i <= 7; i = i + 1)
    if (data[i] == 0) out = out + 1;
```

### repeat statement

Compiler repeats statement for fixed number of times.

```verilog
repeat(128) begin
    $display("Count = %d", count);
    count = count + 1;
end
```

### generate block

Compiler unrolls generate block to statements.

```verilog
genvar i;
generate for (i = 0; i < SIZE; i = i + 1) begin: bit
    assign bin[i] = ^gray[SIZE-1:i];
end endgenerate
```
