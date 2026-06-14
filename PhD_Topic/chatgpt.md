# Research Plan

## PhD Topic

Locomotion-Aware Embedded SLAM for Bio-Inspired Climbing Robots

## Duration

4 Years (48 Months)


## Research Vision

The objective of this research is to develop a **locomotion-aware SLAM and state estimation framework** for **miniature bio-inspired wall-climbing robots** exhibiting **hybrid and discontinuous locomotion dynamics**. Wall-climbing robots operating on industrial structures (bridges, pipelines, storage tanks) face a unique intersection of challenges: non-Euclidean motion constrained to surfaces, contact-driven dynamics with frequent phase transitions, and severe limits on sensing, power, and computation. Conventional SLAM frameworks — designed for ground vehicles or aerial platforms with smooth dynamics — systematically fail under these conditions.

The central hypothesis is that explicitly modeling locomotion phase transitions, contact events, and traversable surface manifolds within a unified probabilistic factor-graph framework will yield significantly more accurate localization and consistent mapping than systems that treat robot motion as smooth and unconstrained. A secondary hypothesis is that this framework can be made computationally tractable on Jetson Orin Nano / Raspberry Pi CM5 class hardware without sacrificing real-time performance through sparse optimization and event-driven updates.

The **primary robotic platform** is a miniature wall-climbing robot (magnetic or dry-adhesion based). A miniature hexapod serves as a secondary validation platform. An inchworm robot is an optional extension if time permits.


## Research Questions

### RQ1

How can hybrid locomotion dynamics and contact-state transitions be formally incorporated into a probabilistic state estimation framework for robots with intermittent ground contact?

### RQ2

What multi-sensor fusion architecture enables reliable, real-time state estimation under the simultaneous constraints of low-power embedded hardware, partial observability, and high locomotion noise?

### RQ3

How can traversable surface manifolds be represented and exploited within a SLAM framework to enable surface-aware loop closure, pose graph optimization, and consistent mapping?

### RQ4

Under what conditions — in terms of surface geometry, locomotion speed, and sensor configuration — does explicit locomotion-phase modeling yield a measurable and statistically significant improvement over conventional visual-inertial SLAM baselines?

## Research Objectives

### Objective 1

Develop a formal mathematical model for hybrid locomotion dynamics and contact state transitions applicable to climbing robots.

### Objective 2

Design a unified factor-graph state estimator that incorporates locomotion phase, contact events, and surface constraints as first-class factors.

### Objective 3

Develop a resource-efficient multi-sensor fusion architecture validated on embedded hardware with characterized performance-accuracy tradeoffs.

### Objective 4

Create a manifold-aware mapping and loop closure framework for constrained surfaces.

### Objective 5

Collect an open benchmark dataset and validate the complete framework against named SLAM baselines through structured ablation experiments.

## Related Work and Research Gap

The closest competing works are:

- **VINS-Mono** (Qin et al., 2018) and **ORB-SLAM3** (Campos et al., 2021): visual-inertial SLAM systems that assume smooth dynamics and are designed for ground/aerial robots. They have no contact or locomotion-mode models and degrade under high-vibration, stop-and-go motion.
- **VILENS** (Wisth et al., 2023): legged robot state estimator with contact factors, but designed for large-scale quadrupeds with abundant onboard compute (x86 PCs), not embedded miniature platforms.
- **LIO-SAM** (Shan et al., 2020): tightly-coupled LiDAR-IMU SLAM with no contact model or surface manifold representation.
- **SuMa++**: surface-based mapping using normal distributions, but designed for ground vehicles on flat terrain.

**The gap**: No existing system jointly addresses (1) miniature scale and embedded compute constraints, (2) explicit hybrid locomotion phase modeling for climbing dynamics, and (3) surface-manifold-aware mapping and loop closure. This research targets that intersection.

## Phase 1: Literature Review and Problem Formulation

### Goals

* Survey SLAM for legged and climbing robots, identifying failure modes on hybrid-dynamic platforms
* Review hybrid dynamical systems theory (Piecewise Affine systems, Hybrid Automata) for locomotion modeling
* Survey factor graph optimization (GTSAM, Ceres) and manifold optimization (Lie groups, iSAM2)
* Characterize performance of ORB-SLAM3, VINS-Mono, LIO-SAM, and LOAM on climbing-robot data to establish quantitative baselines

