---
title: Viewing Pipeline
categories:
  - SNU
  - 4-1
  - 컴퓨터그래픽스
abbrlink: 45
date: 2025-03-18 11:04:25
tags:
---

# Viewing Pipeline

- Modeling Coordinates: Objects are created by their own coordinates.
- World Coordinates: The objects are placed in the same world coordinate.
- Viewing Coordinates: Objects are now expressed relative to camera.
- Normalized Coordinates: Everything visible to the camera is mapped to unit cube for easy clipping.
- Device Coordinates: Normalized coordinate (unit-cube) is mapped to the device coordinate.
- Rasterization: 2D primitives turns into pixels.

## WC to VC (Viewing Transformation)

If the position and orientation of camera are given, everything is done.  
$\mathbf{q}_{wc} = \begin{bmatrix}
R & \mathbf{p} \\
\mathbf{0} & 1
\end{bmatrix}\mathbf{q}_{vc}$ where $R$ is camera's rotation matrix and $\mathbf{p}$ is camera's position.

$$ \therefore \mathbf{q}_{vc} = \begin{bmatrix}
R & \mathbf{p} \\
\mathbf{0} & 1
\end{bmatrix}^{-1}\mathbf{q}_{wc} = \begin{bmatrix}
R^T & -R^T\mathbf{p} \\
\mathbf{0} & 1
\end{bmatrix}^{-1}\mathbf{q}_{wc}\\
\begin{align*}
\because  \mathbf{q}_{wc} &= R\mathbf{q}_{vc} + p \\
\mathbf{q}_{wc} - p &= R\mathbf{q}_{vc} \\
R^T\mathbf{q}_{wc} - R^Tp &= \mathbf{q}_{vc} \\
\end{align*}$$

But usually we only use a look-at direction or a reference position in the scene.  
This can reduce number of parameters so we don't have to send the whole rotation matrix.

$$\begin{align*}
\mathbf{z}_{vc} = -\frac{\mathbf{w}}{|\mathbf{w}|} \text{ or } \mathbf{z}_{vc} &= \frac{\mathbf{p}-\mathbf{p}_{ref}}{|\mathbf{p}-\mathbf{p}_{ref}|} \\
\mathbf{x}_{vc} &= \frac{\mathbf{v}_{up} \times \mathbf{z}_{vc}}{|\mathbf{v}_{up}|} \\
\mathbf{y}_{vc} &= \mathbf{z}_{vc} \times \mathbf{x}_{vc}
\end{align*}
$$

$\mathbf{v}_{up}$ can be any vector other than one parellel to $\mathbf{z}_{vc}$, usually chosen as (0,1,0).

## VC to NC

$$M_{vc,nc} = M_{norm} \cdot M_{proj}$$

### Projection Transformation

We want to project all object positions onto view plane (or projection plane).  
Projection only applies to x, y coordinates, while z (depth) values are kept.

Projecting from 3D to 2D all at once is not a good idea!  
Depth information will be lost, and computing objects that are far distant is inefficient.

![View Frustrum](view_frustrum.png)

Instead of rendering every object, we introduce view frustrum.  
Only objects that are inside view frustrum will be rendered, so we have to only care about a finit viewing volume.

### Normalizing Transformation

After projection, view frustrum becomes a cuboid.  
Normalizing transform maps a cuboid to unit cube $[-1, 1]^3$ (a.k.a. canonical view volume).  

- It makes clippling easier because you can just discard objects outside the cube.
- It makes manufacturing easier because all manufacturers can assume the normalized coordinates are given as input.

To normalize view frustrum, move the center to the origin, and scale height, width, and depth to 2.  
If the coordinates are given as $l, r, t, b, n, f$, (left, right, top, bottom, near, far) normalizing transformation is:

$$M_{norm} = \begin{bmatrix}
\frac{2}{r-l} & 0 & 0 & -\frac{r+l}{r-l} \\
0 & \frac{2}{t-b} & 0 & -\frac{t+b}{t-b} \\
0 & 0 & \frac{2}{n-f} & -\frac{n+f}{n-f} \\
0 & 0 & 0 & 1 \\
\end{bmatrix}$$

### Taxonomy of Geometric Projections

We have multiple choices for $M_{proj}$.

- Perspective projection
  - One-point perspective (Single-point perspective)
  - Two-point perspective
  - Three-point perspective
- Parallel projection
  - Orthographic projection
    - Multiview projection
    - Axonometric projection
      - Trimetric projection
      - Dimetric projection
      - Isometric projection
  - Oblique projection
    - Cavalier projection
    - Cabinet projection

### Perspective Projection

- Objects look smaller as they get further away
- Parallel lines (that are not parallel to a view plane) converge at the vanishing point on the horizon
  - Number of vanishing point can be 1, 2, or 3. (a.k.a. One-point, Two-point, Three-point)

