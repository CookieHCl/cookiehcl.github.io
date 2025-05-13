---
title: Texture
categories:
  - SNU
  - 4-1
  - 컴퓨터그래픽스
abbrlink: 75
date: 2025-05-08 11:03:04
tags:
---

# Spatial Variation

All materials seen so far are the same everywhere.  
i.e. BRDF was independent of location on surface.

We will allow BRDF to vary over a surface!

c.f. Why don't we divide the surface into lots of triangles with same BRDF?  
This will make the mesh too complex.  
We want to distinguish geometric complexity and material complexity.

# Texture Mapping

Idea: use a mapping from a geometry to an image.

$$f: (x,y,z) \rightarrow (u,v)$$

Mapping is very general!

- An object can have multiple images
- Many object can share a single image
- The same image can be used repeatedly

## Texture Coordinates (UV Coordinates)

Each vertex stores 2D (u,v) texture coordinates.  
The values inside of triangles are interpolated by barycentric coordinates.

## Texture Interpolation

Unfortunately, the interpolated UV coordinate is very likely to be positioned between pixels. (i.e. not integer)

- Closest: Grab value of the nearest texture pixel (texel).
- Bilinear: Apply linear interpolation repeatedly.

![Bilinear filtering](bilinear.png)

$$\begin{align*}
s &= u-i \\
t &= v-j \\
C_{U,V} &= \begin{bmatrix}
1-t & t
\end{bmatrix}\begin{bmatrix}
C_{i,j} & C_{i+1,j} \\
C_{i,j+1} & C_{i+1, j+1}
\end{bmatrix}\begin{bmatrix}
1-s \\
s
\end{bmatrix}
\end{align*}$$

## Aliasing problem in texture

Triangles are projected to 2D screen space.  
Pixels in screen space will correspond to regions of varying size & location in texture space.

We have a aliasing problem: sampling rate is too low.

### Magnification

Screen image size is way larger than texture size.  
e.g. camera is very close to scene object.

If closest filtering is used, hard boundaries can be visible.  
Interpolation should applied to avoid it.

### Minification

Screen image size is way smaller than texture size.  
e.g. camera is very far away from scene object.

Lets assume the triangle only takes up 1 pixel on the screen.
In our texture sampling algorithm, center of the texture space will be sampled instead of average color of the triangle.  
This will incur aliasing!

# Mipmap (Texture pre-filtering)

Recall) Nyquist-Shannon Theorem: If signal has no frequencies above some threshold $\omega$, the signal can be perfectly reconstructed if sampled with period $T = \frac{1}{2\omega}$.  
Pre-filtering: If we remove signals that have a frequency higher than $\omega$, we can perfectly reconstruct signal!

In image, downsampling removes high frequency.

Idea: store prefiltered (downsampled) images at every possible scale, then choose an appropriate image on the fly.

e.g. Mipmap level 0 is 128x128 (original texture),  
Mipmap level 1 is 64x64,  
Mipmap level 2 is 32x32, ...

## Computing mipmap level

$$\begin{align*}
L_x^2 &= \left( \frac{du}{dx} \right)^2 + \left( \frac{dv}{dx} \right)^2 \\
L_y^2 &= \left( \frac{du}{dy} \right)^2 + \left( \frac{dv}{dy} \right)^2 \\
d &= \log_2 \sqrt{\max\left( L_x^2, L_y^2 \right)}
\end{align*}$$

where d is mipmap level, and $L_x, L_y$ is the differences in texture space at neighboring pixels in screen space.

Since mipmap size is halved each time, we use log scale.

## Continuous mipmap level

If we just use the nearest level, we can get artifacts where level jumps.  
Instead of clamping the mipmap level to the closest integer, we can use continuous mipmap level.

![Trilinear filtering](trilinear.png)

We need a trilinear filtering between two mipmaps.  
We perform bilinear interpolation independently in each level, then interpolate these two values.

Bilinear interpolation need four texel reads and 3 linear interpolations. (3 multiplication + 6 addition)  
Trilinear interpolation need eight texel reads and 7 linear interpolations. (7 multiplication + 14 addition)

## Anisotropic Filtering

![Anisotropic Filtering](anisotropic.png)

Perspective projection stretches the sample by different amounts along u and v (especially at grazing angle).

Solution: Use more mipmap with different ratios!  
Unfortunately, it requires even more arithmetic and bandwidth than trilinear filtering.

