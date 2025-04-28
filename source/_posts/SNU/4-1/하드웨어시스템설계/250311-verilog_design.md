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

## TPUv4i

TPUv4i uses 32x32 systolic array with 4x4 dot product to multiply 128x128 matrix.  
Instead of sending numbers one at a time, we send 4 numbers at a time.  
4 MAC need 4 multiplication, 4 addition, and 4 registers.
4x4 dot product only need 4 multiplication, 3 addition, and 1 register!

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

## Module Modeling Styles

### Structural style

```verilog
nor g1 (b, x, y);
not g2 (a, x);
and g3 (c, a, z);
nor g4 (f, b, c);
```

### Dataflow style

```verilog
assign cgt = (a > b);
assign clt = (a < b);
assign ceq = (a == b);
```

### Behavioral or algorithmic style

```verilog
always @(*) begin
    case (select)
        2'b11: y = in3;
        2'b10: y = in2;
        2'b01: y = in1;
        2'b00: y = in0;
        default: y = N{1'b0};
    endcase
end

always @(*) begin
    // x bits are ignored in casex
    casex (in)
        4'b1xxx: y = 3;
        4'b01xx: y = 2;
        4'b001x: y = 1;
        4'b0001: y = 0;
        default: y = 2'bx;
    endcase
end
```

## Synthesizing conditional statements

Complete conditional statement will usually synthesized into a 2-to-1 multiplexer.

```verilog
always @(enable or data) 
    if (enable) y = data;
    else y = x;
```

### Latch inference

Incomplete conditional statement or assigning itself will be synthesized into latch.  
To avoid this, initialize variable before conditional statement or only use complete conditional statement.

```verilog
always @(select or data) 
    case (select)
        2'b00: y = data[select];
        2'b01: y = data[select];
        2'b10: y = data[select];
        // no default statement, latch inference
    endcase

always @(enable or data) 
    if (enable) y = data;
    // no else statement, latch inference

always @(enable or data) 
    if (enable) y = data;
    else y = y; // latch inference

always @(posedge clk) 
    if (enable) y <= data;
    else y <= y; // NOT latch inference, this redundant expression will be removed
```

### Filp-flop inference

Similarly, assignment to a register will be synthesized into flip-flop.

```verilog
always @(posedge clk) 
    y <= x // flip-flop inference
```

## Filp-flops

Filp-flops sample input only once in a clock period, while latches sample input when the clock is high.

```verilog
// D-type flip-flop
module DFF (clk, d, q);
input clk, d;
output reg q;
    always @(posedge clk) q <= d;
endmodule

// asynchronous reset D-type flip-flop
module DFF_async_reset (clk, reset_n, d, q);
input clk, reset_n, d;
output reg q;

always @(posedge clk or negedge reset_n)
    if (!reset_n) q <= 0;
    else          q <= d;
endmodule

// synchronous reset D-type flip-flop
module DFF_sync_reset (clk, reset_n, d, q);
input clk, reset_n, d;
output reg q;

always @(posedge clk)
    if (!reset_n) q <= 0;
    else          q <= d;
endmodule
```

## Memory elements

It's just n-bit D-Type flip-flops!

```verilog
module register (clk, load, reset_n, din, qout);
parameter N = 4;
input clk, load, reset_n;  
input [N-1:0] din;
output reg [N-1:0] qout;

always @(posedge clk or negedge reset_n)
   if (!reset_n) qout <= {N{1'b0}}; // async reset
   else if (load) qout <= din; // only load when signaled, so we don't have to provide the data every cycle
    // verilog inferences else quout <= qout; 
endmodule
```

Normally, we use register file with one-write and two-read ports.  
Most operation has 2 inputs and 1 output. (e.g. A + B = C)

```verilog
parameter M = 4;   // number of address bits
parameter N = 16;  // number of words, N = 2^M
parameter W = 8;   // number of bits in a word
input          clk, wr_enable;
input  [W-1:0] din;
output [W-1:0] douta, doutb;
input  [M-1:0] rd_addra, rd_addrb, wr_addr;
reg    [W-1:0] reg_file [N-1:0];

assign douta = reg_file[rd_addra];
assign doutb = reg_file[rd_addrb];
always @(posedge clk)
    if (wr_enable) reg_file[wr_addr] <= din;
```

Large register file is often implemented with SRAM (Synchronous Random Access Memory) circuit.

```verilog
parameter N = 16;  // number of words, N = 2^M
parameter A = 4;   // number of address bits
parameter W = 8;   // number of bits in a word
input      [A-1:0] addr;
input      [W-1:0] din;
input              cs, wr, clk;
output reg [W-1:0] dout;
reg        [W-1:0] ram[N-1:0];

always @(posedge clk)
    if (cs) begin // chip select signals
        if (wr) ram[addr] <= din;
        else dout <= ram[addr];
    end
```

## Shift registers

Normally used in multiplication and divison.  
We need load signal to load data in 1 cycle!

