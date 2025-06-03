"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  Float,
  Box,
  Torus,
  Octahedron,
  Stars,
  Sparkles,
  MeshWobbleMaterial,
  Icosahedron,
  Ring
} from "@react-three/drei";
import * as THREE from "three";

// Enhanced lighting setup component
function SceneLighting() {
  return (
    <>
      {/* Main ambient light for overall illumination */}
      <primitive object={new THREE.AmbientLight('#ffffff', 1.0)} />

      {/* Primary directional light */}
      <primitive object={new THREE.DirectionalLight('#ffffff', 1.5)} position={[10, 10, 5]} />

      {/* Colored accent lights for vibrant effects */}
      <primitive object={new THREE.PointLight('#8b5cf6', 1.0)} position={[10, 10, 10]} />
      <primitive object={new THREE.PointLight('#06b6d4', 0.8)} position={[-10, -10, -10]} />
      <primitive object={new THREE.PointLight('#f59e0b', 0.6)} position={[0, 15, 0]} />
      <primitive object={new THREE.PointLight('#ef4444', 0.5)} position={[-15, 0, 5]} />
      <primitive object={new THREE.PointLight('#10b981', 0.5)} position={[15, -5, -5]} />
    </>
  );
}

// Realistic water-like sphere with amazing effects
function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;

      // Breathing effect
      const scale = 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere
        ref={meshRef}
        args={[1, 128, 128]}
        scale={2}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color={hovered ? "#00d4ff" : "#0099cc"}
          attach="material"
          distort={hovered ? 0.8 : 0.5}
          speed={hovered ? 4 : 2}
          roughness={0.1}
          metalness={0.9}
          emissive="#004466"
          emissiveIntensity={0.3}
          transparent={true}
          opacity={0.85}
        />
      </Sphere>
    </Float>
  );
}

