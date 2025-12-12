# CHIMERA

**CHIMERA — AI-Powered Software Architecture Plan Generator**

Transform your project ideas into comprehensive software architecture blueprints using advanced AI. CHIMERA analyzes your requirements and generates complete architecture plans with technology recommendations, implementation roadmaps, and best practices.

**Powered by DeepSeek R1 - Free & Open Source AI Model**

---

## 🚀 Features

* **AI-Powered Analysis**: Uses Google Gemini to understand your project requirements
* **7-Phase Architecture Planning**: Complete implementation roadmap from analysis to deployment
* **Technology Stack Recommendations**: Get expert suggestions for backend, frontend, database, and deployment
* **Best Practices**: Security, scalability, and deployment recommendations
* **PDF Export**: Download your architecture plans as formatted PDF documents
* **Firebase Integration**: Save and manage your plans with user authentication
* **Real-Time Progress**: Watch the AI generate your plan through each phase
* **Dark/Light Theme**: Modern, responsive UI with theme support

---

## 🧰 Tech Stack

* **Frontend**: React, TypeScript, Vite, TailwindCSS
* **AI**: DeepSeek R1 (Free & Open Source)
* **Backend**: Firebase Realtime Database, Firebase Authentication
* **PDF Generation**: jsPDF
* **UI Components**: Radix UI, Framer Motion, Lucide Icons

---

## 📁 Project Structure

```
chimera/
├── client/src/
│   ├── components/
│   │   ├── PlanGenerator.tsx      # Main plan generation interface
│   │   ├── PlanDisplay.tsx        # Display generated plans
│   │   ├── PhaseProgress.tsx      # Real-time progress indicator
│   │   └── ui/                    # Reusable UI components
│   ├── lib/
│   │   ├── aiService.ts           # Google Gemini AI integration
│   │   ├── planService.ts         # Firebase plan management
│   │   ├── pdfService.ts          # PDF generation service
│   │   └── firebase.ts            # Firebase configuration
│   ├── types/
│   │   └── plan.types.ts          # TypeScript type definitions
│   └── pages/
│       ├── Home.tsx               # Landing page
│       └── Auth.tsx               # Authentication page
├── .env                           # Environment variables (create from .env.example)
├── .env.example                   # Example environment configuration
├── firebase-rules.json            # Firebase security rules
└── SETUP.md                       # Detailed setup instructions
```

---

## 🏁 Quick Start

### Prerequisites

* Node.js (v18 or higher)
* npm or yarn
* Google account for Firebase
* DeepSeek account for DeepSeek R1 API (Free)

### Installation

```bash
git clone https://github.com/yourusername/chimera.git
cd chimera
npm install
```

### Configuration

1. **Get API Keys** (see [SETUP.md](./SETUP.md) for detailed instructions):
   - [DeepSeek R1 API Key](https://platform.deepseek.com/) - Free & Open Source
   - [Firebase Configuration](https://console.firebase.google.com/)

2. **Configure Environment**:
   ```bash
   cp .env.example .env
   # Edit .env and add your API keys
   ```

3. **Set up Firebase**:
   - Enable Realtime Database
   - Enable Google Authentication
   - Deploy security rules from `firebase-rules.json`

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 📄 Usage

### Generating an Architecture Plan

1. Click **"Get Started Now"** on the homepage
2. Enter your project description:
   ```
   Example: "Build a real-time chat application with user authentication,
   message history, file sharing, and video calls. Support 10,000+ concurrent
   users and deploy on AWS."
   ```
3. Click **"Generate Architecture Plan"**
4. Watch real-time progress through 7 phases:
   - Phase 1: Ingestion & Legacy Analysis (15s)
   - Phase 2: Blueprint Creation (45s)
   - Phase 3: Parallel Execution Planning (2m)
   - Phase 4: Local Quality Gates (1m)
   - Phase 5: Sandbox Integration (30s)
   - Phase 6: Global E2E Validation (1m 30s)
   - Phase 7: Final Quality Check (instant)

5. Review your comprehensive plan with:
   - Technology stack recommendations
   - Implementation phases with deliverables
   - Security and scalability best practices
   - Deployment strategies

### Saving Plans

1. Sign in with Google (click **"Sign in / Sign up"**)
2. Generate a plan
3. Click **"Save to Account"**
4. Access your saved plans anytime from your account

### Exporting Plans

Click **"Download as PDF"** to export your architecture plan as a formatted PDF document.

---

## 🎯 Architecture Phases

CHIMERA generates plans following a proven 7-phase methodology:

1. **Ingestion & Legacy Analysis**: Parse requirements, identify constraints
2. **Blueprint Creation**: Generate architecture diagrams, select tech stack
3. **Parallel Execution Planning**: Plan concurrent development tasks
4. **Local Quality Gates**: Validate components, run tests
5. **Sandbox Integration**: Test integration, validate APIs
6. **Global E2E Validation**: End-to-end testing, performance benchmarking
7. **Final Quality Check**: Final validation, documentation, deployment readiness

---

## 🔮 Features in Detail

### AI-Powered Recommendations

- **Security**: OAuth2, JWT, TLS encryption, database security
- **Scalability**: Microservices, load balancing, caching strategies
- **Database**: PostgreSQL, MongoDB, data modeling best practices
- **Deployment**: Docker, Kubernetes, CI/CD pipelines
- **Error Handling**: Self-healing mechanisms, automated debugging

### Technology Stack Suggestions

Get expert recommendations for:
- Backend frameworks (FastAPI, Node.js, Django, etc.)
- Frontend libraries (React, Vue, Angular, etc.)
- Databases (PostgreSQL, MongoDB, Redis, etc.)
- Deployment platforms (AWS, GCP, Azure, etc.)
- DevOps tools (Docker, Kubernetes, CI/CD, etc.)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Licensed under **GPL-3.0**. See [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgements

- Powered by [DeepSeek R1](https://www.deepseek.com/) - Free & Open Source AI
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Inspired by modern software architecture best practices

---

## 📚 Documentation

- [Setup Guide](./SETUP.md) - Detailed setup instructions
- [AI Architecture Details](./ai.txt) - AI functionality documentation
- [Firebase Rules](./firebase-rules.json) - Database security rules

---

## 🐛 Troubleshooting

See [SETUP.md](./SETUP.md#troubleshooting) for common issues and solutions.

---

## 📧 Support

For questions or issues, please open an issue on GitHub or contact hello@chimera.ai

---

**Built with ♥ for developers by developers**
