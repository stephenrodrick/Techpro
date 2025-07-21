"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { 
  Activity, 
  BarChart3, 
  Bell, 
  Brain, 
  Download, 
  Eye, 
  Heart, 
  MessageCircle, 
  Play, 
  Pause, 
  RefreshCw, 
  Settings, 
  Share, 
  Target, 
  TrendingUp, 
  Users, 
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  Ticket,
  Share2,
  Send,
  User,
  Globe,
  Hash,
  Flame,
  Star
} from "lucide-react"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { RealTimeDashboard } from "@/components/real-time-dashboard"

// Mock data interfaces
interface BrandMention {
  id: string
  platform: string
  author: {
    username: string
    displayName: string
    followers: number
    verified: boolean
    profileImage: string
    influencerTier: string
  }
  content: {
    text: string
    url: string
  }
  metrics: {
    likes: number
    shares: number
    comments: number
    views: number
    engagement: number
    reach: number
  }
  sentiment: {
    score: number
    emotion: string
    confidence: number
  }
  hashtags: string[]
  timestamp: Date
  viralPotential: number
  priority: string
  category: string
}

interface SentimentMessage {
  id: string
  customerName: string
  customerId: string
  channel: string
  message: string
  summary: string
  emotion: string
  sentimentScore: number
  confidenceScore: number
  priority: string
  timestamp: Date
  customerTier: string
  tags: string[]
  escalated: boolean
  previousInteractions: number
}

interface Alert {
  id: string
  type: string
  severity: string
  title: string
  description: string
  timestamp: Date
  acknowledged: boolean
  messageCount: number
  averageSentiment: number
}

