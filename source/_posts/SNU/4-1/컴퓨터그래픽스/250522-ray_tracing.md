---
title: Ray Tracing
categories:
  - SNU
  - 4-1
  - 컴퓨터그래픽스
date: 2025-05-22 11:03:10
tags:
---

# Global Illumination Models

A surface point can receive light from various sources such as light sources and other objects.

- Ray tracing
- Radiosity
- Photon mapping

Recall) Local illumination model: A surface point receives light directly from light sources, no shadows, reflection, transmission.

# Ray Tracing

## Forward (Real World) Ray Tracing

- Define rays as paths of photons in world space
- Follow photon from light sources to viewer
- Maybe... phton can reach the viewer?

## Backward Ray Tracing

- Trace rays backward from viewer to light sources!
- For every pixel, we cast ray from camera to pixel
- Whenever ray hits objects, we always consider ray to light sources, then add ambient/diffuse/specular colors.

Checking intersection between ray and objects is the most expensive operation! (about 95%)

1. Compute plane containing triangle
1. Compute the closest intersection between ray and plane
1. Check whether intersection is inside triangle

We need to do this for every pixel and every polygons...

This only computes local illumination model!  
We can also compute shadow, reflection, and refraction.  
To do this, we need to compute more rays, and more intersections..

## Shadow Rays

How do we determine if light really hits the surface point?  
Solution: Cast shadow ray from surface point to every light sources!  
If shadow ray hits opaque object, (i.e. have intersection) light source can't be seen.

Unlike backward ray tracing, we don't need closest interaction, so we can stop at first intersection.

### Precision problems

"Surface point" may slightly beneath the surface due to numerical precision.  
This causes the surface to cast a shadow on itself.

Solution: Move the intersection point by epsilon along the surface normal to position it outside the object.

## Reflection

- Cast ray from surface point towards the reflection.
- Multiply color by reflection coefficient.

$$R = V - 2(V \cdot N)N$$

## Transparency (Refraction)

- Cast ray from surface point towards the refraction.
- Multiply color by transparency coefficient.

Looks same... but refraction is way harder than reflection.

### Snell's Law

$$\eta_i \sin\theta_i = \eta_r \sin\theta_r$$

Where $\eta_i, \eta_j$ is the index of refraction of each material.  
We define $\eta = \frac{\eta_i}{\eta_r} = \frac{\sin\theta_r}{\sin\theta_i}$

