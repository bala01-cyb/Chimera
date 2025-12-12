# CHIMERA Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Google account for Firebase
- A DeepSeek account for DeepSeek R1 API (Free)

## Step 1: Clone and Install

```bash
cd d:/Projects/chimera
npm install
```

## Step 2: Get Your API Keys

### DeepSeek R1 API Key (Free)

1. Go to [DeepSeek Platform](https://platform.deepseek.com/)
2. Sign up or sign in with your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the generated API key

**Note**: DeepSeek R1 is free and open source!

### Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Click on the gear icon (Project Settings)
4. Scroll down to "Your apps" section
5. Click on the web app icon (`</>`) to create a web app
6. Register your app and copy the Firebase configuration values
7. Enable **Realtime Database**:
   - Go to "Build" → "Realtime Database"
   - Click "Create Database"
   - Choose a location
   - Start in **test mode** (we'll update rules later)
8. Enable **Authentication**:
   - Go to "Build" → "Authentication"
   - Click "Get Started"
   - Enable "Google" sign-in method

## Step 3: Configure Environment Variables

1. Open the `.env` file in the project root
2. Fill in your API keys and Firebase configuration:

```env
# DeepSeek API Configuration (Free Model)
VITE_DEEPSEEK_API_KEY=your_actual_deepseek_api_key_here
VITE_DEEPSEEK_API_URL=https://api.deepseek.com/v1

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Step 4: Update Firebase Security Rules

1. Go to Firebase Console → Realtime Database → Rules
2. Replace the existing rules with the content from `firebase-rules.json`:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid",
        "plans": {
          "$planId": {
            ".validate": "newData.hasChildren(['title', 'description', 'projectDescription', 'createdAt']) && newData.child('title').isString() && newData.child('description').isString() && newData.child('projectDescription').isString() && newData.child('createdAt').isNumber()",
            "phases": {
              "$phaseId": {
                ".validate": "newData.hasChildren(['name', 'duration', 'status', 'description']) && newData.child('name').isString() && newData.child('duration').isString() && newData.child('status').isString() && newData.child('description').isString()"
              }
            },
            "techStack": {
              ".validate": "newData.hasChildren(['backend', 'frontend', 'database', 'deployment'])"
            },
            "recommendations": {
              "$recId": {
                ".validate": "newData.hasChildren(['category', 'title', 'description', 'priority']) && newData.child('category').isString() && newData.child('title').isString() && newData.child('description').isString() && newData.child('priority').isString()"
              }
            }
          }
        }
      }
    }
  }
}
```

3. Click "Publish"

## Step 5: Run the Application

```bash
npm run dev
```

The application will start on `http://localhost:5173` (or another port if 5173 is busy).

## Usage

### Generating an Architecture Plan

1. Click "Get Started Now" on the homepage
2. Enter your project description in the text area
   - Example: "I need to build a real-time chat application with user authentication, message history, file sharing, and video calls. The app should support 10,000+ concurrent users and be deployed on AWS."
3. Click "Generate Architecture Plan"
4. Watch the real-time progress as the AI generates your plan through 7 phases
5. Review the generated plan with:
   - Technology stack recommendations
   - 7-phase implementation roadmap
   - Security, scalability, and deployment recommendations

### Saving Plans (Requires Sign-In)

1. Click "Sign in / Sign up" in the header
2. Sign in with your Google account
3. Generate a plan
4. Click "Save to Account" to store the plan in Firebase
5. Your saved plans will be accessible from your account

### Downloading Plans as PDF

1. After generating a plan, click "Download as PDF"
2. The plan will be downloaded as a formatted PDF document

## Troubleshooting

### API Key Issues

- **Error: "API key not valid"**: Make sure you've copied the correct DeepSeek API key from DeepSeek Platform
- **Error: "Unauthorized"**: Verify your DeepSeek API key is active and has not expired
- **Firebase connection errors**: Verify all Firebase configuration values in `.env` are correct

### Build Errors

- Run `npm install` again to ensure all dependencies are installed
- Clear the cache: `rm -rf node_modules package-lock.json && npm install`

### Firebase Rules Issues

- Make sure you've published the security rules in Firebase Console
- Verify that Google authentication is enabled in Firebase Console

## Project Structure

```
chimera/
├── client/
│   └── src/
│       ├── components/
│       │   ├── PlanGenerator.tsx    # Main plan generation interface
│       │   ├── PlanDisplay.tsx      # Display generated plans
│       │   └── PhaseProgress.tsx    # Real-time progress indicator
│       ├── lib/
│       │   ├── aiService.ts         # Google Gemini AI integration
│       │   ├── planService.ts       # Firebase plan management
│       │   ├── pdfService.ts        # PDF generation
│       │   └── firebase.ts          # Firebase configuration
│       ├── types/
│       │   └── plan.types.ts        # TypeScript type definitions
│       └── pages/
│           └── Home.tsx              # Main landing page
├── .env                              # Environment variables (not in git)
├── .env.example                      # Example environment file
└── firebase-rules.json               # Firebase security rules
```

## Features

- ✅ AI-powered architecture plan generation (DeepSeek R1 - Free & Open Source)
- ✅ 7-phase implementation roadmap
- ✅ Technology stack recommendations
- ✅ Security and scalability best practices
- ✅ PDF export functionality
- ✅ Firebase plan storage (with authentication)
- ✅ Real-time generation progress
- ✅ Dark/light theme support

## Support

For issues or questions:
- Check the troubleshooting section above
- Review the Firebase Console for any error messages
- Ensure all environment variables are correctly set
