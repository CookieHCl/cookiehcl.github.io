---
title: Rendering
categories:
  - SNU
  - 4-1
  - 컴퓨터그래픽스
date: 2025-04-29 11:03:39
tags:
---

# Photorealistic Rendering

Rendering or image synthesis is the process of generating a image from a 2D or 3D model by means of a computer program.

The goal is to create images from 2D or 3D models which are not distinguisible from what we've seen in the real world.  
If we can make photorealistic rendering, non-photorealistic rendering can be easily achieved.

Achieving photorealism in computer graphics requires:

- Realistic/detailed geometry of models
- Accurate representations of surface properties (e.g. material)
- Good physical descriptions of the lighting effects
- Good understanding of human perception (Human doesn't perceive absolute value... But they are good at perceiving relative value!)

## Local Illumination Models

Only think about light source, eye, and object. (i.e. object illuminations are independent)  
Easier, but doesn't compute light between objects.

No light scattering between objects, no shadows, no reflection, no transmission (see through semi-transparant objects).

## Global Illumination Models

A surface point can receive light from various sources such as light sources and other objects.

- Ray tracing
- Radiosity
- Photon mapping

# Properties of light sources

## Linearity

Light source has linearity.  
We can easily mix multiple light sources!

$$I(sa+b) = sI(a) + I(b)$$

But human perceive differently; Human perceive intensity in log scale.

## Falloff (attenuation)

As radiant energy travels, its amplitude is attenuated by the factor $\frac{1}{d^2}$.  
Why? The constant energy is emitted from a light source while the surface area gows with $d^2$.

Sometimes, more realistic attenuation effects can be obtained with an quadratic function of distance, while also preventing the problem of divergence when the distance is zero.

$$f_{falloff}(d) = \begin{cases}
1.0 & \text{if light is very strong and located very far}\\
\frac{1}{a_2d^2 + a_1d + a_0} & \text{otherwise}
\end{cases}$$

## Lamert's Cosine Law

The amount of light energy received by a surface depends on incoming angle.  
This is the reason why we have summer and winter seasons.

## Light Sources

We use specific types of light sources in computer graphics.

### Color of light sources

We use 3D vector for light's intensity!  
Each element represents red's intensity, blue's intensity, and green's intensity.

But actually this is not enough.  
Linear combination of finite number of primary colors can't represent every color of light!  
We'll just use RGB, but note that this is a approximation!

### Point Lights

Point lights emit radiant energy from a single point.  
Intensity at a point x on the surface is:

$$I_{in} = \frac{1}{d^2} I_{light} \max(\cos\theta, 0)$$

where N is the surface normal vector and L is the direction from x to the point light source.

### Directional Lights

Directional lights are point lights that are infinitely far.  
Directional lights don't have falloff.

$$I_{in} = I_{light} \max(\cos\theta, 0)$$

### Spotlights

Spotlights are point lights with non-uniform directional emission.  
We assume symmetric about a central direction V with angular falloff, so spotlights outside of hotspot will have reduced intensity.

$$I_{in} = \frac{1}{d^2} I_{light} \cos^n \left( \max \left( \alpha - \frac{1}{2}\alpha_{hotspot}, 0 \right) \right)$$

$\alpha$ is an angle between L and V, and $\alpha_{hotspot}$ is an angle of hotspot.  
$n$ is just a parameter that controls how quickly the falloff should occur.

### Area Lights

Area lights emit light from their surface.  
In general, computing radiometric quantities (e.g. intensity) related to area lights requires computing integrals over the surface.  
However, this can't be computed exactly, so we just approximate it as many point light sources.

$$I_{in} = \sum_{p \in A}\frac{1}{d_p^2} I_{light}(p) \max(\cos\theta_p, 0)$$

c.f. Point lights have sharp shadows, while area lights have soft shadows.

- Umbra: Every light source can't seen
- Penumbra: Some light source can't seen

Rendering point lights have too unrealistically sharp shadows, so we need area lights in practice.

# Measuring reflection

## BRDF (Bidirectional Reflectance Distribution Function)

There are bidirection reflection, to the incoming direction and to the outgoing direction.

Reflection can be implemented as distribution function.  
Given incoming direction $\omega_i$ and outgoing direction $\omega_o$, we define BRDF as $f_r(\omega_i, \omega_o)$.  
Instead of direction, we can use spherical coordinates (zenith and azimuth angles). $f_r(\theta_i, \phi_i, \theta_o, \phi_o)$  
e.g. If $f_r$ is 1 at specific direction $\omega_o$, (dirac delta) we can represent mirror.

In practice, reflection can also change with frequency, so we need 5 parameters. $f_r(\theta_i, \phi_i, \theta_o, \phi_o, f)$  
We can simplify this to computing BRDF only for RGBs.

$$I_{out}(\omega_o) = I_{in}(\omega_i) f_r(\omega_i, \omega_o) = \frac{I_{light}\cos\theta_i}{d^2} f_r(\omega_i, \omega_o)$$

### Isotropic and anisotropic

When $\omega_i$ and $\omega_o$ are fixed, material is called isotropic if rotation around the normal does not change the reflectance.  
Otherwise, the material is called anisotropic. Anisotropic material have strongly oriented microgeometry elements. (e.g. Aluminum)

### Measuring BRDFs

![BRDF of plastic](brdf_plastic.png)

BRDF can be measured with devices.  
e.g. Gonioreflectometer measure reflection by changing $\omega_i$ and $\omega_o$.

Note that we have specular reflection part (정반사) and diffuse reflection part (난반사).  
Maybe we can parameterize BRDF?

## Parametric BRDFs

Actual BRDF need tabulated 5D data, which is too large.  
Parametric BRDF models represent the relationship between incident and outgoing light by some mathmatical formula.

### Ideal Diffuse Reflectance

Incident light is scattered with equal intensity in all directions.  
At the microscopic level, an ideal diffuse surface is a very rough surface. (e.g. chalk, clay, ...)

Light intensity depends on the angle of incidence according to Lambert's cosine law, but is independent of the angle of reflection.

For a single point light source,

$$I_{out} = k_d \frac{I_{light}}{d^2} \max(N \cdot L, 0)$$

where $k_d$ is diffuse coefficient, and $I_{light}$ is light source intensity.  
BRDF for ideal diffuse surface is a constant function!

### Ideal Specular Reflectance

Perfect reflector reflects all rights to the direction where angle of reflection is identical to the angle of incidnece.  
i.e. This is a mirror!

Light only reflects to the mirror direction.  
BRDF is a dirac delta function multiplied by a specular coefficient $k_s$.

However, ideal specular BRDF is not useful for point light sources.  
You can't see light source if you're outside of direction of reflection.

### Non-ideal Reflectors

Most of the reflected light travels in the direction of the ideal mirror ray, while some of the light are also reflected around the reflected ray.  
If more light is reflected around the ideal mirror ray, the surface becomes blurred.

Phong specular model: For a single point light source,

$$I_{out} = k_s \frac{I_{light}}{d^2} (R \cdot V)^n$$

where $k_s$ is specular coefficient, $I_{light}$ is light source intensity, $R$ is reflected ray direction, $V$ is viewing direction, and $n$ is shininess parameter. (similar to $\cos^n$)

If n is large, surface is shiny. i.e. BRDF is more like dirac delta.

Since $R+L = 2(L \cdot N)N$, $R = 2(L \cdot N)N - L$.

### Ambient Illumination

In the real world, we can see objects beneath the table even if there is no direct path between the objects and the light sources.  
The ambient term represents the reflection of all indrect illumination.

$$I_{out} = k_aI_a$$

## The Complete Phong Illumination Model

Sum of three components:

- Ideal diffuse reflection
- Non-ideal specular reflection
- Ambient

For single light source,

$$I_{out} = k_aI_a + \frac{I_{light}}{d^2} [k_d \max(N \cdot L, 0) + k_s (R \cdot V)^n]$$

For multiple light source with emission,

$$I_{out} = I_{emit} + k_aI_a + \sum_l \frac{I_l}{d_l^2} [k_d \max(N \cdot L_l, 0) + k_s (R_l \cdot V)^n]$$

Phong Illumination Model is good for representing simple plastics and metals, but cannot represent correctly for other materials like clothes, brushed metals.

Phong Illumination Model is not physically correct!

- Does not even conserve energy, it can reflect more energy than what goes in.
- Does not conform to the BRDF model directly. (cosine for diffuse, but not for specular)
- Ambient was a total hack, doesn't even related to actual light.

But it has been popularly used for real-time rendering (e.g. OpenGL) due to its compactness.

In general, specular reflection makes more use of the color of the light, and diffuse reflection makes more use of the color of the material.

### Parameter Choosing Tips

- The sum of reflectance coefficients is usually smaller than 1. $k_a + k_d + k_s \leq 1$
- Try $n$ (shininess parameter) in the range [0, 100].
- Usually ambient term is small. $k_a \approx 0.1$
- The material properties in the Phong model of the common material is [already calculated](https://people.eecs.ku.edu/~jrmiller/Courses/672/InClass/3DLighting/MaterialProperties.html).

### Fresnel Reflection

Specularity is increased near grazing angles.  
But most BRDF models doesn't account for this.

### Blinn-Phong variation

Use the halfway vector H between L and V. $H = \frac{V+L}{|V+L|}$

$$I_{out} = k_s \frac{I_{light}}{d^2}(N \cdot H)^n$$

It is considered more accurate than Phong model, especially highlight is more pretty?????

## BSSRDF

![BSSRDF](bssrdf.png)

Bidirectional Scattering Surface Reflectance Distribution Function

$$s_r(p_i, \omega_i, p_o, \omega_o)$$

- In BRDF, light was reflected at the point where the light meets.
- In BSSRDF, light can travel through objects, reflected inside objects, then go out in completely different directions.

If you're really ambitious, you can measure and use BSSRDF!

# Surface Rendering

## Flat shading

Entire triangle has a solid color!

Problem: Mach band effect  
Even when surface have a solid color, we perceive mach bands.

## Gouraud shading

- Compute the average unit normal vector at each vertex. (i.e. average of the normal vectors of surfaces touching vertex)
- Illumination is calculated for each vertex
- Values are bi-linearly interpolated within a triangle.

Problem:

- Mach band effect still appears
- Orientation dependence (which two edges should we use?)

Nobody use this anymore....

## Phong shading

Similar to Gouraud shading, we compute normal vector at each vertex.  
However, instead of interpolating values, (color) we interpolate normal vector, then compute illumination again.

To solve orientation dependence, we use barycentric interpolation.

Better than Gouraud shading, especially Phong shading can render highlights inside surface!  
Because Gouraud shading interpolate colors, highlight inside surface is ignored.

## Problems with interpolated shading

- Polygon sihouette (If number of polygon is too low, boundary appears)
- Perspective distortion (Not invariant to perspective projection)
- Shared edges (How do we compute normal vector if edges are shared?)
