import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Define the path to the JSON file
const dataFilePath = path.join(process.cwd(), "data", "jobs.json")

// Read jobs from JSON file
const getJobs = () => {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return { jobs: [] }
    }
    const fileData = fs.readFileSync(dataFilePath, 'utf-8")eSync(dataFilePath, "utf-8')
    return JSON.parse(fileData)
  } catch (error) {
    console.error("Error reading jobs file:", error)
    return { jobs: [] }
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { jobs } = getJobs()
    const job = jobs.find((job: any) => job.id === params.id)

    if (!job) {
      return NextResponse.json({ success: false, message: "Job not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, job })
  } catch (error) {
    console.error("Error fetching job:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch job" }, { status: 500 })
  }
}

