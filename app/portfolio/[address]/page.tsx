import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, FileText, Award, Star, UserCheck } from "lucide-react"
import { SharePortfolioButton } from "@/components/share-portfolio-button"
import { VerificationDialog } from "@/components/verification-dialog"
import { EndorsementDialog } from "@/components/endorsement-dialog"
import { SkillBadges, SkillBadgesSummary } from "@/components/skill-badges"
import { ResumeGenerator } from "@/components/resume-generator"

// Mock data - in production this would fetch from blockchain/IPFS
const mockPortfolioData = {
  address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8c",
  name: "Alex Chen",
  title: "Full-Stack Developer",
  bio: "Passionate about building accessible, user-friendly applications with modern web technologies. Currently pursuing Computer Science at Stanford University.",
  projects: [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Full-stack React application with payment integration, user authentication, and admin dashboard. Features include product catalog, shopping cart, order management, and real-time inventory tracking.",
      githubUrl: "https://github.com/alexchen/ecommerce-app",
      portfolioUrl: "https://ecommerce-demo.vercel.app",
      skills: ["React", "Node.js", "MongoDB", "Stripe", "JWT", "Express"],
      mintDate: "2024-01-15",
      tokenId: "#001",
      verified: true,
      endorsements: [
        {
          id: 1,
          endorserName: "Dr. Sarah Johnson",
          endorserTitle: "Professor of Computer Science",
          endorserOrganization: "Stanford University",
          endorsementText:
            "Exceptional work demonstrating mastery of full-stack development. The payment integration and security implementation are particularly impressive.",
          rating: 5,
          timestamp: "2024-01-20",
          verified: true,
        },
      ],
    },
    {
      id: 2,
      title: "AI Chat Application",
      description:
        "Real-time chat application with AI integration using OpenAI's GPT API. Includes message history, user authentication, and responsive design optimized for both desktop and mobile.",
      githubUrl: "https://github.com/alexchen/ai-chat",
      portfolioUrl: "https://ai-chat-demo.vercel.app",
      skills: ["Next.js", "OpenAI", "WebSocket", "TailwindCSS", "Prisma", "PostgreSQL"],
      mintDate: "2024-02-20",
      tokenId: "#002",
      verified: true,
      endorsements: [],
    },
    {
      id: 3,
      title: "Task Management System",
      description:
        "Collaborative project management tool with drag-and-drop functionality, team collaboration features, and real-time updates. Built with modern React patterns and state management.",
      githubUrl: "https://github.com/alexchen/task-manager",
      portfolioUrl: "https://task-manager-demo.vercel.app",
      skills: ["React", "TypeScript", "Zustand", "React DnD", "Firebase", "Material-UI"],
      mintDate: "2024-03-10",
      tokenId: "#003",
      verified: true,
      endorsements: [],
    },
  ],
}

interface PortfolioPageProps {
  params: {
    address: string
  }
}

export default function PortfolioPage({ params }: PortfolioPageProps) {
  const { address } = params
  const portfolio = mockPortfolioData // In production, fetch based on address

  const portfolioUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "https://nft-portfolio.vercel.app"}/portfolio/${address}`
  const allSkills = [...new Set(portfolio.projects.flatMap((p) => p.skills))]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold text-foreground">NFT Portfolio</h1>
            </div>
            <div className="flex items-center gap-3">
              <ResumeGenerator portfolioData={portfolio} />
              <SharePortfolioButton url={portfolioUrl} />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Portfolio Header */}
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-accent/10 to-primary/10">
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div>
                    <CardTitle className="text-3xl font-bold text-balance">{portfolio.name}</CardTitle>
                    <CardDescription className="text-lg mt-2">{portfolio.title}</CardDescription>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">{portfolio.bio}</p>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="font-mono text-xs">
                      {portfolio.address.slice(0, 6)}...{portfolio.address.slice(-4)}
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <Award className="w-3 h-3" />
                      {portfolio.projects.length} Verified Projects
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <Star className="w-3 h-3" />
                      {portfolio.projects.reduce((acc, p) => acc + (p.endorsements?.length || 0), 0)} Endorsements
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Skills Summary */}
          <SkillBadgesSummary skills={allSkills} />

          {/* Projects Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Blockchain-Verified Projects</h2>
              <Badge variant="outline" className="gap-1">
                <Award className="w-3 h-3" />
                All projects verified on Ethereum
              </Badge>
            </div>

            <div className="grid gap-6">
              {portfolio.projects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <CardTitle className="text-xl">{project.title}</CardTitle>
                          <Badge variant="outline" className="font-mono text-xs">
                            {project.tokenId}
                          </Badge>
                          {project.verified && (
                            <Badge variant="default" className="gap-1 bg-accent text-accent-foreground">
                              <Award className="w-3 h-3" />
                              Verified
                            </Badge>
                          )}
                          {project.endorsements && project.endorsements.length > 0 && (
                            <Badge variant="secondary" className="gap-1">
                              <UserCheck className="w-3 h-3" />
                              {project.endorsements.length} Endorsement{project.endorsements.length !== 1 ? "s" : ""}
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-base leading-relaxed">{project.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <SkillBadges skills={project.skills} />

                    {/* Endorsements */}
                    {project.endorsements && project.endorsements.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Professional Endorsements</h4>
                        {project.endorsements.map((endorsement) => (
                          <Card key={endorsement.id} className="bg-accent/5 border-accent/20">
                            <CardContent className="pt-4">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <div className="font-medium text-sm">{endorsement.endorserName}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {endorsement.endorserTitle}
                                    {endorsement.endorserOrganization && ` • ${endorsement.endorserOrganization}`}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < endorsement.rating
                                          ? "text-yellow-500 fill-current"
                                          : "text-muted-foreground"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground italic">"{endorsement.endorsementText}"</p>
                              <div className="text-xs text-muted-foreground mt-2">
                                {new Date(endorsement.timestamp).toLocaleDateString()}
                                {endorsement.verified && " • Blockchain Verified"}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 pt-2">
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                          View Code
                        </a>
                      </Button>
                      {project.portfolioUrl && (
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                          <a href={project.portfolioUrl} target="_blank" rel="noopener noreferrer">
                            <FileText className="w-4 h-4" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      <VerificationDialog project={project} walletAddress={portfolio.address} />
                      <EndorsementDialog
                        projectId={project.id}
                        projectTitle={project.title}
                        onEndorsementAdded={() => {}} // In production, this would update the project
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="text-sm text-muted-foreground">
                        Minted on {new Date(project.mintDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-accent font-medium">Blockchain Verified ✓</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Verification Info */}
          <Card className="bg-accent/5 border-accent/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                Portfolio Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  • All projects are minted as ERC-721 NFTs on the Ethereum blockchain, ensuring immutable proof of
                  creation and ownership
                </p>
                <p>• Project metadata is stored on IPFS for permanent, decentralized access</p>
                <p>• Each NFT contains verifiable links to source code, live demos, and project documentation</p>
                <p>
                  • Employers and educators can independently verify authenticity by checking the blockchain records
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card className="text-center bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="py-8">
              <h3 className="text-xl font-semibold mb-2">Interested in working together?</h3>
              <p className="text-muted-foreground mb-6">
                This portfolio showcases blockchain-verified projects that demonstrate real technical skills and
                achievements.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Contact {portfolio.name}
                </Button>
                <SharePortfolioButton url={portfolioUrl} variant="outline" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
