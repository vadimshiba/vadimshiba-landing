# Vadim Shiba - Apple-style Business Card

Анимированная визитка на Next.js для деплоя в Vercel через GitHub.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Framer Motion

## Local run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

## Deploy to Vercel (GitHub)

1. Push repo to GitHub.
2. Open Vercel dashboard and click **Add New... -> Project**.
3. Import this GitHub repository.
4. Framework is detected as **Next.js** automatically.
5. Click **Deploy**.

After first deploy, every push to `main` will auto-deploy.
