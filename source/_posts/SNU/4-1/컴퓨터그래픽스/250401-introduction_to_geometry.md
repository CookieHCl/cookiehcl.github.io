---
title: Introduction to Geometry
categories:
  - SNU
  - 4-1
  - 컴퓨터그래픽스
abbrlink: 56
date: 2025-04-01 11:04:06
tags:
---

# Geometry in graphics

Scene is an assembly of one or more objects.  
An object contains transformation, geometry, material, and lighting.

# Implicit representations

Pros:

- Description can be very compact
- Easy to determine if a point is inside or outside
- Other queries may also be easy (e.g. distance to surface)
- Simple shapes have exact description and no sampling error

Cons:

- Very hard to find all points in the shape
- Very difficult to model complex shapes

## Algebraic surfaces

Surface is zero set of a polynomial in x, y, z.  
i.e. $f(x, y, z) = 0$

It's impossible to draw complicated shapes...  
e.g. how do we draw cow?

## Constructive Solid Geometry

Build complicated shapes via boolean operations of basic primitives.

How do we do this? Boolean operations of geomery is extremely hard...  
Solution: draw a line from a given point, then do boolean operations of segments!

## Blobby surfaces

Boolean operations makes surface too sharp...  
Instead blend surfaces together!

e.g. in 2D, $f(x) = e^{-|x-p|^2} + e^{-|x-q|^2}$

Used in fluid, human body, etc.

## Level Set Methods

We don't know the shape, but we know the distance to the surface from each pixel in the grid.

## Fractals

Obviously implicit...  
Used for describing natural phenomena - e.g. tree, leaf, flower.

c.f. Fractal dimension: Some fractal has infinite perimeter - these are not 1D! maybe 1.67D...?

c.f. Space-filling curve: 1D and 2D has one-to-one mapping!

### Mandelbrot set

For each point in the plane:

1. Double the angle
1. Square the magnitude
1. Add the original point
1. Repeat

If magnitude remains bounded, it's in the Mandelbrot set.

# Explicit Representations

## Parametric space

$$f: R^2 \rightarrow R^3; (u, v) \rightarrow (x, y, z) $$

e.g. for $0 \leq u \leq 2\pi, 0 \leq v \leq \pi$, points on sphere are $(\cos u \sin v, \sin u \sin v, \cos v)$

## Point Cloud

List of points (x, y, z)

Can represent any kind of geometry, but hard to modify (e.g. processing, simulation, ...)

## Polygon Mesh

Store vertices and polygons

Easier to modify, but need more complicated data structures to verify polygon mesh.

Polygon mesh can be verified by v-e+f = 2

### Triangle Mesh

Normally we use only triangles.  
Quads are not defined when vertices are skewed, triangles are always well defined!  
Normal vector is also well defined!

Barycentric interpolation can define points inside triangles.

## Manifold

Earth is sphere, but we use 2D map at the surface.  
Similiary, we can make 3D surface into 2D grid.  
However, not every shape is manifold.
