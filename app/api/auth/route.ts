import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

// Define the path to the JSON file
const dataFilePath = path.join(process.cwd(), "data", "users.json")

// Ensure the data directory exists
const ensureDirectoryExists = () => {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify({ users: [] }))
  }
}

// Read users from JSON file
const getUsers = () => {
  ensureDirectoryExists()
  const fileData = fs.readFileSync(dataFilePath, "utf-8")
  return JSON.parse(fileData)
}

// Write users to JSON file
const saveUsers = (data: any) => {
  ensureDirectoryExists()
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { action, userData } = data

    if (action === "signup") {
      // Validate required fields
      if (!userData.email || !userData.password || !userData.name) {
        return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
      }

      // Check if user already exists
      const { users } = getUsers()
      const existingUser = users.find((user: any) => user.email === userData.email)

      if (existingUser) {
        return NextResponse.json({ success: false, message: "User with this email already exists" }, { status: 400 })
      }

      // Create new user
      const newUser = {
        id: uuidv4(),
        ...userData,
        createdAt: new Date().toISOString(),
      }

      // Remove password from response
      const { password, ...userWithoutPassword } = newUser

      // Save to JSON file
      users.push(newUser)
      saveUsers({ users })

      return NextResponse.json({
        success: true,
        message: "User registered successfully",
        user: userWithoutPassword,
      })
    } else if (action === "signin") {
      // Validate required fields
      if (!userData.email || !userData.password) {
        return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 })
      }

      // Find user
      const { users } = getUsers()
      const user = users.find((user: any) => user.email === userData.email && user.password === userData.password)

      if (!user) {
        return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
      }

      // Remove password from response
      const { password, ...userWithoutPassword } = user

      return NextResponse.json({
        success: true,
        message: "Login successful",
        user: userWithoutPassword,
      })
    }

    return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Error in auth API:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

