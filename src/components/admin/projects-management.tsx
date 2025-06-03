"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Star, 
  ExternalLink, 
  Github,
  Calendar,
  Tag,
  Globe,
  Code,
  Filter
} from "lucide-react";
import Image from "next/image";
import { ProjectFormModal } from "./project-form-modal";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string;
  technologies: string;
  category: string;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  status: string;
  startDate: string;
  endDate?: string;
  challenges?: string;
  learnings?: string;
  metrics?: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProjectsManagementProps {
  onCreateProject: () => void;
}

export function ProjectsManagement({ onCreateProject }: ProjectsManagementProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT' | 'FEATURED'>('ALL');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, [filter]);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/admin/projects', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/admin/projects', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id, ...updates })
      });

      if (response.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/projects?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'WEB_APP': return 'bg-blue-100 text-blue-800';
      case 'MOBILE_APP': return 'bg-green-100 text-green-800';
      case 'API': return 'bg-purple-100 text-purple-800';
      case 'LIBRARY': return 'bg-orange-100 text-orange-800';
      case 'TOOL': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800';
      case 'PLANNED': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProjects = projects.filter(project => {
    switch (filter) {
      case 'PUBLISHED': return project.published;
      case 'DRAFT': return !project.published;
      case 'FEATURED': return project.featured;
      default: return true;
    }
  });

  const stats = {
    total: projects.length,
    published: projects.filter(p => p.published).length,
    draft: projects.filter(p => !p.published).length,
    featured: projects.filter(p => p.featured).length,
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background border border-border rounded-lg p-6"
        >
          <div className="flex items-center">
            <Code className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-background border border-border rounded-lg p-6"
        >
          <div className="flex items-center">
            <Globe className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Published</p>
              <p className="text-2xl font-bold">{stats.published}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-background border border-border rounded-lg p-6"
        >
          <div className="flex items-center">
            <Edit className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Draft</p>
              <p className="text-2xl font-bold">{stats.draft}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-background border border-border rounded-lg p-6"
        >
          <div className="flex items-center">
            <Star className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Featured</p>
              <p className="text-2xl font-bold">{stats.featured}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Actions Bar */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Filter size={20} className="text-muted-foreground" />
          <div className="flex space-x-2">
            {['ALL', 'PUBLISHED', 'DRAFT', 'FEATURED'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} />
          <span>Add Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Project Image */}
            <div className="relative h-48 bg-muted">
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute top-2 right-2 flex space-x-1">
                {project.featured && (
                  <span className="px-2 py-1 bg-yellow-500 text-white rounded-full text-xs font-medium">
                    Featured
                  </span>
                )}
                {!project.published && (
                  <span className="px-2 py-1 bg-gray-500 text-white rounded-full text-xs font-medium">
                    Draft
                  </span>
                )}
              </div>
            </div>

            {/* Project Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg line-clamp-1">{project.title}</h3>
                <div className="flex space-x-1 ml-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {project.description}
              </p>

              <div className="flex items-center space-x-2 mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(project.category)}`}>
                  {project.category.replace('_', ' ')}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status.replace('_', ' ')}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <span className="flex items-center space-x-1">
                  <Calendar size={12} />
                  <span>{new Date(project.startDate).toLocaleDateString()}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Tag size={12} />
                  <span>{JSON.parse(project.technologies).length} techs</span>
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  <button
                    onClick={() => updateProject(project.id, { featured: !project.featured })}
                    className={`p-2 rounded-lg text-sm transition-colors ${
                      project.featured
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <Star size={14} />
                  </button>
                  <button
                    onClick={() => updateProject(project.id, { published: !project.published })}
                    className={`p-2 rounded-lg text-sm transition-colors ${
                      project.published
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    <Eye size={14} />
                  </button>
                </div>

                <div className="flex space-x-1">
                  <button
                    onClick={() => {
                      setEditingProject(project);
                      setIsFormOpen(true);
                    }}
                    className="p-2 bg-blue-100 text-blue-800 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="p-2 bg-red-100 text-red-800 rounded-lg text-sm hover:bg-red-200 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Code size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">
            {filter === 'ALL' 
              ? 'No projects have been created yet.'
              : `No ${filter.toLowerCase()} projects found.`
            }
          </p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus size={16} />
            <span>Create First Project</span>
          </button>
        </div>
      )}

      {/* Project Form Modal */}
      <ProjectFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProject(null);
        }}
        onSuccess={() => {
          fetchProjects();
          setEditingProject(null);
        }}
        project={editingProject}
      />
    </div>
  );
}
