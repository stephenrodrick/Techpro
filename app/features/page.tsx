import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Bell,
  Users,
  Globe,
  Shield,
  Zap,
  MessageCircle,
  Mail,
  Phone,
  Share2,
  Clock,
  Target,
  TrendingUp,
  Database,
  Settings,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
  const coreFeatures = [
    {
      icon: BarChart3,
      title: "Real-time Analytics Dashboard",
      description:
        "Monitor sentiment trends across all channels with interactive visualizations and customizable dashboards.",
      features: ["Live sentiment tracking", "Interactive charts", "Custom time ranges", "Export capabilities"],
    },
    {
      icon: Bell,
      title: "Intelligent Alert System",
      description: "Get instant notifications when sentiment drops below thresholds with smart escalation rules.",
      features: ["Customizable thresholds", "Multi-channel notifications", "Auto-escalation", "Alert acknowledgment"],
    },
    {
      icon: Users,
      title: "Multi-Channel Integration",
      description:
        "Analyze sentiment from email, chat, social media, phone calls, and support tickets in one unified platform.",
      features: ["Email integration", "Live chat monitoring", "Social media tracking", "Phone call analysis"],
    },
    {
      icon: Globe,
      title: "Global Language Support",
      description: "Process sentiment in 25+ languages with cultural context awareness and regional customization.",
      features: ["25+ languages", "Cultural context", "Regional settings", "Multilingual teams"],
    },
    {
      icon: Target,
      title: "AI-Powered Insights",
      description: "Leverage advanced machine learning models for accurate emotion detection and predictive analytics.",
      features: ["99.2% accuracy", "Emotion detection", "Predictive analytics", "Custom models"],
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with SOC2 compliance, data encryption, and GDPR-ready privacy controls.",
      features: ["SOC2 compliant", "End-to-end encryption", "GDPR ready", "Role-based access"],
    },
  ]

  const channels = [
    { icon: Mail, name: "Email", description: "Monitor customer emails and support tickets" },
    { icon: MessageCircle, name: "Live Chat", description: "Real-time chat sentiment analysis" },
    { icon: Phone, name: "Phone Calls", description: "Voice-to-text sentiment processing" },
    { icon: Share2, name: "Social Media", description: "Track mentions across social platforms" },
  ]

  const aiModels = [
    {
      name: "OpenAI GPT-4",
      accuracy: "99.2%",
      speed: "< 100ms",
      description: "Primary recommendation for highest accuracy",
    },
    {
      name: "HuggingFace",
      accuracy: "97.8%",
      speed: "< 50ms",
      description: "Fast processing for high-volume scenarios",
    },
    { name: "Google Cloud", accuracy: "98.5%", speed: "< 80ms", description: "Excellent for multilingual analysis" },
    { name: "Azure Cognitive", accuracy: "98.1%", speed: "< 90ms", description: "Enterprise integration friendly" },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              Platform Features
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Powerful Features for{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Modern Businesses
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Everything you need to understand, monitor, and improve customer sentiment across all touchpoints with
              enterprise-grade AI technology.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/platform">Try Live Demo</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent" asChild>
                <Link href="/contact">Schedule Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Core Platform Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive sentiment intelligence tools designed for enterprise scale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Tabs */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Explore Platform Capabilities</h2>
            <p className="text-xl text-muted-foreground">Deep dive into our advanced features and integrations</p>
          </div>

          <Tabs defaultValue="channels" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="channels">Channels</TabsTrigger>
              <TabsTrigger value="ai-models">AI Models</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="channels" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {channels.map((channel, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <channel.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{channel.name}</h3>
                      <p className="text-sm text-muted-foreground">{channel.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">
                  Seamlessly integrate with your existing communication channels
                </p>
                <Button asChild>
                  <Link href="/contact">Request Integration</Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="ai-models" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aiModels.map((model, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {model.name}
                        <Badge variant="secondary">{model.accuracy}</Badge>
                      </CardTitle>
                      <CardDescription>{model.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Response Time</p>
                          <p className="font-semibold">{model.speed}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Accuracy</p>
                          <p className="font-semibold">{model.accuracy}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                      Advanced Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Real-time Dashboards</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Predictive Insights</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Custom Reports</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Data Export</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Database className="h-5 w-5 mr-2 text-blue-600" />
                      Data Processing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>10M+ messages/month</span>
                      <Badge variant="secondary">Scalable</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{"< 100ms processing"}</span>
                      <Badge variant="secondary">Fast</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>99.9% uptime</span>
                      <Badge variant="secondary">Reliable</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Global deployment</span>
                      <Badge variant="secondary">Available</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="security" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-green-600" />
                      Compliance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">SOC2 Type II</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">GDPR Compliant</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">HIPAA Ready</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">ISO 27001</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-blue-600" />
                      Data Protection
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">AES-256 Encryption</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">PII Detection</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Data Anonymization</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Secure Backups</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-purple-600" />
                      Access Control
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Role-based Access</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">SSO Integration</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Audit Logging</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">2FA Required</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-6 text-white">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Experience These Features?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              See how techpro can transform your customer experience with a personalized demo
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
                <Link href="/platform">
                  <Zap className="h-5 w-5 mr-2" />
                  Try Live Demo
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
                asChild
              >
                <Link href="/contact">Schedule Demo Call</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
