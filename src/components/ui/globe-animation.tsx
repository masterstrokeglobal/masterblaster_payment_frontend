"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import earthTexture from "../../../public/images/earth.jpg"
import earthSkeleton from "../../../public/images/earth_skeleton.jpg"

const GlobeAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const container = containerRef.current;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000936, 0); // Match AuthLayout bg
    container.appendChild(renderer.domElement);

    // Lighting
    // const ambientLight = new THREE.AmbientLight(0x606060, 2.0); // Neutral gray, increased intensity
    // scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Neutral white light
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Texture loader
    const loader = new THREE.TextureLoader();
    const earthTextureSrc = earthTexture.src
    const bumpTextureSrc = earthTexture.src // Dedicated bump map
    const specularTextureSrc = earthSkeleton.src;

    let globe: THREE.Mesh | undefined; // Explicitly type globe
    Promise.all([
      loader.loadAsync(earthTextureSrc).catch(() => {
        throw new Error("Failed to load Earth texture");
      }),
      loader.loadAsync(bumpTextureSrc).catch(() => {
        throw new Error("Failed to load bump map");
      }),
      loader.loadAsync(specularTextureSrc).catch(() => {
        throw new Error("Failed to load specular map");
      }),
    ])
      .then(([earthMap, bumpMap, specularMap]) => {
        const geometry = new THREE.SphereGeometry(1, 64, 64);
        const material = new THREE.MeshPhongMaterial({
          map: earthMap,
          bumpMap: bumpMap,
          bumpScale: 0.1, // Increased for more terrain detail
          specularMap: specularMap,
          specular: new THREE.Color(0x333333), // Neutral gray specular
          shininess: 30, // Increased for sharper highlights
        });
        globe = new THREE.Mesh(geometry, material);
        scene.add(globe);
      })
      .catch((err) => {
        console.error("Texture loading failed:", err.message);
        setError("Failed to load globe textures. Please try again later.");
      });

    // Animation loop
    let animationId: number;
    const animate = (time: number) => {
      time *= 0.001;
      if (globe) {
        globe.rotation.y = time * 0.4;
      }
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    // Resize handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // GSAP text animation
    if (textRef.current) {
      gsap.to(textRef.current, {
        scale: 1.15,
        duration: 0.6,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "center center",
      });
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center text-[#00ffe8]">
        <div className="w-[300px] h-[300px] flex items-center justify-center">
          <p className="text-center">{error}</p>
        </div>
        <div
          ref={textRef}
          className="mt-6 text-3xl font-bold text-[#00ffe8] tracking-wider shadow-[0_0_8px_#00ffe8,0_0_18px_#00ffe8,0_0_28px_#00ffe8] select-none"
        >
          {process.env.NEXT_PUBLIC_GLOBE_ANIMATION_NAME || "Bolt Payments"}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div
        ref={containerRef}
        className="w-[300px] h-[300px] drop-shadow-[0_0_6px_rgba(0,255,232,0.67)]"
      >
        {/* <canvas className="w-full h-full rounded-full" /> */}
      </div>
      <div
        ref={textRef}
        className="mt-6 text-3xl font-bold text-[#00ffe8] tracking-wider shadow-[0_0_8px_#00ffe8,0_0_18px_#00ffe8,0_0_28px_#00ffe8] select-none"
      >
        {process.env.NEXT_PUBLIC_GLOBE_ANIMATION_NAME || "Bolt Payments"}
      </div>
    </div>
  );
};

export default GlobeAnimation;
