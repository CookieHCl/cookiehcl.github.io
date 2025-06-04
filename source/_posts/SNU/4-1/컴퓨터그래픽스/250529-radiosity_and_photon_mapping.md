---
title: Radiosity and Photon Mapping
categories:
  - SNU
  - 4-1
  - 컴퓨터그래픽스
date: 2025-05-29 11:02:38
tags:
---

# Radiometry

Radiometry is a set of techniques for measuring electromagnetic radiation, including visible light.

- Many physcial processes convert energy into photons. (e.g. incandescent lightbulb turns heat into light)
- Each photon carries a small amount of energy.
- Brightness is determined by energy of photons hitting an object. We need this information to make accurate images!

## Solid angle

![Angle and solid angle](angle_and_solid_angle.png)

Angle is a ratio of subtended arc length on circle to radius. $\theta = \frac{l}{r}$  
Circle has 2π radians.

Solid angle is a ratio of subtended area on sphere to radius squared. $\Omega = \frac{A}{r^2}$
Sphere has 4π steradians.

### Differential solid angle

![Differential solid angle](differential_solid_angle.png)

$$\begin{align*}
dA &= (r d\theta)(r \sin\theta \, d\phi) \\
&= r^2 \sin\theta \, d\theta \, d\phi \\
\therefore d\omega &= \frac{dA}{r^2} = \sin\theta \, d\theta \, d\phi \\
\therefore \Omega &= \int_{S^2} d\omega \\
&= \int_0^{2\pi} \int_0^\pi \sin\theta \, d\theta \, d\phi \\
&= 4\pi
\end{align*}$$

Note that smaller θ makes smaller area!  
That's why we have $\sin\theta$ term.

We'll use $\omega$ as a unit length direction vector, so $\omega d\omega$ denotes differential solid angle in the direction of the direction vector.

## Radiant Energy

Radiant energy is the total number of hits that occur anywhere in the scene, over the complete duration of the scene.

Energy of a signle photon is $Q = \frac{hc}{\lambda} \left[ J \right]$.

## Radiant Flux

Radiant flux is the total number of hits per second.

$$\Phi = \frac{dQ}{dt} \left[ \frac{J}{s} = W \right]$$

Or we can think in other way: integral of flux is the total radiant energy.

$$Q = \int_{t_0}^{t_1} \Phi(t)dt$$

## Radiant energy density

Radiant energy density is the total number of hits per unit area.

$$u = \frac{dQ}{dA} \left[ \frac{J}{m^2} \right]$$

## Irradiance

Irradiance is the total number of hits per second, per unit area.

$$E(p) = \frac{d\Phi(p)}{dA} \left[ \frac{W}{m^2} \right]$$

Image generation estimates the irradiance at each point of an image!  
To be precise, we estimate the total radiant flux per pixel.

### Spectral Power Distribution

![Spectral Power Distribution](spectral_power_distribution.png)

Spectral power distribution describes the irradiance per unit wavelength.

## Radiance

Radiance is the solid angle density of irradiance.

$$L(p, \omega) = \frac{dE_\omega(p)}{d\omega} \left[ \frac{W}{m^2sr} \right]$$

$E_\omega(p)$ is an irradiance when differential surface area is oriented to face in the direction $\omega$.

Radiance is the total number of hits per second, per unit area, per unit solid angle...!

### Surface Radiance

![Surface Radiance](surface_radiance.png)

Normally, surface is not oriented to $\omega$...  
We need $\cos\theta$ term!

$$L(p, \omega) = \frac{dE_\omega(p)}{d\omega} = \frac{dE(p)}{d\omega\cos\theta} = \frac{d^2\Phi(p)}{dA \, d\omega\cos\theta}$$

### Spectral Radiance

The total number of hits per second, per unit area, per unit solid angle, per unit wavelength??  
Spectral radiance describes the radiance per unit wavelength.

### Incident/Exitant radiance

![Incident/Exitant radiance](incident_exitant_radiance.png)

In general, incident radiance and exitant radiance are different. We have to distinguish between them!

$$L_i(p, \omega) \neq L_o(p, \omega)$$

### Properties of radiance

Radiance is the energy along a ray defined by origin point p and direction $\omega$.  
It characterizes the distribution of light in an environment.

Rendering is all about radiance!  
Pinhole camera model can measure radiance.

## Radiant Intensity

Radiant Intensity is the power per solid angle emanating from a point source.

