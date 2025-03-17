import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Define the path to the JSON file
const dataFilePath = path.join(process.cwd(), "data", "users.json")

// Read users from JSON file
const getUsers = () => {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return { users: [] }
    }
    const fileData = fs.readFileSync(dataFilePath, "utf-8")
    return JSON.parse(fileData)
  } catch (error) {
    console.error("Error reading users file:", error)
    return { users: [] }
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { email, password } = data

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 })
    }

    // Find user
    const { users } = getUsers()
    const user = users.find((user: any) => user.email === email && user.password === password)

    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Error in login API:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

