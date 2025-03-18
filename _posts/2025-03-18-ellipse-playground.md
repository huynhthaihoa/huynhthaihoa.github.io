---
layout: post
title:  "Ellipse Playground"
subtitle: "Utilize Ellipse in Computer Vision Programming"
categories: [Programming]
tags: [Computer_Vision,English]
permalink: /ellipse-playground/
---

# 1. Ellipse Playground

Given the **image coordinate system** $Oxy$, with $O(0, 0)$ is the **coordinate center**:

![image.png](../images/image.png)

## 1.1. General Equation

$$
\frac{[(𝑥−c_x)cos(-\theta)+(𝑦−c_y)sin(-\theta)]^2} {𝑎^2}+\frac{[(𝑥−c_x)sin(-\theta)−(𝑦−c_y)cos(-\theta)]^2}{𝑏^2}=1
$$

given:

- $C(c_x, c_y)$ is the ellipse center
- $a, b$ are the major and minor radius
- $\theta$ is the rotation angle measured from the $Cx$ axis (not $Ox$ axis) (**clockwise order**)

## 1.2. Parametric Equation

$$
x(\alpha)=a{cos(\alpha)}{cos(\theta)} - b{sin(\alpha)}{sin(\theta)}+c_x
$$

$$
y(\alpha)=a{cos(\alpha)}{sin(\theta)}+b{sin(\alpha)}{cos(\theta)}+c_y
$$

given:

- $C(c_x,c_y)$ is the ellipse center
- $a, b$ are the major and minor radius
- $\theta$ is the rotation angle measured from the $Cx$ axis (not $Ox$ axis) (**clockwise order**)
- 𝛼 is the parameter, which ranges (radian) from 0 to 2𝜋

![image.png](../images/image_1.png)

Rotated ellipse illustration, with $Cx$ and $Cy$ are correspondingly paralleled & share the same direction with $Ox$ and $Oy$

# 2. Rotate point

If you rotate a point $B(x_B, y_B)$ around a point $A(x_A, y_A)$ by angle $\theta$ (anti-clockwise order) you'll get a point $C(x_C, y_C)$, in which:

$$
x_C = (x_B - x_A)cos(\theta)+(y_B-y_A)sin(\theta)+x_A
$$

$$
y_C=(x_B-x_A)sin(\theta)+(y_B-y_A)cos(\theta)+y_A
$$
