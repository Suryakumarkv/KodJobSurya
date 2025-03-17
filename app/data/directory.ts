import fs from "fs"
import path from "path"

// Ensure the data directory exists
export const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  return dataDir
}

// Create a JSON file if it doesn't exist
export const ensureJsonFile = (filename: string, defaultData: any) => {
  const dataDir = ensureDataDirectory()
  const filePath = path.join(dataDir, filename)

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2))
  }

  return filePath
}

// Read data from a JSON file
export const readJsonFile = (filename: string, defaultData: any = {}) => {
  const filePath = ensureJsonFile(filename, defaultData)
  try {
    const fileData = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(fileData)
  } catch (error) {
    console.error(`Error reading ${filename}:`, error)
    return defaultData
  }
}

// Write data to a JSON file
export const writeJsonFile = (filename: string, data: any) => {
  const dataDir = ensureDataDirectory()
  const filePath = path.join(dataDir, filename)

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error(`Error writing to ${filename}:`, error)
    return false
  }
}

