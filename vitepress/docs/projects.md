# Public Projects & Achievements

## GPU-RSFK (GPU Random Sample Forest KNN)

GPU-accelerated (CUDA) approximate k-nearest-neighbor graph construction, exposing a Python API for large-scale workloads.

- What it does: builds an approximate K-NN Graph (K-NNG) using a Random Sample Forest KNN (RSFK) strategy with optional neighbor-exploration refinement.
- Why it’s useful: reduces the cost of naive $O(n^2)$ neighborhood construction and targets million-scale point clouds.
- Tech: CUDA + C/C++ core, Python bindings; Docker/Docker Compose support for reproducible builds.
- Links: repo [github.com/BrunoMeyer/gpu-rsfk](https://github.com/BrunoMeyer/gpu-rsfk) (see also `DOCKER.md` and `examples/` in the repo)

## MENTORED Testbed

Cybersecurity experimentation testbed focused on repeatable “from modeling to experimentation” workflows (including DDoS and zero-day research contexts) under the MENTORED project.

- What it does: helps researchers define and automate experiment network topologies (YAML-driven), run experiments with pre-configured Docker images, and follow a guided workflow.
- Context: cooperative academic/RNP initiative (Projeto Temático FAPESP/MCTIC 2018/23098-0).
- Tech: a mix of TypeScript + Python + web assets; container-first approach.
- Links: repo [github.com/mentoredtestbed/MENTORED-Testbed](https://github.com/mentoredtestbed/MENTORED-Testbed) (project site: [mentored.dcc.ufmg.br](https://mentored.dcc.ufmg.br/))

## Microbiome Network Analysis (Machine Learning)

Pipeline + visualization artifacts for microbial community network analysis, developed in the context of an academic publication on anaerobic reactors.

- What it does: processes microbiome/taxon data, computes scores (including Random Forest–based feature importance), and produces interactive HTML pages.
- Outputs: dashboards such as “Scores”, “Taxon importance chart”, and a correlation network/graph view.
- Tech: Python + HTML + shell scripts; includes a Dockerfile for execution.
- Links: repo [github.com/BrunoMeyer/Microbiome-Network-with-Machine-Learning](https://github.com/BrunoMeyer/Microbiome-Network-with-Machine-Learning)

## SSMT-IDS

Intrusion detection work applying deep learning techniques.

- Status: the provided GitHub link currently returns 404, so I couldn’t pull README details automatically.
- Links: [github.com/BrunoMeyer/ssmt-ids](https://github.com/BrunoMeyer/ssmt-ids/)

## JMSA 2 (Java Mass Spectrometry Analyzer)

Desktop Java application for analyzing MALDI-TOF mass spectrometry data for microorganism identification.

- Key features: spectra management/annotation, hierarchical clustering + Newick export, similarity search (Needleman–Wunsch based), “super spectra” generation, similarity matrix, and spectra visualization.
- How to get it: releases and docs are linked from the repo (release line includes v2.1.3).
- Tech: Java (desktop GUI), supporting libraries for charts/clustering/config.
- Links: repo [github.com/BrunoMeyer/jmsa](https://github.com/BrunoMeyer/jmsa) (wiki: [github.com/BrunoMeyer/jmsa/wiki](https://github.com/BrunoMeyer/jmsa/wiki))

## HIM (Healthcare Intelligent Map)

Front-end data visualization tool for healthcare reports: users upload a spreadsheet and the processing happens locally in the browser.

- What it does: visualizes and searches patient/report data on Google Maps (markers + polygons), including filters (diseases, programs, active/inactive).
- Architecture notes: uses Firebase + Google Maps APIs; includes local caching to reduce repeated geocoding/lookups.
- Tech: JavaScript + HTML/CSS; no centralized backend required.
- Links: repo [github.com/BrunoMeyer/healthcare_inteligent_map](https://github.com/BrunoMeyer/healthcare_inteligent_map)

# Highlights

- Led a development team to implement **MENTORED Testbed**: a cybersecurity testbed and web system with a cloud-provider-like workflow (provisioning, access, monitoring) for multi-cluster Kubernetes environments. Intended as a self-hosted alternative to cloud providers.
- Obtained research funding to present articles at relevant international conferences.
- Invited to serve on master’s thesis committees, teach courses at academic/technical events, and give academic lectures.
- Ongoing personal project: enabling Docker and Kubernetes on Android by developing a new container runtime (CRI) and forking Minikube/Kubernetes to modify the Kubelet module.
