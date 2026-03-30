# 🚀 Full-Stack Developer Portfolio

A high-performance, bilingual personal portfolio and blog built to showcase modern web development standards. Engineered with Next.js 16, styled with Tailwind CSS, and powered by a headless Sanity CMS backend.

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Sanity](https://img.shields.io/badge/Sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## ✨ Awesome Features

* **🌍 Internationalization (i18n):** Fully bilingual architecture (English & Indonesian). Uses Next.js middleware for seamless language routing without layout shifting or state loss.
* **🌓 Adaptive Theme Toggle:** A hydration-safe Dark/Light mode implementation that respects the user's system preferences, complete with smooth CSS transitions and inverted graphic assets for high contrast.
* **📱 Mobile-First Architecture:** 100% responsive design featuring a custom, hardware-accelerated slide-out drawer navigation for touch devices.
* **⚡ Real-Time Search Filtering:** A client-side boundary component that allows users to instantly filter the project grid by name or technology stack without reloading the page.
* **📝 Headless CMS Integration:** Powered by Sanity v3. Content is fetched server-side for optimal SEO and performance, utilizing GROQ projections and strongly typed TypeScript interfaces.
* **🔒 Secure Server Actions:** Contact form submissions are handled via Next.js Server Actions and the Resend API, keeping environment variables secure and out of the browser.

> **🔴 [Live Demo: Click here to view the live portfolio!](https://https://zikri-portfolio-ten.vercel.app)**

## 🛠️ Tech Stack

* **Framework:** Next.js 16 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **CMS:** Sanity Studio
* **Email API:** Resend
* **Deployment:** Vercel (CI/CD Pipeline)

## 💻 Running Locally

To run this project on your local machine, follow these steps:

1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/zikri-portfolio.git](https://github.com/your-username/zikri-portfolio.git)
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your .env.local file with your Sanity and Resend keys:
   ```Code snippet
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_id
   NEXT_PUBLIC_SANITY_DATASET=production
   RESEND_API_KEY=your_key
   ```
4. Start the development server:
   ```Bash
   npm run dev
   ```
5. Open http://localhost:3000 in your browser.
