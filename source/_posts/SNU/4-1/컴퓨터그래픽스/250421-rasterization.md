---
title: Rasterization
categories:
  - SNU
  - 4-1
  - 컴퓨터그래픽스
abbrlink: 68
date: 2025-04-21 11:42:37
tags:
---

# Rasterization

We should determine which pixels should be turn on.

For each primitive, which pixels are light up?

Rasterization is extremely fast (billions of trangles per second on GPU!), but harder to achieve photorealism.

c.f. Ray tracing: For each pixel, which primitives are seen?  
Generally slower, but easier to get photorealism!

## Line rasterization

### Diamond rule

![Diamond rule](diamond_rule.png)

Modern GPUs light up pixel if line passes through diamond inside pixel.

### Incremental line rasterization

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

#### c.f. Bresenham's line algorithm

Bresenham's line algorithm is an efficient line rasterization in assembly level!  
Multiplication, division is avoided, and only integer addition, subtraction is used.

But modern GPUs are really fast!  
These days, we just use division, round, etc.

## Triangle rasterization

How do we handle width of line?  
How do we rasterize points, triangles, or other primitives?

Solution: Convert everything into triangles!

Modern GPUs doesn't have line algorithm, point algorithm, etc.  
Instead, rasterization pipeline convert all primitives to triangels.  
e.g. line is interpreted as very narrow rectangle.

### Why do we use triangle?

- If we could convert everything to triangles, we could focus on making an extremely well-optimized pipeline for drawing triangles!
- Triangles can approximate any shape.
- Triangles are always planar, and have well-defined normal.
- Triangles are easy to interpolate data at corners.  
  If barycentric coordinates is $(\lambda_0, \lambda_1, \lambda_2)$, we can interpolate data as $\lambda_0 f_0 + \lambda_1 f_1 + \lambda_2 f_2$, where $f_0, f_1, f_2$ are data at corners.

### Point-in-triangle Test

#### Half-plane test

Checking if a point is inside a half-plane is easy.  
Create three half-planes from the edges of the triangle, and check if the point is contained in three half-planes.

#### Barycentric coordinate test

Compute the barycentric coordinate of the point, then check if all coefficients are within [0, 1].

### Traditional approach: Incremental Traversal

![Incremental Traversal](incremental_traversal.png)

Go up if you can, then go as far right as you can.

Good memory coherence! (Neighbour memory access is faster)  
Clever incremental scheme can reuse line algorithms.

### Modern approach: Parallel coverage tests

Modern GPU has special-purpose hardware for point-in-triangle test.  
We just test all pixels in bounding box in parallel.

### Hybrid approach: Tiled triangle traversal

Problem: Testing every pixel can be wasteful if traingle is pointed.  
Solution: Check if block intersect the triangle!

If block doesn't intersect the triangle, skip this block.  
If block is contained inside the triangle, all pixels of the block are covered.  
Otherwise, use parallel coverage tests. (i.e. test every pixel of the block.)

## Antialiasing

Aliasing is an error induced by insufficient samples when compared to the frequency of its original signal.  
In rasterization, jaggies (계단현상) are induced by insufficient pixels.

Antialiasing adjusts color values by the coverage of the pixel.  
i.e. if triangle covers 10% of the pixel, then pixel should be 10% red.

New problem: How do we rasterize alpha channel?

### Supersampling

Instead of calculating the exact coverage of the pixel, we can use supersampling.  
Choose samples (i.e. points) within a pixel, then calculate coverage of the samples.

![Supersampling](supersampling.png)

Samples can be taken as grid, (often called subpixels) but there are other ways to sample.  
Whichever method you use, more sample gives a better result.

## Clipping

![Clipping](clipping.png)

Clipping eliminates triangles not visible to the camera. (i.e. not in the view frustum)  
Cut triangles outside the view frustum, and then divide partially clipped primitives into triangles.

There are lots of clipping algorithms...

- Line clipping
  - Cohen-Sutherland algorithm
  - Cyrus-Beck algorithm
- Polygon clipping
  - Sutherland-Hodgman algorithm
  - Weiler-Atherton algorithm

## Culling (Back-Face Removal)

Idea: Remove faces that do not point toward the camera. (i.e. view plane)