// Enhanced floating geometric shapes with realistic materials
function FloatingShapes() {
  return (
    <>
      {/* Realistic Metallic Torus - Chrome/Silver */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
        <Torus args={[0.3, 0.1, 32, 100]} position={[4, 2, -2]}>
          <MeshWobbleMaterial
            color="#e6f3ff"
            attach="material"
            factor={0.6}
            speed={2}
            roughness={0.05}
            metalness={0.95}
            emissive="#004080"
            emissiveIntensity={0.1}
          />
        </Torus>
      </Float>

      {/* Realistic Gold Octahedron */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Octahedron args={[0.4]} position={[-4, -1, -1]}>
          <MeshWobbleMaterial
            color="#ffd700"
            attach="material"
            factor={0.4}
            speed={1.5}
            roughness={0.1}
            metalness={0.9}
            emissive="#cc6600"
            emissiveIntensity={0.2}
          />
        </Octahedron>
      </Float>

      {/* Realistic Ruby Crystal Icosahedron */}
      <Float speed={1.8} rotationIntensity={2.5} floatIntensity={1.5}>
        <Icosahedron args={[0.35]} position={[3, -2, 1]}>
          <MeshDistortMaterial
            color="#ff1a4d"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.05}
            metalness={0.1}
            emissive="#800020"
            emissiveIntensity={0.3}
            transparent={true}
            opacity={0.9}
          />
        </Icosahedron>
      </Float>

      {/* Realistic Emerald Boxes */}
      <Float speed={2.2} rotationIntensity={1} floatIntensity={2.5}>
        <Box args={[0.3, 0.3, 0.3]} position={[-3, 2, 2]}>
          <MeshWobbleMaterial
            color="#00cc66"
            attach="material"
            factor={0.5}
            speed={1.8}
            roughness={0.1}
            metalness={0.2}
            emissive="#004d1a"
            emissiveIntensity={0.25}
            transparent={true}
            opacity={0.85}
          />
        </Box>
      </Float>

      {/* Realistic Amethyst Ring */}
      <Float speed={1.2} rotationIntensity={3} floatIntensity={1}>
        <Ring args={[0.2, 0.4, 32]} position={[2, 3, -3]}>
          <MeshDistortMaterial
            color="#9966ff"
            attach="material"
            distort={0.2}
            speed={3}
            roughness={0.05}
            metalness={0.1}
            emissive="#4d0080"
            emissiveIntensity={0.3}
            transparent={true}
            opacity={0.8}
          />
        </Ring>
      </Float>
    </>
  );
}

// Simplified but amazing 3D components to avoid TypeScript issues
function Amazing3DScene() {
  return (
    <>
      {/* Multiple floating geometric shapes */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
        <Torus args={[0.3, 0.1, 16, 100]} position={[4, 2, -2]}>
          <MeshWobbleMaterial
            color="#06b6d4"
            attach="material"
            factor={0.6}
            speed={2}
            roughness={0}
            metalness={0.8}
          />
        </Torus>
      </Float>

      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Octahedron args={[0.4]} position={[-4, -1, -1]}>
          <MeshWobbleMaterial
            color="#f59e0b"
            attach="material"
            factor={0.4}
            speed={1.5}
            roughness={0}
            metalness={0.9}
          />
        </Octahedron>
      </Float>

      <Float speed={1.8} rotationIntensity={2.5} floatIntensity={1.5}>
        <Icosahedron args={[0.35]} position={[3, -2, 1]}>
          <MeshDistortMaterial
            color="#ef4444"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0}
            metalness={0.7}
          />
        </Icosahedron>
      </Float>

      <Float speed={2.2} rotationIntensity={1} floatIntensity={2.5}>
        <Box args={[0.3, 0.3, 0.3]} position={[-3, 2, 2]}>
          <MeshWobbleMaterial
            color="#10b981"
            attach="material"
            factor={0.5}
            speed={1.8}
            roughness={0}
            metalness={0.8}
          />
        </Box>
      </Float>

      <Float speed={1.2} rotationIntensity={3} floatIntensity={1}>
        <Ring args={[0.2, 0.4, 32]} position={[2, 3, -3]}>
          <MeshDistortMaterial
            color="#8b5cf6"
            attach="material"
            distort={0.2}
            speed={3}
            roughness={0}
            metalness={1}
            transparent
            opacity={0.8}
          />
        </Ring>
      </Float>
    </>
  );
}

export function Hero() {
  const [isClient, setIsClient] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {/* Enhanced 3D Background */}
      {isClient && (
        <div className="absolute inset-0 opacity-40">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 75 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            {/* Essential Lighting for 3D shapes */}
            <SceneLighting />

            {/* Stars Effect */}
            <Stars
              radius={300}
              depth={60}
              count={1000}
              factor={7}
              saturation={0.5}
              fade
              speed={0.5}
            />

            {/* Sparkles Effect */}
            <Sparkles
              count={100}
              scale={[20, 20, 20]}
              size={2}
              speed={0.4}
              opacity={0.6}
              color="#8b5cf6"
            />

            {/* Main Components */}
            <AnimatedSphere />
            <FloatingShapes />

            {/* Interactive Controls */}
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
              autoRotate={true}
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              👋 Hello, I'm
            </span>
          </motion.div>

          {/* Name */}
          <h1 className="hero-title text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
              Arone Fritz
            </span>
          </h1>

          {/* Title */}
          <h2 className="hero-subtitle text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Web Stack Developer
          </h2>

          {/* Description */}
          <p className="hero-description text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            I craft exceptional digital experiences with modern technologies.
            Passionate about creating scalable, user-friendly applications that make a difference.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => {
                const projectsSection = document.getElementById("projects");
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors group"
            >
              View My Work
              <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center px-8 py-4 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
            >
              Get In Touch
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-16">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors group"
              aria-label="GitHub"
            >
              <Github size={20} className="group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors group"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="hero-social p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors group"
              aria-label="Email"
            >
              <Mail size={20} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>

          {/* Scroll Indicator */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            onClick={scrollToNext}
            className="inline-flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors group"
            aria-label="Scroll to next section"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={20} className="group-hover:scale-110 transition-transform" />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Enhanced Floating particles with multiple effects */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Main floating particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                background: `linear-gradient(45deg,
                  ${['#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444', '#10b981'][Math.floor(Math.random() * 5)]},
                  ${['#a855f7', '#0891b2', '#d97706', '#dc2626', '#059669'][Math.floor(Math.random() * 5)]}
                )`,
                boxShadow: `0 0 ${Math.random() * 20 + 10}px ${['#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444', '#10b981'][Math.floor(Math.random() * 5)]}`,
              }}
              initial={{
                x: Math.random() * windowSize.width,
                y: Math.random() * windowSize.height,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                y: [null, -100, windowSize.height + 100],
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10,
              }}
            />
          ))}

          {/* Glowing orbs */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full blur-sm"
              style={{
                width: Math.random() * 40 + 20,
                height: Math.random() * 40 + 20,
                background: `radial-gradient(circle,
                  ${['#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444', '#10b981'][Math.floor(Math.random() * 5)]}40,
                  transparent
                )`,
              }}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0,
              }}
              animate={{
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                ],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                ],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: Math.random() * 20 + 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}

          {/* Shooting stars */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
              style={{
                width: Math.random() * 100 + 50,
              }}
              initial={{
                x: -200,
                y: Math.random() * window.innerHeight,
                opacity: 0,
              }}
              animate={{
                x: window.innerWidth + 200,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10 + 5,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
