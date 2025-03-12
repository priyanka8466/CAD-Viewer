import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter";
import "./ModelViewer.css"; // Ensure this path is correct

const ModelViewer = ({ modelUrl }) => {
    const mountRef = useRef(null);
    const [model, setModel] = useState(null);

    useEffect(() => {
        if (!modelUrl) {
            console.error("No model URL provided");
            return;
        }

        console.log("Loading model from URL:", modelUrl);

        // Set up the scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 5);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Orbit Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);

        // Load materials first
        const mtlLoader = new MTLLoader();
        const objLoader = new OBJLoader();

        const mtlUrl = modelUrl.replace(".obj", ".mtl"); // Replace .obj with .mtl
        console.log("Loading materials from:", mtlUrl);

        mtlLoader.load(
            mtlUrl,
            (materials) => {
                console.log("Materials loaded successfully:", materials);
                materials.preload(); // Preload materials

                // Set materials for the OBJ loader
                objLoader.setMaterials(materials);

                // Load the 3D model
                objLoader.load(
                    modelUrl,
                    (object) => {
                        console.log("Model loaded successfully:", object);
                        scene.add(object);
                        setModel(object); // Store the loaded model

                        // Adjust camera to fit the model
                        const boundingBox = new THREE.Box3().setFromObject(object);
                        const center = boundingBox.getCenter(new THREE.Vector3());
                        const size = boundingBox.getSize(new THREE.Vector3());

                        camera.position.copy(center);
                        camera.position.z = size.length(); // Adjust camera distance
                        camera.lookAt(center);

                        console.log("Model added to scene:", object);
                    },
                    (xhr) => {
                        console.log(`Loading model: ${(xhr.loaded / xhr.total) * 100}%`);
                    },
                    (error) => {
                        console.error("Error loading OBJ file", error);
                    }
                );
            },
            (xhr) => {
                console.log(`Loading materials: ${(xhr.loaded / xhr.total) * 100}%`);
            },
            (error) => {
                console.error("Error loading materials", error);
            }
        );

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup function
        return () => {
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, [modelUrl]);

    // Export the model as STL
    const exportAsSTL = () => {
        if (!model) {
            console.error("No model loaded");
            return;
        }

        const exporter = new STLExporter();
        const stlString = exporter.parse(model, { binary: false });

        const blob = new Blob([stlString], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "model.stl";
        link.click();
    };

    // Export the model as OBJ
    const exportAsOBJ = () => {
        if (!model) {
            console.error("No model loaded");
            return;
        }

        const exporter = new OBJExporter();
        const objString = exporter.parse(model);

        const blob = new Blob([objString], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "model.obj";
        link.click();
    };

    return (
        <div className="model-viewer-container">
            <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />
            <div className="export-buttons">
                <button className="export-button stl" onClick={exportAsSTL}>
                    Export as STL
                </button>
                <button className="export-button obj" onClick={exportAsOBJ}>
                    Export as OBJ
                </button>
            </div>
        </div>
    );
};

export default ModelViewer;