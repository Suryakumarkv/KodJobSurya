import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building, GraduationCap } from "lucide-react"

export default function AuthButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50">
        <Link href="/auth/signup" className="flex items-center gap-2">
          I'm a Student <GraduationCap size={18} />
        </Link>
      </Button>
      <Button size="lg" variant="outline" className="border-white text-white hover:bg-purple-800">
        <Link href="/auth/signup?type=employer" className="flex items-center gap-2">
          I'm an Employer <Building size={18} />
        </Link>
      </Button>
    </div>
  )
}

