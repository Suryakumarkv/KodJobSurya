"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, Menu, X } from "lucide-react"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/placeholder.svg?height=40&width=180"
            alt="Freshersworld Logo"
            width={180}
            height={40}
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <Link href="/jobs" className="text-gray-700 hover:text-purple-700">
              Find Jobs
            </Link>
            <Link href="/companies" className="text-gray-700 hover:text-purple-700">
              Companies
            </Link>
            <Link href="/resources" className="text-gray-700 hover:text-purple-700">
              Resources
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setLoginDialogOpen(true)}>
              Sign In
            </Button>
            <Button className="bg-purple-700 hover:bg-purple-800">
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
          <Menu size={24} />
        </Button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 md:hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <Link href="/" className="flex items-center">
                <Image
                  src="/placeholder.svg?height=40&width=180"
                  alt="Freshersworld Logo"
                  width={180}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X size={24} />
              </Button>
            </div>
            <nav className="flex flex-col p-4">
              <Link href="/jobs" className="py-3 border-b text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                Find Jobs
              </Link>
              <Link href="/companies" className="py-3 border-b text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                Companies
              </Link>
              <Link href="/resources" className="py-3 border-b text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                Resources
              </Link>
              <div className="flex flex-col gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setLoginDialogOpen(true)
                  }}
                >
                  Sign In
                </Button>
                <Button className="bg-purple-700 hover:bg-purple-800">
                  <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}

        {/* Login Dialog */}
        <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl">Sign In to Freshersworld</DialogTitle>
            </DialogHeader>
            <form className="space-y-4 mt-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" />
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Link href="/auth/forgot-password" className="text-sm text-purple-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800">
                Sign In
              </Button>
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-purple-600 hover:underline"
                  onClick={() => setLoginDialogOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  )
}

