---
layout: post
title: "From Depth Estimation to Pseudo-LIDAR"
subtitle: "Around depth estimation and Pseudo-LIDAR"
date:   2025-03-24
categories: [Programming]
tags: [Computer_Vision,English]
permalink: /depth-pseudolidar/
---

# From Depth Estimation to Pseudo-LIDAR

---

# Human depth perception

Literature on human depth perception provides insight into the pictorial cues that could be used to estimate distance. The following cues can typically be found in single images:

- **Position in the image**: objects farther away tend to be closer to the horizon. When resting on the ground, the objects also appear higher in the image
- **Occlusion**: close objects occlude those that are behind them, therefore occlusion provides depth order, but not the exact distance
- **Texture density**: texture surfaces that are further away appear more fine-grained in the image
- **Linear perspective**: straight, parallel lines in the physical world appear to converge in the image
- **Apparent object size**: objects that are farther away appear smaller
- **Motion effect**: object get blurry and bluish as they move away from us
- **Shading & illumination**: The surface appears brighter when its normal points toward a light source. Light is often assumed to come from above. Shading typically provides information on depth changes within a surface, rather than relative to other parts of the image
- **Focus blur**: objects that lie in front or behind the focal plane appear blurred
- **Aerial perspective**: very far away objects have less contrast and take on a blueish tint

---

# Depth estimation approaches

There are 2 monocular depth estimation approaches: **absolute depth estimation** and **relative depth estimation.**

## 1. Absolute depth estimation

Absolute depth estimation (or Metric depth estimation) is an approach to estimating per-pixel depth value in absolute physical units, i.e. meters

- **Advantage**: the prediction can be directly utilized for downstream applications
- **Disadvantage**: training a single metric depth estimation model across multiple datasets often deteriorates the performance, especially when the collection includes images with large differences in depth scale, e.g. indoor and outdoor images. Therefore, absolute depth estimation methods usually overfit to a specific dataset and do not generalize well to other datasets with large differences in depth scale

## 2. Relative depth estimation

Relative depth estimation deals with the large depth variation in multiple types of environments by factoring out the scale. Therefore, it only estimates the depth of the pixels relative to each other across the entire image. and the scale factor is unknown.

- **Advantage**: enable model general ability across domains (metric scale and camera parameters are not required and do not need to be consistent across datasets)
- **Disadvantage**: the predicted depth has no metric meaning

---

# From depth estimation to 3D reconstruction

The relation between the 2D coordinate $p$ (in the image plane) and its corresponding 3D coordinate (with respect to the camera coordinate system) $P_c$ is presented below:

$$
s\space p = AP_c \space \space \space (1)
$$

given:

- $p = \begin{bmatrix} u\\ v \end{bmatrix}$
- $P_c = \begin{bmatrix} X_c\\ Y_c \\ Z_c \end{bmatrix}$
- $s$: the protective transformation’s arbitrary scaling (scale factor)
- $A$: (ideal, distortion-free) camera intrinsic matrix

The (ideal) camera intrinsic matrix $A$ is composed of the focal lengths $f_x$ and $f_y$ (with respect to **horizontal dimension** and **vertical dimension**, in **pixel** units) and the principal points $c_x$ and $c_y$ (with respect to **horizontal dimension** and **vertical dimension**, in **pixel** units). The principal point is usually close to the image center:

$$
A = \begin{bmatrix} f_x & 0 & c_x \\ 0 & f_y & c_y \\ 0 & 0 & 1 \end{bmatrix}  \space \space (2)
$$

In normal cases, every camera has a distortion effect. Therefore we need to **calibrate the camera beforehand** (aka, estimate the actual camera intrinsic parameters and distortion coefficients) and then determine the corresponding optimal (ideal) camera intrinsic matrix $A$ based on the calibration result. We usually use the OpenCV approach like the example below:

```python
# Calibration result

# Camera intrinsic parameters
camera_matrix = np.zeros(shape=(3, 3))
camera_matrix[0, 0] = 3.618627944978409e+02
camera_matrix[0, 2] = 3.140828758355781e+02
camera_matrix[1, 1] = 3.611479934228698e+02
camera_matrix[1, 2] = 1.674230039961440e+02
camera_matrix[2, 2] = 1

# Camera distortion coefficients
dist_coeffs = np.array([-0.115065515143958, 0.023076954804581, 0, 0, 0]) 

# Given W and H are the image width and height respectively, the optimal camera matrix A
# is estimated as below
A, _ = cv2.getOptimalNewCameraMatrix(camera_matrix, dist_coeffs, (W, H), 1)
```

