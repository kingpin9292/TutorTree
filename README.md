# TutorTree

A real-time teaching platform with Vapi, integrated with an AI vocal agent that delivers interactive learning sessions.

[![Languages](https://img.shields.io/badge/TypeScript-90%25-blue)]() [![License](https://img.shields.io/badge/License-Add%20LICENSE-lightgrey)]()

Table of contents
- [Overview](#overview)
- [Key features](#key-features)
- [Tech stack](#tech-stack)
- [Architecture & data flow](#architecture--data-flow)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local development](#local-development)
  - [Environment variables](#environment-variables)
- [Running in production](#running-in-production)
  - [Docker](#docker)
  - [Deployment considerations](#deployment-considerations)
- [Testing & quality](#testing--quality)
- [Contributing](#contributing)
- [Security & privacy](#security--privacy)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## Overview
TutorTree is a real-time teaching platform that combines a low-latency Vapi backend with an AI-driven vocal agent to deliver interactive, voice-enabled learning sessions. It enables instructors to run live lessons while the AI agent supports tutoring, Q&A, and accessibility features through natural spoken responses.

This repository is primarily implemented in TypeScript (≈90%), with styles in CSS and small JavaScript helpers.

## Key features
- Real-time classroom sessions (low-latency audio/video signaling)
- AI vocal agent for live spoken responses and interactive guidance
- Session recording and playback support
- Role-based participants (teacher, student, observer)
- Configurable lesson flows and prompts for the AI agent
- Integrations for storage, analytics, and real-time messaging

## Tech stack
- Frontend: TypeScript (React / framework-agnostic UI) and CSS
- Backend: Vapi-based real-time services (signaling, media routing)
- AI: External model accessed via secure API (text-to-speech and ASR pipelines)
- Persistence: (examples) PostgreSQL / Redis for session state and presence
- Infrastructure: Docker, WebSockets / WebRTC, reverse proxy (nginx) for TLS & routing

(Adjust the stack section to reflect actual frameworks and services used in your repo.)

## Architecture & data flow
High-level flow:
1. Client authenticates and joins a session.
2. Signaling occurs over WebSocket to coordinate WebRTC audio/video via Vapi.
3. Media streams are optionally routed to an AI vocal agent pipeline:
   - Speech-to-text (ASR) converts student/teacher audio to text
   - AI model processes text, produces responses or actions
   - Text-to-speech (TTS) renders spoken responses back into audio
4. Session metadata and chat are stored in the backend for replay and analytics.

Keep sensitive components (API keys, model endpoints) off the client and behind the backend.

## Getting started

### Prerequisites
- Node.js 18+ (or the version specified by .nvmrc / engine in package.json)
- Package manager: npm, yarn, or pnpm
- Docker & Docker Compose (optional, recommended for local full-stack runs)
- Environment: access to Vapi instance and AI model endpoint (API key)

### Local development
1. Clone the repository
   ```bash
   git clone https://github.com/kingpin9292/TutorTree.git
   cd TutorTree
   ```
2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. Copy and populate environment variables
   ```bash
   cp .env.example .env
   # edit .env to set VAPI_URL, AI_API_KEY, etc.
   ```
4. Run in development mode
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Open the frontend at http://localhost:3000 (or the port configured)

### Environment variables
Create a `.env` or environment configuration with at least the following (names are examples — match your implementation):

```
# Backend / Vapi
VAPI_URL=https://vapi.example.com
VAPI_KEY=your-vapi-key

# AI model provider
AI_API_URL=https://api.ai-provider.com/v1
AI_API_KEY=your-ai-api-key

# Database / cache
DATABASE_URL=postgres://user:pass@localhost:5432/tutortree
REDIS_URL=redis://localhost:6379

# Media / STUN/TURN
STUN_URL=stun:stun.l.google.com:19302
TURN_URL=turn:turn.example.com
TURN_USER=turnuser
TURN_PASS=turnpass

# Optional telemetry & error tracking
SENTRY_DSN=
```

Do not commit `.env` to version control. Use a secrets manager for production.

## Running in production

### Docker
Example Docker Compose snippet (illustrative — adapt to your services):
```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - VAPI_URL=${VAPI_URL}
      - AI_API_KEY=${AI_API_KEY}
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: tutortree

  redis:
    image: redis:7
```

Build and start:
```bash
docker compose up --build
```

### Deployment considerations
- Serve the frontend via a CDN behind HTTPS.
- Protect API keys and AI model access with server-side authentication & rate limiting.
- Use TURN servers for reliable WebRTC connectivity in restrictive networks.
- Scale real-time components horizontally and use sticky sessions or a shared state (Redis) for session coordination.

## Testing & quality
- Run unit tests:
  ```bash
  npm test
  ```
- Lint and format:
  ```bash
  npm run lint
  npm run format
  ```
- Add integration tests for end-to-end session flows and AI interaction where possible (use test keys and sandbox AI endpoints).

## Contributing
We welcome contributions. A suggested workflow:
- Fork the repo and create a feature branch: git checkout -b feat/your-feature
- Keep changes small and focused. Write tests for new behavior.
- Run linters and tests before submitting a PR.
- Follow conventional commit messages (e.g., feat:, fix:, chore:).

Add a CONTRIBUTING.md to document your specific guidelines, PR template, and code review expectations.

## Security & privacy
- Treat audio, transcripts, and student data as sensitive data.
- Follow applicable privacy regulations (e.g., GDPR, COPPA where relevant).
- Use encryption in transit (TLS) and at-rest for stored recordings.
- Rotate keys regularly and grant least privilege to service accounts.
- If you discover a security vulnerability, report it privately to the maintainers.

## License
Add a LICENSE file to this repository. A common choice is the MIT License:
```
MIT License
...
```
(If you already have a preferred license, include it and update this README.)

## Contact
For questions, issues, or enterprise inquiries, open an issue in the repository or contact the maintainers (add maintainer email or team link here).

## Acknowledgements
- Vapi for real-time media routing and signaling
- AI model providers for speech & language capabilities
- Community contributors and testers