$$I(\omega) = \frac{d\Phi}{d\omega} \left[ \frac{W}{sr} \right]$$

![Goniometric diagram](goniometric_diagram.png)

Instead of constant intensity, we can use goniometric diagram that measures light intensity as a function of angle.

## Computing irradiance from radiance

Irradiance can be computed from radiance.

$$E(p) = \int_{\mathcal{H}^2} L_i(p, \omega) \cos\theta \, d\omega$$

For most sources, the integral has already been computed.  
If integral is not analytical, we should compute it numerically with Monte Carlo method.

### Irrandiance from a uniform hemispherical source

![Irrandiance from a uniform hemispherical source](irrandiance_uniform_hemisphere.png)

$$\begin{align*}
E(p) &= \int_{\mathcal{H}^2} L_i(p, \omega) \cos\theta \, d\omega \\
&= L \int_0^{2\pi} \int_0^{\frac{\pi}{2}} \cos\theta \sin\theta \, d\theta \, d\phi \\
&= L\pi
\end{align*}$$

### Irrandiance from a uniform area source

![Irrandiance from a uniform area source](irrandiance_uniform_area.png)

$$\begin{align*}
E(p) &= \int_{\mathcal{H}^2} L_i(p, \omega) \cos\theta \, d\omega \\
&= L \int_\Omega \cos\theta \, d\omega \\
&= L\Omega^\perp
\end{align*}$$

Where $\Omega^\perp$ is a projected solid angle, an area of object (O) projected onto unit sphere ($\Omega$), then projected onto plane. ($\Omega^\perp$)

$$d\omega^\perp = \left| \cos\theta \right| d\omega$$

### Irrandiance from a uniform disk source

![Irrandiance from a uniform disk source](irrandiance_uniform_disk.png)

$$\begin{align*}
E(p) &= L\Omega^\perp \\
&= L \int_0^{2\pi} \int_0^{\alpha} \cos\theta \sin\theta \, d\theta \, d\phi \\
&= L\pi \sin^2\alpha
\end{align*}$$

## Ambient Occlusion (AO)

![Ambient Occlusion](ambient_occlusion.png)

Assume spherical light source at infinity, then irradiance is now rotation, translation invariant.  
Therefore, we can pre-compute and bake irradiance into texture to enhance shading.

![Large Scale Ambient Occlusion](large_scale_ambient_occlusion.png)

Especially we use AO in games!  
Precomputing makes runtime efficient, so we can mimic global illumination in realtime!

# Photometry

Radiometry is about physical energy, photometry is about actual perception of light!  
Photometry accounts for response of human visual system to electromagnetic radiation.

e.g. Luminance integrate radiance over all wavelengths, weight by eye's luminuous efficacy curve. (sensitivity per frequency)

$$Y(p, \omega) = \int_0^\infty L(p, \omega, \lambda)V(\lambda) d\lambda $$

All radiometric quantities have equivalents in photometry.  
Unfortunately, units of photometric quantities is not good...

| Physics               | Radiometry                                         | Photometry                                      | MKS                              | CGS                    | British            |
|-----------------------|----------------------------------------------------|-------------------------------------------------|----------------------------------|------------------------|--------------------|
| Energy                | Radiant Energy                                     | Luminous Energy                                 | Talbot                           | Talbot                 | Talbot             |
| Flux (Power)          | Radiant Power                                      | Luminous Power                                  | Lumen                            | Lumen                  | Lumen              |
| Flux Density          | Irradiance (incoming)<br>Radiosity (outgoing)      | Illuminance (incoming)<br>Luminosity (outgoing) | Lux                              | Phot                   | Footcandle         |
| Angular Flux Density  | Radiance                                           | Luminance                                       | Nit / Apostilb / Blondel         | Stilb / Lambert        | Footlambert        |
| Intensity             | Radiant Intensity                                  | Luminous Intensity                              | Candela                          | Candela                | Candela            |

$$nt = \frac{lx}{sr} = \frac{cd}{m^2} = \frac{lm}{m^2sr}$$

# The Rendering Equation

Ray tracing is not enough!  
It miss out on small-scale effects, (e.g. diffraction, iridescence)  
and also miss out on large-scale effects. (e.g. bending of light due to gravity)

Rendering equation can compute radiance at a given point p, in a given direction $\omega_o$.

