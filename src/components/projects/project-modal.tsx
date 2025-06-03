"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Calendar, Clock, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import Image from "next/image";
import { Project } from "@/types";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play image gallery
  useEffect(() => {
    if (!isAutoPlaying || !project?.images || project.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev === project.images!.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, project?.images]);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  // Ensure we have a proper images array
  const images = project.images && Array.isArray(project.images) && project.images.length > 0
    ? project.images
    : [project.image];

  // For projects that should have multiple images, ensure they do
  const shouldHaveMultipleImages = ["E-Commerce Platform", "Collaborative Task Manager", "Weather Data API"];
  const hasMultipleImages = images.length > 1 || shouldHaveMultipleImages.includes(project.title);
  const nextImage = () => {
    setCurrentImageIndex((prev) => prev === images.length - 1 ? 0 : prev + 1);
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      rotateX: 45,
    },
    visible: { 
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      rotateX: -45,
      transition: {
        duration: 0.3,
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-7xl h-[95vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50 backdrop-blur-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 50%, rgba(15, 23, 42, 0.95) 100%)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(148, 163, 184, 0.1), inset 0 1px 0 rgba(148, 163, 184, 0.1)'
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 p-3 bg-gradient-to-r from-red-500/20 to-red-600/20 text-white rounded-full hover:from-red-500/30 hover:to-red-600/30 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-red-500/30 shadow-lg hover:shadow-red-500/25"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col lg:flex-row flex-1 min-h-0">
              {/* Image Gallery Section */}
              <div className="lg:w-1/2 relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm flex-shrink-0">
                <div className="relative h-64 lg:h-full min-h-[400px] overflow-hidden">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      variants={imageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute inset-0 z-10"
                    >
                      <div className="relative w-full h-full group">
                        <Image
                          src={images[currentImageIndex] || "/placeholder.svg"}
                          alt={`${project.title} - Image ${currentImageIndex + 1}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Image overlay with gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Image Navigation */}
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-r from-slate-800/90 to-slate-700/90 text-white rounded-full hover:from-slate-700/90 hover:to-slate-600/90 transition-all duration-300 hover:scale-110 shadow-2xl z-20 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 group"
                        title="Previous Image"
                      >
                        <ChevronLeft size={24} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-r from-slate-800/90 to-slate-700/90 text-white rounded-full hover:from-slate-700/90 hover:to-slate-600/90 transition-all duration-300 hover:scale-110 shadow-2xl z-20 backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/70 group"
                        title="Next Image"
                      >
                        <ChevronRight size={24} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>

                      {/* Auto-play Control */}
                      <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className="absolute bottom-6 right-6 p-3 bg-gradient-to-r from-emerald-600/90 to-emerald-500/90 text-white rounded-full hover:from-emerald-500/90 hover:to-emerald-400/90 transition-all duration-300 hover:scale-110 shadow-2xl z-20 backdrop-blur-sm border border-emerald-400/50 group"
                        title={isAutoPlaying ? "Pause Slideshow" : "Play Slideshow"}
                      >
                        {isAutoPlaying ? <Pause size={18} /> : <Play size={18} />}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/30 to-emerald-300/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>

                      {/* Image Indicators */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-4 z-20">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`relative w-4 h-4 rounded-full transition-all duration-500 hover:scale-125 group ${
                              index === currentImageIndex
                                ? "bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg shadow-blue-500/50"
                                : "bg-white/40 hover:bg-white/70 backdrop-blur-sm"
                            }`}
                            title={`Image ${index + 1}`}
                          >
                            {index === currentImageIndex && (
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
                            )}
                            <div className="absolute inset-0 rounded-full border border-white/30"></div>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-1/2 flex flex-col min-h-0 relative">
                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto p-8 lg:p-12">

                <div className="relative z-10 space-y-8">
                  {/* Header */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className={`px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm border shadow-lg ${
                        project.status === "completed"
                          ? "bg-gradient-to-r from-emerald-600/90 to-emerald-500/90 text-white border-emerald-400/50 shadow-emerald-500/25" :
                        project.status === "in-progress"
                          ? "bg-gradient-to-r from-blue-600/90 to-blue-500/90 text-white border-blue-400/50 shadow-blue-500/25" :
                          "bg-gradient-to-r from-amber-600/90 to-amber-500/90 text-white border-amber-400/50 shadow-amber-500/25"
                      }`}>
                        {project.status.replace("-", " ").toUpperCase()}
                      </span>
                      {project.featured && (
                        <span className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 rounded-lg text-sm font-semibold backdrop-blur-sm border border-purple-500/30 shadow-lg shadow-purple-500/25">
                          ⭐ FEATURED PROJECT
                        </span>
                      )}
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
                        {project.title}
                      </h2>
                      <p className="text-gray-300 text-lg leading-relaxed font-light">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Project Timeline */}
                  <div className="space-y-6 bg-gradient-to-r from-slate-800/30 to-slate-700/30 rounded-2xl p-6 backdrop-blur-sm border border-slate-600/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                        <Calendar size={14} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Project Timeline</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex items-center space-x-4 group">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-blue-500/30 group-hover:border-blue-400/50 transition-all duration-300">
                          <Calendar size={16} className="text-blue-400" />
                        </div>
                        <div>
                          <span className="text-sm text-gray-400 block font-medium">Started</span>
                          <span className="text-lg font-semibold text-white">{new Date(project.startDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      {project.endDate && (
                        <div className="flex items-center space-x-4 group">
                          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-emerald-500/30 group-hover:border-emerald-400/50 transition-all duration-300">
                            <Clock size={16} className="text-emerald-400" />
                          </div>
                          <div>
                            <span className="text-sm text-gray-400 block font-medium">Completed</span>
                            <span className="text-lg font-semibold text-white">{new Date(project.endDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="space-y-6 bg-gradient-to-r from-slate-800/30 to-slate-700/30 rounded-2xl p-6 backdrop-blur-sm border border-slate-600/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                        <div className="w-3 h-3 bg-white rounded-sm"></div>
                      </div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Technologies Used</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={tech}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-lg text-sm font-semibold backdrop-blur-sm border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                          style={{
                            animationDelay: `${index * 100}ms`
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-6 bg-gradient-to-r from-slate-800/30 to-slate-700/30 rounded-2xl p-6 backdrop-blur-sm border border-slate-600/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                        <ExternalLink size={14} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Explore This Project</h3>
                    </div>
                    <div className="space-y-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-4 p-4 bg-gradient-to-r from-emerald-600/20 to-emerald-500/20 rounded-xl border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105 group backdrop-blur-sm shadow-lg hover:shadow-emerald-500/25"
                        >
                          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <ExternalLink size={18} className="text-white" />
                          </div>
                          <div>
                            <span className="text-white font-semibold text-lg">View Live Project</span>
                            <p className="text-emerald-300 text-sm">See it in action</p>
                          </div>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-4 p-4 bg-gradient-to-r from-slate-600/20 to-slate-500/20 rounded-xl border border-slate-500/30 hover:border-slate-400/50 transition-all duration-300 hover:scale-105 group backdrop-blur-sm shadow-lg hover:shadow-slate-500/25"
                        >
                          <div className="w-10 h-10 bg-gradient-to-r from-slate-500 to-slate-400 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Github size={18} className="text-white" />
                          </div>
                          <div>
                            <span className="text-white font-semibold text-lg">View Source Code</span>
                            <p className="text-slate-300 text-sm">Explore the code</p>
                          </div>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
