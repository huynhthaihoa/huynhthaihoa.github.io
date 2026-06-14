# 5-Minute Research Presentation
**SLAM and State Estimation for Resource-Constrained Bio-Inspired Robots with Hybrid Locomotion Dynamics**

---

## Slide 1 — Opening Hook (30 seconds)

> Imagine a robot the size of your hand — legged, inchworm-like, or gecko-inspired — crawling along the inside of an aging bridge support or the outer shell of an industrial pipeline, inspecting weld joints and detecting cracks with no GPS, no heavy sensor rig, and no tether. That is the vision driving my PhD, supervised by Prof. Jan Faigl at the Czech Technical University in Prague.

> My name is Hoa, and my research sits at the intersection of two things I have spent my career on: getting perception algorithms to run in real time on constrained hardware, and making robots understand where they are in the world.

---

## Slide 2 — Past Research (1 minute 30 seconds)

> My foundation in localization began during my Master's at Soongsil University, where I worked as a research assistant at ANDA Lab on vehicle localization centered on taillight detection. That work produced three journal papers: a paper on overlapping LED detection in IEEE Access (2019), a Korean domestic journal paper on nighttime LED taillight detection (2020), and a paper on taillight matching for stereo vision-based nighttime vehicle positioning in MDPI Applied Sciences (2020) — together culminating in my Master's thesis. The core problem — answering "where am I?" using only onboard sensors — is the thread that runs through everything since.

> After graduating, I joined DeltaX in June 2022 as an AI Researcher. From December 2023, I led the R&D team building their In-Cabin Monitoring System — a C/C++ pipeline integrating up to eight deep learning models on a System-on-Chip, targeting Texas Instruments SK-TDA4VM/TDA4AEN and Samsung Exynos V920. The hard constraint was real-time at 14 FPS under strict power and memory limits. To meet it, I developed lightweight algorithms for monocular depth estimation and pseudo-LiDAR, giving the system spatial awareness without dedicated depth hardware. In 2023, I also contributed to the Second Monocular Depth Estimation Challenge at CVPR.

> These two threads — sensor-based localization from my Master's and embedded real-time perception from industry — define the entry point for my PhD.

---

## Slide 3 — The Problem (45 seconds)

> Here is the gap I am targeting. Bio-inspired robots — small-legged walkers, inchworm-like climbers, and friction-anisotropic robots that exploit directional adhesion to grip surfaces — face a state estimation problem that no existing SLAM system is built to handle.

> Current state-of-the-art — ORB-SLAM3, VINS-Mono, LIO-SAM — all share one critical assumption: that robot motion is smooth and continuous. Bio-inspired climbers violate this constantly. Every footstep is a discrete contact event. Every adhesion cycle in a friction-anisotropic climber produces an impulsive force discontinuity. The robot moves on a non-planar surface — a curved pipe, a sloped wall — and the map must reflect that geometry.

> No existing system jointly addresses miniature scale, hybrid locomotion dynamics, and surface-manifold-constrained mapping. That is the specific gap this research fills.

---

## Slide 4 — PhD Research Plan (1 minute 45 seconds)

> My PhD is structured across four years and five phases, each targeting a publication.

> In Year 1, I establish baselines. I will run ORB-SLAM3, VINS-Mono, and LIO-SAM on bio-inspired robot data — including locomotion profiles from climbing and multi-legged platforms being developed within Prof. Faigl's group — and measure exactly where they fail and by how much. This produces a benchmark paper and sets the quantitative bar I need to beat.

> In Year 2, I build the core estimation theory. The central contribution is a contact-aware state estimator that explicitly models locomotion phases — swing, stance, climbing, transition — using an Invariant Extended Kalman Filter on a matrix Lie group representation. The key mathematical challenge is at the moment of contact impact: each footstrike is a non-smooth event, and I will apply saltation matrices to propagate estimation uncertainty through those discrete jumps without divergence. This is a problem standard IMU pre-integration models do not address.

> In Year 2 to 3, I extend this into a full multi-sensor factor graph — fusing vision, IMU, LiDAR, contact, and magnetometer data. I will define novel factor types in GTSAM that the library does not currently provide: contact factors, surface-manifold constraints, tactile likelihood factors, and disturbance-aware magnetometer factors suited to magnetically noisy metallic environments.

> In Year 3, I tackle mapping. Bio-inspired climbers revisit textureless surfaces from different orientations — a catastrophic failure mode for appearance-based loop closure. My approach combines geometric primitive matching from LiDAR with topological consistency checking, so loop closures are only accepted if they are geometrically and topologically plausible.

