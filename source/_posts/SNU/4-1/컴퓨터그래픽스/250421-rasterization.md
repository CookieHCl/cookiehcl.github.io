---
title: Rasterization
categories:
  - SNU
  - 4-1
  - 컴퓨터그래픽스
date: 2025-04-21 11:42:37
tags:
---

# Rasterization

We should determine which pixels should be turn on.

For each primitive, which pixels are light up?

Rasterization is extremely fast (billions of trangles per second on GPU!), but harder to achieve photorealism.

c.f. Ray tracing: For each pixel, which primitives are seen?  
Generally slower, but easier to get photorealism!

# Line rasterization

## Diamond rule

![Diamond rule](diamond_rule.png)

Modern GPUs light up pixel if line passes through diamond inside pixel.

## Incremental line rasterization

![Incremental line rasterization](incremental_line_rasterization.png)

Let's say a line is represented with integer endpoints: (u1,v1), (u2, v2).  

Consider an easy case: $u1 < u2, v1 < v2$ (line points toward upper-right) and $0 < \frac{v2 - v1}{u2 - u1} < 1$. (slope is low, i.e. more change in x than y)

```c
v = v1;
for (u = u1; u <= u2; ++u) {
    v += (v2 - v1) / (u2 - u1);
    draw(u, round(v));
}
```

There are 8 cases in total. You can handle them in a similar way!

### c.f. Bresenham's line algorithm

Bresenham's line algorithm is an efficient line rasterization in assembly level!  
Multiplication, division is avoided, and only integer addition, subtraction is used.

But modern GPUs are really fast!  
These days, we just use division, round, etc.

# Triangle rasterization

How do we handle width of line?  
How do we rasterize points, triangles, or other primitives?

Solution: Convert everything into triangles!

Modern GPUs doesn't have line algorithm, point algorithm, etc.  
Instead, rasterization pipeline convert all primitives to triangels.  
e.g. line is interpreted as very narrow rectangle.

## Why do we use triangle?

- If we could convert everything to triangles, we could focus on making an extremely well-optimized pipeline for drawing triangles!
- Triangles can approximate any shape.
- Triangles are always planar, and have well-defined normal.
- Triangles are easy to interpolate data at corners.  
  If barycentric coordinates is $(\lambda_0, \lambda_1, \lambda_2)$, we can interpolate data as $\lambda_0 f_0 + \lambda_1 f_1 + \lambda_2 f_2$, where $f_0, f_1, f_2$ are data at corners.

## Point-in-triangle Test

### Half-plane test

Checking if a point is inside a half-plane is easy.  
Create three half-planes from the edges of the triangle, and check if the point is contained in three half-planes.

### Barycentric coordinate test

Compute the barycentric coordinate of the point, then check if all coefficients are within [0, 1].

## Traditional approach: Incremental Traversal

![Incremental Traversal](incremental_traversal.png)

Go up if you can, then go as far right as you can.

Good memory coherence! (Neighbour memory access is faster)  
Clever incremental scheme can reuse line algorithms.

## Modern approach: Parallel coverage tests

Modern GPU has special-purpose hardware for point-in-triangle test.  
We just test all pixels in bounding box in parallel.

## Hybrid approach: Tiled triangle traversal

Problem: Testing every pixel can be wasteful if traingle is pointed.  
Solution: Check if block intersect the triangle!

If block doesn't intersect the triangle, skip this block.  
If block is contained inside the triangle, all pixels of the block are covered.  
Otherwise, use parallel coverage tests. (i.e. test every pixel of the block.)

# Antialiasing

Aliasing is an error induced by insufficient samples when compared to the frequency of its original signal.  
In rasterization, jaggies (계단현상) are induced by insufficient pixels.

Antialiasing adjusts color values by the coverage of the pixel.  
i.e. if triangle covers 10% of the pixel, then pixel should be 10% red.

Instead of calculating the exact coverage of the pixel, we can use supersampling.  
Choose samples (i.e. points) within a pixel, then calculate coverage of the samples.  
Samples can be taken as grid, (often called subpixels) but there are other ways to sample.