![Snell's Law](snells_law.png)

M is an arbitrary tangential unit vector.

$$\begin{align*}
L &= N \cos\theta_i - M \sin\theta_i \\
M &= \frac{N \cos\theta_i - L}{\sin\theta_i} \\
T &= -N \cos\theta_r + M \sin\theta_r \\
&= -N \cos\theta_r + \left( N \cos\theta_i - L \right)\frac{\sin\theta_r}{\sin\theta_i} \\
&= \left( \eta\cos\theta_i - \cos\theta_r \right)N - \eta L \\
&= \left( \eta\cos\theta_i - \sqrt{1 - \sin^2\theta_r} \right)N - \eta L \\
&= \left( \eta\cos\theta_i - \sqrt{1 - \eta^2\sin^2\theta_i} \right)N - \eta L \\
&= \left( \eta\cos\theta_i - \sqrt{1 - \eta^2 \left( 1 - \cos^2\theta_i \right) } \right)N - \eta L \\
\end{align*}$$

### Properties of refraction

![Sideness](sideness.png)

Sideness: Whether light enters or leaves the material is important

Total Internal Reflection: After the critical angle $\theta_r = 90^\circ$, entire lights are reflected, and no refraction occurs.

Wavelength-dependent: Refraction increases as the wavelength of light decreases. (The reason why rainbows happen)  
But usually ignored in computer graphics...

## Ray Tracing Algorithm

```python
def check_nearest_intersection(ray, objects):
  dist_min = INFINITY
  hit_min = NULL

  for obj in objects
    hit = intersect(obj, ray)
    d = dist(obj, hit)

    if d < dist_min:
      d = dist_min
      hit_min = hit

  return hit_min

def trace_ray(ray, objects, lights):
  hit = check_nearest_intersection(ray)
  color = BLACK

  if hit != NULL:
    color = ambient * hit.diffuse_color() # add ambient color
    for light in lights:
      shadow_ray = Ray(hit, light) # ray from hit to light

      # we don't need nearest intersection, but we reuse algorithm
      # For faster implementation, we can modify this function to early return on any intersection
      hit2 = check_nearest_intersection(ray)
      if dist(hit, hit2) == dist(hit, light):
        # path to the light exists, add diffuse & specular colors
        color += local_shade(ray, hit, light, light.color())

      # reflection
      reflect = get_reflection(ray, hit)
      reflect_ray = Ray(hit, reflect)
      reflect_color = trace_ray(reflect_ray, objects, lights)

      # refraction
      refract = get_refraction(ray, hit)
      refract_ray = Ray(hit, refract)
      refract_color = trace_ray(refract_ray, objects, lights)

      color += hit.reflect_factor * reflect_color + hit.refract_factor * refract_color

def ray_tracing(camera, objects, lights):
  for pixel in pixels:
    ray = Ray(camera, pixel) # ray from camera to pixel

    pixel.color = trace_ray(ray, objects, lights)
```

Reflection and refraction can be impelemented in recursive function.  
Stopping criteria can be recursion depth or ray contribution (when reflected/refracted contribution becomes too small)

# Advanced Ray Tracing

## Fresnel factor

Instead of using constant coefficients for reflection/refraction, we can use fresnel factor.

Schlick's approximation use angle between incoming ray and surface normal.

$$k_{fresnel}(\theta) = k_{fresnel}(0) + \left( 1 - k_{fresnel}(0) \right) (1 - \cos\theta)^5$$

## Monte Carlo Ray Tracing

No surface is a perfect mirror!  
Non-ideal reflection/refraction have many reflection/refraction rays.

We can use Monte Carlo method!  
Instead of 1 reflection/refraction ray, we use random reflection/refraction direction, and multiple reflection/refraction rays.

We can sum average of reflection/refraction colors.  
If you're ambitious, you can use BRDF!

## Soft shadows

Point light source only have one shadow ray, making hard shadows.  
For realistic shadows, we use area light source to make soft shadows with umbra and penumbra.

Monte Carlo method again!  
Instead of 1 shadow ray, we use random shadow rays pointing to area light source.

## Supersampling

Sort of anti aliasing!  
Instead of 1 ray per pixel, we divide pixel into subpixels, then shoot 1 ray per subpixel.

Shooting randomly within each subpixel renders better than shooting at the center of the subpixel.

## Motion Blur

![Motion Blur](motion_blur.png)

Actual camera behavior!  
To implement this, we can sample objects temporally over time interval, then mix those images.

## Depth of Field

![Depth of Field](depth_of_field.png)

Another actual camera behavior!  
Changing the aperture size affects depth of field.  
A smaller aperature increases the range in which the object is approximately in focus.

We can implement this with ray tracing???  
Just simulate lens behavior...

## Caustics

![Caustics](caustics.png)

Caustics represents some of the most visually stiking patterns of light in nature.  
It is formed by light that is reflected or transmitted by a number of specular surfaces before interacting with a diffuse surface.

This is difficult to implement because the probability of a ray interacting with multiple specular surfaces and then with a diffuse surface is very low...

## White noise, blue noise

White noise randomly sample points. (Frequency is uniform)  
Blue noise trys to keep sample points a certain minimum distance from each other. (Certain frequencies are dominant)

There are many different **colored** noise!  
Using different noise in Monte Carlo method yields different rendering results.  
Maybe blue noise can give better results than white noise?
