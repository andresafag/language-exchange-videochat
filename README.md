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

🌐 https://your-app-url.com  

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

Challenges & Learnings 

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

