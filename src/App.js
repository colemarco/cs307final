import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    useGLTF,
    Edges,
    MeshPortalMaterial,
    CameraControls,
    Environment,
    PivotControls,
} from "@react-three/drei";
import indexedDodecahedronGeometry from "./dodecahedron";
import * as THREE from "three";

export const App = () => {
    const glbScale = 3.8; // Fixed value instead of GUI control

    return (
        <Canvas shadows camera={{ position: [-6, 0.5, 3] }}>
            <mesh castShadow receiveShadow>
                <primitive object={indexedDodecahedronGeometry} scale={1.5} />
                <Edges />
                <Side
                    rotation={[0, 0, 0]}
                    bg="orange"
                    index={0}
                    glbScale={glbScale}
                >
                    <torusGeometry args={[0.65, 0.3, 64]} />
                </Side>
                <Side
                    rotation={[0, Math.PI, 0]}
                    bg="lightblue"
                    index={1}
                    glbScale={glbScale}
                >
                    <torusKnotGeometry args={[0.55, 0.2, 128, 32]} />
                </Side>
                <Side
                    rotation={[0, Math.PI / 2, Math.PI / 2]}
                    bg="lightgreen"
                    index={2}
                    glbScale={glbScale}
                >
                    <boxGeometry args={[1.15, 1.15, 1.15]} />
                </Side>
                <Side
                    rotation={[0, Math.PI / 2, -Math.PI / 2]}
                    bg="aquamarine"
                    index={3}
                    glbScale={glbScale}
                >
                    <octahedronGeometry />
                </Side>
                <Side
                    rotation={[0, -Math.PI / 2, 0]}
                    bg="indianred"
                    index={4}
                    glbScale={glbScale}
                >
                    <icosahedronGeometry />
                </Side>
                <Side
                    rotation={[0, Math.PI / 2, 0]}
                    bg="hotpink"
                    index={5}
                    glbScale={glbScale}
                >
                    <dodecahedronGeometry />
                </Side>
                <Side
                    rotation={[Math.PI / 3, Math.PI / 5, 0]}
                    bg="gold"
                    index={6}
                    glbScale={glbScale}
                >
                    <sphereGeometry args={[0.75, 32, 32]} />
                </Side>
                <Side
                    rotation={[-Math.PI / 3, Math.PI / 5, 0]}
                    bg="violet"
                    index={7}
                    glbScale={glbScale}
                >
                    <coneGeometry args={[0.75, 1.5, 32]} />
                </Side>
                <Side
                    rotation={[Math.PI / 3, -Math.PI / 5, 0]}
                    bg="skyblue"
                    index={8}
                    glbScale={glbScale}
                >
                    <tetrahedronGeometry args={[0.85]} />
                </Side>
                <Side
                    rotation={[-Math.PI / 3, -Math.PI / 5, 0]}
                    bg="limegreen"
                    index={9}
                    glbScale={glbScale}
                >
                    <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
                </Side>
                <Side
                    rotation={[Math.PI / 5, Math.PI / 3, 0]}
                    bg="white"
                    index={10}
                    glbScale={glbScale}
                >
                    {/* <torusKnotGeometry args={[0.55, 0.2, 128, 32]} /> */}
                </Side>
                <Side
                    rotation={[-Math.PI / 5, -Math.PI / 3, 0]}
                    bg="slateblue"
                    index={11}
                    glbScale={glbScale}
                >
                    <torusGeometry args={[0.55, 0.2, 32, 32]} />
                </Side>
            </mesh>
            <CameraControls makeDefault />
        </Canvas>
    );
};

function Side({
    rotation = [0, 0, 0],
    bg = "#f0f0f0",
    children,
    index,
    glbScale = 3.5,
}) {
    const mesh = useRef();
    const glbRef = useRef();
    const worldUnits = false; // Fixed value instead of GUI control

    // Keep track of the fixed GLB orientation
    const fixedGlbRotation = [0, 0, 0]; // Fixed orientation for all GLB models

    // Load the dodecahedron model with one face removed (similar to the original cube)
    const { nodes } = useGLTF("/dodeca.glb");

    useFrame((state, delta) => {
        mesh.current.rotation.x = mesh.current.rotation.y += delta;
    });

    return (
        <MeshPortalMaterial
            worldUnits={worldUnits}
            attach={`material-${index}`}
        >
            {/** Everything in here is inside the portal and isolated from the canvas */}
            <ambientLight intensity={0.5} />
            <Environment preset="city" />

            {/** The dodecahedron "room" with one face removed */}
            <group>
                {/* Use the node structure directly without checking for Dodecahedron */}
                {Object.keys(nodes)
                    .filter((key) => nodes[key].isMesh)
                    .map((key) => (
                        <mesh
                            key={key}
                            ref={glbRef}
                            castShadow
                            receiveShadow
                            geometry={nodes[key].geometry}
                            scale={glbScale} // Fixed scale value
                            // Face rotation + inverse face rotation = fixed orientation
                            position={[0, 0, 0]}
                            rotation={fixedGlbRotation}
                        >
                            <meshStandardMaterial
                                aoMapIntensity={
                                    nodes[key].material?.aoMap ? 1 : 0
                                }
                                aoMap={nodes[key].material?.aoMap}
                                color={bg}
                                side={THREE.BackSide} // Render inside faces
                            />
                        </mesh>
                    ))}

                <spotLight
                    castShadow
                    color={bg}
                    intensity={2}
                    position={[12, 10, -5]}
                    angle={0.15}
                    penumbra={1.2}
                    shadow-normalBias={0.05}
                    shadow-bias={0.0001}
                />
            </group>

            {/** The shape */}
            <mesh castShadow receiveShadow ref={mesh}>
                {children}
                <meshLambertMaterial color={bg} />
            </mesh>
        </MeshPortalMaterial>
    );
}
