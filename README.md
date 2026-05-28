# 🌍 Speakswap

### Real-Time Language Exchange Platform Powered by WebRTC & LiveKit

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-black?logo=express)
![LiveKit](https://img.shields.io/badge/LiveKit-WebRTC-blue)
![WebRTC](https://img.shields.io/badge/WebRTC-RealTime-orange)
![AWS](https://img.shields.io/badge/Hosted_on-AWS-orange?logo=amazon-aws)
![Docker](https://img.shields.io/badge/Containerized-Docker-blue?logo=docker)
![License](https://img.shields.io/badge/License-MIT-purple)

---

# 📖 Overview

**Speakswap** is a real-time video communication platform designed to help users practice foreign languages through spontaneous live conversations.

Users can instantly join language-based rooms (English, Spanish, Hindi, Mandarin, French, etc.) and communicate through low-latency video and audio streaming powered by **WebRTC** and **LiveKit**.

The project was built to explore production-grade real-time communication systems, WebRTC networking, NAT traversal, scalable media infrastructure, and cloud-native deployment workflows.

---

# 🚀 Live Demo

🌐 https://avgts9f85z.us-east-1.awsapprunner.com

---

# ✨ Features

* 🎥 Real-time video & audio communication
* 🌍 Language-specific conversation rooms
* ⚡ Low-latency WebRTC streaming using LiveKit
* 🔊 Active speaker detection & dynamic video stage
* 🎙️ Camera and microphone controls
* 🔐 Secure token-based room authentication
* ☁️ Cloud-native deployment on AWS App Runner
* 🖥️ TURN/STUN infrastructure using Coturn on EC2
* 📱 Responsive browser-based experience
* 🧠 Adaptive streaming & bandwidth optimization

---

# 🏗️ Architecture

Speakswap uses a modern real-time communication architecture built around **LiveKit**, which abstracts much of the complexity of WebRTC while still exposing production-level RTC concepts.

## High-Level Flow

1. User selects a language room
2. Express backend generates a secure LiveKit access token
3. Client connects to LiveKit server over WebSocket
4. WebRTC media streams are negotiated automatically
5. Coturn TURN/STUN services assist NAT traversal when necessary

---

# 🛠️ Tech Stack

## Frontend

* Pug Template Engine
* Vanilla JavaScript
* CSS

## Backend

* Node.js
* Express.js

## Real-Time Communication

* LiveKit
* WebRTC
* Coturn (TURN/STUN)

## Infrastructure & DevOps

* AWS App Runner
* AWS EC2
* Docker
* GitHub Actions
* GitHub

---

# ☁️ Cloud Infrastructure

## AWS App Runner

Used to deploy and scale the Node.js application with managed HTTPS and automatic service provisioning.

## EC2 + Coturn

A dedicated EC2 instance hosts Coturn TURN/STUN services to support reliable peer connectivity across restrictive NATs and firewalls.

## Dockerized Services

The application and RTC infrastructure are containerized for portability and easier deployment management.

---

# 🔐 Authentication & Security

Speakswap uses secure server-generated LiveKit JWT access tokens to authenticate users and authorize room access.

Additional security measures include:

* HTTPS via AWS-managed certificates
* WSS (secure WebSockets)
* TURN relay fallback for restricted networks
* Environment-variable based configuration

---

# 📂 Project Structure

```bash
SPEAKSWAP/
│
├── public/                  # Static assets
│   ├── style.css
│   ├── script.js
│   └── assets/
│
├── views/                   # Pug templates
│   ├── index.pug
│   └── sala.pug
│
├── app.js                   # Main Express server
├── Dockerfile               # Container configuration
├── package.json
├── package-lock.json
│
└── .github/
    └── workflows/           # CI/CD pipelines
```

---

# 💬 How It Works

1. Select a language room 🌍
2. Enter a display name 👤
3. Allow camera & microphone access 🎥🎙️
4. Connect instantly with participants in the room 🤝

---

# 🧠 Engineering Challenges & Learnings

Building Speakswap provided hands-on experience with real-world challenges in distributed communication systems and WebRTC infrastructure.

## 🌐 Understanding NAT Traversal

One of the biggest challenges was moving from local-only testing to internet-scale connectivity.

While the application worked correctly within the same local network, remote users behind different NATs and firewalls experienced connection failures.

### Key Learnings

* How ICE negotiation works
* Differences between STUN and TURN servers
* Why direct peer-to-peer communication often fails in production environments
* The importance of relay fallback infrastructure

### Solution

Implemented a dedicated Coturn TURN server hosted on AWS EC2 to relay media traffic when direct peer connections are unavailable.

---

## 🚀 Migrating from PeerJS to LiveKit

The initial architecture used PeerJS for signaling and peer coordination. As the application evolved, the system was migrated to LiveKit to improve reliability, scalability, and media handling.

### Why the Migration Happened

* Better room and participant management
* More reliable media handling
* Built-in scalability features
* Native active speaker detection
* Improved bandwidth optimization
* Cleaner production-grade architecture

### Key Takeaway

This migration provided valuable experience evaluating architectural tradeoffs between lightweight abstractions and specialized RTC platforms.

---

## 📡 Debugging WebRTC in Production

Debugging RTC systems proved significantly more complex than traditional web applications.

### Challenges

* Silent connection failures
* Browser autoplay audio restrictions
* Inconsistent network behavior
* ICE negotiation failures
* Media track synchronization

### Tools & Techniques Used

* `chrome://webrtc-internals`
* ICE candidate logging
* LiveKit room event inspection
* Cross-network testing (WiFi, hotspot, VPN)

---

## ☁️ Cloud Deployment Realities

Deploying real-time applications in the cloud introduced multiple operational considerations.

### Challenges

* Environment variable management
* Secure WebSocket configuration
* Reverse proxy & SSL behavior
* Service-to-service networking
* Cloud latency differences

### Key Learning

Real-time systems behave very differently in production compared to local development environments.

---

# 📈 Technical Highlights

* Implemented secure JWT-based RTC authentication
* Integrated LiveKit real-time media infrastructure
* Designed dynamic participant/video rendering logic
* Implemented active speaker stage switching
* Built cloud-native deployment workflow on AWS
* Configured TURN/STUN infrastructure for global connectivity
* Managed media device lifecycle and browser permissions

---

# 🔮 Future Improvements

* Chat messaging system
* Screen sharing support
* User matchmaking
* Room moderation
* Usage analytics
* Multi-region deployment
* Authentication system
* Persistent user profiles

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

## Andrés Acosta

Passionate about:

* Real-time systems
* Cloud infrastructure
* WebRTC
* Backend engineering
* Distributed applications

### Connect With Me

* LinkedIn: [linkedin profile](https://linkedin.com/in/andrés-acosta-203923238)
* Email: andresfelipeacostagarcia34@gmail.com

---

# 🙌 Acknowledgements

Special thanks to:

* LiveKit
* WebRTC community
* Coturn project
* AWS
* Open-source contributors

---

# ⭐ Final Notes

Speakswap was built as both a language-learning platform and a deep technical exploration into real-time communication systems.

The project strengthened my understanding of:

* WebRTC architecture
* Media streaming
* NAT traversal
* Cloud deployment
* Scalable RTC infrastructure
* Event-driven application design

It represents practical experience building and deploying production-oriented real-time applications from the ground up.
