"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";

export default function NotFound() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="flex items-center justify-center min-h-screen pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* 404 Animation */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                className="mb-8"
              >
                <h1 className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  404
                </h1>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl sm:text-3xl font-bold mb-4"
              >
                Page Not Found
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-muted-foreground mb-8 text-lg"
              >
                Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <Home size={20} className="mr-2" />
                  Go Home
                </Link>

                <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  Go Back
                </button>
              </motion.div>

              {/* Search Suggestion */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-12 p-6 bg-muted/50 rounded-xl"
              >
                <div className="flex items-center justify-center mb-4">
                  <Search size={24} className="text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Looking for something specific?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Try navigating to one of these popular sections:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Link
                    href="/#about"
                    className="px-3 py-1 bg-background border border-border rounded-md text-sm hover:bg-muted transition-colors"
                  >
                    About
                  </Link>
                  <Link
                    href="/#projects"
                    className="px-3 py-1 bg-background border border-border rounded-md text-sm hover:bg-muted transition-colors"
                  >
                    Projects
                  </Link>
                  <Link
                    href="/blog"
                    className="px-3 py-1 bg-background border border-border rounded-md text-sm hover:bg-muted transition-colors"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/#contact"
                    className="px-3 py-1 bg-background border border-border rounded-md text-sm hover:bg-muted transition-colors"
                  >
                    Contact
                  </Link>
                </div>
              </motion.div>

              {/* Floating Elements */}
              {isClient && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-primary/20 rounded-full"
                      initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                      }}
                      animate={{
                        y: [null, -100, window.innerHeight + 100],
                      }}
                      transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5,
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
