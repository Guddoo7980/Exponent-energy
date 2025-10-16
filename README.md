Exponent Energy - 2048 Game

Live Demo on Vercel = https://exponent-energy-7u1l.vercel.app/

GitHub Repository = https://github.com/Guddoo7980/Exponent-energy

1. Installation

Follow these steps to set up the project locally:

Clone the repository:

git clone https://github.com/Guddoo7980/Exponent-energy.git


Navigate into the project directory:

cd Exponent-energy


Install dependencies:

npm install


Ensure you have Node.js and npm installed. Check by running node -v and npm -v.

2. Running the Game

Start the development server to play locally:

npm start


The app will run at http://localhost:3000 by default.

The page will automatically reload if you make edits.

For production build:

npm run build
npm run start

3. Gameplay Instructions

Exponent Energy is a classic 2048 puzzle game built with React. The objective is to combine tiles with the same numbers to reach 2048.

Controls:

Arrow Keys (↑ ↓ ← →) – Move tiles in the chosen direction.

Combine Tiles – Two tiles with the same number merge into one tile with their sum.

Winning – Reach the tile 2048.

Game Over – No more valid moves are available.

Restart – Use the restart button to reset the game anytime.

Tips:

Focus on keeping the largest number in a corner.

Avoid scattering high-value tiles across the board.

Plan moves ahead to prevent blocking merges.

4. Implementation Details

Framework: React.js (Functional Components + Hooks).

State Management: useState and useEffect to handle the board state and score updates.

Logic:

board is a 2D array representing tiles.

Tiles move and merge based on keypress direction.

After each move, a new tile (2 or 4) spawns in a random empty spot.

UI:

Responsive grid using CSS Flexbox/Grid.

Tile animations for merging and movement.

Score counter and game-over notifications.

Additional Features:

Restart functionality without page reload.

Mobile-friendly with swipe gesture support (if extended).

Clean modular React component structure for easy maintenance.

Tech Stack:

HTML, CSS, JavaScript, React.js, Node.js

Deployment:

Deployed on Vercel: https://exponent-energy-7u1l.vercel.app/
