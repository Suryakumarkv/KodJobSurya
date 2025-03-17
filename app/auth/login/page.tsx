"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

export default function LoginPage({ searchParams }: { searchParams: { type?: string } }) {
  const defaultTab = searchParams.type === "employer" ? "employer" : "student"
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // Student login state
  const [studentLogin, setStudentLogin] = useState({
    email: "",
    password: "",
    remember: false,
  })

  // Employer login state
  const [employerLogin, setEmployerLogin] = useState({
    email: "",
    password: "",
    remember: false,
  })

  const handleStudentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setStudentLogin((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleEmployerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setEmployerLogin((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: studentLogin.email,
          password: studentLogin.password,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Login successful",
          description: "Welcome back to Freshersworld!",
        })
        router.push("/dashboard/student")
      } else {
        toast({
          title: "Login failed",
          description: data.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEmployerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: employerLogin.email,
          password: employerLogin.password,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Login successful",
          description: "Welcome back to Freshersworld!",
        })
        router.push("/dashboard/employer")
      } else {
        toast({
          title: "Login failed",
          description: data.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b p-4">
        <div className="container mx-auto">
          <Link href="/" className="flex items-center">
            <Image
              src="/placeholder.svg?height=40&width=180"
              alt="Freshersworld Logo"
              width={180}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto">
          <Tabs defaultValue={defaultTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student" className="data-[state=active]:bg-purple-700 data-[state=active]:text-white">
                Job Seeker
              </TabsTrigger>
              <TabsTrigger
                value="employer"
                className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
              >
                Employer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Sign in to your account</h1>
                <p className="text-gray-600 mt-2">Welcome back! Please enter your details</p>
              </div>

              <form className="space-y-6" onSubmit={handleStudentSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email</Label>
                  <Input
                    id="student-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={studentLogin.email}
                    onChange={handleStudentChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="student-password">Password</Label>
                    <Link href="/auth/forgot-password" className="text-sm text-purple-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="student-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={studentLogin.password}
                      onChange={handleStudentChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <Checkbox
                    id="student-remember"
                    name="remember"
                    checked={studentLogin.remember}
                    onCheckedChange={(checked) => setStudentLogin((prev) => ({ ...prev, remember: checked === true }))}
                  />
                  <Label htmlFor="student-remember" className="ml-2 text-sm">
                    Remember me for 30 days
                  </Label>
                </div>

                <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </Button>

                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link href="/auth/signup" className="text-purple-600 hover:underline">
                    Sign up
                  </Link>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="employer">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Employer Login</h1>
                <p className="text-gray-600 mt-2">Access your employer dashboard</p>
              </div>

              <form className="space-y-6" onSubmit={handleEmployerSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="employer-email">Work Email</Label>
                  <Input
                    id="employer-email"
                    name="email"
                    type="email"
                    placeholder="Enter your work email"
                    value={employerLogin.email}
                    onChange={handleEmployerChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="employer-password">Password</Label>
                    <Link
                      href="/auth/forgot-password?type=employer"
                      className="text-sm text-purple-600 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="employer-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={employerLogin.password}
                      onChange={handleEmployerChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <Checkbox
                    id="employer-remember"
                    name="remember"
                    checked={employerLogin.remember}
                    onCheckedChange={(checked) => setEmployerLogin((prev) => ({ ...prev, remember: checked === true }))}
                  />
                  <Label htmlFor="employer-remember" className="ml-2 text-sm">
                    Remember me for 30 days
                  </Label>
                </div>

                <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </Button>

                <div className="text-center text-sm">
                  Don't have an employer account?{" "}
                  <Link href="/auth/signup?type=employer" className="text-purple-600 hover:underline">
                    Register now
                  </Link>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

