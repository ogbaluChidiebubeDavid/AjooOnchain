# AJOO - Multiply Your Wealth Together

## Overview
AJOO is a landing page for a decentralized fintech protocol that digitizes traditional West African "Ajo/Esusu" rotational savings model on the Avalanche blockchain network.

## Recent Changes
- 2025-02-16: Initial Figma-to-Replit migration completed. Built landing page matching Figma design.

## Project Architecture
- **Frontend**: React + TypeScript + Tailwind CSS (Vite bundler)
- **Backend**: Express.js server (serves both API and frontend)
- **Styling**: Tailwind CSS v3 with custom design tokens
- **Fonts**: Artifika, Manrope, Inter (via Google Fonts)
- **Port**: 5000 (frontend + API on same port)

## Structure
```
client/             - Frontend React application
  src/
    pages/          - Page components
      sections/     - Landing page section components
    components/ui/  - Reusable UI components (shadcn/ui)
    lib/            - Utility functions
  public/
    figmaAssets/    - Images and icons from Figma design
server/             - Express backend
  index.ts          - Server entry point
  routes.ts         - API routes
  vite.ts           - Vite dev server integration
shared/             - Shared types/schemas
```

## User Preferences
- Landing page design follows Figma prototype closely
- Dark theme with teal (#0f766e) accent color
