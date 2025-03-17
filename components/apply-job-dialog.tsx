"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface ApplyJobDialogProps {
  jobId: string | number
  jobTitle: string
  companyName: string
  buttonText?: string
  buttonClassName?: string
  fullWidth?: boolean
}

export default function ApplyJobDialog({
  jobId,
  jobTitle,
  companyName,
  buttonText = "Apply Now",
  buttonClassName = "bg-purple-700 hover:bg-purple-800",
  fullWidth = false,
}: ApplyJobDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call with timeout
    setTimeout(() => {
      setLoading(false)
      setOpen(false)

      // Show success toast
      toast({
        title: "Application Submitted!",
        description: `You've successfully applied for the ${jobTitle} position at ${companyName}.`,
      })
    }, 1500)

    // In a real application, you would submit the form data to an API endpoint
    // const formData = new FormData(e.target as HTMLFormElement);
    // formData.append('jobId', jobId.toString());
    // const response = await fetch('/api/applications', {
    //   method: 'POST',
    //   body: formData
    // });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={buttonClassName + (fullWidth ? " w-full" : "")}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
          <DialogDescription>Complete the form below to apply for this position at {companyName}.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="cover-letter">Cover Letter</Label>
            <Textarea
              id="cover-letter"
              placeholder="Briefly explain why you're a good fit for this position..."
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume">Resume/CV</Label>
            <div className="flex items-center gap-2">
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setResumeFile(e.target.files[0])
                  }
                }}
                required
              />
            </div>
            <p className="text-xs text-gray-500">Accepted formats: PDF, DOC, DOCX. Max size: 5MB</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="Your phone number" required />
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

