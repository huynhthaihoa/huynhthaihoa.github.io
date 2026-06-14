# Unified State Estimation for Resource-Constrained Bio-Inspired Robotics

> This Future PhD Research Plan is structured over a four-year period, focusing on bridging advanced Lie-theoretic state estimation with the physical realities of bio-inspired robots operating on ultra-low-power hardware.

## Year 1: Mathematical Framework and Hybrid Modeling
The first year focuses on **establishing the theoretical core of the framework**, specifically addressing **non-smooth hybrid dynamics**:

### Research Goals
- **Modeling Discrete Transitions**: Develop and simulate stochastic models for hybrid motion phases (e.g., foot-ground impacts) using **saltation matrices** to propagate uncertainty through discrete state resets.

- **Invariant Filter Design**: Implement an **Invariant Extended Kalman Filter (InEKF)** on matrix Lie groups (specifically $SE_{k+2}$ (3)) for bipedal and quadrupedal models. This will ensure trajectory-independent error dynamics and maintain consistent observability on unobservable manifolds (position and yaw).

- **Initial Simulation Benchmarking**: Use the **BIRDy framework** to evaluate different identification and filtering algorithms (EKF, UKF, InEKF) under varying noise conditions in a simulated environment.

### Key Deliverables
- A simulation environment (extending the BIRDy framework) for benchmarking hybrid bio-inspired locomotion.

- Validated mathematical derivation of the Hybrid-InEKF for $SE_{k+2}$(3) manifolds.

- 1 Conference/Journal publication (ICRA/IROS).

### CTU Academic Milestones

- Complete at least one professional course.

- Begin the "Study Block": formulate your Individual Study Plan (ISP) with Prof. Faigl

## Year 2: Hardware-Aware Perception and Tactile Fusion

The second year shifts toward **integrating innovative sensing modalities suitable for miniature platforms**:

### Research Goals

- **Focal-Plane Perception**: Develop a tightly-coupled **Visual-Inertial Odometry (VIO)** pipeline using **Focal-Plane Sensor-Processors (FPSP)** like the SCAMP-5. This involves moving feature extraction (e.g., BIT-descriptors) directly to the imager plane to achieve ~300 FPS tracking with sub-100 mW power consumption.

- **Distributed Tactile Feedback**: Integrate **artificial sensory skin** to measure contact wrenches and distributed inertial feedback. Research will focus on an **online sensor selection algorithm** to reduce data redundancy from the skin while maintaining accurate link-level acceleration estimates.

- **Bio-Inspired Proprioception**: Investigate **Neuromorphic Spiking Ring Attractors** for proprioceptive joint-state estimation, leveraging event-driven hardware to reduce computational load.

### Key Deliverables
- Embedded C++ library for on-sensor feature extraction and ultra-low-latency tracking (~300 FPS).

- An online sensor selection algorithm for redundant tactile arrays to reduce data overhead while maintaining accuracy.

- 1 Journal publication.

### CTU Academic Milestones

- Complete all compulsory professional subjects and pass examinations.

- Pass the English language examination (or provide a recognized certificate).

- Defend the "Minimum" Scientific Study: Successfully defend a formal study related to your dissertation topic to transition out of the study block.

## Year 3: Unified Framework and Embedded Optimization
The third year focuses on the "Unified" aspect — **building a modular SLAM architecture optimized for System-on-Chip (SoC) deployment**:


### Research Goals
- **Unified State Estimation Architecture**: Implement a framework (similar to FUSE) that decouples temporal processing, local geometric association, and the estimator backend. This allows for swapping between filtering (InEKF) and smoothing (Factor Graphs) backends without re-engineering the perception front-end.

- **Hierarchical Optimization**: To manage memory constraints on devices like the **RISC-V GAP9**, implement hierarchical **graph-based SLAM**. This method will optimize a sparse representation of the pose graph first, correcting the entire trajectory without exceeding the device's RAM limits (e.g., < 500 kB).

- **Reinforcement Learning for Adaptation**: Develop **RL-based adaptive sensor fusion** to allow the robot to learn how to weight different modalities (vision, IMU, tactile) based on the environment, such as slippery surfaces or low-light conditions.

### Key Deliverables

- A Modular SLAM library for SoC that allows swapping between InEKF and factor-graph backends without front-end changes.

- An RL-based adaptive fusion module that learns optimal sensor weighting for challenging terrains (e.g., slippery surfaces).

- 1 Conference/Journal publication.

### CTU Academic Milestones

- State Doctoral Examination: Successfully pass this comprehensive exam by the end of Year 3 (required for full-time students).

- International Stay: Spend at least one month with an international team at a foreign research institution or university.

## Year 4: Extension, Validation, and Thesis Completion
The final year focuses on **expanding the framework to complex scenarios and finalizing the doctoral work**:

### Research Goals

- **3D Nano-Mapping and Swarms**: Extend **NanoSLAM** from 2D to 3D occupancy mapping by acquiring depth measurements at various altitudes. Investigate **cooperative SLAM** for swarms of miniature robots, where agents align pose graphs through parallel sensing and inter-robot relative pose estimation.

- **Semantic Integration**: Explore lightweight **Semantic SLAM** using quantized deep learning models to identify objects and refine the map's contextual consistency on edge devices.

- **Final Hardware Validation**: Conduct exhaustive real-world tests on bio-inspired hardware (e.g., legged millirobots or palm-sized UAVs) in complex, cluttered environments (e.g., search and rescue mazes).

- **Thesis Writing and Defense**: Consolidate findings into a final dissertation, emphasizing the bridge between high-performance state estimation theory and resource-constrained hardware.

### Key Deliverables

- A 3D Swarm Mapping demonstration featuring teams of miniature robots navigating complex, cluttered environments (e.g., SAR mazes).

- Completed PhD Dissertation bridging SLAM theory and resource-constrained hardware.

- 1 Journal Publication.

### CTU Academic Milestones

- Finalize and submit the PhD Dissertation (must be submitted within 6 years, but 4 is the standard for full-time).

- Dissertation Defense: Successfully defend your research to be awarded the Ph.D. degree.

## Graduation Requirement Checklist Alignment
- **Form of Study**: Full-time (4 years) with scholarship.

- **Language**: Proficiency in English (Exam/Cert in Year 2).

- **Publications**: Exceeds the CTU requirement of at least three scientific papers as principal author in renowned journals/conferences.

- **International Experience**: Met through the mandatory one-month foreign stay in Year 3.