### Deliverables

* Structured literature review with explicit gap analysis
* Quantitative baseline characterization on existing climbing-robot datasets
* Mathematical problem formulation

### Publication

Systematic Review: *SLAM and State Estimation for Resource-Constrained Bio-Inspired Robots* — target: **IEEE RA-L or Autonomous Robots**

### Workshop Paper

Submit a position/workshop paper to an **ICRA or IROS Workshop on Legged Locomotion and SLAM** (Month 10–12) to establish early community presence and receive feedback before Phase 2 begins.

## Phase 2: Hybrid Motion Modeling

### Problem

Existing SLAM systems assume smooth motion. Bio-inspired climbing robots exhibit:

* Intermittent contacts with unpredictable slip
* Gait phase transitions (swing, stance, climbing, transition)
* Stop-and-go locomotion with near-zero velocity coasting
* High-frequency vibration during adhesion cycling

### Novelty Over Prior Art

Standard Switching Kalman Filters and HMMs exist but have not been applied to the specific dynamics of miniature climbing robots where: (1) contact events produce impulsive accelerations that can saturate MEMS IMUs, (2) adhesion-based locomotion introduces surface-normal force coupling absent in legged walkers on flat ground, and (3) mode transitions are partially observable from onboard sensing alone. The novel contribution is a **contact-aware process model** that explicitly handles IMU saturation windows and uses tactile confirmation signals to reduce mode-switching latency.

### Research Tasks

#### 1. Hybrid State Model

State vector:

$$x_t = [p_t,\ v_t,\ R_t,\ b_t,\ m_t,\ s_t]$$

where:

* $p_t$: position
* $v_t$: velocity
* $R_t$: orientation ($SO(3)$)
* $b_t$: IMU bias
* $m_t$: locomotion mode (discrete: swing / stance / climbing / transition)
* $s_t$: per-leg binary contact state vector

#### 2. Mode Switching Model

Mode detection uses a **Hybrid Bayesian Filter** combining:

* IMU pre-integration residuals as motion evidence
* Tactile force thresholds as hard contact evidence
* A learned transition prior trained on recorded gait data

This avoids pure HMM approaches (which require large labeled datasets) and pure threshold detectors (which are brittle to surface variation).

### Deliverables

* Hybrid locomotion estimator with characterized mode-detection accuracy and latency
* Contact-aware IMU pre-integration model

### Dataset Note

Hardware data collection begins at Month 12 (see Phase 6) to support training the transition prior in parallel with Phase 2 development.

### Publication

*Hybrid Dynamics-Aware State Estimation for Miniature Climbing Robots* — target: **ICRA** (Year 2)

## Phase 3: Multi-Sensor Fusion Framework

### Sensors

#### 1. Vision

* Monocular or stereo camera (configuration selected by embedded power budget characterization in Phase 5)

#### 2. Inertial

* 6-DOF IMU with contact-event-aware pre-integration

#### 3. Range

* Solid-state LiDAR (e.g., Livox MID-360) for surface geometry

#### 4. Magnetometer

Included for heading reference on outdoor structures, but treated with **explicit disturbance modeling**. Magnetic anomaly maps of the working surface are built online as a separate map layer; readings with anomaly residuals above a tuned threshold are down-weighted or excluded. Environments with dense ferromagnetic structure (e.g., inside steel pipes) are flagged as magnetometer-degraded and the sensor is excluded.

#### 5. Tactile / Force Sensors

Per-leg force/tactile sensing serves dual roles: (a) contact state confirmation for the hybrid mode model (Phase 2), and (b) surface adhesion quality estimation to modulate pose uncertainty during slip-prone locomotion. A dedicated **tactile factor** links force readings to contact state estimates and slip probability in the factor graph.

### Research Tasks

The factor graph objective:

$$P(X \mid Z) \propto \prod_{i} f_i(X_i, Z_i)$$

Novel factors — not available in GTSAM out of the box — are:

