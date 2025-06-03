"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Star,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Trash2,
  LogOut,
  Users,
  MessageSquare,
  TrendingUp,
  Filter,
  FolderOpen,
  Plus
} from "lucide-react";
import { ProjectsManagement } from "@/components/admin/projects-management";

interface Testimonial {
  id: string;
  name: string;
  email: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  projectWorkedOn?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  featured: boolean;
  submissionDate: string;
  approvalDate?: string;
}

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'testimonials' | 'projects'>('testimonials');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('admin_token');
    const adminData = localStorage.getItem('admin_user');
    
    if (!token || !adminData) {
      router.push('/admin/login');
      return;
    }

    setAdmin(JSON.parse(adminData));
    fetchTestimonials();
  }, [router]);

  const fetchTestimonials = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const statusParam = filter !== 'ALL' ? `?status=${filter}` : '';
      
      const response = await fetch(`/api/admin/testimonials${statusParam}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTestimonials(data.testimonials);
      } else if (response.status === 401) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admin) {
      fetchTestimonials();
    }
  }, [filter, admin]);

  const updateTestimonialStatus = async (id: string, status: string, featured?: boolean) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/admin/testimonials', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id, status, featured })
      });

      if (response.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error('Error updating testimonial:', error);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/testimonials?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'text-green-600 bg-green-100';
      case 'REJECTED': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED': return <CheckCircle size={16} />;
      case 'REJECTED': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const stats = {
    total: testimonials.length,
    pending: testimonials.filter(t => t.status === 'PENDING').length,
    approved: testimonials.filter(t => t.status === 'APPROVED').length,
    rejected: testimonials.filter(t => t.status === 'REJECTED').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {admin?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                View Portfolio
              </a>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'testimonials'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              }`}
            >
              <div className="flex items-center space-x-2">
                <MessageSquare size={16} />
                <span>Testimonials</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'projects'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              }`}
            >
              <div className="flex items-center space-x-2">
                <FolderOpen size={16} />
                <span>Projects</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'testimonials' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background border border-border rounded-lg p-6"
          >
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-blue-600" />
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
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
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
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold">{stats.approved}</p>
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
              <XCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold">{stats.rejected}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <Filter size={20} className="text-muted-foreground" />
          <div className="flex space-x-2">
            {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((status) => (
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

        {/* Testimonials List */}
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-background border border-border rounded-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(testimonial.status)}`}>
                      {getStatusIcon(testimonial.status)}
                      <span>{testimonial.status}</span>
                    </span>
                    {testimonial.featured && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {testimonial.position} at {testimonial.company}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {testimonial.email}
                  </p>
                  {testimonial.projectWorkedOn && (
                    <p className="text-sm text-muted-foreground mb-2">
                      Project: {testimonial.projectWorkedOn}
                    </p>
                  )}
                  <div className="flex items-center space-x-1 mb-3">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">
                      ({testimonial.rating}/5)
                    </span>
                  </div>
                </div>
              </div>

              <blockquote className="text-muted-foreground italic mb-4 border-l-4 border-primary/20 pl-4">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>

              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  Submitted: {new Date(testimonial.submissionDate).toLocaleDateString()}
                  {testimonial.approvalDate && (
                    <span className="ml-4">
                      Approved: {new Date(testimonial.approvalDate).toLocaleDateString()}
                    </span>
                  )}
                </p>

                <div className="flex items-center space-x-2">
                  {testimonial.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => updateTestimonialStatus(testimonial.id, 'APPROVED')}
                        className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm hover:bg-green-200 transition-colors"
                      >
                        <CheckCircle size={14} />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => updateTestimonialStatus(testimonial.id, 'REJECTED')}
                        className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-800 rounded-lg text-sm hover:bg-red-200 transition-colors"
                      >
                        <XCircle size={14} />
                        <span>Reject</span>
                      </button>
                    </>
                  )}
                  
                  {testimonial.status === 'APPROVED' && (
                    <button
                      onClick={() => updateTestimonialStatus(testimonial.id, 'APPROVED', !testimonial.featured)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                        testimonial.featured
                          ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      <Star size={14} />
                      <span>{testimonial.featured ? 'Unfeature' : 'Feature'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => deleteTestimonial(testimonial.id)}
                    className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-800 rounded-lg text-sm hover:bg-red-200 transition-colors"
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {testimonials.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No testimonials found</h3>
              <p className="text-muted-foreground">
                {filter === 'ALL' 
                  ? 'No testimonials have been submitted yet.'
                  : `No ${filter.toLowerCase()} testimonials found.`
                }
              </p>
            </div>
          )}
        </div>
          </>
        )}

        {activeTab === 'projects' && (
          <ProjectsManagement
            onCreateProject={() => {}}
          />
        )}
      </div>
    </div>
  );
}
