# Magic Box - Dodecahedron Optical Illusion

![Dodecahedron Demo](/assets/dodeca_demo.gif)

Final Project for Wellesley's CS 307 class (Computer Graphics)

## About the Project

This project creates an impossible optical illusion using a dodecahedron where each face serves as a "portal" into the shape. When looking through any face, you'll see a different floating geometry inside, creating an illusion that defies physical space.

## How It Works

The illusion works by using Three.js portal materials and render targets. Each face of the dodecahedron has:

1. A separate render target camera
2. A unique interior scene
3. A shader material that renders what the camera sees

![Single Side View](/assets/dodeca_side.png)

This technique creates the impression that the inside of the object is larger than the outside, making it seem physically impossible.

## Technologies

- React for the UI framework
- Three.js for 3D rendering
- React Three Fiber (R3F) as the React wrapper for Three.js
- Custom shaders for the portal effect

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/cs307final.git
   cd cs307final
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Controls

- Click and drag to rotate the dodecahedron
- Scroll to zoom in and out