# 🌍🗣️ Speakswap  
### *Jump into a language, join a room, and start speaking instantly.*

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-black?logo=express)
![PeerJS](https://img.shields.io/badge/WebRTC-PeerJS-blue?logo=webrtc)
![AWS](https://img.shields.io/badge/Hosted_on-AWS-orange?logo=amazon-aws)
![License](https://img.shields.io/badge/License-MIT-purple)

---

## 📖 Project Description

**Speakswap** is a real-time video chat web application designed to help users practice different languages by joining themed rooms 🌐. Each room represents a language (e.g., Spanish 🇪🇸, English 🇺🇸, Hindi 🇮🇳), where users can instantly connect with others via live audio and video.

💡 **Why it was built:**  
Learning a language requires practice, especially speaking. Speakswap removes friction by allowing users to instantly join live conversations without setup or scheduling.

🚀 **Problem it solves:**  
- Lack of real-time speaking opportunities  
- Difficulty finding conversation partners  
- Barriers to spontaneous language practice  

---

## 🔗 Live Demo

🌐 https://avgts9f85z.us-east-1.awsapprunner.com  

## ✨ Features

- 🎥 **Instant Video Chat** – Automatically enables camera and microphone upon joining a room  
- 🌍 **Language-Based Rooms** – Join rooms dedicated to specific languages  
- ⚡ **Real-Time Communication** – Powered by WebRTC for low-latency interactions  
- 🔗 **Peer-to-Peer Connections** – Built using PeerJS for scalable connections  
- 🧠 **Simple UI** – Clean interface using Pug templates  
- ☁️ **Cloud Deployment** – Hosted on AWS infrastructure  
- 🔐 **Secure Communication** – TURN/STUN server via Coturn ensures connectivity even behind NATs/firewalls  

---

## 🛠️ Tech Stack

**Frontend & Templating**
- 🎨 Pug (Template Engine)
- 🎨 CSS

**Backend**
- 🟢 Node.js
- 🚂 Express.js

**Real-Time Communication**
- 🔗 PeerJS (WebRTC abstraction layer)
- 📡 WebRTC (Audio/Video/Data streaming)

**Infrastructure & DevOps**
- ☁️ AWS App Runner (Node.js server hosting)
- 🖥️ AWS EC2 (Coturn STUN/TURN server)
- 🔄 GitHub Actions (CI/CD + security scanning)
- 📦 GitHub Repository (source control & deployment integration)

---


💬 How it works:

Select a language room 🌍
Allow camera & microphone access 🎥🎙️
Instantly connect with others in the room 🤝

SPEAKSWAP/
│── node_modules/        # Dependencies
│── public/              # Static assets
│   ├── china.png
│   ├── eiffel.png
│   ├── india.png
│   ├── liberty.png
│   ├── peers.min.js     # PeerJS client library
│   ├── spain.png
│   └── style.css
│
│── views/               # Pug templates
│   ├── index.pug        # Landing page
│   └── sala.pug         # Room page
│
│── app.js               # Main server entry point
│── Dockerfile           # Container configuration
│── package.json         # Project metadata & dependencies
│── package-lock.json    # Dependency lock file

🧩 Challenges & Learnings

Building Speakswap involved more than just wiring up video calls—it required understanding the complexities of real-time communication, networking, and deployment at scale. Here are some of the key challenges I encountered and what I learned from them:

🌐 WebRTC Beyond Local Networks

Initially, everything worked perfectly within my local network. Devices could join rooms and communicate seamlessly, which led me to underestimate the importance of a TURN server.

However, once I deployed the application using AWS App Runner, users in different networks were unable to see or hear each other. This exposed a critical gap in my understanding.

💡 What I learned:

WebRTC relies on ICE (Interactive Connectivity Establishment) to find the best path between peers
STUN servers help discover public IPs, but are not always enough
NATs and firewalls can block direct peer-to-peer connections

🚀 Solution:
I implemented a Coturn server on an EC2 instance, which acts as a TURN relay server, allowing media to flow between peers even when direct connections fail.

👉 This was a turning point in understanding how real-world networking constraints affect peer-to-peer systems.

🔐 SSL & Deployment Misconceptions

While setting up secure communication, I initially configured SSL manually using cert.pem and key.pem.

Later, I realized that AWS App Runner automatically provisions and manages HTTPS certificates, making my manual setup unnecessary.

💡 What I learned:

Managed services like AWS App Runner abstract away infrastructure concerns
Over-configuring can introduce unnecessary complexity
Always verify what your platform already provides before implementing custom solutions.

🔄 Managing Real-Time Peer Connections

Handling multiple users joining and leaving rooms dynamically introduced challenges in connection lifecycle management.

💡 Challenges included:

Ensuring new users connect to all existing peers in a room
Preventing duplicate or stale connections
Cleaning up connections when users disconnect unexpectedly

🧠 What I learned:

Real-time systems require careful event handling and state synchronization
Peer-to-peer architectures shift complexity from server → client coordination
📡 Debugging WebRTC is Hard

Unlike traditional HTTP requests, WebRTC failures are often silent or difficult to trace.

💡 Challenges included:

No clear error messages when connections fail
Inconsistent behavior across networks
Browser-specific quirks

🧠 What I learned:

Use browser tools like chrome://webrtc-internals for debugging
Logging ICE candidates and connection states is essential
Testing across different networks (WiFi, mobile hotspot, etc.) is critical.


📡 Debugging WebRTC is Hard

Unlike traditional HTTP requests, WebRTC failures are often silent or difficult to trace.

💡 Challenges included:

No clear error messages when connections fail
Inconsistent behavior across networks
Browser-specific quirks

🧠 What I learned:

Use browser tools like chrome://webrtc-internals for debugging
Logging ICE candidates and connection states is essential
Testing across different networks (WiFi, mobile hotspot, etc.) is critical
⚖️ Tradeoffs of Peer-to-Peer Architecture

Using PeerJS simplified WebRTC implementation, but it also came with tradeoffs.

💡 Considerations:

Easier setup vs. less control over low-level WebRTC behavior
Scalability limitations as peers increase in a room
Dependency on signaling server reliability

🧠 What I learned:

Abstractions accelerate development but require understanding what’s happening underneath
Architectural decisions always involve tradeoffs
☁️ Deployment & Environment Differences

Moving from local development to cloud deployment introduced unexpected issues.

💡 Challenges included:

Environment variable differences
Network restrictions in cloud environments
Latency and performance variations

🧠 What I learned:

“Works on my machine” doesn’t translate to production
Always test in environments that mimic real-world usage
🚀 Key Takeaway

The biggest lesson from building Speakswap is that real-time applications are as much about networking as they are about code.

Understanding concepts like:

NAT traversal
STUN vs TURN
Peer connection lifecycles

…is essential to building reliable, production-ready communication systems.


📜 License

This project is licensed under the MIT License 📝
Feel free to use, modify, and distribute it.

🙌 Acknowledgements & Author

👨‍💻 Andrés Acosta
📧 Contact: (add your email or LinkedIn here)

Special thanks to:

PeerJS community 🔗
WebRTC ecosystem 🌐
AWS for cloud infrastructure ☁️

⭐ Final Thoughts

Speakswap is all about breaking language barriers and making communication effortless 🌍❤️
Jump in, turn on your camera, and start speaking!

