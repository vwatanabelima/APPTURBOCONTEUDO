# TurboBoard

Welcome to TurboBoard, your AI-powered dashboard for supercharging content creation. This application provides a suite of tools to streamline your workflow, from generating ideas to exporting final assets for social media.

## Features

- **Firebase Authentication**: Secure login, registration, and password reset functionality.
- **Protected Routes**: Your dashboard is private and accessible only after logging in.
- **Modular Dashboard**: Access different content creation tools organized as modules:
    - **Practical Flow Generation**: Use AI to generate a practical workflow prompt, guiding you to create valuable content with external tools.
    - **AI Post Creation**: Generate complete social media posts.
    - **Visual Template Application**: Automatically apply beautiful designs to your content.
    - **Social Media Export**: Get your content ready for Instagram, Facebook, TikTok, and more.
    - **Bonus Module**: Discover exclusive tips and tricks.
- **GenAI Integration**: Leverages Google's Gemini model to provide creative prompts and assist in content creation.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) components
- **Backend & Authentication**: [Firebase](https://firebase.google.com/) (Auth and Firestore)
- **Generative AI**: [Google AI & Genkit](https://ai.google.dev/genkit)

## Getting Started

To run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.
