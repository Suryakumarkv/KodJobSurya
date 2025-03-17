import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Briefcase, Building, GraduationCap, Search, Users } from "lucide-react"
import JobCard from "@/components/job-card"
import CompanyLogo from "@/components/company-logo"
import Navbar from "@/components/navbar"
import AuthButtons from "@/components/auth-buttons"

export default function HomePage() {
  // Sample featured jobs with company images
  const featuredJobs = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechCorp",
      location: "Remote",
      stipend: "₹20,000/month",
      tags: ["React", "JavaScript", "Tailwind CSS"],
      logo: "/cuvette-images/techcorp.png",
      postedAt: "2 days ago",
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "DataSystems",
      location: "Bangalore",
      stipend: "₹25,000/month",
      tags: ["Node.js", "Express", "MongoDB"],
      logo: "/cuvette-images/datasystems.png",
      postedAt: "1 week ago",
    },
    {
      id: 3,
      title: "UI/UX Design Intern",
      company: "CreativeMinds",
      location: "Hybrid",
      stipend: "₹15,000/month",
      tags: ["Figma", "Adobe XD", "UI Design"],
      logo: "/cuvette-images/creativeminds.png",
      postedAt: "3 days ago",
    },
  ]

  // Sample companies
  const companies = [
    { name: "Airtel", logo: "/cuvette-images/airtel.png" },
    { name: "Tata", logo: "/cuvette-images/tata.png" },
    { name: "nference", logo: "/cuvette-images/nference.png" },
    { name: "TripAdvisor", logo: "/cuvette-images/tripadvisor.png" },
    { name: "Spinny", logo: "/cuvette-images/spinny.png" },
    { name: "CarDekho", logo: "/cuvette-images/cardekho.png" },
    { name: "MediBuddy", logo: "/cuvette-images/medibuddy.png" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar with Auth */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">Find your dream tech job or internship</h1>
              <p className="text-xl text-purple-100">
                Connect with top startups and companies looking for fresh talent like you
              </p>
              <AuthButtons />
            </div>
            <div className="hidden md:block relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070"
                alt="Students finding jobs"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="text-3xl font-bold text-purple-900">7000+</div>
              <div className="text-gray-600 flex items-center gap-2">
                <Briefcase size={16} /> Jobs & Internships
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-3xl font-bold text-purple-900">18K+</div>
              <div className="text-gray-600">Avg. Stipend</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-3xl font-bold text-purple-900">6000+</div>
              <div className="text-gray-600 flex items-center gap-2">
                <Building size={16} /> Companies
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-3xl font-bold text-purple-900">300K+</div>
              <div className="text-gray-600 flex items-center gap-2">
                <Users size={16} /> Students
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Find Your Perfect Opportunity</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Job title, skills or keywords"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>
              <div className="flex-1 relative">
                <Building className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Location or Remote"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>
              <Button className="bg-purple-700 hover:bg-purple-800 text-white py-3 px-6">Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Opportunities</h2>
            <Link href="/jobs" className="text-purple-600 hover:text-purple-800 flex items-center gap-1">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Companies Section with Image */}
      <section className="py-12 bg-gray-50 relative">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070"
            alt="Office background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-2xl font-bold mb-8 text-center">Trusted by Leading Companies</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-8 items-center justify-items-center">
            {companies.map((company, index) => (
              <CompanyLogo key={index} name={company.name} logo={company.logo} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-12 text-center">How Freshersworld Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-16 h-16 bg-purple-100 text-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">For Students</h3>
              <p className="text-gray-600 mb-4">
                Create your profile, showcase your skills, and apply to relevant opportunities with just a few clicks.
              </p>
              <Link href="/auth/signup" className="text-purple-600 hover:text-purple-800 font-medium">
                Sign up as Student →
              </Link>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-16 h-16 bg-purple-100 text-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">For Employers</h3>
              <p className="text-gray-600 mb-4">
                Post job openings, review applications, and connect with talented students and fresh graduates.
              </p>
              <Link href="/auth/signup?type=employer" className="text-purple-600 hover:text-purple-800 font-medium">
                Sign up as Employer →
              </Link>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-16 h-16 bg-purple-100 text-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Get Hired</h3>
              <p className="text-gray-600 mb-4">
                Receive notifications, track your applications, and start your career journey with top companies.
              </p>
              <Link href="/jobs" className="text-purple-600 hover:text-purple-800 font-medium">
                Browse Opportunities →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Background Image */}
      <section className="py-16 relative">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974"
            alt="Career growth"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to start your career journey?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of students and employers already using Freshersworld to connect and grow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50">
              <Link href="/auth/signup">Create Your Profile</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-purple-900/20">
              <Link href="/jobs">Browse Jobs</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

