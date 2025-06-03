"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollChoreography() {
  useEffect(() => {
    // Wait for DOM to be ready
    const initAnimations = () => {
      // Hero Section Animations
      const heroTimeline = gsap.timeline();
      
      // Hero content entrance
      heroTimeline
        .fromTo(".hero-title", {
          opacity: 0,
          y: 100,
          scale: 0.8,
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power4.out",
        })
        .fromTo(".hero-subtitle", {
          opacity: 0,
          y: 50,
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }, "-=0.8")
        .fromTo(".hero-description", {
          opacity: 0,
          y: 30,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }, "-=0.5")
        .fromTo(".hero-cta", {
          opacity: 0,
          scale: 0.8,
        }, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        }, "-=0.3")
        .fromTo(".hero-social", {
          opacity: 0,
          x: -30,
        }, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        }, "-=0.4");

      // About Section - Enhanced with spectacular 3D effects
      ScrollTrigger.create({
        trigger: "#about",
        start: "top 80%",
        onEnter: () => {
          const aboutTl = gsap.timeline();

          aboutTl
            // Header with 3D perspective flip
            .fromTo(".about-header", {
              opacity: 0,
              y: 100,
              rotationX: 45,
              transformPerspective: 1000,
              filter: "blur(10px)",
            }, {
              opacity: 1,
              y: 0,
              rotationX: 0,
              filter: "blur(0px)",
              duration: 1.5,
              ease: "power4.out",
            })
            // Image with spectacular 3D rotation and glow
            .fromTo(".about-image", {
              opacity: 0,
              scale: 0.3,
              rotationY: 180,
              rotationX: 45,
              filter: "blur(15px) brightness(0.2)",
              transformOrigin: "center center",
            }, {
              opacity: 1,
              scale: 1,
              rotationY: 0,
              rotationX: 0,
              filter: "blur(0px) brightness(1)",
              duration: 2,
              ease: "back.out(1.7)",
            }, "-=1.2")
            // Content with advanced skew and slide effect
            .fromTo(".about-content", {
              opacity: 0,
              x: 150,
              skewX: 20,
              filter: "blur(5px)",
            }, {
              opacity: 1,
              x: 0,
              skewX: 0,
              filter: "blur(0px)",
              duration: 1.5,
              ease: "power4.out",
            }, "-=1.5")
            // Highlights with morphing effect
            .fromTo(".about-highlight", {
              opacity: 0,
              y: 80,
              scale: 0.5,
              rotation: 15,
              transformOrigin: "center center",
            }, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 1.2,
              stagger: 0.2,
              ease: "elastic.out(1, 0.6)",
            }, "-=1")
            // Stats with bouncing counter animation
            .fromTo(".about-stat", {
              opacity: 0,
              scale: 0.2,
              rotation: 45,
              y: 100,
            }, {
              opacity: 1,
              scale: 1,
              rotation: 0,
              y: 0,
              duration: 1,
              stagger: 0.15,
              ease: "elastic.out(1.2, 0.5)",
            }, "-=0.8")
            // Add continuous floating animation
            .to(".about-image", {
              y: -15,
              rotation: 2,
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
            }, "-=0.5")
            .to(".about-stat", {
              y: -8,
              duration: 2.5,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
              stagger: 0.3,
            }, "-=2");
        }
      });

      // Projects Section - Enhanced with cinematic effects
      ScrollTrigger.create({
        trigger: "#projects",
        start: "top 80%",
        onEnter: () => {
          const projectsTl = gsap.timeline();

          projectsTl
            // Header with explosive entrance
            .fromTo(".projects-header", {
              opacity: 0,
              y: 150,
              scale: 0.5,
              rotationX: 90,
              transformPerspective: 1000,
              filter: "blur(20px)",
            }, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              filter: "blur(0px)",
              duration: 2,
              ease: "power4.out",
            })
            // Filter buttons with magnetic effect
            .fromTo(".projects-filter", {
              opacity: 0,
              y: 50,
              scale: 0.3,
              rotation: 180,
            }, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 1.2,
              stagger: 0.15,
              ease: "elastic.out(1.5, 0.6)",
            }, "-=1.5")
            // Project cards with 3D flip reveal
            .fromTo(".project-card", {
              opacity: 0,
              y: 200,
              scale: 0.3,
              rotationY: 90,
              rotationX: 45,
              transformPerspective: 1000,
              filter: "blur(10px) brightness(0.3)",
            }, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationY: 0,
              rotationX: 0,
              filter: "blur(0px) brightness(1)",
              duration: 1.8,
              stagger: 0.25,
              ease: "back.out(1.7)",
            }, "-=1")
            // Add hover-like floating animation to cards
            .to(".project-card", {
              y: -12,
              rotationY: 2,
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
              stagger: 0.4,
            }, "-=0.5")
            // Add subtle pulsing to filter buttons
            .to(".projects-filter", {
              scale: 1.05,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
              stagger: 0.2,
            }, "-=2");
        }
      });

      // Skills Section - Enhanced with spectacular marquee effects
      ScrollTrigger.create({
        trigger: "#skills",
        start: "top 80%",
        onEnter: () => {
          const skillsTl = gsap.timeline();

          skillsTl
            // Header with matrix-style reveal
            .fromTo(".skills-header", {
              opacity: 0,
              y: 120,
              scale: 0.3,
              rotationX: 90,
              transformPerspective: 1000,
              filter: "blur(15px) hue-rotate(180deg)",
            }, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              filter: "blur(0px) hue-rotate(0deg)",
              duration: 2,
              ease: "power4.out",
            })
            // Marquee with spectacular wave entrance
            .fromTo(".skills-marquee", {
              opacity: 0,
              scale: 0.5,
              rotationY: 180,
              filter: "blur(20px) saturate(0)",
            }, {
              opacity: 1,
              scale: 1,
              rotationY: 0,
              filter: "blur(0px) saturate(1)",
              duration: 2.5,
              ease: "back.out(1.7)",
            }, "-=1.5")
            // Individual skill cards with 3D morphing
            .fromTo(".skill-card", {
              opacity: 0,
              y: 100,
              scale: 0.2,
              rotationY: 90,
              rotationX: 45,
              transformPerspective: 1000,
              filter: "blur(8px) brightness(0.2)",
            }, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationY: 0,
              rotationX: 0,
              filter: "blur(0px) brightness(1)",
              duration: 1.5,
              stagger: 0.1,
              ease: "elastic.out(1.2, 0.5)",
            }, "-=2")
            // Add continuous wave animation to marquee
            .to(".skills-marquee", {
              rotationY: 5,
              duration: 4,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
            }, "-=1")
            // Add floating animation to skill cards
            .to(".skill-card", {
              y: -8,
              rotationY: 3,
              duration: 2.5,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
              stagger: 0.2,
            }, "-=3")
            // Add pulsing glow effect
            .to(".skill-card", {
              scale: 1.02,
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
              stagger: 0.15,
            }, "-=2");
        }
      });

      // Experience Section - Enhanced with timeline magic
      ScrollTrigger.create({
        trigger: "#experience",
        start: "top 80%",
        onEnter: () => {
          const experienceTl = gsap.timeline();

          experienceTl
            // Header with holographic entrance
            .fromTo(".experience-header", {
              opacity: 0,
              y: 150,
              scale: 0.3,
              rotationX: 90,
              transformPerspective: 1000,
              filter: "blur(20px) hue-rotate(90deg)",
            }, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              filter: "blur(0px) hue-rotate(0deg)",
              duration: 2,
              ease: "power4.out",
            })
            // Timeline items with 3D card flip
            .fromTo(".timeline-item", {
              opacity: 0,
              x: -200,
              scale: 0.2,
              rotationY: -90,
              rotationX: 45,
              transformPerspective: 1000,
              filter: "blur(15px) brightness(0.2)",
            }, {
              opacity: 1,
              x: 0,
              scale: 1,
              rotationY: 0,
              rotationX: 0,
              filter: "blur(0px) brightness(1)",
              duration: 1.8,
              stagger: 0.4,
              ease: "back.out(1.7)",
            }, "-=1.5")
            // Timeline connector with liquid growth
            .fromTo(".timeline-connector", {
              scaleY: 0,
              transformOrigin: "top center",
              filter: "blur(5px)",
            }, {
              scaleY: 1,
              filter: "blur(0px)",
              duration: 2.5,
              ease: "power2.out",
            }, "-=2")
            // Add floating animation to timeline items
            .to(".timeline-item", {
              y: -10,
              rotationY: 3,
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
              stagger: 0.5,
            }, "-=1")
            // Add pulsing glow to connector
            .to(".timeline-connector", {
              filter: "drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))",
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
            }, "-=2");
        }
      });

      // Testimonials Section - Enhanced with carousel magic
      ScrollTrigger.create({
        trigger: "#testimonials",
        start: "top 80%",
        onEnter: () => {
          const testimonialsTl = gsap.timeline();

          testimonialsTl
            // Header with spotlight effect
            .fromTo(".testimonials-header", {
              opacity: 0,
              y: 120,
              scale: 0.4,
              rotationX: 90,
              transformPerspective: 1000,
              filter: "blur(15px) contrast(0.3)",
            }, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              filter: "blur(0px) contrast(1)",
              duration: 2,
              ease: "power4.out",
            })
            // Testimonial cards with 3D carousel entrance
            .fromTo(".testimonial-card", {
              opacity: 0,
              scale: 0.2,
              rotationY: 120,
              rotationX: 60,
              z: -500,
              transformPerspective: 1000,
              filter: "blur(20px) brightness(0.1)",
            }, {
              opacity: 1,
              scale: 1,
              rotationY: 0,
              rotationX: 0,
              z: 0,
              filter: "blur(0px) brightness(1)",
              duration: 2.2,
              stagger: 0.3,
              ease: "back.out(1.7)",
            }, "-=1.5")
            // Navigation with magnetic bounce
            .fromTo(".testimonial-nav", {
              opacity: 0,
              y: 80,
              scale: 0.3,
              rotation: 180,
            }, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 1.5,
              stagger: 0.15,
              ease: "elastic.out(1.5, 0.6)",
            }, "-=1.8")
            // Add floating carousel effect
            .to(".testimonial-card", {
              y: -15,
              rotationY: 5,
              duration: 4,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
              stagger: 0.6,
            }, "-=1")
            // Add pulsing navigation
            .to(".testimonial-nav", {
              scale: 1.1,
              filter: "drop-shadow(0 0 15px rgba(139, 92, 246, 0.4))",
              duration: 2.5,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
              stagger: 0.2,
            }, "-=3");
        }
      });



      // Contact Section - Enhanced with communication magic
      ScrollTrigger.create({
        trigger: "#contact",
        start: "top 80%",
        onEnter: () => {
          const contactTl = gsap.timeline();

          contactTl
            // Header with signal transmission effect
            .fromTo(".contact-header", {
              opacity: 0,
              y: 120,
              scale: 0.3,
              rotationX: 90,
              transformPerspective: 1000,
              filter: "blur(20px) hue-rotate(120deg)",
            }, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              filter: "blur(0px) hue-rotate(0deg)",
              duration: 2,
              ease: "power4.out",
            })
            // Contact form with holographic entrance
            .fromTo(".contact-form", {
              opacity: 0,
              x: -200,
              scale: 0.2,
              rotationY: -90,
              rotationX: 45,
              transformPerspective: 1000,
              filter: "blur(15px) brightness(0.2)",
            }, {
              opacity: 1,
              x: 0,
              scale: 1,
              rotationY: 0,
              rotationX: 0,
              filter: "blur(0px) brightness(1)",
              duration: 2.2,
              ease: "back.out(1.7)",
            }, "-=1.5")
            // Contact info with satellite reveal
            .fromTo(".contact-info", {
              opacity: 0,
              x: 200,
              scale: 0.2,
              rotationY: 90,
              rotationX: 45,
              transformPerspective: 1000,
              filter: "blur(15px) brightness(0.2)",
            }, {
              opacity: 1,
              x: 0,
              scale: 1,
              rotationY: 0,
              rotationX: 0,
              filter: "blur(0px) brightness(1)",
              duration: 2.2,
              ease: "back.out(1.7)",
            }, "-=2.2")
            // Social icons with orbital entrance
            .fromTo(".contact-social", {
              opacity: 0,
              scale: 0.1,
              rotation: 360,
              y: 100,
            }, {
              opacity: 1,
              scale: 1,
              rotation: 0,
              y: 0,
              duration: 1.8,
              stagger: 0.2,
              ease: "elastic.out(1.5, 0.6)",
            }, "-=1.8")
            // Add floating form effect
            .to(".contact-form", {
              y: -8,
              rotationY: 2,
              duration: 3.5,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
            }, "-=1")
            // Add floating info effect
            .to(".contact-info", {
              y: -10,
              rotationY: -2,
              duration: 4,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
            }, "-=3")
            // Add orbital social animation
            .to(".contact-social", {
              rotation: 5,
              scale: 1.05,
              duration: 2.5,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
              stagger: 0.3,
            }, "-=3.5");
        }
      });

      // Advanced Parallax and Morphing Effects
      gsap.utils.toArray(".parallax-slow").forEach((element: any) => {
        gsap.to(element, {
          yPercent: -50,
          rotation: 2,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      gsap.utils.toArray(".parallax-fast").forEach((element: any) => {
        gsap.to(element, {
          yPercent: -100,
          rotation: -3,
          scale: 0.9,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      });

      // Magnetic Scroll Effects for Interactive Elements
      gsap.utils.toArray(".magnetic-element").forEach((element: any) => {
        gsap.to(element, {
          scale: 1.05,
          rotation: 5,
          filter: "brightness(1.2) saturate(1.3)",
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            end: "bottom 10%",
            scrub: 1,
            onEnter: () => {
              gsap.to(element, {
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
                duration: 0.3,
              });
            },
            onLeave: () => {
              gsap.to(element, {
                boxShadow: "0 0px 0px rgba(139, 92, 246, 0)",
                duration: 0.3,
              });
            },
          },
        });
      });

      // Morphing Text Effects
      gsap.utils.toArray(".morphing-text").forEach((element: any) => {
        gsap.to(element, {
          backgroundPosition: "200% center",
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        });
      });

      // 3D Perspective Scroll Effects
      gsap.utils.toArray(".perspective-element").forEach((element: any) => {
        gsap.to(element, {
          rotationY: 15,
          rotationX: 5,
          transformPerspective: 1000,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      });

      // Cinematic Zoom Effects
      gsap.utils.toArray(".zoom-element").forEach((element: any) => {
        gsap.fromTo(element, {
          scale: 0.8,
          filter: "blur(5px)",
        }, {
          scale: 1.2,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // Refresh ScrollTrigger after all animations are set up
      ScrollTrigger.refresh();
    };

    // Initialize animations after a short delay to ensure DOM is ready
    const timer = setTimeout(initAnimations, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return null; // This component doesn't render anything
}
