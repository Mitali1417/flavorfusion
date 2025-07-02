# Flavor Fusion

A modern, AI-powered recipe discovery and management app. Explore, search, generate, and save recipes with a beautiful, responsive UI. No account required—just join as a guest and start your culinary journey!

---

## 🚀 Features

- **Guest-Only Access**: No sign-up or login required. Join as a guest and access all features instantly.
- **Recipe Discovery**: Browse a curated selection of recipes from various cuisines and categories.
- **Powerful Search & Filters**: Search recipes by name, ingredient, area, or category. Use filters and tags for precise results.
- **AI Recipe Generator**: Generate new, creative recipes using AI. Get inspired with unique meal ideas.
- **Favorites & Saved Recipes**: Save your favorite and AI-generated recipes for quick access.
- **Profile Customization**: Edit your display name, avatar, bio, and preferences. Export/import your saved recipes as JSON.
- **Modern UI/UX**: Built with shadcn/ui, Tailwind CSS, and Radix UI for a beautiful, accessible experience.
- **Mobile Responsive**: Fully responsive design for seamless use on any device.

---

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **Vite** (blazing fast dev/build)
- **Tailwind CSS 4** (utility-first styling)
- **shadcn/ui** (Radix UI + Tailwind component library)
- **@tanstack/react-query** (data fetching & caching)
- **Zustand** (state management)
- **Lucide React** (icon set)
- **Formik** (forms)
- **Sonner** (toasts/notifications)

---

## 📦 Getting Started

### 1. **Clone the repository**
```bash
git clone <your-repo-url>
cd flavor-fusion
```

### 2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. **Run the development server**
```bash
npm run dev
```

### 4. **Open in your browser**
Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## 🧑‍🍳 Main Features & Pages

- **Home**: Hero section, explore categories, AI highlights, popular tags, and onboarding steps.
- **Search Recipes**: Search bar with debounce, advanced filters (category, area, ingredient, letter), infinite scroll, and recipe cards.
- **Generate Recipe**: Use AI to generate new recipes based on your preferences.
- **Favorites & Saved Recipes**: View and manage your favorite and AI-generated recipes.
- **Profile**: Edit your display name, avatar, bio, and preferences. Export/import saved recipes.
- **Join as Guest**: Onboarding page to start using the app instantly.

---

## 🧩 Folder Structure

```
src/
  pages/           # Main app pages (home, search, generate, profile, etc.)
  components/      # Reusable UI and shadcn/ui components
  hooks/           # Custom React hooks (data fetching, state, etc.)
  store/           # Zustand state management
  api/             # API calls and data fetching logic
  layouts/         # Layout components (UserLayout, etc.)
  types/           # TypeScript types
  assets/          # Images and static assets
  index.css        # Tailwind and global styles
```

---

## 📝 Contributing

1. Fork the repo and create your branch: `git checkout -b feature/your-feature`
2. Make your changes and commit: `git commit -m 'Add some feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- [TheMealDB API](https://www.themealdb.com/) for recipe data
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide Icons](https://lucide.dev/)

---

Enjoy cooking with **Flavor Fusion**! 🍳
