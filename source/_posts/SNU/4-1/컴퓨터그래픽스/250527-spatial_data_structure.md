---
title: Spatial Data Structure
categories:
  - SNU
  - 4-1
  - 컴퓨터그래픽스
date: 2025-05-27 11:04:29
tags:
---

# Problem

Ray tracing is too slow. We need to accelerate it!  
To make ray tracing faster, we need to solve this problem:

Given a scene defined by a set of $N$ primitives and a ray $\mathbf{r}(t)$, find the closest point $\mathbf{p}$ of intersection of $\mathbf{r}(t)$ with the scene.

# Bounding Volume

Idea: Precompute conservative but smallest bounding volume that includes all primitives, then early reject if ray does not hit the box.  
Problem: In the worst case, we still need to examine all primitives.

Bounding volume should be tight to avoid false positives, and ray-volume intersection should be fast enough.

- Axis-aligned bounding box
- Bounding box (Slower)
- Bounding sphere
- Bounding half-space (any convex polygon)

## Axis-aligned bounding box (AABB)

Box can be represented as $\left( \left( x_{min}, y_{min}, z_{min} \right), \left( x_{max}, y_{max}, z_{max} \right) \right)$.  
How do we compute intersection with ray $\mathbf{r}(t) = \mathbf{o} + t\mathbf{d}$?

### Efficient Ray-AABB Intersection

![Efficient Ray-AABB Intersection](ray_aabb_intersection.png)

For all 6 faces, compute all intersections.  
e.g. Let's test intersection with $x=x_{min}$.

$$\begin{align*}
x_{min} &= \mathbf{n}_x \cdot \mathbf{r}\left( t_{min, x} \right) \\
&= \mathbf{n}_x \cdot \left( \mathbf{o} + t_{min, x}\mathbf{d} \right) \\
&= (1, 0, 0) \cdot \left( \mathbf{o} + t_{min, x}\mathbf{d} \right) \\
\therefore t_{min, x} &= \frac{x_{min} - \mathbf{o}_x}{\mathbf{d}_x}
\end{align*}$$

Now we have the interval $\left[ t_{min, x}, t_{max, x}\right]$ that overlaps the box along x axis.  
We do the same for y and z axes, then we compute the intersection of these intervals.

```python
[t_enter, t_exit] = [-∞, +∞]

for each dimension k:
    invD  = 1 / d_k
    t_min = (k_min - o_k) * invD
    t_max = (k_max - o_k) * invD

    if t_min > t_max:
        t_min, t_max = t_max, t_min # swap

    t_enter = max(t_enter, t_min)
    t_exit  = min(t_exit, t_max)

if t_enter > t_exit:
    return -1 # box missed
elif t_exit < 0:
    return -1 # box is behind the ray
elif t_enter < 0:
    return t_exit # closest intersection
else:
    return t_enter # closest intersection
```

## Bounding Volume Hierarchy (BVH)

![Bounding Volume Hierarchy](bounding_volume_hierarchy.png)

Build a binary tree, then find the bounding box of each node.  
Finding AABB of AABBs is really easy! Just compute min and max coordinates.

We traversal node only if its bounding box intersects the ray.  
If the bounding boxes of multiple child nodes intersect with the ray, we must traverse each of those nodes.

### Splitting objects

There is no one correct answer!  
Different strategies may work better for different types of geometry/different distributions of primitives.

Also, we cannot handle every worst case!  
e.g. All primitives shares same centriod, all primitives have same minimal AABB, ...  
We use heuristics that can handle most cases.

- Split at midpoint of the current volume
- Sort objects, then put half of objects on each side.
- Use modeling hierarchy as a bounding volume hierarchy. (Actuall works well)
- Use surface area as a heuristic
  - Assume rays are randomly distributed, and there are no occlusion. (i.e. Objects doesn't block other objects)
  - The probability that a ray will hit an object is proportional to the object's surface area.

### BVH Pros and Cons

- Easy to construct
- Easy to traverse
- Use simple data structure (binary tree)
- Finding a good split for a node is difficult
- Poor split may result in minimal spatial pruning

# K-D Tree

![K-D Tree](k_d_tree.png)

Recursively partition space via axis-aligned partitioning planes.  
Nodes can be traversed in front-to-back order!

![K-D Tree exception](k_d_tree_exception.png)

Unfortunately, traversing space in front-to-back order does not guarantee that primitives will be traversed in front-to-back order.  
In general, we cannot early exit after first hit is found.  
However, if object-partition inclusion relationship is uniquely determined, (i.e. no object overlaps more than one partition) we can early exit!

This is the algorithm that is currently being used in hardware!  
Most ray tracing is done with the K-D Tree algorithm.

## K-D Tree Algorithm

### Node

![K-D Tree Node](k_d_tree_node.png)

Each node has two child nodes, axis to split (e.g. `dimSplit=0` means x aixs), split distance, and the list of primitives if the node is the leaf node.

### Construction

1. Start with axis-aligned bounding box of the scene.
1. Decide which dimension to split (e.g. longest)
1. Decide at which distance to split (e.g. half? not so easy to determine)
1. Distribute primitives to each side. If a primitive overlaps split plane, assign it to both sides.
1. Repeat until stopping criteria reached (e.g. minimum number of primitives in node)

### Traversal

![K-D Tree Traversal](k_d_tree_traversal.png)

Get intersection from parent bounding box and the current spliting plane.

If the ray does not hit parent bounding boxes, ignore this node.  
If the ray does hit parent bounding box,

- Traversal left child node if $t_{enter} < t_{exit} < t$.
- Traversal both child node if $t_{enter} < t < t_{exit}$.
- Traversal right child node if $t < t_{enter} < t_{exit}$.

# Uniform Grid

![Uniform Grid](uniform_grid.png)

Partition space into equal sized volumes. (called volume-elements or voxels)  
Each grid cell contains primitives that overlap voxel.

- Like K-D Tree, we can traversal volume in front-to-back order.
- Very efficient because line rasterization algorithm can be used!
- Constructing is easy
- Teapot in a stadium problem: If primitive distribution is non-uniform, (e.g. high-resolution object such as teapot end up in one grid cell) uniform grid won't work.

## Grid size heuristic

Too few grid cells degenerates to brute-force approach.  
Too many grid cells incur significant cost traversing through cells with empty space.

We can choose number of voxels proportional to the total number of primitives.  
Assuming uniform distrubtion, the intersection cost is $O(\sqrt[3]{n})$.

## Quadtree/Octree

![Octree](octtree.png)

Quadtree/Octree has greater ability to adapt to location of scene geometry than uniform grid in 2D/3D.  
i.e. It can handle some non-uniform primitive distribution.

But it has lower intersection performance than K-D tree.  
i.e. It has limited ability to adapt.

Each node in quadtree/octree can have at most 4/8 child nodes, divided by the plane on each axis.  
If node have enough primitives, recursively divide into 4/8 child nodes.
