// Static data fallback for GitHub Pages deployment
import { staticProjects } from '@/data/static-projects';
import { staticTestimonials } from '@/data/static-testimonials';

// Check if we're in static export mode
export const isStaticMode = process.env.NEXT_EXPORT === 'true' || typeof window === 'undefined';

// Fallback data fetchers for static mode
export async function getProjects() {
  if (isStaticMode) {
    // Return static data for GitHub Pages
    return staticProjects.filter(project => project.published);
  }
  
  // Use API for dynamic sites
  try {
    const response = await fetch('/api/projects');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn('API not available, falling back to static data');
  }
  
  // Fallback to static data if API fails
  return staticProjects.filter(project => project.published);
}

export async function getTestimonials() {
  if (isStaticMode) {
    // Return static data for GitHub Pages
    return staticTestimonials;
  }
  
  // Use API for dynamic sites
  try {
    const response = await fetch('/api/testimonials');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn('API not available, falling back to static data');
  }
  
  // Fallback to static data if API fails
  return staticTestimonials;
}