> In Year 3 to 4, I bring the full system to resource-constrained embedded hardware — targeting platforms such as the NVIDIA Jetson Orin Nano — and characterize the accuracy-versus-compute tradeoff across sensor configurations and robot types.

---

## Slide 5 — Closing (30 seconds)

> By the end of four years, this research will deliver three things the community currently lacks: a formal theory of contact-aware state estimation for hybrid bio-inspired locomotion; open-source GTSAM factor implementations that any researcher can reuse; and a labeled benchmark dataset for bio-inspired robots with ground-truth trajectories on non-planar structures — a resource the field currently lacks in any systematic form.

> The ultimate goal is a robot that knows where it is, what surface it is on, and how its own discontinuous motion affects its map — whether it walks, inchworms, or climbs by directional friction alone. Thank you.

---

**Total word count: ~800 words — approximately 5 minutes at 150 wpm.**

**Slide count: 5** (one per section, cleanly paced).

---

## Corrections Applied (Round 2 — Source Alignment)

| Location | Previous Draft | Updated |
|---|---|---|
| Title | "Locomotion-Aware Embedded SLAM for Bio-Inspired Climbing Robots" | "SLAM and State Estimation for Bio-Inspired Robots with Hybrid Locomotion Dynamics" — aligns with official PhD topic title; restores "State Estimation" |
| Slide 1 | No institutional credit | Added: "supervised by Prof. Jan Faigl at the Czech Technical University in Prague" |
| Slide 1, 3 | "wall-climbing robots" only | Broadened to "legged, inchworm-like, or friction-anisotropic robots" per source description |
| Slide 3 | "friction-anisotropic" concept absent | Added and explained: robots that "exploit directional adhesion to grip surfaces" |
| Slide 4, Year 2 | "IMU saturation during contact impacts" | Replaced with "saltation matrices to propagate estimation uncertainty through discrete jumps" — correct mathematical treatment of non-smooth dynamics |
| Slide 4, Year 2 | "Hybrid Bayesian Filter" (generic) | Specified as "Invariant Extended Kalman Filter on a matrix Lie group representation" |
| Slide 4, Year 2–3 | "five novel factor types" (overclaim) | Removed specific count; described factor types without pre-committing to a number |
| Slide 4, Year 1 | No supervisor reference | Added reference to "Prof. Faigl's group" locomotion platforms as baseline data source |
| Slide 5 | "first public benchmark dataset" (unsourced claim) | Softened to "a resource the field currently lacks in any systematic form" |

---

## Slide 4 — PowerPoint Version (concise)

**4 Years · 5 Phases · 5 Publications**

| Phase | Period | Focus | Novel Contribution |
|---|---|---|---|
| 1 | Yr 1 | Baseline Audit | Evaluate ORB-SLAM3 / VINS-Mono / LIO-SAM on bio-inspired robot data; quantify failure modes |
| 2 | Yr 2 | Contact-Aware Estimator | InEKF on Lie groups + saltation matrices for non-smooth locomotion impacts |
| 3 | Yr 2–3 | Multi-Sensor Factor Graph | Novel GTSAM factors: contact · surface-manifold · tactile · magnetometer |
| 4 | Yr 3 | Manifold-Aware Mapping | Geometric + topological loop closure for textureless climbing surfaces |
| 5 | Yr 3–4 | Embedded Deployment | Full system on Jetson Orin Nano; accuracy-vs-compute characterization |

---

## Corrections from Reference Check (Round 1)

| Location | Original (inaccurate) | Corrected |
|---|---|---|
| Slide 2, SoC platform | "TI SK-TDA4 and later NVIDIA Jetson family" | "TI SK-TDA4VM/TDA4AEN and Samsung Exynos V920" — NVIDIA Jetson was at Ubay Solution (2020–2021), not DeltaX |
| Slide 2, ICMS leadership | "I led R&D" (implied from Jun 2022) | "From December 2023, I led the R&D team" |
| Slide 2, past research | No publications cited | 3 actual papers cited: IEEE Access 2019, MDPI 2020, CVPR Workshop 2023 |
| Slide 2, localization origin | Implied to start at DeltaX | Correctly traced to ANDA Lab (2018–2020) and Master's thesis |
| Slide 4, embedded target | "Jetson Orin Nano and Raspberry Pi CM5" | "Jetson Orin Nano" only — Raspberry Pi CM5 has no reference basis |
