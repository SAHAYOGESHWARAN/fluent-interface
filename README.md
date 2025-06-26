# Welcome to your project

This is your project, welcome!

# Floating Icons Animation Demo

This project demonstrates a modern, visually appealing floating icon animation in a React (Vite) project using Framer Motion and Tailwind CSS.

## Features

- **Animated Icons:**
  - On scroll down, icons animate one by one from the left and right sides toward the center, assembling behind the drag-and-drop box.
  - On scroll up, icons return to their original floating positions.
  - No mouse tracking or manual dragging—icons move only in response to scroll direction.
- **Responsive Design:**
  - Layout and animation adapt to window size.
- **Modern UI:**
  - Uses Tailwind CSS for styling and Framer Motion for smooth, spring-based animations.
  - Drag-and-drop box with a loading bar and processing indicator.
- **Easy Customization:**
  - Change icon sets, animation timing, and styles easily in code.
- **Clean Codebase:**
  - Unused code and duplicate icons removed for maintainability.
- **No External State Management:**
  - All animation and UI logic is handled with React hooks and Framer Motion.

## File Structure

- `src/components/FloatingIcons.tsx` — Main animation logic and UI.
- `src/hooks/useScrollDirection.ts` — Custom hook to detect scroll direction.
- `src/pages/Index.tsx` — Main page with scrollable content.
- `src/App.css`, `src/index.css` — Global and component styles.

## How It Works

- **Scroll Up:** Icons animate into the center drag box.
- **Scroll Down:** Icons animate back to their original floating positions.
- **No Drag:** Icons are not draggable and do not follow the mouse.

## Customization

- To change the icon set, edit the `LEFT_ICONS` and `RIGHT_ICONS` arrays in `FloatingIcons.tsx`.
- To adjust animation timing, modify the `getStaggerDelay` function and Framer Motion `transition` props.

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   # or
   bun install
   ```
2. Start the dev server:
   ```sh
   npm run dev
   # or
   bun run dev
   ```
3. Open your browser to `http://localhost:5173` (or the port shown in your terminal).

## Dependencies

- React
- Framer Motion
- Tailwind CSS
- Lucide React (for icons)

## License

MIT