#### Pinhole Camera Model

![Pinhole Camera](pinhole_camera.png)

A pinhole camera creates an image by controlling only the light that passes through a pinhole.

![Pinhole Camera Model](pinhole_camera_model.png)

Unlike pinhole camera, the view plane in our camera model is located in front of the pinhole. (We don't need to make upside down image!)  
Pinhole camera model maps coordinate $(x, y, z)$ into $\left( -d\frac{x}{z}, -d\frac{y}{z}, -d \right)$  
Look carefully! $d > 0$ and our projection plane is -d!

This mapping is not linear, but it can be represented by a matrix using homogeneous coordinate representation!  

$$ \begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & -\frac{1}{d} & 0
\end{bmatrix}\begin{bmatrix}
x \\ y \\ z \\ 1
\end{bmatrix} = \begin{bmatrix}
x \\ y \\ z \\ -\frac{z}{d}
\end{bmatrix} \xRightarrow[\text{4th coord.}]{\text{divide by}} \begin{bmatrix}
-d\frac{x}{z} \\ -d\frac{y}{z} \\ -d \\ 1
\end{bmatrix} $$

If we assume that the projection plane is the same as the near plane, full perspective matrix looks like this:

$$ M_{proj} = \begin{bmatrix}
\frac{2d}{r-l} & 0 & \frac{r+l}{r-l} & 0 \\
0 & \frac{2d}{t-b} & \frac{t+b}{t-b} & 0 \\
0 & 0 & \frac{f+n}{n-f} & \frac{2df}{n-f} \\
0 & 0 & -\frac{1}{d} & 0
\end{bmatrix} $$

### Parallel Projection

- Objects are projected along the specific direction
- Object's size does not change in the direction parallel to the view plane
- You can think as the center of proection (pinhole) is at infinity

#### Multiview Projection

![Multiview Projection](multiview_projection.png)

- Preserves relative size
- The direction of projection is parallel to a principle axis of objects
- The projection plane is perpendicular to the direction of projection

#### Axonometric Projection

![Axonometric Projection](axonometric_projection.png)

- Can display more than one face of an object
- The direction of projection isn't parallel to a principle axis of objects
- But the projection plane is still perpendicular to the direction of projection

#### Oblique Projection

![Oblique Projection](oblique_projection.png)

- The projection plane is aligned with one face of the object
- But the direction of projection isn't perpendicular to the projection plane
- Typically we choose 30° or 45°

![Oblique Projection in 3D](oblique_projection_3d.png)

Let the direction of projection is $V_p \coloneqq (V_{px}, V_{py}, V_{pz})$, and the view plane is $z = z_{vp}$.

$$\begin{align*}
\frac{x_p-x}{z_{vp}-z} &= \frac{V_{px}}{V_{pz}} \\
x_p &= x + \frac{V_{px}}{V_{pz}}(z_{vp}-z) \\
&= x - \frac{V_{px}}{V_{pz}}z + z_{vp}\frac{V_{px}}{V_{pz}}\\
\therefore M_{proj} &= \begin{bmatrix}
1 & 0 & -\frac{V_{px}}{V_{pz}} & z_{vp}\frac{V_{px}}{V_{pz}} \\
0 & 1 & -\frac{V_{py}}{V_{pz}} & z_{vp}\frac{V_{py}}{V_{pz}} \\
0 & 0 & 0 & z_{vp} \\
0 & 0 & 0 & 1
\end{bmatrix}
\end{align*}$$

- Cavalier projection: $\tan \alpha = 1$
- Cabinet projection: $\tan \alpha = 2$

## NC to DC (Screen Transformation)

Now we need to transform unit cube into W x H image (screen).  
OpenGL has lower-left origin, while Vulkan and Direct3D has upper-left origin with flipped y-aixs.

### Trackball

A trackball translates 2D mouse movements into 3D rotations.  
This is done by projecting the position of the mouse on to an imaginary sphere behind the viewport.  
To implement this, the camera rotates around an axis perpendicular to the mouse movement.

$$\begin{align*}
v_{axis} &= v_{old} \times v_{new} \\
\theta &= \arccos \left( \frac{v_{old}}{|v_{old}|} \cdot \frac{v_{new}}{|v_{new}|} \right)
\end{align*}$$

But... We don't actually use arccos.

- arccos doesn't know direction
- arccos isn't used in computing because of stability (absolute value of input might be over 1)

Solution: use sin and cos values!

- Use atan2: $\theta = \text{atan2} (|A \times B|, A \cdot B)$
  - atan2's input is not limited, and it has better numerical stability - e.g. can avoid division by zero
- Construct rotation matrix directly from sin and cos values
