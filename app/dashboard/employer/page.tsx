import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Plus, Users } from "lucide-react"

export default function EmployerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-purple-700">
            Freshersworld
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost">Job Postings</Button>
            <Button variant="ghost">Company Profile</Button>
            <Button variant="outline">Logout</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Employer Dashboard</h1>
          <Button className="bg-purple-700 hover:bg-purple-800">
            <Plus className="mr-2 h-4 w-4" /> Post a New Job
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-3xl font-bold">0</div>
                <Building className="ml-2 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-3xl font-bold">0</div>
                <Users className="ml-2 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Profile Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-3xl font-bold">40%</div>
                <Link href="/dashboard/employer/profile" className="ml-2 text-sm text-purple-600 hover:underline">
                  Complete Now
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Job Management</CardTitle>
            <CardDescription>Manage your job postings and applications</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active">
              <TabsList className="mb-6">
                <TabsTrigger value="active">Active Jobs</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
              </TabsList>

              <TabsContent value="active">
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4">You don't have any active job postings</div>
                  <Button>Post Your First Job</Button>
                </div>
              </TabsContent>

              <TabsContent value="applications">
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4">No applications received yet</div>
                  <p className="text-sm text-gray-500 mb-4">
                    When candidates apply to your job postings, their applications will appear here.
                  </p>
                  <Button>Post a New Job</Button>
                </div>
              </TabsContent>

              <TabsContent value="drafts">
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4">No draft jobs found</div>
                  <Button>Create a Draft</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

