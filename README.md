# ⚡ ELENTRO

**Next-Generation Electoral Intelligence & Simulation Platform**

Elentro is a high-fidelity, AI-powered election simulation platform designed to mirror the complexities of the Indian electoral process. Built with **Next.js 15**, **Three.js**, and **Google Gemini 1.5 Pro**, it provides an immersive, data-driven journey from voter registration to result declaration.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/anikettagor2/elentro/actions/workflows/main.yml/badge.svg)](https://github.com/anikettagor2/elentro/actions)

## 🌟 Key Features

### 1. 🌍 Immersive 3D Geospatial Intelligence
Utilizes `Three.js` and `@react-three/fiber` to visualize global electoral data points on a high-fidelity 3D globe. Real-time atmospheric effects and interactive spatial markers provide a cinematic data exploration experience.

### 2. 🤖 AI Strategic Assistant (Gemini-Powered)
A persistent, context-aware AI assistant that leverages **Google Gemini 1.5 Pro** to provide:
- Real-time campaign strategy analysis.
- Demographic sentiment modeling.
- Automated election manifesto generation.
- Real-time Q&A on ECI protocols and constitutional mandates.

### 3. 🗺️ Interactive Polling Station Mapping
Integration with `Leaflet` for precise geographic allocation of polling stations. Features include:
- Dark-mode cartography.
- Virtual station discovery.
- Simulated voter density heatmaps.

### 4. 📈 Real-time Tabulation & Visualization
Dynamic counting simulation with `Recharts`. Experience the high-stakes environment of result declaration with live-animating data streams and secure checksum verification simulations.

### 5. 🛡️ Enterprise-Grade Security
- **Secure ID Generation**: Simulated ECI-protocol handshakes for virtual voter registration.
- **Header Protection**: Advanced CSP and XSS protection via custom Next.js middleware.
- **Stateless Architecture**: Scalable, high-performance infrastructure ready for Google Cloud Run.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS
- **3D Engine**: Three.js, React Three Fiber, Framer Motion
- **AI/ML**: Google Gemini 1.5 Pro (Vertex AI API)
- **State Management**: Zustand (with Persistence)
- **Mapping**: React-Leaflet, OpenStreetMap
- **Charts**: Recharts

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm
- Google Cloud API Key (with Gemini 1.5 Pro enabled)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anikettagor2/elentro.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

---
Built with ❤️ by **Aniket Tagor** for the future of Digital Democracy.
