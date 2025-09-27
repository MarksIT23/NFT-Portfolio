"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Code, Database, Palette, Zap, Globe, Shield } from "lucide-react"

interface SkillBadgesProps {
  skills: string[]
  className?: string
}

const skillCategories = {
  frontend: {
    icon: Palette,
    color: "bg-blue-500/10 text-blue-700 border-blue-200",
    skills: ["React", "Next.js", "Vue", "Angular", "HTML", "CSS", "JavaScript", "TypeScript", "TailwindCSS", "Sass"],
  },
  backend: {
    icon: Database,
    color: "bg-green-500/10 text-green-700 border-green-200",
    skills: ["Node.js", "Express", "Python", "Django", "Flask", "Java", "Spring", "PHP", "Laravel", "Ruby"],
  },
  database: {
    icon: Database,
    color: "bg-purple-500/10 text-purple-700 border-purple-200",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "Supabase", "Prisma", "SQLite"],
  },
  cloud: {
    icon: Globe,
    color: "bg-orange-500/10 text-orange-700 border-orange-200",
    skills: ["AWS", "Vercel", "Netlify", "Docker", "Kubernetes", "Azure", "GCP", "Heroku"],
  },
  tools: {
    icon: Code,
    color: "bg-gray-500/10 text-gray-700 border-gray-200",
    skills: ["Git", "GitHub", "VS Code", "Webpack", "Vite", "Jest", "Cypress", "Figma"],
  },
  blockchain: {
    icon: Shield,
    color: "bg-yellow-500/10 text-yellow-700 border-yellow-200",
    skills: ["Solidity", "Web3", "Ethereum", "Smart Contracts", "IPFS", "MetaMask"],
  },
}

function getSkillCategory(skill: string) {
  for (const [category, data] of Object.entries(skillCategories)) {
    if (data.skills.some((s) => s.toLowerCase() === skill.toLowerCase())) {
      return { category, ...data }
    }
  }
  return {
    category: "other",
    icon: Zap,
    color: "bg-accent/10 text-accent-foreground border-accent/20",
    skills: [],
  }
}

export function SkillBadges({ skills, className = "" }: SkillBadgesProps) {
  const categorizedSkills = skills.map((skill) => ({
    name: skill,
    ...getSkillCategory(skill),
  }))

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {categorizedSkills.map((skill) => {
        const IconComponent = skill.icon
        return (
          <Badge
            key={skill.name}
            variant="outline"
            className={`gap-1.5 ${skill.color} hover:shadow-sm transition-shadow`}
          >
            <IconComponent className="w-3 h-3" />
            {skill.name}
          </Badge>
        )
      })}
    </div>
  )
}

export function SkillBadgesSummary({ skills }: { skills: string[] }) {
  const categories = skills.reduce(
    (acc, skill) => {
      const category = getSkillCategory(skill)
      if (!acc[category.category]) {
        acc[category.category] = {
          name: category.category,
          icon: category.icon,
          color: category.color,
          count: 0,
          skills: [],
        }
      }
      acc[category.category].count++
      acc[category.category].skills.push(skill)
      return acc
    },
    {} as Record<string, any>,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Award className="w-5 h-5 text-accent" />
          Skill Categories
        </CardTitle>
        <CardDescription>Technical expertise demonstrated across projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.values(categories).map((category: any) => {
            const IconComponent = category.icon
            return (
              <div key={category.name} className="text-center">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2 ${category.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="font-medium capitalize">{category.name}</div>
                <div className="text-sm text-muted-foreground">{category.count} skills</div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