# Specifying the mapping function

How do we map to the texture coordinate?

Some objects have natural parameterizations; e.g. sphere, cylinder.  
We can use parametric surface as a texture surface.

If object is star shaped, we use the point where the rays from the center of the object meet with the outer sphere.  
Then, outer sphere is mapped with parameterization.

Texture mapping can also be created by flattening surfaces.  
The goal is to minimize distortion; i.e. polygon size shouldn't change a lot.

# Textures other than colors

Recall) Phong Illumination Model $I_{out} = k_aI_a + \frac{I_{light}}{d^2} [k_d \max(N \cdot L, 0) + k_s (R \cdot V)^n]$

Instead of storing just color $k_d$, we can store other material properties, such as $k_a, k_s, n$.

## Bump mapping

![Bump mapping](bump_mapping.png)

How do we make bumpy surface?

1. Real bump: Model the surface with many small polygons.
1. Fake bump: Replace normal vectors before the shading calculation.

We use bump map to store the amount of perturbation in the normal direction, (i.e. height variation) then compute normal vectors on the fly based on perturbed geometry.  
Underlying object is still smooth, but shading looks like bumpy!

## Normal mapping

Can't we just save a normal vector?  
Surface normals are directy saved in RGB channel of texture "image".

## Displacement mapping

Bump/Normal mapping doesn't change the actual geometry, so the deception can easily be broken.  
e.g. boundary line, shadow is too smooth

Instead, we can just store actual displacement from underlying geometry into a texture.  
We just move pixel directly, so rendering is accurate.

Problem: If geometry resolution is too low, aliasing happens.

## Environment mapping

Goal: How do we render reflection (without ray tracing)?

We compute the reflect vector (using the normal vector and camera view vector). Then, we use the 3D environment texture to determine which color should be shown based on the reflect vector.

# Procedural Textures

We only need a texture mapping $f: (x,y,z) \rightarrow \text{color}$.  
Do we really need to store into a image?

Idea: Directly store texture mapping as a function!

Pros: Easy to implement, more compact than texture maps, have infinite resolution (i.e. textures are not affected by image resolution)  
Cons: Unintuitive, difficult to match existing texture

## Perlin Noise

A pseudo random function with smoothness $f: R^n \rightarrow R$.  
Hollywood movies used perlin noise a lot! Perlin was awarded an Oscar (Academy Award for Technical Achievement) for his work.

Idea: Generate random values at grid point, then interpolate smoothly between these values.  
In 2D, interpolating random value is hard. Instead, we assign a random gradient and compute noise levels by interpolating them.

### Perlin noise texture

Instead of using one noise, we can use a mixture of noise with different scales. (i.e. frequency) A scale is also called an **octave**.

- $\sum_f \frac{1}{f^k} \operatorname{PNoise}(f,x,y)$ looks like cloud
- $\sin \left( ax + by + \sum_f \frac{1}{f^k} \left| \operatorname{PNoise}(f,x,y) \right| \right)$ looks like marble
- $\sin \left( a \left| x^2 + y^2 \right| + \sum_f \frac{1}{f^k} \left| \operatorname{PNoise}(f,x,y) \right| \right)$ looks like wood

Why? Nobody knows... These are just experimental values.

## Reaction-Diffusion

Make texture with diffsuion!  
e.g. Only prepare texture of head and foot of zebra, then use diffusion to fill rest of texture.

## Texture Synthesis

Use 2D reference texture and 2D target texture to change 3D reference texture to 3D target texture.  
We find point on the 2D reference texture, then use corresponding point on the 2D target texture.

# Shadows

## Planar Projection Shadows

Project object to the ground plane, and just draw black object at ground plane.

Problem: If surface is not flat, computing projection is hard.

## Shadow map

Render twice!

1. Render from the light source to compute Z-buffer.
1. Render from the eye to compute Z-buffer.
1. If depth from light and eye is differnet, this point should be rendered as shadow.

Can handle moving objects and lights, and multiple light sources.

## Shadow volume

![Shadow volume](shadow_volume.png)

Compute intersection of shadow volume with view frustum.

1. Compute shadow volume: Invisible area behind polygon from point light source.
1. Use stencil buffer to determine whether we are inside or outside of the intersection.
  1. +1 if we pass the front face of the intersection.
  1. -1 if we pass the back face of the intersection.
  1. If stencil buffer is higher than 0, render as a shadow.