| Factor | Description |
|---|---|
| $f_{\text{contact}}$ | Zero-velocity update with surface-normal constraint on contact events |
| $f_{\text{mode}}$ | Locomotion mode prior: adjusts process noise covariance per phase |
| $f_{\text{surface}}$ | Surface constraint: penalizes poses that leave the traversable manifold |
| $f_{\text{tactile}}$ | Binary contact likelihood from per-leg force readings |
| $f_{\text{mag}}$ | Disturbance-aware magnetometer: soft heading factor with anomaly residual weight |

Optimization uses **iSAM2** within a sliding window to bound computation on embedded hardware. Window size is a tunable parameter traded against memory, with the Pareto curve characterized in Phase 5.

### Deliverables

* Open-source GTSAM extension implementing the five novel factors above
* Benchmark of fusion accuracy versus compute cost at varying window sizes

### Publication

*Hybrid Multi-Sensor Factor Graph SLAM for Bio-Inspired Climbing Robots* — target: **IJRR or IEEE RA-L** (submission Month 24, target acceptance Month 30)

## Phase 4: Manifold-Aware Mapping and Loop Closure

### Motivation

Climbing robots move on walls, pipes, tanks, bridges, and other industrial structures. Traditional Euclidean occupancy maps and unstructured point clouds discard the geometric regularity of these surfaces, wasting memory and making loop closure harder.

### Map Representation

Surfaces are represented as a **piecewise planar/cylindrical mesh with per-face semantic labels** (floor, wall, pipe, curved surface). This is chosen over:

* Dense SDFs: too memory-intensive for embedded target platforms
* Unstructured point clouds: no surface-normal or manifold structure
* Gaussian process maps: too slow to update in real-time on target hardware

Robot motion is modeled on the manifold $\mathcal{M} \subset SE(3)$ where $\mathcal{M}$ is the set of poses consistent with surface contact:

$$\mathcal{M} = \{ T \in SE(3) \mid d(T,\ \text{surface}) < \varepsilon,\ \hat{n}(T) \cdot \hat{z}_{\text{robot}} > \cos\theta_{\text{max}} \}$$

### Loop Closure for Climbing Robots

Loop closure on climbing robots faces **perceptual aliasing**: uniform surfaces (painted steel, concrete) appear identical from multiple orientations. This is addressed with:

1. **Appearance-based descriptors** augmented with surface-normal orientation to disambiguate revisits from different approach angles
2. **Structural loop closure**: matching geometric primitives (planes, cylinders extracted via RANSAC from LiDAR) rather than purely visual features — more robust on textureless industrial surfaces
3. **Topological consistency check**: proposed loop closures must be consistent with the traversable manifold graph before being accepted into the pose graph

### Research Tasks

* Surface-aware pose graph optimization with manifold constraints
* Geometric primitive extraction from LiDAR scans (plane/cylinder RANSAC)
* Loop closure verification pipeline (appearance + geometry + topology)
* Topological map layer over geometric map

### Deliverables

* Manifold-constrained mapping framework with loop closure
* Quantitative map consistency evaluation on real structures

### Publication

*Manifold-Aware SLAM with Topological Loop Closure for Surface-Climbing Robots* — target: **IROS** (Year 3)

## Phase 5: Embedded SLAM Optimization

### Target Platforms

| Platform | Role |
|---|---|
| NVIDIA Jetson Orin Nano (8 GB) | Primary compute — full pipeline |
| Raspberry Pi CM5 | Secondary — stripped-down pipeline |
| STM32H7 + companion | Sensor fusion frontend only |

### Computational Optimization

* **Sparse optimization**: exploit sparsity in the factor graph Hessian using CHOLMOD or custom sparse Cholesky
* **Event-driven updates**: selectively re-linearize only factors whose variables changed beyond a threshold (iSAM2 relinearization threshold tuning)
* **Adaptive sensor scheduling**: drop LiDAR updates during slow locomotion; governed by a priority scheduler using estimated information gain per sensor modality

### AI-Assisted Components

Lightweight learned modules used as acceleration components (not core algorithmic contributions):

