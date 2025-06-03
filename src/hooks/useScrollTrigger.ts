"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollTriggerOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export function useScrollTrigger(
  animation: (element: Element) => gsap.core.Timeline | gsap.core.Tween,
  options: ScrollTriggerOptions = {}
) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const tl = animation(element);

    ScrollTrigger.create({
      trigger: options.trigger || element,
      start: options.start || "top 80%",
      end: options.end || "bottom 20%",
      scrub: options.scrub || false,
      pin: options.pin || false,
      markers: options.markers || false,
      animation: tl,
      onEnter: options.onEnter,
      onLeave: options.onLeave,
      onEnterBack: options.onEnterBack,
      onLeaveBack: options.onLeaveBack,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element || trigger.trigger === options.trigger) {
          trigger.kill();
        }
      });
    };
  }, [animation, options]);

  return elementRef;
}

// Predefined animation functions
export const fadeInUp = (element: Element) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 60,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    }
  );
};

export const fadeInLeft = (element: Element) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x: -60,
    },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
    }
  );
};

export const fadeInRight = (element: Element) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x: 60,
    },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
    }
  );
};

export const scaleIn = (element: Element) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.8,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "back.out(1.7)",
    }
  );
};

export const staggerChildren = (element: Element) => {
  const children = element.children;
  return gsap.fromTo(
    children,
    {
      opacity: 0,
      y: 40,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    }
  );
};

export const parallaxMove = (element: Element, distance: number = 100) => {
  return gsap.fromTo(
    element,
    {
      y: distance,
    },
    {
      y: -distance,
      ease: "none",
    }
  );
};

export const rotateIn = (element: Element) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      rotation: -10,
      scale: 0.9,
    },
    {
      opacity: 1,
      rotation: 0,
      scale: 1,
      duration: 1.2,
      ease: "back.out(1.7)",
    }
  );
};

export const slideInFromBottom = (element: Element) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 100,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power4.out",
    }
  );
};

export const morphIn = (element: Element) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.5,
      rotation: 180,
    },
    {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
    }
  );
};