$$L_o(p, \omega_o) = L_e(p, \omega_o) + \int_{\mathcal{H}^2} f_r(p, \omega_i, \omega_o) L_i(p, \omega_i) \cos\theta \, d\omega_i$$

- $L_o(p, \omega_o)$ is an outgoing radiance.
- $L_e(p, \omega_o)$ is an emitted radiance.
- $f_r(p, \omega_i, \omega_o)$ is a scattering function. (e.g. BRDF)
- $L_i(p, \omega_i)$ is an incoming radiance.
- $\theta$ is an angle between incoming direction ($\omega_i$) and surface normal

Problem: To compute incoming radiance, you need to use rendering equation again. This is a recursive function!

## Estimating the rendering equation

Solve the rendering equation with assumptions!

- All surfaces are small, opaque, ideal diffuse reflectors.
- The system is closed. (No extra energy can be in/out)

$$L_k = E_k + \rho_k \sum_{i=1}^n L_j F_{jk}$$

We can assume radiance and scattering function differ only by surface.  
$\rho_k$ is the reflectivity factor for surface k, and $F_{jk}$ is the fractional amount of radiant energy from surface j that reaches surface k. (called the form factor)

Since rendering equation is now a linear system, we can solve it!

$$\begin{gather*}
L_k = E_k + \rho_k \sum_{i=1}^n L_j F_{jk} \\
(1 - \rho_k F_{kk}) L_k - \rho_k \sum_{j \neq k}^n L_j F_{jk} = E_k \\
\begin{bmatrix}
1 - \rho_{1}F_{11}   & -\rho_{2}F_{21}   & \cdots & -\rho_{n}F_{n1} \\[1ex]
-\rho_{2}F_{12}      & 1 - \rho_{2}F_{22} & \cdots & -\rho_{n}F_{n2} \\[1ex]
\vdots               & \vdots             & \ddots & \vdots         \\[1ex]
-\rho_{n}F_{1n}      & -\rho_{n}F_{2n}    & \cdots & 1 - \rho_{n}F_{nn}
\end{bmatrix} \begin{bmatrix}
L_{1} \\ L_{2} \\ \vdots \\ L_{n}
\end{bmatrix} = \begin{bmatrix}
E_{1} \\ E_{2} \\ \vdots \\ E_{n}
\end{bmatrix}
\end{gather*}$$

### Form factor

The form factor can be calculated before solving the equation.

$$F_{jk} = \frac{1}{A_{j}} \int_{surf_{j}} \int_{surf_{k}} \frac{\cos\phi_j \cos\phi_k}{\pi r^2} \, dA_{k} \, dA_{j}$$

$A_j$ is the area of the surface j.  
Again, most cases in which the integral is analytical have already been computed.

Note that this equation satisfies some properties!

- Conservation of energy, $\forall j, \sum_{k=1}^n F_{jk} = 1$
- Uniform light reflection, $A_jF_{jk} = A_kF_{kj}$
- Only plane or convex patches, $\forall j, F_{jj} = 0$

We can avoid computing integral by... rendering?  
Render from each surface j, then the fractional amount of pixel of surface k is $F_{jk}$!

## Difference between radiosity and ray tracing

Ray tracing is also sort of the estimate of the rendering equation!

Ray tracing tends to render sharp parts, while radiosity tends to render soft.  
Also, radiosity renders surface less shiny.

Radiosity is used in construction industry, especially making indoor footage.  
However, you can always use both method.

# Photon mapping

![Photon mapping](photon_mapping.png)

Various effects such as caustics, BSSRDF is hard to implement using ray tracing or radiosity.  
Why not simulate the light's behavior?

Photon mapping is two-pass global illumination algorithm.  
It can effectively make various effects!

## First pass

Emit photons randomly from the light sources throughout the scene.  
The emitted photons are traced through the scene until they strike an object.  
Based upon a probability distribution for that object, phtons are reflected, transmitted or absorbed by the object.

At each intersection with an object, information about the photon's incident direction, incoming power, and the intersection point are stored into the photon map.

## Second pass

Render image using the photon map!  
Cast rays into the scene, and estimate the radiance from the intersection points along the ray. (e.g. use k-nearest algorithm)  
The estimated radiance is used in the calculation of the pixel color.

## Pros and cons

Basically modified version of ray tracing! If ray tracing is implemented, photon mapping is easy.

However even millions of photon has a lot of aliasing.  
We need to shoot billions of photon.... or use a good anti-aliasing methods.
