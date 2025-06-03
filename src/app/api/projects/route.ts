import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-static';

// GET endpoint to fetch published projects
export async function GET() {
  try {
    console.log("🔍 Fetching projects from database...");

    const projects = await prisma.project.findMany({
      where: {
        published: true
      },
      orderBy: [
        { featured: 'desc' },
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    console.log(`📊 Found ${projects.length} published projects`);

    if (projects.length === 0) {
      console.log("⚠️ No published projects found");
      return NextResponse.json([]);
    }

    // Transform database projects to match frontend interface
    const transformedProjects = projects.map(project => {
      try {
        return {
          id: project.id,
          title: project.title,
          description: project.description,
          longDescription: project.longDescription,
          image: project.image,
          images: project.images ? JSON.parse(project.images) : [project.image],
          technologies: JSON.parse(project.technologies),
          category: project.category.toLowerCase().replace('_', '-'),
          featured: project.featured,
          githubUrl: project.githubUrl,
          liveUrl: project.liveUrl,
          status: project.status.toLowerCase().replace('_', '-'),
          startDate: project.startDate,
          endDate: project.endDate,
          challenges: project.challenges ? JSON.parse(project.challenges) : [],
          learnings: project.learnings ? JSON.parse(project.learnings) : [],
          metrics: project.metrics ? JSON.parse(project.metrics) : []
        };
      } catch (parseError) {
        console.error(`❌ Error parsing project ${project.id}:`, parseError);
        throw parseError;
      }
    });

    console.log("✅ Projects transformed successfully");
    return NextResponse.json(transformedProjects);
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects", details: error.message },
      { status: 500 }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
