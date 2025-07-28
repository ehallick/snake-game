# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a classic Snake game implemented in vanilla JavaScript with HTML5 Canvas. The game is a single-page application that runs entirely in the browser without any build tools or dependencies.

## Architecture

- **index.html**: Main HTML file that sets up the game container, canvas element, and loads the game script
- **game.js**: Core game logic including snake movement, collision detection, food generation, and game state management
- **style.css**: Styling for the game interface with a dark theme and green accent colors

## Key Features

- **Wrap-around mechanics**: Snake passes through walls and continues from the opposite side
- **Visual distinction**: Snake head uses darker green (#2E7D32) to distinguish from body (#4CAF50)
- **Game states**: Running, paused (spacebar), and game over with overlay screens
- **Collision detection**: Only body collisions end the game, not wall collisions

## Development

This is a static web application that requires no build process or package management.

**To run the game locally:**
Open `index.html` in any modern web browser.

**Game controls:**
- Arrow keys: Control snake direction
- Spacebar: Pause/unpause game
- Restart button: Appears after game over

## Code Structure

The game uses a simple game loop pattern with these key functions:
- `gameLoop()`: Main game loop (runs every 100ms)
- `moveSnake()`: Handles snake movement and collision detection
- `drawGame()`: Renders all game elements on canvas
- `handleKeyPress()`: Processes user input for movement and pause

Game state is managed through global variables (`gameRunning`, `gamePaused`, `score`) with the snake represented as an array of coordinate objects.