<aside>
💡 Camera calibration is **an approximation process** that won’t give a “perfect” result (similar to machine learning), therefore we seldom get the actual ideal camera matrix. But for simplification, let’s consider it as $A$.

</aside>

The **absolute depth map**, which also considers scale value $s$ in $(1)$, ****represents value $Z_c$ in 3D coordinate value $P_c$. The remaining values $X_c$ and $Y_c$ are then determined using $(1)$ and $(2)$ as below:

$$
X_c = {Z_c(u - c_x) \over f_x} \space \space \space (3)
$$

$$
Y_c = {Z_c(v - c_y) \over f_y} \space \space \space (4)
$$

Python implementation:

```python
def Depthto3DCoord(D, fx, fy, cx, cy):
  """
  Convert absolute depth map to 3D coordinates (in camera coordinate system)

  Args:
        D: absolute depth map as shape (W, H) (W: width, H: height)
        fx: horizontal focal length
        fy: vertical focal length
        cx: principal point horizontal value
        cy: principal point vertical value

  Returns:
        3D coordinates as shape (H * W, 3), each row is one point which contains 3 values
        Xc, Yc, and Zc

  """
	W, H = D.shape # width and height of the depth map
	xx, yy = np.tile(range(W), H), np.repeat(range(H), W)
  N = W * H
  Z = D.reshape(N)
  return np.dstack((xx * z, yy * z, Z)).reshape((length, 3))
	
```

---

# Replicate LIDAR with Pseudo-LIDAR

<aside>
💡 To verify this proposal, we can set up 4 cameras and 1 LIDAR in the Carla simulation environment, record the data, and experiment with the end-to-end pipeline.

</aside>

Imagine we have a LIDAR $L$ that gives us a surrounding 360-degree 3D point cloud. We want to replicate it entirely using a set of cameras $C_i \{i| 1\leq i\leq n, n \in \mathbb{Z} \}$
. The proposed step-by-step pipeline is as follows:

- Infer absolute depth map $D_i$ of each image $I_i$ using depth model
- Determine 3D coordinates $P_{C_i}$ (with correspond to each camera coordinate system) using predicted depth map $D_i$ and the corresponding optimal camera intrinsic matrix $A_i$
- Given $R_i$, $t_i$ are the rotation matrix and translation vector to transform 3D coordinates from camera coordinate system $C_i$ to LIDAR coordinate system $L$. Each 3D camera coordinate $P_{C_i}$ is re-projected onto 3D LIDAR coordinate $P_{L_i}$:

$$
P_{L_i} = [R_i|t_i]P_{C_i} \space \space \space (5)
$$

The advantages & disadvantages of Pseudo-LIDAR compared to actual LIDAR are as below:

- **Advantages**:
    - cheaper cost
    - camera can give a denser point cloud and color information, compared to the LIDAR sparse point cloud, therefore it may be helpful for further downstream tasks (3D object detection, segmentation, etc.)
    - higher frame rate (?)
- **Disadvantages**:
    - Cameras have hardware limits such as distortion effect
    - Cameras are easily affected by external parameters such as illumination, weather conditions, etc.
    - Cameras have a side view, therefore occlusion happens frequently
    - One may need to deal with intersection/overlapping regions between 2 cameras (image stitching)
    - It is practically difficult to set up a multi-camera system properly due to the calibration and synchronization problems

---

# References

- [How do neural networks see depth in single images (ICCV 2019)](https://openaccess.thecvf.com/content_ICCV_2019/papers/van_Dijk_How_Do_Neural_Networks_See_Depth_in_Single_Images_ICCV_2019_paper.pdf)
- [ZoeDepth: Zero-shot Transfer by Combining Relative and Metric Depth](https://arxiv.org/pdf/2302.12288.pdf)
- [OpenCV Documentation: Camera Calibration and 3D Reconstruction](https://docs.opencv.org/3.4/d9/d0c/group__calib3d.html)
