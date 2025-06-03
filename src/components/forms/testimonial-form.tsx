"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, Send, X, CheckCircle, AlertCircle, Upload, User } from "lucide-react";
import Image from "next/image";
import { TestimonialSubmission } from "@/types";

const testimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  company: z.string().min(2, "Company must be at least 2 characters"),
  content: z.string().min(20, "Please share more details about your experience (at least 20 characters)"),
  rating: z.number().min(1, "Please select a rating").max(5, "Rating cannot exceed 5 stars"),
  projectWorkedOn: z.string().optional(),
  allowContact: z.boolean().optional(),
});

interface TestimonialFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TestimonialForm({ isOpen, onClose }: TestimonialFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TestimonialSubmission>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      allowContact: true,
    },
  });

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      setProfilePhoto(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setProfilePhoto(null);
    setPhotoPreview(null);
  };

  const onSubmit = async (data: TestimonialSubmission) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("position", data.position);
      formData.append("company", data.company);
      formData.append("content", data.content);
      formData.append("rating", data.rating.toString());
      formData.append("allowContact", data.allowContact?.toString() || "true");

      if (data.projectWorkedOn) {
        formData.append("projectWorkedOn", data.projectWorkedOn);
      }

      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }

      const response = await fetch("/api/testimonials", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
        setSelectedRating(0);
        setProfilePhoto(null);
        setPhotoPreview(null);
        setTimeout(() => {
          onClose();
          setSubmitStatus("idle");
        }, 3000);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    setValue("rating", rating);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const isActive = starValue <= (hoverRating || selectedRating);
      
      return (
        <button
          key={index}
          type="button"
          onClick={() => handleRatingClick(starValue)}
          onMouseEnter={() => setHoverRating(starValue)}
          onMouseLeave={() => setHoverRating(0)}
          className={`p-1 transition-colors ${
            isActive ? "text-yellow-400" : "text-gray-300 hover:text-yellow-300"
          }`}
        >
          <Star size={24} fill={isActive ? "currentColor" : "none"} />
        </button>
      );
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-background border border-border rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Share Your Experience</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {submitStatus === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
              <p className="text-muted-foreground">
                Your testimonial has been submitted successfully. I&apos;ll review it and add it to the testimonials section soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name and Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Position and Company */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="position" className="block text-sm font-medium mb-2">
                    Your Position *
                  </label>
                  <input
                    {...register("position")}
                    type="text"
                    id="position"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., CEO, Product Manager"
                  />
                  {errors.position && (
                    <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company *
                  </label>
                  <input
                    {...register("company")}
                    type="text"
                    id="company"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your company name"
                  />
                  {errors.company && (
                    <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Overall Rating *
                </label>
                <div className="flex items-center space-x-1 mb-2">
                  {renderStars()}
                </div>
                {errors.rating && (
                  <p className="text-red-500 text-sm">{errors.rating.message}</p>
                )}
              </div>

              {/* Project Worked On */}
              <div>
                <label htmlFor="projectWorkedOn" className="block text-sm font-medium mb-2">
                  Project We Worked On (Optional)
                </label>
                <input
                  {...register("projectWorkedOn")}
                  type="text"
                  id="projectWorkedOn"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., E-commerce Platform, Mobile App"
                />
              </div>

              {/* Profile Photo Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Profile Photo (Optional)
                </label>
                <div className="flex items-start space-x-4">
                  {/* Photo Preview */}
                  <div className="flex-shrink-0">
                    {photoPreview ? (
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-border">
                        <Image
                          src={photoPreview}
                          alt="Profile preview"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center">
                        <User size={24} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Upload Button */}
                  <div className="flex-1">
                    <input
                      type="file"
                      id="profilePhoto"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="profilePhoto"
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg cursor-pointer transition-colors"
                    >
                      <Upload size={16} />
                      <span className="text-sm">
                        {photoPreview ? "Change Photo" : "Upload Photo"}
                      </span>
                    </label>
                    <p className="text-xs text-muted-foreground mt-2">
                      JPG, PNG or GIF. Max file size 5MB.
                    </p>
                  </div>
                </div>
              </div>

              {/* Experience Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-2">
                  Your Experience *
                </label>
                <textarea
                  {...register("content")}
                  id="content"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Please share your experience working with me. What did you like? How was the project outcome? Any specific highlights?"
                />
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                )}
              </div>

              {/* Allow Contact Checkbox */}
              <div className="flex items-center space-x-2">
                <input
                  {...register("allowContact")}
                  type="checkbox"
                  id="allowContact"
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                />
                <label htmlFor="allowContact" className="text-sm text-muted-foreground">
                  I&apos;m okay with being contacted for follow-up questions about this testimonial
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Submit Testimonial</span>
                  </>
                )}
              </button>

              {/* Error Message */}
              {submitStatus === "error" && (
                <div className="flex items-center space-x-2 p-4 bg-red-100 text-red-800 rounded-lg">
                  <AlertCircle size={16} />
                  <span>Sorry, there was an error submitting your testimonial. Please try again.</span>
                </div>
              )}
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
