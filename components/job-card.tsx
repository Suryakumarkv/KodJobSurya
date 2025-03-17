import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Clock } from "lucide-react"

interface JobCardProps {
  job: {
    id: number
    title: string
    company: string
    location: string
    stipend: string
    tags: string[]
    logo: string
    postedAt: string
  }
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 border">
            <Image
              src={job.logo || "/placeholder.svg?height=48&width=48"}
              alt={`${job.company} logo`}
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <div className="space-y-1 flex-1">
            <h3 className="font-semibold text-lg line-clamp-1">
              <Link href={`/jobs/${job.id}`} className="hover:text-purple-700">
                {job.title}
              </Link>
            </h3>
            <div className="text-gray-600">{job.company}</div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{job.location}</span>
              <span>•</span>
              <span>{job.stipend}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {job.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50 px-6 py-3 border-t">
        <div className="flex items-center text-sm text-gray-500">
          <Clock size={14} className="mr-1" />
          <span>Posted {job.postedAt}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

