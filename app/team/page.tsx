import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Linkedin, Mail, MapPin, GraduationCap, Code, Brain } from "lucide-react"

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Stephen Rodrick",
      role: "Lead Developer & AI Specialist",
      email: "stephen.rodrick@srm.edu",
      bio: "Passionate full-stack developer specializing in AI integration and modern web technologies. Leading the development of techpro with expertise in Next.js, OpenAI APIs, and real-time data processing.",
      skills: ["Next.js", "React", "TypeScript", "OpenAI API", "Node.js", "AI/ML", "Real-time Systems"],
      education: "B.Tech Computer Science, SRM Institute of Science and Technology",
      achievements: [
        "Led development of AI-powered sentiment analysis system",
        "Integrated multiple social media APIs for real-time monitoring",
        "Implemented advanced notification systems (SMS, Email, Slack)",
        "Designed scalable architecture for high-volume data processing"
      ],
      avatar: "/placeholder.svg?height=120&width=120&text=SR",
      github: "https://github.com/stephenrodrick",
      linkedin: "https://linkedin.com/in/stephenrodrick",
    },
    {
      name: "Swati Gupta",
      role: "Co-Developer & UX Designer",
      email: "swati.gupta@srm.edu",
      bio: "Creative developer with a strong focus on user experience and interface design. Contributing to techpro with expertise in modern UI frameworks and user-centered design principles.",
      skills: ["React", "UI/UX Design", "Tailwind CSS", "JavaScript", "Figma", "User Research", "Frontend Architecture"],
      education: "B.Tech Computer Science, SRM Institute of Science and Technology",
      achievements: [
        "Designed intuitive dashboard interface for complex data visualization",
        "Implemented responsive design across all platform components",
        "Created comprehensive component library with shadcn/ui",
        "Optimized user workflows for efficient brand monitoring"
      ],
      avatar: "/placeholder.svg?height=120&width=120&text=SG",
      github: "https://github.com/swatigupta",
      linkedin: "https://linkedin.com/in/swatigupta",
    }
  ]

  const technologies = [
    { name: "Next.js 15", icon: "⚡", category: "Framework" },
    { name: "OpenAI GPT-4", icon: "🤖", category: "AI/ML" },
    { name: "TypeScript", icon: "📘", category: "Language" },
    { name: "Tailwind CSS", icon: "🎨", category: "Styling" },
    { name: "Recharts", icon: "📊", category: "Visualization" },
    { name: "Twitter API", icon: "🐦", category: "Integration" },
    { name: "Twilio", icon: "📱", category: "Communication" },
    { name: "SendGrid", icon: "📧", category: "Email" },
    { name: "Slack API", icon: "💬", category: "Notifications" },
    { name: "Vercel", icon: "▲", category: "Deployment" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Meet Our Team
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Passionate computer science students from SRM Institute of Science and Technology, 
            building the future of AI-powered brand monitoring and sentiment analysis.
          </p>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <Card key={index} className="border-2 hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">{member.name}</CardTitle>
                <CardDescription className="text-lg font-medium text-purple-600">
                  {member.role}
                </CardDescription>
                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Chennai, India</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                
                {/* Education */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                    <h4 className="font-semibold">Education</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{member.education}</p>
                </div>

                {/* Skills */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Code className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold">Technical Skills</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Key Achievements */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Brain className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold">Key Contributions</h4>
                  </div>
                  <ul className="space-y-1">
                    {member.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div className="flex justify-center space-x-4 pt-4 border-t">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`mailto:${member.email}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={member.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology Stack */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Technology Stack</h2>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Technologies We Use</CardTitle>
              <CardDescription className="text-center">
                Modern tools and frameworks powering techpro
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {technologies.map((tech, index) => (
                  <div key={index} className="text-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="text-3xl mb-2">{tech.icon}</div>
                    <h4 className="font-semibold text-sm">{tech.name}</h4>
                    <p className="text-xs text-muted-foreground">{tech.category}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Stats */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Project Development Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
                <p className="text-muted-foreground">Components Built</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
                <p className="text-muted-foreground">API Integrations</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
                <p className="text-muted-foreground">Hours Coded</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
                <p className="text-muted-foreground">Test Coverage</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Academic Recognition */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <GraduationCap className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle className="text-center text-2xl">Academic Excellence Project</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              techpro represents the culmination of our computer science education at 
              <strong> SRM Institute of Science and Technology</strong>. This project demonstrates 
              advanced concepts in AI, machine learning, full-stack development, and real-time systems.
            </p>
            <div className="flex justify-center space-x-4">
              <Badge variant="outline" className="px-4 py-2">
                🎓 Final Year Project
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                🏫 SRM Institute
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                🤖 AI/ML Focus
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
