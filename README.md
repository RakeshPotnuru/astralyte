# Astralyte - Multi-Agent Research Assistant

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/RakeshPotnuru/astralyte?utm_source=oss&utm_medium=github&utm_campaign=RakeshPotnuru%2Fastralyte&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

Astralyte automates the entire research workflow using a coordinated chain of intelligent AI agents.
A single topic input triggers a 4-stage pipeline—scouting, summarizing, analyzing, and synthesizing—to produce a concise, high-quality research brief.

## 🛠️ Technologies Used

- Cline - Agent-driven development assistant
- CodeRabbit - PR reviews & code quality
- Next.js - Full-stack framework
- Vercel - Deployment

## Installation & Setup

1. Clone repository

```bash
git clone https://github.com/YOUR-USERNAME/astralyte
cd astralyte
```

2. Install dependencies

```bash
pnpm i
```

3. Add environment variables

Create .env.local:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
NEXT_PUBLIC_KESTRA_URL=
KESTRA_NAMESPACE=
KESTRA_WEBHOOK_KEY=
```

4. Run development server

```bash
pnpm dev
```

Your app will be available at: [http://localhost:3000](http://localhost:3000)
