import * as THREE from "three";

// Create a custom dodecahedron geometry with material index for each face
export function createIndexedDodecahedronGeometry(radius = 3, detail = 0) {
    // Create a dodecahedron geometry
    const baseGeometry = new THREE.DodecahedronGeometry(radius, detail);

    // Create a buffer geometry to modify
    const geometry = new THREE.BufferGeometry();

    // Clone attributes from the base geometry
    geometry.setAttribute(
        "position",
        baseGeometry.getAttribute("position").clone()
    );
    geometry.setAttribute(
        "normal",
        baseGeometry.getAttribute("normal").clone()
    );
    geometry.setAttribute("uv", baseGeometry.getAttribute("uv").clone());

    // A dodecahedron has 12 faces, each face is a pentagon
    // Each face consists of 3 triangles (for a total of 36 triangles)
    const faceCount = 12;
    const trianglesPerFace = 3;

    // Create a separate group for each face
    for (let i = 0; i < faceCount; i++) {
        const startTriangle = i * trianglesPerFace;
        const triangleCount = trianglesPerFace;

        // Add group with material index same as face index
        geometry.addGroup(startTriangle * 3, triangleCount * 3, i);
    }

    // No rotation applied here - will be controlled via GUI
    geometry.rotateZ(1);
    geometry.rotateY(0.278);
    return geometry;
}

// Create and export default dodecahedron geometry
const indexedDodecahedronGeometry = createIndexedDodecahedronGeometry();
export default indexedDodecahedronGeometry;
