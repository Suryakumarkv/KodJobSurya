import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Building, GraduationCap, Search } from "lucide-react"
import JobCard from "@/components/job-card"

export default function StudentDashboard() {
  // Sample recommended jobs
  const recommendedJobs = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechCorp",
      location: "Remote",
      stipend: "₹20,000/month",
      tags: ["React", "JavaScript", "Tailwind CSS"],
      logo: "/placeholder.svg?height=48&width=48",
      postedAt: "2 days ago",
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "DataSystems",
      location: "Bangalore",
      stipend: "₹25,000/month",
      tags: ["Node.js", "Express", "MongoDB"],
      logo: "/placeholder.svg?height=48&width=48",
      postedAt: "1 week ago",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-purple-700">
            Freshersworld
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost">My Applications</Button>
            <Button variant="ghost">Profile</Button>
            <Button variant="outline">Logout</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back!</CardTitle>
                <CardDescription>Complete your profile to get more opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <div className="font-medium">Profile Completion</div>
                      <div className="text-sm text-gray-500">60% - Add more details</div>
                    </div>
                  </div>

                  <Button className="w-full">Complete Profile</Button>

                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/dashboard/student/applications"
                          className="text-purple-600 hover:underline flex items-center gap-2"
                        >
                          <Briefcase size={16} /> My Applications
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/dashboard/student/saved-jobs"
                          className="text-purple-600 hover:underline flex items-center gap-2"
                        >
                          <Building size={16} /> Saved Jobs
                        </Link>
                      </li>
                      <li>
                        <Link href="/jobs" className="text-purple-600 hover:underline flex items-center gap-2">
                          <Search size={16} /> Browse All Jobs
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="recommended">
              <TabsList className="mb-6">
                <TabsTrigger value="recommended">Recommended Jobs</TabsTrigger>
                <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
                <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
              </TabsList>

              <TabsContent value="recommended" className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  {recommendedJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>

                <div className="text-center">
                  <Button variant="outline">View More Jobs</Button>
                </div>
              </TabsContent>

              <TabsContent value="applied">
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4">You haven't applied to any jobs yet</div>
                  <p className="text-sm text-gray-500 mb-4">
                    When you apply for jobs, you'll be able to track your application status here.
                  </p>
                  <Button asChild>
                    <Link href="/jobs">Browse Jobs</Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="saved">
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4">No saved jobs found</div>
                  <Button>Browse Jobs</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

