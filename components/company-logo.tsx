import Image from "next/image"

interface CompanyLogoProps {
  name: string
  logo: string
}

export default function CompanyLogo({ name, logo }: CompanyLogoProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="h-12 w-24 relative">
        <Image
          src={logo || "/placeholder.svg?height=48&width=96"}
          alt={`${name} logo`}
          width={96}
          height={48}
          className="object-contain"
        />
      </div>
    </div>
  )
}

