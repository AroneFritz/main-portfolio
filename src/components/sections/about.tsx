"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Palette, Zap, Users } from "lucide-react";
import Image from "next/image";

const highlights = [
  {
    icon: Code,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and efficient code following best practices."
  },
  {
    icon: Palette,
    title: "Design-Focused",
    description: "Creating beautiful, intuitive interfaces that users love to interact with."
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimizing applications for speed, accessibility, and user experience."
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working effectively with teams to deliver exceptional products."
  }
];

const stats = [
  { number: "15+", label: "Projects Completed" },
  { number: "3+", label: "Years Experience" },
  { number: "20+", label: "Technologies" },
  { number: "100%", label: "Client Satisfaction" }
];

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="about-header text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              About Me
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate developer with a love for creating digital experiences that matter
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Image */}
            <div className="about-image relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl transform rotate-6"></div>
                <div className="relative bg-background rounded-2xl p-2">
                  <Image
                    src="/arone-removebg.png"
                    alt="Arone Fritz"
                    width={400}
                    height={500}
                    className="rounded-xl w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="about-content space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold">
                Building the future, one line of code at a time
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a passionate web stack developer with over 3 years of experience
                  creating digital solutions that make a real impact. My journey began
                  with a curiosity about how things work, which led me to discover the
                  endless possibilities of code.
                </p>
                <p>
                  I specialize in modern web technologies including React, Next.js,
                  TypeScript, and Node.js. I believe in writing clean, maintainable
                  code and creating user experiences that are both beautiful and functional.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies,
                  contributing to open-source projects, or sharing knowledge with the
                  developer community.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="about-stat text-center p-4 rounded-lg bg-background border border-border"
                  >
                    <div className="text-2xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12">
              What I Bring to the Table
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {highlights.map((highlight, index) => (
                <div
                  key={highlight.title}
                  className="about-highlight text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <highlight.icon size={24} />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">{highlight.title}</h4>
                  <p className="text-muted-foreground">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
