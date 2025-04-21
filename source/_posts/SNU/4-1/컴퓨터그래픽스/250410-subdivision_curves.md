---
title: Subdivision Curves
categories:
  - SNU
  - 4-1
  - 컴퓨터그래픽스
abbrlink: 63
date: 2025-04-10 11:11:43
tags:
---

# Subdivision Curves

Subdivide polygonal mesh into larger number of polygons.  
Control points eventually converge to underlying smooth curve!

## Binary Curve Subdivision

![Binary Curve Subdivision](binary_curve_subdivision.png)

We'll divide curve into left segment and right segment.

$$\begin{align*}
\mathbf{p}^L(t) &= \mathbf{p}\left( \frac{t}{2} \right) \\
&= \begin{bmatrix}
\mathbf{p}_0 & \mathbf{p}_1 & \mathbf{p}_2 & \mathbf{p}_3
\end{bmatrix} \cdot B \cdot \begin{bmatrix}
1 \\
\frac{t}{2} \\
\frac{t^2}{4} \\
\frac{t^3}{8} \\
\end{bmatrix} \\
&= \begin{bmatrix}
\mathbf{p}_0 & \mathbf{p}_1 & \mathbf{p}_2 & \mathbf{p}_3
\end{bmatrix} \cdot B \cdot \begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & \frac{1}{2} & 0 & 0 \\
0 & 0 & \frac{1}{4} & 0 \\
0 & 0 & 0 & \frac{1}{8}
\end{bmatrix} \cdot B^{-1} \cdot B \cdot \begin{bmatrix}
1 \\
t \\
t^2 \\
t^3
\end{bmatrix}\\
&= \begin{bmatrix}
\mathbf{p}_0^L & \mathbf{p}_1^L & \mathbf{p}_2^L & \mathbf{p}_3^L
\end{bmatrix} \cdot B \cdot \begin{bmatrix}
1 \\
t \\
t^2 \\
t^3
\end{bmatrix}
\end{align*}$$

$\mathbf{p}^R(t)$ can be obtained from $\mathbf{p}\left( \frac{t+1}{2} \right)$.

$$\begin{bmatrix}
\mathbf{p}^L_0 \\
\mathbf{p}^L_1 \\
\mathbf{p}^L_2 \\
\mathbf{p}^L_3
\end{bmatrix} = \begin{bmatrix}
\frac{1}{2} & \frac{1}{2} & 0 & 0 \\
\frac{1}{8} & \frac{6}{8} & \frac{1}{8} & 0 \\
0 & \frac{1}{2} & \frac{1}{2} & 0 \\
0 & \frac{1}{8} & \frac{6}{8} & \frac{1}{8}
\end{bmatrix}\begin{bmatrix}
\mathbf{p}_0 \\
\mathbf{p}_1 \\
\mathbf{p}_2 \\
\mathbf{p}_3
\end{bmatrix}$$

$$\begin{bmatrix}
\mathbf{p}^R_0 \\
\mathbf{p}^R_1 \\
\mathbf{p}^R_2 \\
\mathbf{p}^R_3
\end{bmatrix} = \begin{bmatrix}
\frac{1}{8} & \frac{6}{8} & \frac{1}{8} & 0 \\
0 & \frac{1}{2} & \frac{1}{2} & 0 \\
0 & \frac{1}{8} & \frac{6}{8} & \frac{1}{8} \\
0 & 0 & \frac{1}{2} & \frac{1}{2}
\end{bmatrix}\begin{bmatrix}
\mathbf{p}_0 \\
\mathbf{p}_1 \\
\mathbf{p}_2 \\
\mathbf{p}_3
\end{bmatrix}$$

## Subdivision Rule for Cubic B-Splines

The new control polygon consist of:

- Edge points: the midpoint of each line segment
- Vertex points: the weighted average (1:6:1) of the corresponding vertex and its two neighbors

Using subdivison rule recursively, we can converge the control polygon  to a cubic B-spline curve.  
There are other subdivison rules, some converges to a non-polynomial curve, some converges to a curve with no closed form.

## Chaikin's Algorithm

