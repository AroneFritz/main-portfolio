import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = 'force-static';

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  longDescription: z.string().optional(),
  image: z.string().min(1, "Main image is required"),
  images: z.array(z.string()).optional(),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
  category: z.enum(['WEB_APP', 'MOBILE_APP', 'API', 'LIBRARY', 'TOOL', 'GAME', 'OTHER']),
  featured: z.boolean().optional(),
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  status: z.enum(['COMPLETED', 'IN_PROGRESS', 'PLANNED']),
  startDate: z.string(),
  endDate: z.string().optional(),
  challenges: z.array(z.string()).optional(),
  learnings: z.array(z.string()).optional(),
  metrics: z.array(z.object({
    label: z.string(),
    value: z.string(),
    description: z.string().optional()
  })).optional(),
  order: z.number().optional(),
  published: z.boolean().optional()
});

// GET all projects (admin only)
export async function GET(request: NextRequest) {
  try {
    await requireAuth(request);

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        orderBy: [
          { featured: 'desc' },
          { order: 'asc' },
          { createdAt: 'desc' }
        ],
        skip,
        take: limit,
      }),
      prisma.project.count()
    ]);

    return NextResponse.json({
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error("Error fetching admin projects:", error);
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST create new project
export async function POST(request: NextRequest) {
  try {
    await requireAuth(request);

    const formData = await request.formData();
    
    // Extract form fields
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const longDescription = formData.get('longDescription') as string || undefined;
    const category = formData.get('category') as string;
    const featured = formData.get('featured') === 'true';
    const githubUrl = formData.get('githubUrl') as string || undefined;
    const liveUrl = formData.get('liveUrl') as string || undefined;
    const status = formData.get('status') as string;
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string || undefined;
    const published = formData.get('published') === 'true';
    const order = parseInt(formData.get('order') as string) || 0;

    // Parse JSON fields
    const technologies = JSON.parse(formData.get('technologies') as string || '[]');
    const challenges = JSON.parse(formData.get('challenges') as string || '[]');
    const learnings = JSON.parse(formData.get('learnings') as string || '[]');
    const metrics = JSON.parse(formData.get('metrics') as string || '[]');

    // Handle main image upload
    const mainImage = formData.get('mainImage') as File | null;
    let mainImagePath = '';

    if (mainImage && mainImage.size > 0) {
      const uploadsDir = path.join(process.cwd(), 'public', 'projects');
      try {
        await mkdir(uploadsDir, { recursive: true });
      } catch (error) {
        // Directory might already exist
      }

      const timestamp = Date.now();
      const extension = path.extname(mainImage.name);
      const filename = `${timestamp}-main${extension}`;
      const filepath = path.join(uploadsDir, filename);

      const bytes = await mainImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filepath, buffer);

      mainImagePath = `/projects/${filename}`;
    }

    // Handle additional images upload
    const additionalImages: string[] = [];
    const imageFiles = formData.getAll('additionalImages') as File[];
    
    for (const imageFile of imageFiles) {
      if (imageFile && imageFile.size > 0) {
        const uploadsDir = path.join(process.cwd(), 'public', 'projects');
        const timestamp = Date.now();
        const extension = path.extname(imageFile.name);
        const filename = `${timestamp}-${Math.random().toString(36).substring(7)}${extension}`;
        const filepath = path.join(uploadsDir, filename);

        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filepath, buffer);

        additionalImages.push(`/projects/${filename}`);
      }
    }

    const allImages = [mainImagePath, ...additionalImages].filter(Boolean);

    // Validate the data
    const validatedData = projectSchema.parse({
      title,
      description,
      longDescription,
      image: mainImagePath,
      images: allImages,
      technologies,
      category: category as any,
      featured,
      githubUrl: githubUrl || undefined,
      liveUrl: liveUrl || undefined,
      status: status as any,
      startDate,
      endDate,
      challenges,
      learnings,
      metrics,
      order,
      published
    });

    // Create project in database
    const project = await prisma.project.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        longDescription: validatedData.longDescription,
        image: validatedData.image,
        images: JSON.stringify(validatedData.images),
        technologies: JSON.stringify(validatedData.technologies),
        category: validatedData.category,
        featured: validatedData.featured || false,
        githubUrl: validatedData.githubUrl,
        liveUrl: validatedData.liveUrl,
        status: validatedData.status,
        startDate: validatedData.startDate,
        endDate: validatedData.endDate,
        challenges: validatedData.challenges ? JSON.stringify(validatedData.challenges) : null,
        learnings: validatedData.learnings ? JSON.stringify(validatedData.learnings) : null,
        metrics: validatedData.metrics ? JSON.stringify(validatedData.metrics) : null,
        order: validatedData.order || 0,
        published: validatedData.published !== false
      }
    });

    return NextResponse.json({
      message: "Project created successfully",
      project
    });

  } catch (error) {
    console.error("Error creating project:", error);
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

// PATCH update project
export async function PATCH(request: NextRequest) {
  try {
    await requireAuth(request);

    const body = await request.json();
    const { id, ...updates } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    // Convert arrays to JSON strings for database storage
    const processedUpdates = { ...updates };
    if (updates.technologies) {
      processedUpdates.technologies = JSON.stringify(updates.technologies);
    }
    if (updates.images) {
      processedUpdates.images = JSON.stringify(updates.images);
    }
    if (updates.challenges) {
      processedUpdates.challenges = JSON.stringify(updates.challenges);
    }
    if (updates.learnings) {
      processedUpdates.learnings = JSON.stringify(updates.learnings);
    }
    if (updates.metrics) {
      processedUpdates.metrics = JSON.stringify(updates.metrics);
    }

    const project = await prisma.project.update({
      where: { id },
      data: processedUpdates
    });

    return NextResponse.json({
      message: "Project updated successfully",
      project
    });

  } catch (error) {
    console.error("Error updating project:", error);
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE project
export async function DELETE(request: NextRequest) {
  try {
    await requireAuth(request);

    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    await prisma.project.delete({
      where: { id }
    });

    return NextResponse.json({
      message: "Project deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting project:", error);
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
