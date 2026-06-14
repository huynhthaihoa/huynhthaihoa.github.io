# Unified State Estimation for Resource-Constrained Bio-Inspired Robots with Hybrid Dynamics

## I. Introduction (30 Seconds)
- **The Vision:** My research aims to provide autonomous navigation and situational awareness to miniature bio-inspired robots (small-legged, inchworm-like, or climbers) that operate on lightweight embedded platforms [User Query, 1105]
- **The Challenge:** These robots exhibit hybrid and discontinuous dynamics where continuous motion is interrupted by discrete events like foot-ground impacts or switching contacts
- **Core Approach:** Bridging my background in real-time SoC perception pipelines with advanced manifold-aware filtering to handle non-smooth dynamics on low-power hardware

--

## II. Past Research: Applied AI & Embedded Systems (1.5 Minutes)
- **Real-Time SoC Pipeline Design:** As a Team Lead at DeltaX, I spearheaded the R&D of an In-Cabin Monitoring System (ICMS), integrating up to eight deep learning models into a single C/C++ pipeline on SoC devices
- **Hardware Optimization:** I optimized inference for platforms like the Texas Instruments SK-TDA4 and NVIDIA Jetson, achieving real-time performance (14 FPS) for complex multi-sensor tasks
- **Lightweight Perception:** I designed efficient algorithms for monocular depth estimation and pseudo-LiDAR, providing spatial awareness without the payload of heavy sensors, which is critical for miniature robotics
- **Masters Thesis:** My earlier work focused on nighttime vehicle positioning using LED taillight matching and stereo vision, establishing a foundation in feature-based localization

--
## III. Proposed PhD Research: Theory & Modeling (1.5 Minutes)
- **Modeling Hybrid Dynamics:** I will integrate probabilistic modeling of hybrid motion phases [User Query]. This includes using saltation matrices to propagate uncertainty through discrete state jumps, such as foot-ground impacts in legged systems

- **Invariant Filtering on Lie Groups:** To ensure consistency, I will leverage Invariant Extended Kalman Filters (InEKF). By representing states on matrix Lie groups (SE k+2 (3)), the estimator maintains consistent observability, preventing absolute position and yaw from appearing observable due to linearization errors

- **Manifold-Aware Mapping:** The framework will utilize Riemannian geometry for mapping on constrained surfaces, ensuring physical consistency of the estimated parameters during intermittent contact

--

## IV. Proposed PhD Research: Systems & Multi-Sensor Fusion (1 Minute)
- **Low-Cost Sensor Fusion:** My framework will fuse monocular/stereo vision with compact LiDARs, IMUs, and tactile sensors [User Query, 937].
- **Tactile Feedback:** Drawing on advances in artificial skin, I plan to use contact wrenches to improve state estimation in slippery or visually challenging environments
- **Embedded SLAM (NanoSLAM):** Inspired by NanoSLAM, I will target ultra-low-power processors like the RISC-V GAP9 to achieve centimeter-precision mapping within a sub-100 mW power budget
- **Tightly-Coupled Visual-Inertial-Contact:** I aim to develop a factor-graph-based system that preintegrates contact and IMU data to maintain high-frequency tracking even during rapid, agile movements

--

## V. Conclusion (30 Seconds)
- **The Impact:** This research will bridge the gap between sophisticated SLAM algorithms and the physical constraints of miniature, bio-inspired hardware
- **Goal:** To enable ubiquitous teams of spatially aware robots capable of navigating complex, unstructured environments where traditional GPS and heavy sensors fail
