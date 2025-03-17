import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

// Define the path to the JSON file
const dataFilePath = path.join(process.cwd(), "data", "jobs.json")

// Ensure the data directory exists
const ensureDirectoryExists = () => {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify({ jobs: [] }))
  }
}

// Read jobs from JSON file
const getJobs = () => {
  ensureDirectoryExists()
  const fileData = fs.readFileSync(dataFilePath, "utf-8")
  return JSON.parse(fileData)
}

// Write jobs to JSON file
const saveJobs = (data: any) => {
  ensureDirectoryExists()
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))
}

export async function GET(request: NextRequest) {
  try {
    const { jobs } = getJobs()
    return NextResponse.json({ success: true, jobs })
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch jobs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const jobData = await request.json()

    // Validate required fields
    if (!jobData.title || !jobData.company || !jobData.location) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    const { jobs } = getJobs()

    // Create new job
    const newJob = {
      id: uuidv4(),
      ...jobData,
      postedAt: new Date().toISOString(),
    }

    // Save to JSON file
    jobs.push(newJob)
    saveJobs({ jobs })

    return NextResponse.json({
      success: true,
      message: "Job posted successfully",
      job: newJob,
    })
  } catch (error) {
    console.error("Error posting job:", error)
    return NextResponse.json({ success: false, message: "Failed to post job" }, { status: 500 })
  }
}

