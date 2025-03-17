"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Building, Calendar, Clock, MapPin } from "lucide-react"
import Navbar from "@/components/navbar"
import ApplyJobDialog from "@/components/apply-job-dialog"

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch job details from API
    const fetchJobDetails = async () => {
      try {
        const response = await fetch("/api/jobs")
        const data = await response.json()

        if (data.success) {
          const foundJob = data.jobs.find((j: any) => j.id === params.id)
          if (foundJob) {
            setJob(foundJob)
          }
        } else {
          console.error("Failed to fetch job details:", data.message)
        }
      } catch (error) {
        console.error("Error fetching job details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobDetails()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">Loading job details...</div>
        </main>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">Job not found</div>
            <Button asChild>
              <Link href="/jobs">Browse All Jobs</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/jobs" className="inline-flex items-center text-purple-700 hover:text-purple-900 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
          </Link>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 border">
                  <Image
                    src={job.logo || "/placeholder.svg?height=64&width=64"}
                    alt={`${job.company} logo`}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>

                <div className="space-y-2 flex-1">
                  <h1 className="text-2xl font-bold">{job.title}</h1>
                  <div className="text-lg text-gray-700">{job.company}</div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" /> {job.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" /> {job.stipend}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" /> Posted {job.postedAt}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {job.tags.map((tag: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <ApplyJobDialog jobId={job.id} jobTitle={job.title} companyName={job.company} />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                  <div className="prose max-w-none">
                    <p>{job.description}</p>

                    <h3 className="text-lg font-semibold mt-6 mb-3">Requirements</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {job.requirements?.map((req: string, index: number) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>

                    <h3 className="text-lg font-semibold mt-6 mb-3">Responsibilities</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {job.responsibilities?.map((resp: string, index: number) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-6">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Company Information</h2>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 border">
                      <Image
                        src={job.logo || "/placeholder.svg?height=40&width=40"}
                        alt={`${job.company} logo`}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{job.company}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Building className="mr-1 h-3 w-3" /> Technology
                      </div>
                    </div>
                  </div>

                  <ApplyJobDialog
                    jobId={job.id}
                    jobTitle={job.title}
                    companyName={job.company}
                    buttonText="Apply for this position"
                    fullWidth={true}
                  />
                  <Button variant="outline" className="w-full">
                    Save Job
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

