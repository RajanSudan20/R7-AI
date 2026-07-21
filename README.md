# R7 AI

This is a modern web application built using [Next.js 16](https://nextjs.org/)[cite: 4] and [React 19](https://react.dev/)[cite: 4]. Styling is handled via [Tailwind CSS v4](https://tailwindcss.com/)[cite: 4] paired with [shadcn/ui](https://ui.shadcn.com/) components built on the `base-nova` design framework[cite: 2]. The application is further enhanced with the [Vercel AI SDK](https://sdk.vercel.ai/docs) for robust, production-ready AI feature integrations.

---

## 🚀 Tech Stack

* **Framework:** Next.js 16 (App Router, React Server Components enabled)[cite: 2, 4]
* **Core:** React 19 & TypeScript
* **AI Integration:** `ai` & `@ai-sdk/react`
* **UI Components:** [Base UI](https://base-ui.com/) & [shadcn/ui](https://ui.shadcn.com/)[cite: 4]
* **Styling:** Tailwind CSS v4, `class-variance-authority`, `clsx`, and `tailwind-merge`
* **Icons:** Lucide React[cite: 2, 4]
* **Analytics:** Vercel Analytics

---

## 📁 Key File Aliases

The project configuration defines standard import paths for clean development[cite: 2]:
* `@/components/*` — Custom & shared components[cite: 2]
* `@/components/ui/*` — Base shadcn/ui components[cite: 2]
* `@/lib/utils` & `@/lib/*` — Helper functions and utilities[cite: 2]
* `@/hooks/*` — Reusable React hooks[cite: 2]

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have [pnpm](https://pnpm.io/) installed, as it is the designated package manager for this project.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd my-project
