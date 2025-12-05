Markdown

#  Pickaflick - AI-Powered Movie Companion

![Pickaflick Banner](https://pickaflick.live/logo.png) [![Live Demo](https://img.shields.io/badge/🔴_Live_Demo-pickaflick.live-red?style=for-the-badge&logo=vercel)](https://pickaflick.live)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)](https://firebase.google.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)

**Pickaflick** is a cutting-edge movie recommendation platform that leverages **Artificial Intelligence (OpenAI GPT)** to revolutionize how users discover content. Unlike traditional streaming sites, Pickaflick allows users to search for movies using natural language prompts (e.g., *"Movies that feel like a rainy day in London"*), delivering highly curated results instantly.

Beyond discovery, it features a powerful **"Studio"** suite with tools like **VPN Scout** (global streaming availability), **Marathon Calculator** (binge-watch planning), and **Dynamic Duo** (actor/director collaborations).

---

##  Key Features

###  **AI-Powered Discovery (GPT Search)**
- **Natural Language Search:** Forget keyword matching. Ask for *"movies with mind-bending plot twists like Inception"* and get accurate suggestions.
- **Multi-Language Support:** Fully localized search interface supporting **English, Hindi, Spanish, French, German, Japanese, and Chinese**.

###  **The Studio (Utility Suite)**
- **🌍 VPN Scout:** Check global streaming availability for any movie across 8+ major countries (US, IN, UK, CA, etc.).
- **🏃‍♂️ Marathon Calculator:** Calculate exactly how long it takes to binge-watch an entire franchise (e.g., Marvel Cinematic Universe).
- **🤝 Dynamic Duo:** Enter two names (Actor/Director) to instantly find every movie they have collaborated on.

###  **Core Experience**
- **Cinematic UI:** A Netflix-inspired, "True Black" OLED-friendly design with autoplaying trailers and immersive backdrops.
- **Authentication:** Secure Google & Email authentication via Firebase.
- **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop.

---

##  Tech Stack

- **Frontend:** React.js, Redux Toolkit (State Management)
- **Styling:** Tailwind CSS, Material UI (MUI)
- **Authentication:** Firebase Auth (Google OAuth, Email/Password)
- **Database:** Firestore (User Data, Watchlists)
- **AI Integration:** OpenAI GPT-3.5 Turbo API
- **Movie Data:** TMDB API (The Movie Database)
- **Deployment:** Firebase Hosting

---

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

git clone [https://github.com/waseemqureshi04/pickaflick.git](https://github.com/waseemqureshi04/pickaflick.git)
cd pickaflick
                
### 2. Install Dependencies
Bash

npm install
# or
yarn install
3. Configure Environment Variables
Create a .env file in the root directory and add your API keys:

Code snippet

REACT_APP_OPENAI_KEY=your_openai_api_key
REACT_APP_TMDB_KEY=your_tmdb_api_key
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

### 4. Start the Development Server
Bash

npm start
Open http://localhost:3000 to view it in your browser.

### Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

### Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

### Contact

Mohammed Ghouseuddin Qureshi - LinkedIn - GitHub

Project Link: https://github.com/waseemqureshi04/pickaflick
