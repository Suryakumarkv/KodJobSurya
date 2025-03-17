"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

export default function SignupPage({ searchParams }: { searchParams: { type?: string } }) {
  const defaultTab = searchParams.type === "employer" ? "employer" : "student"
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // Student form state
  const [studentForm, setStudentForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    whatsapp: false,
    terms: false,
  })

  // Employer form state
  const [employerForm, setEmployerForm] = useState({
    companyName: "",
    name: "",
    designation: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    website: "",
    terms: false,
  })

  const handleStudentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setStudentForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleEmployerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setEmployerForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (studentForm.password !== studentForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      })
      return
    }

    if (!studentForm.terms) {
      toast({
        title: "Terms & Conditions",
        description: "Please accept the terms and conditions",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)

      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "signup",
          userData: {
            name: studentForm.name,
            email: studentForm.email,
            password: studentForm.password,
            mobile: studentForm.mobile,
            whatsapp: studentForm.whatsapp,
            type: "student",
          },
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Account created",
          description: "Your account has been created successfully",
        })
        router.push("/dashboard/student")
      } else {
        toast({
          title: "Error",
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

    // Validation
    if (employerForm.password !== employerForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      })
      return
    }

    if (!employerForm.terms) {
      toast({
        title: "Terms & Conditions",
        description: "Please accept the terms and conditions",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)

      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "signup",
          userData: {
            companyName: employerForm.companyName,
            name: employerForm.name,
            designation: employerForm.designation,
            email: employerForm.email,
            phone: employerForm.phone,
            password: employerForm.password,
            website: employerForm.website,
            type: "employer",
          },
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Account created",
          description: "Your employer account has been created successfully",
        })
        router.push("/dashboard/employer")
      } else {
        toast({
          title: "Error",
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
      <main className="container mx-auto flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-gray-50 p-8 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084"
              alt="Team collaboration"
              fill
              className="object-cover"
            />
          </div>
          <div className="max-w-md relative z-10">
            <h1 className="text-3xl font-bold mb-1">Find your dream job!</h1>
            <p className="text-gray-600 mb-8">Trusted by 300000+ students</p>

            {/* Company Logos */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              <Image
                src="/placeholder.svg?height=40&width=80"
                alt="Airtel"
                width={80}
                height={40}
                className="h-8 w-auto"
              />
              <Image
                src="/placeholder.svg?height=40&width=80"
                alt="Tata"
                width={80}
                height={40}
                className="h-8 w-auto"
              />
              <Image
                src="/placeholder.svg?height=40&width=80"
                alt="nference"
                width={80}
                height={40}
                className="h-8 w-auto"
              />
              <Image
                src="/placeholder.svg?height=40&width=80"
                alt="TripAdvisor"
                width={80}
                height={40}
                className="h-8 w-auto"
              />
              <Image
                src="/placeholder.svg?height=40&width=80"
                alt="Spinny"
                width={80}
                height={40}
                className="h-8 w-auto"
              />
              <Image
                src="/placeholder.svg?height=40&width=80"
                alt="CarDekho"
                width={80}
                height={40}
                className="h-8 w-auto"
              />
              <Image
                src="/placeholder.svg?height=40&width=80"
                alt="MediBuddy"
                width={80}
                height={40}
                className="h-8 w-auto"
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 border-t pt-8">
              <div className="flex items-start gap-3">
                <div className="p-1 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                    <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xl font-bold">7000 +</div>
                  <div className="text-gray-500">Jobs</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </div>
                <div>
                  <div className="text-xl font-bold">18K +</div>
                  <div className="text-gray-500">Avg. Stipend</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" />
                  </svg>
                </div>
                <div>
                  <div className="text-xl font-bold">6000 +</div>
                  <div className="text-gray-500">Companies</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <div className="text-xl font-bold">100 %</div>
                  <div className="text-gray-500">Verified Jobs</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Registration Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16">
          <div className="max-w-md mx-auto">
            {/* Tabs */}
            <Tabs defaultValue={defaultTab} className="mb-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="student"
                  className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
                >
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
                {/* Form Header */}
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold">CREATE ACCOUNT</h2>
                  <Link href="/auth/login" className="text-purple-600 hover:underline">
                    Sign In
                  </Link>
                </div>

                {/* Student Registration Form */}
                <form className="space-y-6" onSubmit={handleStudentSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                        value={studentForm.name}
                        onChange={handleStudentChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                        value={studentForm.email}
                        onChange={handleStudentChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter Password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                          value={studentForm.password}
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

                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                        value={studentForm.confirmPassword}
                        onChange={handleStudentChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                      Mobile Number
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        placeholder="Your mobile number"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                        value={studentForm.mobile}
                        onChange={handleStudentChange}
                        required
                      />
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="whatsapp"
                          name="whatsapp"
                          className="rounded border-gray-300 text-purple-700"
                          checked={studentForm.whatsapp}
                          onCheckedChange={(checked) =>
                            setStudentForm((prev) => ({ ...prev, whatsapp: checked === true }))
                          }
                        />
                        <label htmlFor="whatsapp" className="text-sm text-gray-700">
                          Whatsapp
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="terms"
                      name="terms"
                      className="rounded border-gray-300 text-purple-700"
                      checked={studentForm.terms}
                      onCheckedChange={(checked) => setStudentForm((prev) => ({ ...prev, terms: checked === true }))}
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      I agree to{" "}
                      <Link href="/terms" className="text-purple-600 hover:underline">
                        Terms & Conditions
                      </Link>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-md flex items-center justify-center gap-2"
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Create new account"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Button>

                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-gray-300 text-gray-700 py-3 rounded-md flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                        <path
                          fill="#FFC107"
                          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                        />
                        <path
                          fill="#FF3D00"
                          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                        />
                        <path
                          fill="#4CAF50"
                          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                        />
                        <path
                          fill="#1976D2"
                          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                        />
                      </svg>
                      Signup with Google
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="employer">
                {/* Form Header */}
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold">EMPLOYER REGISTRATION</h2>
                  <Link href="/auth/login?type=employer" className="text-purple-600 hover:underline">
                    Sign In
                  </Link>
                </div>

                {/* Employer Registration Form */}
                <form className="space-y-6" onSubmit={handleEmployerSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                      Company Name
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      placeholder="Your company name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                      value={employerForm.companyName}
                      onChange={handleEmployerChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="employerName" className="block text-sm font-medium text-gray-700">
                        Your Name
                      </label>
                      <input
                        id="employerName"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                        value={employerForm.name}
                        onChange={handleEmployerChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
                        Your Designation
                      </label>
                      <input
                        id="designation"
                        name="designation"
                        type="text"
                        placeholder="e.g. HR Manager"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                        value={employerForm.designation}
                        onChange={handleEmployerChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="employerEmail" className="block text-sm font-medium text-gray-700">
                        Work Email
                      </label>
                      <input
                        id="employerEmail"
                        name="email"
                        type="email"
                        placeholder="Your work email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                        value={employerForm.email}
                        onChange={handleEmployerChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="employerPhone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        id="employerPhone"
                        name="phone"
                        type="tel"
                        placeholder="Your phone number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                        value={employerForm.phone}
                        onChange={handleEmployerChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="employerPassword" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="employerPassword"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                          value={employerForm.password}
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

                    <div className="space-y-2">
                      <label htmlFor="employerConfirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <input
                        id="employerConfirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                        value={employerForm.confirmPassword}
                        onChange={handleEmployerChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700">
                      Company Website
                    </label>
                    <input
                      id="companyWebsite"
                      name="website"
                      type="url"
                      placeholder="https://yourcompany.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                      value={employerForm.website}
                      onChange={handleEmployerChange}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="employerTerms"
                      name="terms"
                      className="rounded border-gray-300 text-purple-700"
                      checked={employerForm.terms}
                      onCheckedChange={(checked) => setEmployerForm((prev) => ({ ...prev, terms: checked === true }))}
                    />
                    <label htmlFor="employerTerms" className="text-sm text-gray-700">
                      I agree to{" "}
                      <Link href="/terms" className="text-purple-600 hover:underline">
                        Terms & Conditions
                      </Link>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-md flex items-center justify-center gap-2"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register as Employer"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

