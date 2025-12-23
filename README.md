# MyCards.study - SvelteKit

A flashcard study app with AI-generated questions. Study online with virtual cards, ask questions, paste notes, and receive study materials.

## Tech Stack

- **Framework**: SvelteKit 2 with Svelte 5
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **Animations**: Lottie (for dialogs)
- **Cookie Consent**: vanilla-cookieconsent

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file and configure:

```bash
cp .env.example .env
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Environment Variables

| Variable                     | Description                                      |
| ---------------------------- | ------------------------------------------------ |
| `API_TEXT_GENERATION`        | API endpoint for generating flashcard questions  |
| `API_TEXT_ANSWER_GENERATION` | API endpoint for generating answers (cheat mode) |
| `SECRET_KEY`                 | Secret key for HMAC signature                    |
| `VITE_GOOGLE_ANALYTICS_ID`   | Google Analytics ID (optional)                   |
| `VITE_CONTACT_EMAIL`         | Contact email displayed in footer                |

## Project Structure

```
src/
├── routes/
│   ├── +layout.svelte      # Root layout with cookie consent & GA
│   ├── +page.svelte        # Main page
│   ├── cheat-mode/
│   │   └── +page.svelte    # Cheat mode page
│   └── api/
│       └── generate/
│           ├── text/+server.ts    # API for generating questions
│           └── answer/+server.ts  # API for generating answers
├── lib/
│   ├── components/
│   │   ├── Layout.svelte
│   │   ├── Entry.svelte
│   │   ├── EntryCheatMode.svelte
│   │   ├── Prompt.svelte
│   │   ├── PromptCheatMode.svelte
│   │   ├── Loading.svelte
│   │   ├── Toast.svelte
│   │   ├── buttons/
│   │   ├── cards/
│   │   ├── dialogs/
│   │   ├── colorsSwatch/
│   │   └── info/
│   ├── services/
│   │   ├── CoreAuth.ts
│   │   └── LlmService.ts
│   ├── helpers/
│   │   └── hmac.ts
│   └── animations/
│       ├── neutral.json
│       ├── winner.json
│       └── loser.json
└── app.css
```

## Features

- **Flashcard Generation**: Paste notes or ask questions to generate study flashcards
- **Multiple Choice Questions**: Answer questions and track your score
- **Cheat Mode**: Get direct answers to questions
- **Customizable Cards**: Change card and text colors
- **Multi-language Support**: Works with many languages
- **Cookie Consent**: GDPR-compliant cookie consent
- **Google Analytics**: Optional analytics integration

## Building for Production

```bash
npm run build
npm run preview
```