* Visual feature extraction: **SuperPoint** with knowledge distillation for reduced model size (preferred over MobileNet for geometric feature quality)
* Loop closure re-identification: **NetVLAD** compressed via quantization for Jetson deployment

### Deliverables

* Profiled real-time embedded implementation on Jetson Orin Nano and Raspberry Pi CM5
* Pareto curve: localization accuracy vs. compute cost across pipeline configurations

### Publication

*Resource-Efficient Locomotion-Aware SLAM for Miniature Autonomous Robots* — target: **IEEE RA-L** (submission Month 36)

## Phase 6: Experimental Validation

### Dataset Strategy (Starts Month 12)

Data collection begins in Year 1 to:

1. Train the locomotion mode transition prior (Phase 2)
2. Enable baseline comparisons before the full system is complete
3. Release an open benchmark dataset as a community contribution

The dataset includes ground-truth poses (motion capture for indoor; RTK-GPS + total station for outdoor), time-synchronized sensor streams, and labeled locomotion modes.

**Gap versus existing datasets**: TUM-VI (handheld/aerial), EuRoC (UAV), Hilti SLAM (construction-site walking), DARPA SubT (large wheeled/legged robots) — none provide climbing-robot data with labeled contact events on non-planar surfaces.

### Simulation Strategy

| Simulator | Purpose |
|---|---|
| **Gazebo (ROS 2)** | Algorithm development, rapid iteration, contact dynamics prototyping |
| **Isaac Sim** | High-fidelity adhesion dynamics for sim-to-real transfer study |
| **Webots** | Lightweight multi-platform CI regression testing |

Sim-to-real transfer is explicitly evaluated: algorithms tuned in simulation are tested on hardware without re-tuning, and the performance gap is measured and reported.

### Primary Platform

Wall-climbing robot (magnetic adhesion, 4–6 legs, target mass < 500 g). All core experiments use this platform.

### Secondary Platform

Miniature hexapod. Used for Phase 2 mode-switching validation and cross-platform generalization benchmarks.

### Optional Extension

Inchworm robot — excluded from core commitments; included only if schedule permits.

### Test Scenarios

#### Indoor

* Corridors, laboratory environments, industrial mockups (flat walls, pipes, corners)

#### Outdoor

* Bridges, concrete retaining walls, cylindrical storage tanks

#### Challenging Conditions

* Low-texture surfaces (painted steel, smooth concrete)
* Dynamic lighting and shadows
* Magnetic disturbances near ferromagnetic structures
* Slip events and partial contact loss

## Evaluation Metrics

### Localization

$$\text{ATE} = \left( \frac{1}{N} \sum_{i=1}^{N} \| \hat{p}_i - p_i^* \|^2 \right)^{1/2}$$

$$\text{RPE} = \left( \frac{1}{N} \sum_{i=1}^{N} \| \delta\hat{T}_i - \delta T_i^* \|^2 \right)^{1/2}$$

### Mapping

* Map consistency (loop closure residual)
* Surface reconstruction accuracy (Chamfer distance to ground-truth scan)

### Embedded Performance

* CPU utilization, memory usage, energy consumption (Wh/m), frame rate

### Navigation

* Mission success rate, failure recovery rate, mission completion time

### Ablation Study Design

| Ablation | Component Removed | Primary Metric Affected |
|---|---|---|
| A1 | Contact factors ($f_{\text{contact}}$) | ATE / RPE on slip-prone surfaces |
| A2 | Mode-switching model ($f_{\text{mode}}$) | ATE during gait transitions |
| A3 | Manifold constraint ($f_{\text{surface}}$) | Map consistency, loop closure rate |
| A4 | Tactile factors ($f_{\text{tactile}}$) | Mode detection latency, ATE |
| A5 | Learned loop closure | Loop closure recall on textureless surfaces |

### Named Comparison Baselines

* **ORB-SLAM3** (visual-inertial, monocular and stereo modes)
* **VINS-Mono** (visual-inertial odometry)
* **LIO-SAM** (LiDAR-IMU, where LiDAR is available)
* **LOAM** (LiDAR odometry and mapping)
* Ablated variants A1–A5 of the proposed system

## Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Hardware delays / robot damage | Medium | High | Simulation development begins Year 1; dataset collection starts Month 12 to decouple algorithm progress from hardware availability; backup platform maintained |
| Sim-to-real gap | High | Medium | Explicitly study and report the gap; real-hardware results reported without re-tuning from simulation |
| Journal revision cycles (6–12 months) | High | Medium | Journal submissions scheduled 6–12 months before their thesis-dependency date |
| Scope overrun across multiple platforms | Medium | High | Wall-climbing robot is the primary platform; hexapod and inchworm are explicitly optional; one publication per phase is the minimum commitment |

## Expected Scientific Contributions

### Theoretical

* Formal model of hybrid locomotion dynamics for miniature climbing robots, including IMU-saturation-aware contact pre-integration
* Manifold-constrained SLAM framework with pose graph consistency guarantees under surface constraints
* Empirical characterization of conditions under which locomotion-phase modeling improves over smooth-motion baselines (answering RQ4)

### Algorithmic

* Five novel GTSAM-compatible factor types: $f_{\text{contact}}$, $f_{\text{mode}}$, $f_{\text{surface}}$, $f_{\text{tactile}}$, $f_{\text{mag}}$
* Locomotion-phase-aware loop closure combining appearance descriptors, geometric primitives, and topological consistency verification
* Embedded optimization pipeline with characterized accuracy-compute Pareto tradeoff across two hardware platforms

### Practical

* Open-source GTSAM extension library (MIT license)
* First open benchmark dataset for bio-inspired climbing robots with ground-truth poses and labeled contact events — fills a gap not covered by TUM-VI, EuRoC, Hilti, or SubT datasets
* Embedded deployment toolkit with pre-characterized configurations for Jetson Orin Nano and Raspberry Pi CM5


## Timeline

| Period | Activities | Output |
|---|---|---|
| Year 1 (M1–M12) | Literature review; quantitative baseline characterization; problem formulation; hardware procurement; dataset collection begins M12 | Review paper; ICRA/IROS workshop paper (M10–12) |
| Year 2 (M13–M24) | Hybrid dynamics estimator; contact-aware factor graph; Phase 3 fusion initial implementation | ICRA/IROS paper (M18); journal 1 submission (M24) |
| Year 2–3 (M24–M30) | Multi-sensor fusion SLAM: full implementation, embedded profiling | Journal 1 acceptance target (M30) |
| Year 3 (M31–M36) | Manifold-aware mapping; loop closure; topological map layer; journal 2 submission (M36) | IROS paper (M36) |
| Year 3–4 (M37–M42) | Embedded optimization; full system integration; second dataset collection; ablation studies | Journal 2 acceptance target (M42) |
| Year 4 (M43–M48) | Full experimental validation; thesis writing | Thesis submission (M48) |

*Revision buffer*: Journal submissions are timed 6–12 months before their thesis-dependency date to absorb typical review and revision cycles.


## Target Venues

### Conferences

* IEEE International Conference on Robotics and Automation (ICRA)
* IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)
* Robotics: Science and Systems

### Journals

* IEEE Robotics and Automation Letters
* The International Journal of Robotics Research
* Autonomous Robots

## Conclusion

This research addresses a specific and currently unoccupied intersection in the SLAM literature: miniature bio-inspired climbing robots operating on non-Euclidean surfaces under severe sensing and computational constraints. Existing state-of-the-art systems (ORB-SLAM3, VINS-Mono, LIO-SAM) assume smooth dynamics and abundant compute, failing systematically on the target platform class. The proposed framework advances the field by contributing: (1) a formal contact-aware state estimation theory for hybrid climbing locomotion; (2) five novel GTSAM-compatible factors enabling a fully unified multi-modal SLAM backend; (3) the first open benchmark dataset for climbing robots with labeled contact events, filling a gap not covered by any existing public dataset; and (4) a characterized embedded deployment pipeline with a quantified accuracy-compute Pareto tradeoff. Each annual contribution stands independently as a published result while building toward a single coherent thesis on locomotion-aware embedded SLAM for bio-inspired climbing robots.
