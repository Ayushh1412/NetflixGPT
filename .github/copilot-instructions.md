# Copilot Instructions for NetflixGPT

## Project Overview
NetflixGPT is a React-based Netflix clone that integrates OpenAI's GPT for intelligent movie search and recommendations. It uses TMDB API for movie data, Firebase for authentication, and Redux for state management.

## Architecture
- **Frontend**: React with Vite, Tailwind CSS for styling
- **State Management**: Redux with slices for movies, user, and GPT
- **Authentication**: Firebase Auth
- **APIs**: TMDB for movie data, OpenAI GPT-3.5 for search
- **Routing**: React Router for navigation

## Key Components
- `Body.jsx`: Main layout container
- `Browse.jsx`: Movie browsing page with now playing, popular, etc.
- `GptSearchPage.jsx`: GPT-powered search interface
- `LoginPage.jsx`: Authentication page
- Movie components: `MovieCard`, `MovieList`, `MainContainer`, `SecondaryContainer`

## Data Flow
1. User authenticates via Firebase
2. App fetches movie data from TMDB using custom hooks (e.g., `useNowPlaying`)
3. Movies displayed in browse page
4. GPT search takes user query, generates movie recommendations

## Developer Workflows
- **Development**: `npm run dev` (Vite dev server)
- **Build**: `npm run build`
- **Preview**: `npm run preview`
- **Linting**: ESLint configured

## Conventions
- Component names: PascalCase (e.g., `MovieCard`)
- Hook names: camelCase with `use` prefix (e.g., `useNowPlaying`)
- File structure: Components in `src/components/`, hooks in `src/hooks/`, utils in `src/utils/`
- State updates: Use Redux actions from slices
- API calls: Centralized in hooks, use constants from `constants.js`

## Integration Points
- TMDB API: Use API key from `constants.js`, endpoints in hooks
- OpenAI: GPT search in `gptSlice.js`, API key required
- Firebase: Config in `firebase.js`, auth in `userSlice.js`

## Examples
- Adding a new movie category: Create hook like `useNowPlaying.jsx`, add to `movieSlice.js`, use in `Browse.jsx`
- GPT search: Query sent to OpenAI, results stored in GPT slice, displayed in search page