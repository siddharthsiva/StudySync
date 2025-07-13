# StudySync

StudySync is a full-stack flashcard quiz application built with React and Node.js, using TypeScript throughout. The app enables users to quiz themselves using AI-generated flashcards from the Anthropic Claude API. It supports customizable categories, difficulty levels, timer/stopwatch modes, and allows for both manual and batch card creation.

## Features

- Generate flashcards using Claude AI based on selected category
- Timer and stopwatch quiz modes
- Score tracking with question filtering by category/difficulty
- Add your own cards or upload notes for batch generation
- Clean tabbed interface for Quiz, Add Cards, and Upload Notes

## Technologies Used

- React + Vite + TypeScript (Frontend)
- Node.js + Express + TypeScript (Backend)
- Anthropic Claude API (via secure proxy)
- Environment-based configuration with `.env`

## Folder Structure

```
StudySync/
├── client/
│   ├── src/
│   │   ├── components/         # Flashcard, Quiz, Tabs, StartScreen, etc.
│   │   ├── types/              # Flashcard interfaces
│   │   ├── data/               # (Optional) Default flashcard data
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── index.html
│   ├── vite.config.ts
│   └── tsconfig.json
├── server/
│   ├── index.ts                # Express proxy to Claude API
│   ├── tsconfig.json
│   └── .env                    # API Key (excluded from Git)
├── .gitignore
└── README.md
```

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/studysync.git
cd StudySync
```

### 2. Install dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 3. Configure API Key

Create a `.env` file inside the `server/` folder and add your Claude API key:

```
CLAUDE_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. Start the backend server

```bash
cd server
npm run dev
```

The server should start on `http://localhost:4000`.

### 5. Start the frontend

Open a new terminal window:

```bash
cd client
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Deployment

To deploy the app:

- **Frontend**: Use Vercel or Netlify for simple React deployment.
- **Backend**: Deploy the Express server using Render, Railway, or similar.
- Ensure that your frontend `.env` (or runtime config) points to the deployed backend instead of `localhost`.

## License

This project is open source under the MIT License.
