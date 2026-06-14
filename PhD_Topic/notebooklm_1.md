# Bridging Real-Time AI Perception and Hardware-Aware State Estimation for Edge Robotics

## I. Introduction (30 Seconds)
- **Research Focus:** My research centers on developing real-time 2D/3D perception deep learning models and optimizing inference pipelines for deployment on embedded edge devices
- **The Problem:** Modern robotics requires high-fidelity situational awareness, but conventional models are often too computationally heavy for the low-power SoCs found in automotive and nano-robotic systems
- **Core Methodology:** I specialize in the end-to-end integration of multi-sensor data (RGB/IR, LiDAR, ToF) with customized deep learning architectures to improve safety and navigation

--

## II. Past Research: Embedded AI & Automotive Safety (1.5 Minutes)
- **In-Cabin Monitoring Systems (ICMS):** As a Team Lead at DeltaX, I spearheaded the R&D for an ICMS that integrates up to eight deep learning models—including 3D body keypoints and gaze estimation—into a single C/C++ pipeline
- **Hardware Optimization:** I have extensive experience optimizing PyTorch and Darknet models for specialized hardware, such as Texas Instruments SK-TDA4 and NVIDIA Jetson platforms, achieving real-time performance at 14 FPS for complex multi-model tasks
- **Lightweight Perception:** My work included designing efficient algorithms for monocular depth estimation, semantic segmentation, and pseudo-LiDAR to provide spatial awareness without the power cost of heavy sensors
- **Vehicle Localization:** During my Master’s studies at ANDA Lab, I developed novel algorithms for nighttime vehicle positioning using LED taillight matching and stereo vision

--

## III. Past Research: Vision Systems & Surveillance (1 Minute)
- **Intelligent Surveillance:** I built a multi-camera surveillance system capable of processing 16 simultaneous CCTV streams for abnormal event detection using C++ and OpenCV
- **Industrial Plugin Development:** I gained foundational experience in agile software development by creating C++ plugins for industrial printing systems and graphic design SDKs
- **Data Strategy:** I developed proprietary dataset preprocessing algorithms, such as Slicing Aided Hyper Inference (SAHI), to significantly improve the detection of small objects in real-time edge applications

--

## IV. Future Research Plans (1.5 Minutes)
- **Tightly-Coupled FPSP-VIO:** I plan to build upon my Visual SLAM research to develop a tightly-coupled Visual-Inertial Odometry framework that leverages Focal-Plane Sensor-Processors (FPSP) for ultra-low-latency tracking
- **Embedded Semantic SLAM:** I aim to investigate the deployment of Semantic SLAM using Neural Radiance Fields (NeRF) or 3D Gaussian Splatting on embedded platforms like the Jetson Orin, focusing on reducing their immense memory and power footprints
- **Fully Onboard Nano-SLAM:** Inspired by my work with lightweight perception, I intend to research methods for fully onboard SLAM for tiny robots, enabling centimeter-precision mapping within sub-100 mW power budgets
- **Continual Learning for Navigation:** I will explore real-time continual learning strategies to allow robots to adapt to dynamic environments without needing extensive retraining

--

## V. Conclusion (30 Seconds)
- **The Goal:** My goal is to bridge the gap between advanced AI perception and the physical constraints of agile robotic hardware
- **Impact:** By co-designing hardware-aware algorithms, I will contribute to a future of ubiquitous, spatially aware autonomous systems that improve safety and human-robot collaboration