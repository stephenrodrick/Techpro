"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, Clock, TrendingUp, Flame, Users } from "lucide-react"

interface BrandMention {
  id: string
  platform: string
  author: {
    username: string
    displayName: string
    followers: number
    verified: boolean
    profileImage: string
    influencerTier: "nano" | "micro" | "macro" | "mega" | "celebrity"
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
    emotion: "positive" | "negative" | "neutral" | "mixed"
    confidence: number
  }
  timestamp: Date
  viralPotential: number
}

interface BrandAlert {
  id: string
  type: "viral_mention" | "negative_sentiment" | "competitor_activity" | "influencer_mention" | "crisis_detection"
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  mentions: BrandMention[]
  timestamp: Date
  acknowledged: boolean
  assignedTo?: string
  actionTaken?: string
}

interface AlertsPanelProps {
  alerts: BrandAlert[]
  onAcknowledge: (alertId: string) => void
}

export function AlertsPanel({ alerts, onAcknowledge }: AlertsPanelProps) {
  const activeAlerts = alerts.filter((alert) => !alert.acknowledged)
  const acknowledgedAlerts = alerts.filter((alert) => alert.acknowledged)

  const getAlertIcon = (type: string) => {
    const icons = {
      viral_mention: <Flame className="h-4 w-4" />,
      negative_sentiment: <AlertTriangle className="h-4 w-4" />,
      competitor_activity: <TrendingUp className="h-4 w-4" />,
      influencer_mention: <Users className="h-4 w-4" />,
      crisis_detection: <AlertTriangle className="h-4 w-4" />,
    }
    return icons[type as keyof typeof icons] || <AlertTriangle className="h-4 w-4" />
  }

  const getAlertColor = (severity: string) => {
    const colors = {
      low: "border-blue-200 bg-blue-50 dark:bg-blue-950",
      medium: "border-yellow-200 bg-yellow-50 dark:bg-yellow-950",
      high: "border-orange-200 bg-orange-50 dark:bg-orange-950",
      critical: "border-red-200 bg-red-50 dark:bg-red-950",
    }
    return colors[severity as keyof typeof colors] || colors.medium
  }

  const getSeverityBadge = (severity: string) => {
    const variants = {
      low: "secondary" as const,
      medium: "default" as const,
      high: "default" as const,
      critical: "destructive" as const,
    }
    return variants[severity as keyof typeof variants] || variants.medium
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      viral_mention: "Viral Mention",
      negative_sentiment: "Negative Sentiment",
      competitor_activity: "Competitor Activity",
      influencer_mention: "Influencer Mention",
      crisis_detection: "Crisis Detection",
    }
    return labels[type as keyof typeof labels] || type
  }

  const getPlatformIcon = (platform: string) => {
    const icons = {
      twitter: "𝕏",
      instagram: "📷",
      facebook: "📘",
      linkedin: "💼",
      tiktok: "🎵",
      youtube: "📺",
      reddit: "🤖",
      news: "📰",
    }
    return icons[platform as keyof typeof icons] || "🌐"
  }

  const getSentimentColor = (score: number) => {
    if (score > 0.3) return "text-green-600"
    if (score < -0.3) return "text-red-600"
    return "text-yellow-600"
  }

  return (
    <div className="space-y-6">
      {/* Alert Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{activeAlerts.length}</div>
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
              {activeAlerts.filter((a) => a.severity === "critical").length}
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
              {
                acknowledgedAlerts.filter((a) => {
                  const today = new Date()
                  const alertDate = new Date(a.timestamp)
                  return alertDate.toDateString() === today.toDateString()
                }).length
              }
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

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Alerts ({activeAlerts.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({acknowledgedAlerts.length})</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Brand Alerts</CardTitle>
              <CardDescription>Alerts requiring immediate attention and action</CardDescription>
            </CardHeader>
            <CardContent>
              {activeAlerts.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">All Clear!</h3>
                  <p className="text-muted-foreground">
                    No active alerts at the moment. Your brand monitoring is running smoothly.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeAlerts
                    .sort((a, b) => {
                      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
                      return (
                        severityOrder[b.severity as keyof typeof severityOrder] -
                        severityOrder[a.severity as keyof typeof severityOrder]
                      )
                    })
                    .map((alert) => (
                      <div key={alert.id} className={`border rounded-lg p-6 ${getAlertColor(alert.severity)}`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`p-2 rounded-lg ${
                                alert.severity === "critical"
                                  ? "bg-red-100 text-red-600"
                                  : alert.severity === "high"
                                    ? "bg-orange-100 text-orange-600"
                                    : alert.severity === "medium"
                                      ? "bg-yellow-100 text-yellow-600"
                                      : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              {getAlertIcon(alert.type)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-lg">{alert.title}</h3>
                                <Badge variant={getSeverityBadge(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                                <Badge variant="outline">{getTypeLabel(alert.type)}</Badge>
                              </div>
                              <p className="text-muted-foreground">{alert.description}</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {alert.timestamp.toLocaleString()} • {alert.mentions.length} affected mentions
                              </p>
                            </div>
                          </div>
                          <Button onClick={() => onAcknowledge(alert.id)} variant="outline" size="sm">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Acknowledge
                          </Button>
                        </div>

                        {/* Alert Details */}
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Affected Mentions:</span> {alert.mentions.length}
                            </div>
                            <div>
                              <span className="font-medium">Total Reach:</span>{" "}
                              {alert.mentions.reduce((sum, m) => sum + m.metrics.reach, 0).toLocaleString()}
                            </div>
                            <div>
                              <span className="font-medium">Avg Sentiment:</span>
                              <span
                                className={getSentimentColor(
                                  alert.mentions.reduce((sum, m) => sum + m.sentiment.score, 0) / alert.mentions.length,
                                )}
                              >
                                {" "}
                                {(
                                  alert.mentions.reduce((sum, m) => sum + m.sentiment.score, 0) / alert.mentions.length
                                ).toFixed(2)}
                              </span>
                            </div>
                          </div>

                          {/* Top Mentions */}
                          {alert.mentions.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-2">Top Affected Mentions:</h4>
                              <div className="space-y-2">
                                {alert.mentions.slice(0, 2).map((mention) => (
                                  <div key={mention.id} className="bg-white dark:bg-gray-800 rounded-lg p-3 border">
                                    <div className="flex items-start justify-between mb-2">
                                      <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm">
                                          {mention.author.displayName.charAt(0)}
                                        </div>
                                        <div>
                                          <div className="flex items-center gap-1">
                                            <span className="font-medium text-sm">{mention.author.displayName}</span>
                                            {mention.author.verified && (
                                              <Badge variant="secondary" className="text-xs">
                                                ✓
                                              </Badge>
                                            )}
                                            <span className="text-sm">{getPlatformIcon(mention.platform)}</span>
                                          </div>
                                          <p className="text-xs text-muted-foreground">
                                            {mention.author.followers.toLocaleString()} followers
                                          </p>
                                        </div>
                                      </div>
                                      <Badge
                                        variant="outline"
                                        className={`${getSentimentColor(mention.sentiment.score)} border-current text-xs`}
                                      >
                                        {mention.sentiment.emotion}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      {mention.content.text.substring(0, 100)}
                                      {mention.content.text.length > 100 && "..."}
                                    </p>
                                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                                      <div className="flex items-center space-x-3">
                                        <span>{mention.metrics.likes.toLocaleString()} likes</span>
                                        <span>{mention.metrics.shares.toLocaleString()} shares</span>
                                        <span>{mention.metrics.comments.toLocaleString()} comments</span>
                                      </div>
                                      <span>{mention.timestamp.toLocaleTimeString()}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved">
          <Card>
            <CardHeader>
              <CardTitle>Resolved Alerts</CardTitle>
              <CardDescription>Previously acknowledged and resolved alerts</CardDescription>
            </CardHeader>
            <CardContent>
              {acknowledgedAlerts.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Resolved Alerts</h3>
                  <p className="text-muted-foreground">
                    Resolved alerts will appear here once you acknowledge active alerts.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {acknowledgedAlerts.slice(0, 10).map((alert) => (
                    <div key={alert.id} className="border rounded-lg p-4 bg-muted/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{alert.title}</h3>
                              <Badge variant="outline" className="text-xs">
                                {getTypeLabel(alert.type)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{alert.description}</p>
                            <p className="text-xs text-muted-foreground">
                              Resolved: {alert.timestamp.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary">{alert.severity.toUpperCase()}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert Types Distribution</CardTitle>
                <CardDescription>Breakdown of alert types over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(
                    alerts.reduce(
                      (acc, alert) => {
                        acc[alert.type] = (acc[alert.type] || 0) + 1
                        return acc
                      },
                      {} as Record<string, number>,
                    ),
                  ).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getAlertIcon(type)}
                        <span className="font-medium">{getTypeLabel(type)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{count}</span>
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${(count / alerts.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Severity Trends</CardTitle>
                <CardDescription>Distribution of alert severity levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(
                    alerts.reduce(
                      (acc, alert) => {
                        acc[alert.severity] = (acc[alert.severity] || 0) + 1
                        return acc
                      },
                      {} as Record<string, number>,
                    ),
                  ).map(([severity, count]) => (
                    <div key={severity} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            severity === "critical"
                              ? "bg-red-500"
                              : severity === "high"
                                ? "bg-orange-500"
                                : severity === "medium"
                                  ? "bg-yellow-500"
                                  : "bg-blue-500"
                          }`}
                        />
                        <span className="font-medium capitalize">{severity}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{count}</span>
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div
                            className={`h-full rounded-full ${
                              severity === "critical"
                                ? "bg-red-500"
                                : severity === "high"
                                  ? "bg-orange-500"
                                  : severity === "medium"
                                    ? "bg-yellow-500"
                                    : "bg-blue-500"
                            }`}
                            style={{ width: `${(count / alerts.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
