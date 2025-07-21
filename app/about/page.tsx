import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Brain, Shield, Zap, Globe, Users, Award, TrendingUp } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
              <Target className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              About techpro
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing brand monitoring with AI-powered sentiment analysis, real-time social media tracking,
            and intelligent crisis detection to help businesses protect and grow their online reputation.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="border-2 hover:border-purple-200 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To empower businesses with cutting-edge AI technology that transforms how they monitor, understand, and
                respond to their brand presence across all digital platforms. We believe every brand deserves real-time
                insights and proactive protection.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-purple-200 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To become the global leader in AI-powered brand intelligence, creating a world where businesses can
                instantly understand public sentiment, predict trends, and make data-driven decisions that strengthen
                their brand reputation.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose techpro?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Advanced AI Analysis</CardTitle>
                <CardDescription>
                  Powered by OpenAI's latest models for accurate sentiment analysis and emotion detection
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Real-Time Monitoring</CardTitle>
                <CardDescription>
                  Instant alerts and live tracking across all major social media platforms and news sites
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Crisis Detection</CardTitle>
                <CardDescription>
                  Early warning system with automated escalation for potential PR crises and reputation threats
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Multi-Platform Coverage</CardTitle>
                <CardDescription>
                  Monitor Twitter, Instagram, Facebook, LinkedIn, TikTok, YouTube, Reddit, and news sources
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Competitor Intelligence</CardTitle>
                <CardDescription>
                  Track competitor mentions, share of voice, and market sentiment to stay ahead
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Influencer Tracking</CardTitle>
                <CardDescription>
                  Identify and monitor key influencers, track viral content, and measure brand advocacy
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Powered by Cutting-Edge Technology</h2>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Our Technology Stack</CardTitle>
              <CardDescription className="text-center">
                Built with the latest AI and web technologies for maximum performance and reliability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl mb-2">🤖</div>
                  <h4 className="font-semibold">OpenAI GPT-4</h4>
                  <p className="text-sm text-muted-foreground">Advanced AI Analysis</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl mb-2">⚡</div>
                  <h4 className="font-semibold">Next.js 15</h4>
                  <p className="text-sm text-muted-foreground">Modern Web Framework</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl mb-2">🎨</div>
                  <h4 className="font-semibold">Tailwind CSS</h4>
                  <p className="text-sm text-muted-foreground">Beautiful UI Design</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl mb-2">📊</div>
                  <h4 className="font-semibold">Recharts</h4>
                  <p className="text-sm text-muted-foreground">Data Visualization</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl mb-2">🐦</div>
                  <h4 className="font-semibold">Twitter API</h4>
                  <p className="text-sm text-muted-foreground">Social Media Integration</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl mb-2">📱</div>
                  <h4 className="font-semibold">Twilio</h4>
                  <p className="text-sm text-muted-foreground">SMS Notifications</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl mb-2">📧</div>
                  <h4 className="font-semibold">SendGrid</h4>
                  <p className="text-sm text-muted-foreground">Email Alerts</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl mb-2">💬</div>
                  <h4 className="font-semibold">Slack</h4>
                  <p className="text-sm text-muted-foreground">Team Notifications</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-purple-600 mb-2">1M+</div>
                <p className="text-muted-foreground">Mentions Analyzed</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
                <p className="text-muted-foreground">Alerts Sent</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-green-600 mb-2">99.9%</div>
                <p className="text-muted-foreground">Uptime</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                <p className="text-muted-foreground">Monitoring</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Company Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Privacy & Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We prioritize data security and privacy, ensuring your brand information is protected with
                  enterprise-grade security measures and compliance standards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We continuously innovate and integrate the latest AI technologies to provide cutting-edge solutions
                  that stay ahead of the rapidly evolving digital landscape.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Customer Success</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your success is our success. We're committed to providing exceptional support and ensuring our
                  platform delivers measurable value for your brand.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Academic Project Notice */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle className="text-center text-2xl">Academic Excellence Project</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              techpro is a cutting-edge academic project developed at
              <strong> SRM Institute of Science and Technology</strong>, showcasing the latest advancements in
              AI-powered brand monitoring and sentiment analysis.
            </p>
            <div className="flex justify-center space-x-4">
              <Badge variant="outline" className="px-4 py-2">
                🎓 Academic Project
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                🏫 SRM Institute
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                🤖 AI Research
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
