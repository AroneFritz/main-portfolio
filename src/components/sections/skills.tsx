"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Skills data organized by color themes
const skillsWithColors = [
  { name: "REACT", color: "text-cyan-400" },
  { name: "NODE.JS", color: "text-green-400" },
  { name: "MONGODB", color: "text-green-500" },
  { name: "THREE.JS", color: "text-blue-400" },
  { name: "REDUX", color: "text-purple-400" },
  { name: "JAVASCRIPT", color: "text-yellow-400" },
  { name: "TYPESCRIPT", color: "text-blue-500" },
  { name: "NEXT.JS", color: "text-white" },
  { name: "TAILWIND", color: "text-cyan-300" },
  { name: "FRAMER MOTION", color: "text-pink-400" },
  { name: "POSTGRESQL", color: "text-blue-600" },
  { name: "DOCKER", color: "text-blue-400" },
  { name: "AWS", color: "text-orange-400" },
  { name: "GIT", color: "text-red-400" },
  { name: "LARAVEL", color: "text-purple-500" },
  { name: "PYTHON", color: "text-yellow-500" },
  { name: "EXPRESS", color: "text-gray-300" },
  { name: "PHP", color: "text-indigo-400" },
  { name: "GRAPHQL", color: "text-pink-500" },
  { name: "VERCEL", color: "text-white" },
];

// Create multiple rows with different skills for seamless scrolling
const createSkillRows = () => {
  // Create longer rows for seamless infinite scrolling
  const row1 = [
    ...skillsWithColors.slice(0, 7),
    ...skillsWithColors.slice(0, 7),
    ...skillsWithColors.slice(0, 7)
  ];
  const row2 = [
    ...skillsWithColors.slice(7, 14),
    ...skillsWithColors.slice(7, 14),
    ...skillsWithColors.slice(7, 14)
  ];
  const row3 = [
    ...skillsWithColors.slice(14),
    ...skillsWithColors.slice(0, 8),
    ...skillsWithColors.slice(14),
    ...skillsWithColors.slice(0, 8)
  ];

  return [row1, row2, row3];
};

export function Skills() {
  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillRows = createSkillRows();

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
      {/* Header section with container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="skills-header text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies I work with to bring ideas to life
          </p>
        </div>
      </div>

      {/* Full-width marquee section */}
      <div className="skills-marquee relative mb-20 w-full">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="space-y-6 py-4">
          {skillRows.map((row, rowIndex) => (
            <div key={rowIndex} className="overflow-hidden w-full">
              <motion.div
                className="flex gap-6 whitespace-nowrap will-change-transform"
                animate={{
                  x: rowIndex % 2 === 0 ? [0, -2400] : [-2400, 0],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30 + rowIndex * 3, // Different speeds for each row
                    ease: "linear",
                  },
                }}
                style={{
                  width: 'max-content',
                }}
              >
                {row.map((skill, skillIndex) => (
                  <motion.div
                    key={`${skill.name}-${skillIndex}`}
                    className="flex items-center gap-3 flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${skill.color} tracking-wide select-none`}>
                      {skill.name}
                    </span>
                    <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-muted-foreground/60 select-none">•</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>


    </section>
  );
}