![Chaikin's Algorithm](chaikin_algorithm.png)

Corner cutting algorithm!  
Converges to a quadradic B-Spline curve.

$$\begin{align*}
\mathbf{Q}_i &= \frac{3}{4}\mathbf{P}_i + \frac{1}{4}\mathbf{P}_{i + 1} \\
\mathbf{R}_i &= \frac{1}{4}\mathbf{P}_i + \frac{3}{4}\mathbf{P}_{i + 1}
\end{align*}$$

## Interpolating Subdivision

![Interpolating Subdivision](interpolating_subdivision.png)

B-Splines, Chaikin's Algorithm is non-stationary.  
How to make stationary (i.e. interpolating given control points) subdivision?

- Vertex points: the original control points
- Edge points: the weighted average of the original points

$$\mathbf{p}_{2i + 1}^{m + 1} = \frac{1}{16}(-\mathbf{p}_{i-1}^m + 9\mathbf{p}_i^m + 9\mathbf{p}_{i + 1}^m - \mathbf{p}_{i + 2}^m)$$

Interpolating subdivision converges to a affine curve, but not convex curve. (i.e. curve goes outside the convex hull)

# Subdivision Surfaces

## Loop Subdivision

Only applicable to triangle meshes!

![Edge point of loop subdivision](loop_subdivision_1.png)

Step 1: For each edge, add an edge point.

- If edge is boundary edge, use midpoint of endpoints. (same as binary curve!)
- If edge is interior edge, use weighted average (1:3:3:1) of neighbour vertices.

![Vertex point of loop subdivision](loop_subdivision_2.png)

Step 2: For each vertex, add an vertex point. (i.e. move vertex to new position)

- If vertex is boundary vertex, use weighted average (1:6:1) of neighbour vertices. (same as binary curve!)
- If vertex is interior vertex, use weighted average ($\beta : \cdots : 1 - k\beta$) of neighbour vertices.

- $\beta = \frac{1}{n} \left( \frac{5}{8} - \left( \frac{3}{8} + \frac{1}{4}\cos\frac{2\pi}{n} \right)^2 \right)^2$, Loop 1987
- $\beta = \begin{cases}
\frac{3}{16} & \text{if}\ n = 3 \\
\frac{3}{8n} & \text{if}\ n > 3
\end{cases}$, Warren 1995

![Connect points of loop subdivision](loop_subdivision_3.png)

Step 3: Connect edge/vertex points.

Connect vertex point and adjacent edge points, then connect adjacent edge points.  
Each triangle is divided into four triangles.

Subdivison rule of boundary is same as binary curve subdivison.  
Therefore, boundary will converge to a cubic B-spline curve.

## Catmull-Clark Subdivison

Applicable to any meshes!

![Face points of catmull-clark subdivision](catmull_clark_subdivison_1.png)

Step 1: For each face, add an face point.

Face point is a average of vertices.

![Edge points of catmull-clark subdivision](catmull_clark_subdivison_2.png)

Step 2: For each edge, add an edge point.

- If edge is boundary edge, use midpoint of endpoints.
- If edge is interior edge, use average of face points and endpoints.

![Vertex points of catmull-clark subdivision](catmull_clark_subdivison_3.png)

Step 3: For each vertex, add an vertex point. (i.e. move vertex to new position)

- If vertex is boundary vertex, use weighted average (1:6:1) of neighbour vertices.
- If vertex is interior vertex, use weighted average ($1 : 2 : n-3$) of average of neighbour face points, average of midpoints of neighbour edges, and original vertex, where n is valence of vertex. (i.e. number of faces that meet at the vertex)  
  **Don't** use edge points calculated in Step 2!

$$P' = \frac{1}{n} \left( \frac{1}{n}\sum F_i + \frac{2}{n}\sum \frac{P + P_i}{2} + (n-3)P \right) = \frac{F + 2R + (n-3)P}{n}$$

![Connect points of catmull-clark subdivision](catmull_clark_subdivison_4.png)

Step 4: Connect face/edge/vertex points.

Connect vertex point and adjacent edge points, then connect face point and adjacent edge points.  
Each n-sided polygon is divided into n quadrilaterals (4-sided polygon).

If valence of vertex is not 4, that vertex is isolated, and subdivision converges to $C^1$ continuous surface at this vertex.  
Other parts converges to B-spline surface, which is $C^2$ continuous.

c.f. This paper was ignored at 70s because people didn't think this was a real science, but computer changed everything.  
Actually paper is only 9 pages long; This is not some kind of optimal subdivision.

## Displacement Mapping

Level-of-Detail: We should control quality of rendering.  
e.g. Game should render real-time!

Instead of using mesh with full detail, we use subdivision + displacement.

First, we use base model with subdivision to make a rough model.  
Then details are implemented with height information of details.

This method can make detail model with less computing power!
