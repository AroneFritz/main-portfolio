import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = 'force-static';

// GET endpoint to fetch approved testimonials
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: {
        status: 'APPROVED'
      },
      orderBy: [
        { featured: 'desc' },
        { approvalDate: 'desc' }
      ],
      select: {
        id: true,
        name: true,
        position: true,
        company: true,
        content: true,
        rating: true,
        projectWorkedOn: true,
        image: true,
        featured: true,
        approvalDate: true
      }
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

const testimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  company: z.string().min(2, "Company must be at least 2 characters"),
  content: z.string().min(20, "Please share more details about your experience"),
  rating: z.number().min(1, "Please select a rating").max(5, "Rating cannot exceed 5 stars"),
  projectWorkedOn: z.string().optional(),
  allowContact: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const position = formData.get('position') as string;
    const company = formData.get('company') as string;
    const content = formData.get('content') as string;
    const rating = parseInt(formData.get('rating') as string);
    const projectWorkedOn = formData.get('projectWorkedOn') as string || undefined;
    const allowContact = formData.get('allowContact') === 'true';
    const profilePhoto = formData.get('profilePhoto') as File | null;

    // Validate the data
    const validatedData = testimonialSchema.parse({
      name,
      email,
      position,
      company,
      content,
      rating,
      projectWorkedOn,
      allowContact
    });

    let imagePath: string | undefined;

    // Handle profile photo upload
    if (profilePhoto && profilePhoto.size > 0) {
      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), 'public', 'testimonials');
      try {
        await mkdir(uploadsDir, { recursive: true });
      } catch (error) {
        // Directory might already exist
      }

      // Generate unique filename
      const timestamp = Date.now();
      const extension = path.extname(profilePhoto.name);
      const filename = `${timestamp}-${Math.random().toString(36).substring(7)}${extension}`;
      const filepath = path.join(uploadsDir, filename);

      // Convert file to buffer and save
      const bytes = await profilePhoto.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filepath, buffer);

      imagePath = `/testimonials/${filename}`;
    }

    // Save testimonial to database
    const testimonial = await prisma.testimonial.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        position: validatedData.position,
        company: validatedData.company,
        content: validatedData.content,
        rating: validatedData.rating,
        projectWorkedOn: validatedData.projectWorkedOn,
        allowContact: validatedData.allowContact ?? true,
        status: 'PENDING',
        image: imagePath
      }
    });

    console.log("New testimonial saved to database:", testimonial.id);
    
    // Example: Send notification email (uncomment and configure as needed)
    /*
    await sendEmail({
      to: "your.email@example.com",
      subject: `New Testimonial Submission from ${validatedData.name}`,
      html: `
        <h2>New Testimonial Submission</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Client Information</h3>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Position:</strong> ${validatedData.position}</p>
          <p><strong>Company:</strong> ${validatedData.company}</p>
          <p><strong>Project:</strong> ${validatedData.projectWorkedOn || "Not specified"}</p>
          <p><strong>Rating:</strong> ${"⭐".repeat(validatedData.rating)} (${validatedData.rating}/5)</p>
          <p><strong>Allow Contact:</strong> ${validatedData.allowContact ? "Yes" : "No"}</p>
        </div>
        
        <div style="background: #fff; padding: 20px; border-left: 4px solid #007bff; margin: 20px 0;">
          <h3>Testimonial Content</h3>
          <p style="font-style: italic; line-height: 1.6;">"${validatedData.content}"</p>
        </div>
        
        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Next Steps:</strong></p>
          <ol>
            <li>Review the testimonial content</li>
            <li>If approved, add it to your testimonials section</li>
            <li>Consider reaching out to thank the client</li>
          </ol>
        </div>
        
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          Submitted on: ${new Date(submissionDate).toLocaleString()}<br>
          Submission ID: ${testimonialData.id}
        </p>
      `,
    });
    
    // Send confirmation email to client
    await sendEmail({
      to: validatedData.email,
      subject: "Thank you for your testimonial!",
      html: `
        <h2>Thank you for sharing your experience!</h2>
        <p>Hi ${validatedData.name},</p>
        <p>Thank you for taking the time to share your experience working with me. Your feedback is incredibly valuable and helps me improve my services.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Your Testimonial Summary</h3>
          <p><strong>Rating:</strong> ${"⭐".repeat(validatedData.rating)} (${validatedData.rating}/5)</p>
          <p><strong>Project:</strong> ${validatedData.projectWorkedOn || "General experience"}</p>
        </div>
        
        <p>I'll review your testimonial and add it to my portfolio soon. If you have any questions or need any follow-up work, please don't hesitate to reach out.</p>
        
        <p>Best regards,<br>Arone Fritz</p>
        
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          This is an automated confirmation. Your testimonial was submitted on ${new Date(submissionDate).toLocaleString()}.
        </p>
      `,
    });
    */
    
    return NextResponse.json(
      {
        message: "Testimonial submitted successfully! Thank you for sharing your experience.",
        id: testimonial.id
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Testimonial submission error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to submit testimonial. Please try again." },
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
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