```verilog
module universal_shift_register (clk, reset_n, s1, s0, lsi, rsi, din, qout);
parameter N = 4;  // define the default size
input              clk, reset_n, s1, s0, lsi, rsi;
input      [N-1:0] din;
output reg [N-1:0] qout;

always @(posedge clk or negedge reset_n)
   if (!reset_n) qout <= {N{1'b0}};
   else case ({s1,s0})
        2'b00: ; // qout <= qout;           // No change
        2'b01: qout <= {rsi, qout[N-1:1]};  // Shift right
        2'b10: qout <= {qout[N-2:0], lsi};  // Shift left
        2'b11: qout <= din;                 // Parallel load
   endcase
endmodule
```

## Counters

Counters are implemented by using previous output as a clock!

```verilog
// an N-bit ripple counter using generate blocks
parameter N = 4; // define the size of counter
input              clk, enable, reset_n;
output reg [N-1:0] qout;
genvar             i;

generate for (i = 0; i < N; i = i + 1) begin: ripple_counter
    if (i == 0) // specify LSB
        always @(negedge clk or negedge reset_n)
            if (!reset_n)    qout[0] <= 1'b0;
            else if (enable) qout[0] <= ~qout[0];
    else // specify the rest bits
        always @(negedge qout[i-1] or negedge reset_n) 
            if (!reset_n)    qout[i] <= 1'b0;
            else if (enable) qout[i] <= ~qout[i];
end endgenerate
```

Of course, we can just let verilog to make it.

```verilog
module updn_bincounter (clk, reset, eup, edn, qout, cout, bout);
parameter          N = 4;
input              clk, reset, eup, edn;
output reg [N-1:0] qout;
output             cout, bout;

always @(posedge clk)
   if (reset)    qout <= {N{1'b0}};  // synchronous reset
   else if (eup) qout <= qout + 1;   // up counter
   else if (edn) qout <= qout - 1;   // down counter
assign #1 cout = (&qout) & eup;      // generate carry out
assign #1 bout = (~|qout) & edn;     // generate borrow out
```

## Finite-State Machines (FSMs)

$$M = (I, O, S, d, l)$$

- $I, O, S$ are finite, nonempty sets of inputs, outputs, and states.  
- $d: I \times S \rightarrow S$ is a state transition function.
- $l$ is a output function.
  - Mealy machine: $l: I \times S \rightarrow O$
  - Moore machine: $l: S \rightarrow O$

### FSM Modeling Style

1. Initialize and update the state register

    ```verilog
    always @(posedge clk or negedge reset_n)
        if (!reset_n) present_state <= A;
        else          present_state <= next_state;
    ```

1. Determine next state

    ```verilog
    always @(present_state or x) 
        case (present_state)
            A: if (x) next_state <= B; else next_state <= C;
    ```

1. Determine output and internal registers

    ```verilog
    always @(present_state) // Moore machine
    always @(present_state or x) // Mealey machine
        case (present_state)
            A: out = 0;
            B: out = 1;
    ```

### Logic Optimization

Optimization has two goals - combinational circuit optimization and state minimization.  
Combinational circuit optimization reduces logic, and state minimization reduces flip-flops.

#### Combinational circuit optimization: Two-level simplification

- Implicant: elements of ON-set or DC-set that can be combined to form a subcube
- Prime implicant (PI): implicant that can't be combined with another to form a larger subcube
- Essential prime implicant (EPI): PI that participates in all possible covers of the ON-set, i.e. PI that covers an element of ON-set uniquely.

Goal: Cover the ON-set with as few prime implicants as possible!  
Quine-McCluskey Method (Q-M Method) is an exact algorithm that reduces a minterm expression to a minimal form.

1. Find all PIs.
    1. Assume don't cares as ON-set.
    1. Find two product terms that has exactly one-bit difference and combine them.
    1. Mark product terms that were combined to reduce.
    1. Repeat until no more combinations are possible.
    1. Remaining unmarked product terms are PIs.
1. Select a minimal set of PIs using a prime implicant chart (PI chart).
    1. Create a PI chart.
        1. List all PIs in the rows.
        1. List all ON-set minterms in the columns. (Ignore don't cares)
        1. Mark minterms that are coverd by each PI.
    1. Select all EPIs (PI that covers a minterm uniquely).
    1. Select a minimum number of additional non-EPIs that covers remaining ON-set.

#### Sequential circuit optimization: State minimization

- Equivalent States: States with same output and same transition behavior.  
  For all input combinations, states transition to same or equivalent states.

Goal: identify and combine equivalent states!  
Row Matching Method is a polynomial time procedure that minimize states.

1. Place all states.
1. Initially partition set based on output behavior. (Ignore transition behavior.)
1. Partition each set based on transition behavior. (Ignore output behavior.)  
  If states transition to same set, it has same transition behavior.
1. Repeat partitioning with transition until no further partitioning is required.
