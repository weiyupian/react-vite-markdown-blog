# Minimalist React Blog

A digital garden focused on the ultimate minimalist reading experience. Built with React 19 and Vite, it utilizes a Markdown-driven workflow to return to the essence of writing.

## 🛠️ Tech Stack

* **Core Framework** : React 18 (Functional Components & Hooks)
* **Build Tool** : Vite (For lightning-fast development and optimized bundling)
* **Routing** : React Router v6 (Featuring dynamic routing and active-link navigation)
* **Content Parsing** : React-Markdown (Custom component rendering for MD elements)
* **Styling** : Modern CSS3 (Global design system built with** **`:root` variables)

## ✨ Key Features

* **📄 Markdown Driven** : Seamlessly renders articles from Markdown files with integrated support for responsive images and code snippets.
* **🎨 Design System Architecture** : A cohesive visual language established through CSS variables, ensuring uniform spacing, typography, and color consistency across the entire site.
* **📬 Elegant Feedback Loop** : A lightweight** **`MailReply` component leveraging the** **`mailto` protocol, allowing readers to provide feedback with zero friction.
* **⚡ Performance Optimized** :
* Single Page Application (SPA) architecture for millisecond-level page transitions.
* Automated** **`ScrollToTop` logic to maintain reading continuity.
* Optimized static asset resolution for Markdown-embedded resources.

## 📖 Project Structure

```plaintext
src/
├── components/      # Reusable UI components (Header, MailReply, etc.)
├── data/            # Structured content & post metadata (posts.js)
├── pages/           # Page-level view components (HomePage, PostDetail)
├── assets/          # Static assets (Images, Global CSS)
└── App.jsx          # Root component & Route configuration
```

## 🚀 Getting Started

1. **Clone the Repo** :`git clone https://github.com/weiyupian/react-vite-markdown-blog.git`
2. **Install Dependencies** :`npm install`
3. **Launch Dev Server** :`npm run dev`
4. **Production Build** :`npm run build`