export default function PlatformPage() {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [mentions, setMentions] = useState<BrandMention[]>([])
  const [messages, setMessages] = useState<SentimentMessage[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [stats, setStats] = useState({
    totalMentions: 0,
    brandHealth: 75.5,
    shareOfVoice: 12.3,
    averageSentiment: 0.42,
    totalMessages: 0,
    negativeMessages: 0,
    responseTime: 4.2,
    customerSatisfaction: 87.3,
    escalationRate: 3.1,
    processingRate: 98.7,
    accuracyScore: 0.952,
    activeAgents: 18
  })

  // Mock data generation
  const generateMockMention = (): BrandMention => ({
    id: Math.random().toString(36).substr(2, 9),
    platform: ["twitter", "instagram", "facebook", "linkedin"][Math.floor(Math.random() * 4)],
    author: {
      username: `user${Math.floor(Math.random() * 1000)}`,
      displayName: `User ${Math.floor(Math.random() * 1000)}`,
      followers: Math.floor(Math.random() * 100000),
      verified: Math.random() > 0.8,
      profileImage: "/placeholder.svg",
      influencerTier: ["nano", "micro", "macro", "mega"][Math.floor(Math.random() * 4)]
    },
    content: {
      text: [
        "Just tried @YourBrand's new product and I'm absolutely blown away! The quality is incredible.",
        "Having issues with @YourBrand's service today. Support team hasn't responded yet.",
        "Love the new features from @YourBrand! The user experience is so much better now.",
        "@YourBrand's customer service is outstanding. Quick response and professional help!"
      ][Math.floor(Math.random() * 4)],
      url: "https://example.com/post"
    },
    metrics: {
      likes: Math.floor(Math.random() * 1000),
      shares: Math.floor(Math.random() * 500),
      comments: Math.floor(Math.random() * 200),
      views: Math.floor(Math.random() * 10000),
      engagement: Math.random() * 10,
      reach: Math.floor(Math.random() * 50000)
    },
    sentiment: {
      score: (Math.random() - 0.5) * 2,
      emotion: ["positive", "negative", "neutral", "mixed"][Math.floor(Math.random() * 4)],
      confidence: 0.7 + Math.random() * 0.3
    },
    hashtags: ["#YourBrand", "#CustomerService", "#ProductReview"].slice(0, Math.floor(Math.random() * 3) + 1),
    timestamp: new Date(Date.now() - Math.random() * 86400000),
    viralPotential: Math.random(),
    priority: ["low", "medium", "high", "critical"][Math.floor(Math.random() * 4)],
    category: ["product", "service", "brand", "campaign"][Math.floor(Math.random() * 4)]
  })

  const generateMockMessage = (): SentimentMessage => ({
    id: Math.random().toString(36).substr(2, 9),
    customerName: `Customer ${Math.floor(Math.random() * 1000)}`,
    customerId: `CUST-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    channel: ["email", "chat", "ticket", "phone", "social"][Math.floor(Math.random() * 5)],
    message: [
      "I'm absolutely furious! Your billing system charged me twice for the same subscription.",
      "Thank you so much for the quick response yesterday! The technical team resolved my issue.",
      "I'm having trouble understanding how to set up the new dashboard feature.",
      "This is completely unacceptable! I've been waiting in your chat queue for over 2 hours."
    ][Math.floor(Math.random() * 4)],
    summary: "Customer feedback about service experience",
    emotion: ["anger", "frustration", "confusion", "joy", "satisfaction", "neutral"][Math.floor(Math.random() * 6)],
    sentimentScore: (Math.random() - 0.5) * 2,
    confidenceScore: 0.7 + Math.random() * 0.3,
    priority: ["low", "medium", "high", "critical"][Math.floor(Math.random() * 4)],
    timestamp: new Date(Date.now() - Math.random() * 86400000),
    customerTier: ["bronze", "silver", "gold", "platinum"][Math.floor(Math.random() * 4)],
    tags: ["billing", "technical", "support", "general"].slice(0, Math.floor(Math.random() * 3) + 1),
    escalated: Math.random() > 0.8,
    previousInteractions: Math.floor(Math.random() * 10)
  })

  const generateMockAlert = (): Alert => ({
    id: Math.random().toString(36).substr(2, 9),
    type: ["negative_sentiment", "viral_mention", "crisis_detection"][Math.floor(Math.random() * 3)],
    severity: ["low", "medium", "high", "critical"][Math.floor(Math.random() * 4)],
    title: "High volume of negative sentiment detected",
    description: "Multiple negative mentions detected in the last hour requiring immediate attention",
    timestamp: new Date(Date.now() - Math.random() * 3600000),
    acknowledged: Math.random() > 0.7,
    messageCount: Math.floor(Math.random() * 20) + 5,
    averageSentiment: -0.3 - Math.random() * 0.5
  })

  // Simulate real-time data updates
  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        // Add new mentions
        if (Math.random() > 0.7) {
          setMentions(prev => [generateMockMention(), ...prev.slice(0, 19)])
        }
        
        // Add new messages
        if (Math.random() > 0.6) {
          setMessages(prev => [generateMockMessage(), ...prev.slice(0, 49)])
        }
        
        // Add new alerts
        if (Math.random() > 0.9) {
          setAlerts(prev => [generateMockAlert(), ...prev.slice(0, 9)])
        }

        // Update stats
        setStats(prev => ({
          ...prev,
          totalMentions: prev.totalMentions + (Math.random() > 0.8 ? 1 : 0),
          totalMessages: prev.totalMessages + (Math.random() > 0.7 ? 1 : 0),
          brandHealth: Math.max(0, Math.min(100, prev.brandHealth + (Math.random() - 0.5) * 2)),
          averageSentiment: Math.max(-1, Math.min(1, prev.averageSentiment + (Math.random() - 0.5) * 0.1))
        }))
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isMonitoring])

  // Initialize with some mock data
  useEffect(() => {
    const initialMentions = Array.from({ length: 10 }, generateMockMention)
    const initialMessages = Array.from({ length: 20 }, generateMockMessage)
    const initialAlerts = Array.from({ length: 3 }, generateMockAlert)
    
    setMentions(initialMentions)
    setMessages(initialMessages)
    setAlerts(initialAlerts)
    
    setStats(prev => ({
      ...prev,
      totalMentions: initialMentions.length,
      totalMessages: initialMessages.length
    }))
  }, [])

  const handleStartMonitoring = () => {
    setIsMonitoring(true)
  }

  const handleStopMonitoring = () => {
    setIsMonitoring(false)
  }

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ))
  }

  const handleExportData = async (format: string) => {
    // Client-side export functionality
    const exportData = {
      mentions,
      messages,
      alerts,
      stats,
      timestamp: new Date().toISOString(),
      format
    }

    let content = ''
    let filename = `sentiment-data-${new Date().toISOString().split('T')[0]}`
    let mimeType = 'text/plain'

    if (format === 'json') {
      content = JSON.stringify(exportData, null, 2)
      filename += '.json'
      mimeType = 'application/json'
    } else if (format === 'csv') {
      const csvHeaders = ['ID', 'Platform', 'Author', 'Content', 'Sentiment', 'Timestamp']
      const csvRows = mentions.map(m => [
        m.id,
        m.platform,
        m.author.displayName,
        `"${m.content.text.replace(/"/g, '""')}"`,
        m.sentiment.score.toFixed(2),
        m.timestamp.toISOString()
      ])
      content = [csvHeaders.join(','), ...csvRows.map(row => row.join(','))].join('\n')
      filename += '.csv'
      mimeType = 'text/csv'
    } else {
      content = `Sentiment Analysis Report\n\nGenerated: ${new Date().toLocaleString()}\n\nTotal Mentions: ${mentions.length}\nBrand Health: ${stats.brandHealth.toFixed(1)}%\nAverage Sentiment: ${stats.averageSentiment.toFixed(2)}`
      filename += '.txt'
    }

    const blob = new Blob([content], { type: mimeType })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  const getPlatformIcon = (platform: string) => {
    const icons = {
      twitter: "𝕏",
      instagram: "📷", 
      facebook: "📘",
      linkedin: "💼"
    }
    return icons[platform as keyof typeof icons] || "🌐"
  }

  const getSentimentColor = (score: number) => {
    if (score > 0.3) return "text-green-600"
    if (score < -0.3) return "text-red-600"
    return "text-yellow-600"
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email": return <Mail className="h-4 w-4" />
      case "chat": return <MessageCircle className="h-4 w-4" />
      case "ticket": return <Ticket className="h-4 w-4" />
      case "phone": return <Phone className="h-4 w-4" />
      case "social": return <Share2 className="h-4 w-4" />
      default: return <MessageCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              techpro
            </h1>
            <p className="text-muted-foreground">AI-powered brand monitoring and sentiment analysis platform</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {isMonitoring ? (
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-medium">LIVE</span>
                </div>
              ) : (
                <span className="text-muted-foreground">Monitoring Stopped</span>
              )}
            </div>
            
            <Button
              onClick={isMonitoring ? handleStopMonitoring : handleStartMonitoring}
              variant={isMonitoring ? "destructive" : "default"}
              className="flex items-center gap-2"
            >
              {isMonitoring ? (
                <>
                  <Pause className="h-4 w-4" />
                  Stop Monitoring
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Start Monitoring
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="mentions">Brand Mentions</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <RealTimeDashboard 
              mentions={mentions} 
              messages={messages} 
              isLive={isMonitoring} 
            />
          </TabsContent>

          {/* Brand Mentions Tab */}
          <TabsContent value="mentions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    Brand Mentions Feed
                    {isMonitoring && <Badge variant="default" className="animate-pulse">LIVE</Badge>}
                  </span>
                  <Badge variant="outline">{mentions.length} mentions</Badge>
                </CardTitle>
                <CardDescription>Real-time brand mentions across all social media platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {mentions.map((mention) => (
                      <div key={mention.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm">
                              {mention.author.displayName.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-sm">{mention.author.displayName}</p>
                                {mention.author.verified && <Badge variant="secondary" className="text-xs">✓</Badge>}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                @{mention.author.username} • {mention.author.followers.toLocaleString()} followers
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{getPlatformIcon(mention.platform)}</span>
                            <Badge variant={mention.priority === "critical" ? "destructive" : "outline"} className="text-xs">
                              {mention.priority}
                            </Badge>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-sm leading-relaxed">{mention.content.text}</p>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              {mention.metrics.likes.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Share className="h-4 w-4" />
                              {mention.metrics.shares.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              {mention.metrics.comments.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {mention.metrics.views.toLocaleString()}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={`text-xs ${getSentimentColor(mention.sentiment.score)} border-current`}>
                              {mention.sentiment.emotion} ({mention.sentiment.score.toFixed(2)})
                            </Badge>
                            <span className="text-xs text-muted-foreground">{mention.timestamp.toLocaleTimeString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {mention.hashtags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sentiment Analysis Tab */}
          <TabsContent value="sentiment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Message Analyzer */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Sentiment Analyzer
                  </CardTitle>
                  <CardDescription>Test sentiment analysis with custom text</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="test-text">Text to Analyze</Label>
                    <Textarea
                      id="test-text"
                      placeholder="Enter text to analyze sentiment..."
                      rows={4}
                    />
                  </div>
                  <Button className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Analyze Sentiment
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Messages */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Sentiment Analysis</CardTitle>
                  <CardDescription>Latest analyzed messages</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      {messages.slice(0, 10).map((message) => (
                        <div key={message.id} className="border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getChannelIcon(message.channel)}
                              <span className="font-medium text-sm">{message.customerName}</span>
                            </div>
                            <Badge variant={message.priority === "critical" ? "destructive" : "outline"}>
                              {message.emotion}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{message.message}</p>
                          <div className="flex items-center justify-between text-xs">
                            <span className={`font-mono ${getSentimentColor(message.sentimentScore)}`}>
                              {message.sentimentScore.toFixed(2)}
                            </span>
                            <span className="text-muted-foreground">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {alerts.filter(a => !a.acknowledged).length}
                  </div>
                  <p className="text-xs text-muted-foreground">Require attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {alerts.filter(a => !a.acknowledged && a.severity === "critical").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Immediate action needed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {alerts.filter(a => a.acknowledged).length}
                  </div>
                  <p className="text-xs text-muted-foreground">Acknowledged alerts</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">12m</div>
                  <p className="text-xs text-muted-foreground">Average response time</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Alerts</CardTitle>
                <CardDescription>Complete list of system alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {alerts.map((alert) => (
                      <div key={alert.id} className={`border rounded-lg p-4 ${
                        alert.severity === 'critical' ? 'border-red-200 bg-red-50' : 
                        alert.severity === 'high' ? 'border-orange-200 bg-orange-50' : 
                        'border-yellow-200 bg-yellow-50'
                      }`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="h-5 w-5" />
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{alert.title}</h3>
                                <Badge variant={
                                  alert.severity === 'critical' ? 'destructive' : 
                                  alert.severity === 'high' ? 'destructive' : 'secondary'
                                }>
                                  {alert.severity.toUpperCase()}
                                </Badge>
                                {alert.acknowledged && (
                                  <Badge variant="outline" className="text-green-600">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Acknowledged
                                  </Badge>
                                )}
                              </div>
                              <p className="text-muted-foreground">{alert.description}</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {alert.timestamp.toLocaleString()} • {alert.messageCount} messages affected
                              </p>
                            </div>
                          </div>
                          {!alert.acknowledged && (
                            <Button 
                              onClick={() => handleAcknowledgeAlert(alert.id)} 
                              variant="outline" 
                              size="sm"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Acknowledge
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsDashboard 
              mentions={mentions} 
              messages={messages} 
              stats={stats} 
            />
            
            {/* Export Section */}
            <Card>
              <CardHeader>
                <CardTitle>Export Data</CardTitle>
                <CardDescription>Download analytics data in various formats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    onClick={() => handleExportData('csv')} 
                    variant="outline" 
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export as CSV
                  </Button>
                  <Button 
                    onClick={() => handleExportData('json')} 
                    variant="outline" 
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export as JSON
                  </Button>
                  <Button 
                    onClick={() => handleExportData('pdf')} 
                    variant="outline" 
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export as PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Monitoring Settings
                  </CardTitle>
                  <CardDescription>Configure monitoring parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="keywords">Brand Keywords</Label>
                    <Input
                      id="keywords"
                      placeholder="YourBrand, @YourBrand, #YourBrand"
                      defaultValue="YourBrand, @YourBrand"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="competitors">Competitor Keywords</Label>
                    <Input
                      id="competitors"
                      placeholder="Competitor1, Competitor2"
                      defaultValue="CompetitorA, CompetitorB"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sentiment-threshold">Alert Threshold</Label>
                    <Select defaultValue="-0.3">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="-0.1">Low (-0.1)</SelectItem>
                        <SelectItem value="-0.3">Medium (-0.3)</SelectItem>
                        <SelectItem value="-0.5">High (-0.5)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Real-time Monitoring</Label>
                        <p className="text-sm text-muted-foreground">Enable live data updates</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Send alerts via email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Slack Integration</Label>
                        <p className="text-sm text-muted-foreground">Post alerts to Slack</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Configuration
                  </CardTitle>
                  <CardDescription>Configure AI models and processing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="ai-model">Primary AI Model</Label>
                    <Select defaultValue="openai">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI GPT-4</SelectItem>
                        <SelectItem value="huggingface">HuggingFace</SelectItem>
                        <SelectItem value="google">Google Cloud</SelectItem>
                        <SelectItem value="azure">Azure Cognitive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confidence-threshold">Confidence Threshold</Label>
                    <Select defaultValue="0.7">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.5">50%</SelectItem>
                        <SelectItem value="0.7">70%</SelectItem>
                        <SelectItem value="0.9">90%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Advanced Analytics</Label>
                        <p className="text-sm text-muted-foreground">Enable detailed analysis</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Emotion Detection</Label>
                        <p className="text-sm text-muted-foreground">Detect specific emotions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <Button className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Save Configuration
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}