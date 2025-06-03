"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Loading({ size = "md", className }: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <motion.div
        className={cn(
          "border-2 border-primary/20 border-t-primary rounded-full",
          sizeClasses[size]
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <Loading size="lg" className="mb-4" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full", className)}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

// Professional Page Loading Screen
export function PageLoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState("Initializing...");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    console.log("PageLoadingScreen: Component mounted");

    let currentProgress = 0;
    const targetProgress = 100; // Go to 100% for complete experience
    const duration = 3500; // 3.5 seconds to reach 100%
    const interval = 60; // Update every 60ms for smoother animation
    const increment = (targetProgress / duration) * interval;

    // More realistic progress simulation with phases
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= targetProgress || isCompleted) {
          clearInterval(timer); // Clear timer when complete
          if (!isCompleted) {
            setIsCompleted(true);
            setLoadingPhase("Ready!");
          }
          return targetProgress; // Ensure we reach exactly 100%
        }

        // Add some randomness but keep it smooth and ensure completion
        const randomFactor = 0.9 + Math.random() * 0.2; // 0.9 to 1.1 for more consistent progress
        const newProgress = Math.min(prev + (increment * randomFactor), targetProgress);

        // Update loading phase based on progress - more gradual phases
        if (newProgress < 15) {
          setLoadingPhase("Loading assets...");
        } else if (newProgress < 30) {
          setLoadingPhase("Preparing components...");
        } else if (newProgress < 45) {
          setLoadingPhase("Initializing animations...");
        } else if (newProgress < 60) {
          setLoadingPhase("Setting up interactions...");
        } else if (newProgress < 75) {
          setLoadingPhase("Optimizing performance...");
        } else if (newProgress < 90) {
          setLoadingPhase("Finalizing experience...");
        } else if (newProgress < 98) {
          setLoadingPhase("Almost ready...");
        } else {
          setLoadingPhase("Ready!");
        }

        console.log("PageLoadingScreen: Progress =", Math.round(newProgress));
        return newProgress;
      });
    }, interval);

    // Ensure progress reaches 100% after duration
    const completionTimer = setTimeout(() => {
      console.log("PageLoadingScreen: Ensuring 100% completion");
      setIsCompleted(true);
      setProgress(100);
      setLoadingPhase("Ready!");
    }, duration + 200); // Small buffer to ensure completion

    return () => {
      console.log("PageLoadingScreen: Cleanup");
      clearInterval(timer);
      clearTimeout(completionTimer);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -30,
      transition: {
        duration: 1.5,
        ease: [0.76, 0, 0.24, 1],
        staggerChildren: 0.15,
        staggerDirection: -1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98]
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const logoVariants = {
    hidden: { scale: 0.5, opacity: 0, rotate: -180 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.21, 0.47, 0.32, 0.98],
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      scale: 1.2,
      opacity: 0,
      rotate: 180,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const progressVariants = {
    hidden: { width: "0%", opacity: 0 },
    visible: {
      width: `${progress}%`,
      opacity: 1,
      transition: {
        width: {
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94]
        },
        opacity: {
          duration: 0.3,
          delay: 0.2
        }
      }
    }
  };

  // Enhanced particle animation variants
  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  console.log("PageLoadingScreen: Rendering loading screen");

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="loading-screen flex items-center justify-center overflow-hidden"
      >
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-secondary/30"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(139, 92, 246, 0.3) 0%, transparent 50%, rgba(59, 130, 246, 0.3) 100%)",
                "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, transparent 50%, rgba(139, 92, 246, 0.3) 100%)",
                "linear-gradient(225deg, rgba(139, 92, 246, 0.3) 0%, transparent 50%, rgba(59, 130, 246, 0.3) 100%)",
                "linear-gradient(315deg, rgba(59, 130, 246, 0.3) 0%, transparent 50%, rgba(139, 92, 246, 0.3) 100%)",
                "linear-gradient(45deg, rgba(139, 92, 246, 0.3) 0%, transparent 50%, rgba(59, 130, 246, 0.3) 100%)"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Animated radial gradients */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
                 radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
                `radial-gradient(circle at 75% 25%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
                 radial-gradient(circle at 25% 75%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
                `radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
                 radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
                `radial-gradient(circle at 25% 75%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
                 radial-gradient(circle at 75% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
                `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
                 radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`
              ]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Geometric pattern overlay */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
            animate={{
              x: [0, 60, 0],
              y: [0, 60, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="relative text-center">
          {/* Enhanced Logo Animation */}
          <motion.div
            variants={logoVariants}
            className="mb-8"
          >
            <div className="relative">
              {/* Outer Ring with Glow */}
              <motion.div
                className="w-28 h-28 border-2 border-primary/30 rounded-full absolute -inset-2 shadow-lg shadow-primary/20"
                animate={{
                  rotate: 360,
                  scale: [1, 1.05, 1],
                  borderColor: ["rgba(139, 92, 246, 0.3)", "rgba(139, 92, 246, 0.6)", "rgba(139, 92, 246, 0.3)"]
                }}
                transition={{
                  rotate: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  borderColor: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />

              {/* Middle Ring */}
              <motion.div
                className="w-24 h-24 border-2 border-primary/40 rounded-full absolute inset-0"
                animate={{
                  rotate: -360,
                  borderColor: ["rgba(139, 92, 246, 0.4)", "rgba(59, 130, 246, 0.6)", "rgba(139, 92, 246, 0.4)"]
                }}
                transition={{
                  rotate: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  borderColor: {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />

              {/* Inner Ring */}
              <motion.div
                className="w-20 h-20 border-2 border-secondary/50 rounded-full absolute inset-2"
                animate={{
                  rotate: 360,
                  scale: [1, 0.95, 1],
                  borderColor: ["rgba(59, 130, 246, 0.5)", "rgba(139, 92, 246, 0.7)", "rgba(59, 130, 246, 0.5)"]
                }}
                transition={{
                  rotate: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  borderColor: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />

              {/* Pulsing Glow Effect */}
              <motion.div
                className="w-32 h-32 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full absolute -inset-4 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Center Logo with Enhanced Animation */}
              <div className="w-24 h-24 flex items-center justify-center relative z-10">
                <motion.div
                  className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
                  style={{ backgroundSize: "200% 100%" }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8],
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    opacity: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    backgroundPosition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    },
                    rotate: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  AF
                </motion.div>
              </div>

              {/* Orbiting Dots */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-primary rounded-full absolute"
                  style={{
                    top: "50%",
                    left: "50%",
                    transformOrigin: `${16 + i * 4}px 0px`
                  }}
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Enhanced Loading Text */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <motion.h2
              className="text-2xl font-semibold mb-2 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 100%" }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              Loading Portfolio
            </motion.h2>
            <motion.p
              className="text-muted-foreground"
              animate={{
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {loadingPhase}
            </motion.p>
          </motion.div>

          {/* Enhanced Progress Bar */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-md mx-auto"
          >
            <div className="flex justify-between items-center mb-3">
              <motion.span
                className="text-sm text-muted-foreground"
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Progress
              </motion.span>
              <motion.span
                className="text-sm font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {Math.round(progress)}%
              </motion.span>
            </div>

            {/* Progress Bar Container with Glow */}
            <div className="relative">
              <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden border border-border/50 shadow-inner">
                <motion.div
                  variants={progressVariants}
                  className="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full relative overflow-hidden"
                  style={{ backgroundSize: "200% 100%" }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    backgroundPosition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                >
                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ["-100%", "100%"]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 0.5
                    }}
                  />

                  {/* Pulsing glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-full blur-sm"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>

              {/* Progress bar outer glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-md -z-10"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          {/* Enhanced Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Main floating particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                variants={particleVariants}
                initial="hidden"
                animate="visible"
                className={`absolute rounded-full ${
                  i % 3 === 0 ? 'w-2 h-2 bg-primary/40' :
                  i % 3 === 1 ? 'w-1.5 h-1.5 bg-secondary/40' :
                  'w-1 h-1 bg-primary/30'
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 30, 0],
                  x: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0],
                  opacity: [0.2, 1, 0.2],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 3,
                }}
              />
            ))}

            {/* Sparkle effects */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute w-0.5 h-0.5 bg-white rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                  repeatDelay: 1,
                }}
              />
            ))}

            {/* Floating geometric shapes */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`shape-${i}`}
                className={`absolute border border-primary/20 ${
                  i % 2 === 0 ? 'w-3 h-3 rounded-full' : 'w-2 h-2 rotate-45'
                }`}
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  rotate: [0, 360],
                  opacity: [0.1, 0.4, 0.1],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: Math.random() * 6 + 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
