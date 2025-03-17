import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

// Define the path to the JSON file
const dataFilePath = path.join(process.cwd(), "data", "applications.json")

// Ensure the data directory exists
const ensureDirectoryExists = () => {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify({ applications: [] }))
  }
}

// Read applications from JSON file
const getApplications = () => {
  ensureDirectoryExists()
  const fileData = fs.readFileSync(dataFilePath, "utf-8")
  return JSON.parse(fileData)
}

// Write applications to JSON file
const saveApplications = (data: any) => {
  ensureDirectoryExists()
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const jobId = formData.get("jobId")
    const userId = formData.get("userId") // This would come from the session in a real app
    const coverLetter = formData.get("cover-letter")
    const phone = formData.get("phone")

    // In a real app, you would handle file upload here
    // const resumeFile = formData.get("resume") as File

    // Validate required fields
    if (!jobId || !coverLetter || !phone) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    const { applications } = getApplications()

    // Check if user has already applied to this job
    const existingApplication = applications.find((app: any) => app.jobId === jobId && app.userId === userId)

    if (existingApplication) {
      return NextResponse.json({ success: false, message: "You have already applied to this job" }, { status: 400 })
    }

    // Create new application
    const newApplication = {
      id: uuidv4(),
      jobId,
      userId: userId || "anonymous", // In a real app, this would be required
      coverLetter,
      phone,
      resumeUrl: "placeholder-resume-url.pdf", // In a real app, this would be the uploaded file URL
      status: "pending",
      appliedAt: new Date().toISOString(),
    }

    // Save to JSON file
    applications.push(newApplication)
    saveApplications({ applications })

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      application: newApplication,
    })
  } catch (error) {
    console.error("Error submitting application:", error)
    return NextResponse.json({ success: false, message: "Failed to submit application" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { applications } = getApplications()

    // In a real app, you would filter applications based on user permissions
    // For example, students would only see their own applications
    // Employers would only see applications for their jobs

    return NextResponse.json({ success: true, applications })
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch applications" }, { status: 500 })
  }
}