Very simple! Compute inner product of traingle's normal vector and camera's look-at direction.  
If inner product is non-positive, this face is not visible.

However, culling works correctly only when objects are closed and convex.

## Depth Buffer (Z-Buffer)

Painter's algorithm: Sort objects by depth (distance from eye), then draw objects from the farthest to the closest.  
Problem: Visibility is not total order... (only partial order)

Solution: Depth Buffer!  
For each pixel, depth buffer stores the depth of the closest primitive seen so far. (If primitive is not seen, far plane's depth is stored)  
If primitive's depth is closer than depth buffer, update depth buffer and color of pixel.

Lots of advantages!

- Order of drawing objects doesn't matter
- Can handle intersections
- Constant additional space per frame
- Not specific to triangles

But it was ignored at 1960s because people thought that allocating memory per pixel is impossible...

c.f. double buffering: GPU stores current frame and next frame at the same time, then switch two frames to show smooth animation.  
We're actually using 2 depth buffers for each pixel!

# Opacity as Alpha channel

An alpha is a value between 0 and 1 that describes the opacity of an object.

## Over Operator

**B over A** composite image B with opacity $\alpha_B$ over image A with opacity $\alpha_A$.

- Composite color $C = \alpha_B \cdot B + (1-\alpha_B) \cdot \alpha_A \cdot A$
- Composite alpha $\alpha_C = \alpha_B + (1-\alpha_B) \cdot \alpha_A$

Unfortunately, over operator is not commutative, so order of drawing is important even when using depth-buffer.

## Fringing

![Fringing](fringing.png)

Poor treatment of color/alpha during composition can yield fringing.  
Background color of the original image appears at a transparent boundary.

### Fringing in upsampling

![Fringing in upsampling](fringing_upsampling.png)

If alpha and color are upsampled, antialiasing makes blurred boundary, thus causing fringing.

### Fringing in downsampling

![Fringing in downsampling](fringing_downsampling.png)

If alpha and color are downsampled, boundary color and alpha are mixed, thus causing fringing.

### Fringing in repeated over operator

Over operator is not a closed operation!  
Repeated over operator changes original color.

e.g. composite (1, 0, 0, 0.5) over (1, 0, 0, 0.5) is (0.75, 0, 0, 0.75).  
Color is darker than before!

## Over operator with premultiplied alpha

Modern GPU uses permultiplied alpha to solve fringing.  
Before compositing image B $(r_B, g_B, b_B, \alpha_B)$ over image A $(r_A, g_A, b_A, \alpha_A)$, we multiply alpha to color.

$$\begin{align*}
A' &= (\alpha_A r_A, \alpha_A g_A, \alpha_A b_A, \alpha_A) \\
B' &= (\alpha_B r_B, \alpha_B g_B, \alpha_B b_B, \alpha_B) \\
C' &= (r_C, g_C, b_C, \alpha_C) \coloneqq B' + (1-\alpha_B)A' \\
C &\coloneqq \left( \frac{r_C}{\alpha_C}, \frac{g_C}{\alpha_C}, \frac{b_C}{\alpha_C}, \alpha_C \right)
\end{align*}$$

We premultiply alpha, composite images, then divide alpha to get back color.

Advantages:

- Premultiply removes background color -> Significantly less fringing!
- Similar with homogeneous coordinates in pinhole camera model -> Works well with existing GPU hardwares!
- Closed under composition
- Fewer arithmetic operations needed

## Accumulation Buffer (A-Buffer)

Still, over operator depends on the order of the drawing objects.  
Solution: Store more information than depth buffer!

For each pixel, accumulation buffer stores the information of the 10 closest primitives, including depth, RGBA color, percent of area coverage, etc.  
If new object is in the 10 closest primitives, recalculate color from that depth.  
We ignore primitives after the 11th, assuming they are invisible or meaningless.

Very memory intensive and expensive, and it's not widely used.  
But it's essential for high quality rendering.

c.f. We can check if an A-Buffer exists by checking if the rendering changes depending on the order of drawing primitives.

Previously it was implemented with linked list, but nowdays it's implemented with arrays.  
OpenGL lets you to reconfigure framebuffer, so we can define A-Buffer, texture memory usage, etc.
