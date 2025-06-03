"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  X, 
  Upload, 
  Plus, 
  Minus, 
  Calendar, 
  Link, 
  Github, 
  Globe,
  Save,
  AlertCircle,
  CheckCircle,
  Image as ImageIcon
} from "lucide-react";
import Image from "next/image";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  longDescription: z.string().optional(),
  category: z.enum(['WEB_APP', 'MOBILE_APP', 'API', 'LIBRARY', 'TOOL', 'GAME', 'OTHER']),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  status: z.enum(['COMPLETED', 'IN_PROGRESS', 'PLANNED']),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  challenges: z.array(z.string()).optional(),
  learnings: z.array(z.string()).optional(),
  metrics: z.array(z.object({
    label: z.string(),
    value: z.string(),
    description: z.string().optional()
  })).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  order: z.number().optional()
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  project?: any; // For editing existing projects
}

export function ProjectFormModal({ isOpen, onClose, onSuccess, project }: ProjectFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<string[]>([]);

  // Dynamic arrays
  const [technologies, setTechnologies] = useState<string[]>(['']);
  const [challenges, setChallenges] = useState<string[]>(['']);
  const [learnings, setLearnings] = useState<string[]>(['']);
  const [metrics, setMetrics] = useState<Array<{label: string, value: string, description: string}>>([
    { label: '', value: '', description: '' }
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema)
  });

  // Initialize form data when project changes
  useEffect(() => {
    if (project) {
      // Initialize technologies
      try {
        const techs = project.technologies ? JSON.parse(project.technologies) : [];
        setTechnologies(techs.length > 0 ? techs : ['']);
      } catch {
        setTechnologies(['']);
      }

      // Initialize challenges
      try {
        const challengesData = project.challenges ? JSON.parse(project.challenges) : [];
        setChallenges(challengesData.length > 0 ? challengesData : ['']);
      } catch {
        setChallenges(['']);
      }

      // Initialize learnings
      try {
        const learningsData = project.learnings ? JSON.parse(project.learnings) : [];
        setLearnings(learningsData.length > 0 ? learningsData : ['']);
      } catch {
        setLearnings(['']);
      }

      // Initialize metrics
      try {
        const metricsData = project.metrics ? JSON.parse(project.metrics) : [];
        setMetrics(metricsData.length > 0 ? metricsData : [{ label: '', value: '', description: '' }]);
      } catch {
        setMetrics([{ label: '', value: '', description: '' }]);
      }

      // Set image preview
      if (project.image) {
        setMainImagePreview(project.image);
      }

      // Set additional images
      try {
        const additionalImagesData = project.images ? JSON.parse(project.images) : [];
        const filteredImages = additionalImagesData.filter((img: string) => img !== project.image);
        setAdditionalImagePreviews(filteredImages);
      } catch {
        setAdditionalImagePreviews([]);
      }

      // Reset form with project data
      if (reset) {
        reset({
          title: project.title || '',
          description: project.description || '',
          longDescription: project.longDescription || '',
          category: project.category || 'WEB_APP',
          githubUrl: project.githubUrl || '',
          liveUrl: project.liveUrl || '',
          status: project.status || 'COMPLETED',
          startDate: project.startDate || '',
          endDate: project.endDate || '',
          featured: project.featured || false,
          published: project.published !== false,
          order: project.order || 0
        });
      }
    } else {
      // Reset for new project
      setTechnologies(['']);
      setChallenges(['']);
      setLearnings(['']);
      setMetrics([{ label: '', value: '', description: '' }]);
      setMainImagePreview(null);
      setAdditionalImagePreviews([]);

      if (reset) {
        reset({
          title: '',
          description: '',
          longDescription: '',
          category: 'WEB_APP',
          githubUrl: '',
          liveUrl: '',
          status: 'COMPLETED',
          startDate: '',
          endDate: '',
          featured: false,
          published: true,
          order: 0
        });
      }
    }
  }, [project, reset]);

  const handleMainImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      setMainImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setMainImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large. Max size is 5MB.`);
        return false;
      }
      if (!file.type.startsWith("image/")) {
        alert(`${file.name} is not an image file.`);
        return false;
      }
      return true;
    });

    setAdditionalImages(prev => [...prev, ...validFiles]);
    
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAdditionalImagePreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
    setAdditionalImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const addArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, '']);
  };

  const removeArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  const updateArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter(prev => prev.map((item, i) => i === index ? value : item));
  };

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const formData = new FormData();
      
      // Add form fields
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          formData.append(key, value.toString());
        }
      });

      // Add arrays as JSON
      formData.append('technologies', JSON.stringify(technologies.filter(t => t.trim())));
      formData.append('challenges', JSON.stringify(challenges.filter(c => c.trim())));
      formData.append('learnings', JSON.stringify(learnings.filter(l => l.trim())));
      formData.append('metrics', JSON.stringify(metrics.filter(m => m.label.trim() && m.value.trim())));

      // Add images
      if (mainImage) {
        formData.append('mainImage', mainImage);
      }
      additionalImages.forEach(image => {
        formData.append('additionalImages', image);
      });

      const token = localStorage.getItem('admin_token');
      const url = project ? '/api/admin/projects' : '/api/admin/projects';
      const method = project ? 'PATCH' : 'POST';

      if (project) {
        formData.append('id', project.id);
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        setSubmitStatus("success");
        setTimeout(() => {
          onSuccess();
          onClose();
          setSubmitStatus("idle");
        }, 1500);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
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
          className="bg-background border border-border rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {project ? 'Edit Project' : 'Add New Project'}
            </h2>
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
              <h3 className="text-xl font-semibold mb-2">Success!</h3>
              <p className="text-muted-foreground">
                Project has been {project ? 'updated' : 'created'} successfully.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Project Title *
                  </label>
                  <input
                    {...register("title")}
                    type="text"
                    id="title"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="E-commerce Platform"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <select
                    {...register("category")}
                    id="category"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="WEB_APP">Web App</option>
                    <option value="MOBILE_APP">Mobile App</option>
                    <option value="API">API</option>
                    <option value="LIBRARY">Library</option>
                    <option value="TOOL">Tool</option>
                    <option value="GAME">Game</option>
                    <option value="OTHER">Other</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Short Description *
                </label>
                <textarea
                  {...register("description")}
                  id="description"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="A brief description of your project..."
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              {/* Long Description */}
              <div>
                <label htmlFor="longDescription" className="block text-sm font-medium mb-2">
                  Detailed Description (Optional)
                </label>
                <textarea
                  {...register("longDescription")}
                  id="longDescription"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="A detailed description with features, challenges, and outcomes..."
                />
              </div>

              {/* Main Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Main Project Image *
                </label>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {mainImagePreview ? (
                      <div className="relative w-32 h-24 rounded-lg overflow-hidden border-2 border-border">
                        <Image
                          src={mainImagePreview}
                          alt="Main project image"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setMainImage(null);
                            setMainImagePreview(null);
                          }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <div className="w-32 h-24 rounded-lg bg-muted border-2 border-dashed border-border flex items-center justify-center">
                        <ImageIcon size={24} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      id="mainImage"
                      accept="image/*"
                      onChange={handleMainImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="mainImage"
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg cursor-pointer transition-colors"
                    >
                      <Upload size={16} />
                      <span className="text-sm">
                        {mainImagePreview ? "Change Image" : "Upload Image"}
                      </span>
                    </label>
                    <p className="text-xs text-muted-foreground mt-2">
                      JPG, PNG or GIF. Max file size 5MB. Recommended: 800x600px
                    </p>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Technologies Used *
                </label>
                <div className="space-y-2">
                  {technologies.map((tech, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) => updateArrayItem(setTechnologies, index, e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., React, TypeScript, Node.js"
                      />
                      {technologies.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem(setTechnologies, index)}
                          className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem(setTechnologies)}
                    className="flex items-center space-x-2 px-4 py-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Plus size={16} />
                    <span>Add Technology</span>
                  </button>
                </div>
              </div>

              {/* URLs */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="githubUrl" className="block text-sm font-medium mb-2">
                    GitHub URL (Optional)
                  </label>
                  <div className="relative">
                    <Github size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <input
                      {...register("githubUrl")}
                      type="url"
                      id="githubUrl"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                  {errors.githubUrl && (
                    <p className="text-red-500 text-sm mt-1">{errors.githubUrl.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="liveUrl" className="block text-sm font-medium mb-2">
                    Live Demo URL (Optional)
                  </label>
                  <div className="relative">
                    <Globe size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <input
                      {...register("liveUrl")}
                      type="url"
                      id="liveUrl"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="https://your-project.com"
                    />
                  </div>
                  {errors.liveUrl && (
                    <p className="text-red-500 text-sm mt-1">{errors.liveUrl.message}</p>
                  )}
                </div>
              </div>

              {/* Status and Dates */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium mb-2">
                    Project Status *
                  </label>
                  <select
                    {...register("status")}
                    id="status"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="COMPLETED">Completed</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="PLANNED">Planned</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium mb-2">
                    Start Date *
                  </label>
                  <div className="relative">
                    <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <input
                      {...register("startDate")}
                      type="date"
                      id="startDate"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  {errors.startDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium mb-2">
                    End Date (Optional)
                  </label>
                  <div className="relative">
                    <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <input
                      {...register("endDate")}
                      type="date"
                      id="endDate"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Images */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Additional Images (Optional)
                </label>
                <div className="space-y-4">
                  {additionalImagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {additionalImagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <div className="w-full h-24 rounded-lg overflow-hidden border-2 border-border">
                            <Image
                              src={preview}
                              alt={`Additional image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAdditionalImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div>
                    <input
                      type="file"
                      id="additionalImages"
                      accept="image/*"
                      multiple
                      onChange={handleAdditionalImagesChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="additionalImages"
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg cursor-pointer transition-colors"
                    >
                      <Upload size={16} />
                      <span className="text-sm">Add More Images</span>
                    </label>
                    <p className="text-xs text-muted-foreground mt-2">
                      Add multiple images for project gallery. Max 5MB each.
                    </p>
                  </div>
                </div>
              </div>

              {/* Challenges (Optional) */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Project Challenges (Optional)
                </label>
                <div className="space-y-2">
                  {challenges.map((challenge, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={challenge}
                        onChange={(e) => updateArrayItem(setChallenges, index, e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., Complex state management, Performance optimization"
                      />
                      {challenges.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem(setChallenges, index)}
                          className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem(setChallenges)}
                    className="flex items-center space-x-2 px-4 py-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Plus size={16} />
                    <span>Add Challenge</span>
                  </button>
                </div>
              </div>

              {/* Learnings (Optional) */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Key Learnings (Optional)
                </label>
                <div className="space-y-2">
                  {learnings.map((learning, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={learning}
                        onChange={(e) => updateArrayItem(setLearnings, index, e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., Advanced React patterns, API optimization techniques"
                      />
                      {learnings.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem(setLearnings, index)}
                          className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem(setLearnings)}
                    className="flex items-center space-x-2 px-4 py-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Plus size={16} />
                    <span>Add Learning</span>
                  </button>
                </div>
              </div>

              {/* Settings */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    {...register("featured")}
                    type="checkbox"
                    id="featured"
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                  />
                  <label htmlFor="featured" className="text-sm font-medium">
                    Featured Project
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    {...register("published")}
                    type="checkbox"
                    id="published"
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                  />
                  <label htmlFor="published" className="text-sm font-medium">
                    Published (Visible on Portfolio)
                  </label>
                </div>

                <div>
                  <label htmlFor="order" className="block text-sm font-medium mb-2">
                    Display Order
                  </label>
                  <input
                    {...register("order", { valueAsNumber: true })}
                    type="number"
                    id="order"
                    min="0"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>{project ? 'Updating...' : 'Creating...'}</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      <span>{project ? 'Update Project' : 'Create Project'}</span>
                    </>
                  )}
                </button>
              </div>

              {submitStatus === "error" && (
                <div className="flex items-center space-x-2 p-4 bg-red-100 text-red-800 rounded-lg">
                  <AlertCircle size={16} />
                  <span>Failed to {project ? 'update' : 'create'} project. Please try again.</span>
                </div>
              )}
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
