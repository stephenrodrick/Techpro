"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Mail, MessageCircle, Ticket, Phone, Share2, AlertTriangle, TrendingDown, Activity } from "lucide-react"

interface SentimentMessage {
  id: string
  customerName: string
  customerId: string
  channel: "email" | "chat" | "ticket" | "social" | "phone"
  message: string
  summary: string
  emotion: "anger" | "frustration" | "confusion" | "joy" | "satisfaction" | "neutral"
  sentimentScore: number
  confidenceScore: number
  priority: "low" | "medium" | "high" | "critical"
  timestamp: Date
  customerTier: "bronze" | "silver" | "gold" | "platinum"
  tags: string[]
}

interface SentimentAlert {
  id: string
  timestamp: Date
  messageCount: number
  averageSentiment: number
  summary: string
  severity: "low" | "medium" | "high" | "critical"
  acknowledged: boolean
  alertType: "negative_trend" | "critical_message" | "volume_spike" | "escalation_required"
}

interface LiveActivityFeedProps {
  messages: SentimentMessage[]
  alerts: SentimentAlert[]
  isMonitoring: boolean
}

export function LiveActivityFeed({ messages, alerts, isMonitoring }: LiveActivityFeedProps) {
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "chat":
        return <MessageCircle className="h-4 w-4" />
      case "ticket":
        return <Ticket className="h-4 w-4" />
      case "phone":
        return <Phone className="h-4 w-4" />
      case "social":
        return <Share2 className="h-4 w-4" />
      default:
        return <MessageCircle className="h-4 w-4" />
    }
  }

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case "anger":
        return "text-red-600 bg-red-50 border-red-200"
      case "frustration":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "confusion":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "joy":
        return "text-green-600 bg-green-50 border-green-200"
      case "satisfaction":
        return "text-blue-600 bg-blue-50 border-blue-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "platinum":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "gold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "silver":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      case "bronze":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAlertIcon = (alertType: string) => {
    switch (alertType) {
      case "negative_trend":
        return <TrendingDown className="h-4 w-4" />
      case "critical_message":
        return <AlertTriangle className="h-4 w-4" />
      case "volume_spike":
        return <Activity className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  // Combine and sort messages and alerts by timestamp
  const combinedFeed = [
    ...messages.map((msg) => ({ type: "message" as const, data: msg, timestamp: msg.timestamp })),
    ...alerts.map((alert) => ({ type: "alert" as const, data: alert, timestamp: alert.timestamp })),
  ]
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 50)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Activity Feed */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Live Activity Feed
            </div>
            <div className="flex items-center gap-2">
              {isMonitoring && (
                <div className="flex items-center gap-1 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">LIVE</span>
                </div>
              )}
              <Badge variant="outline">{combinedFeed.length} items</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[700px]">
            <div className="space-y-4">
              {combinedFeed.map((item, index) => (
                <div key={`${item.type}-${item.data.id}-${index}`}>
                  {item.type === "message" ? (
                    <div className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors">
                      {/* Message Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getChannelIcon(item.data.channel)}
                          <span className="font-medium">{item.data.customerName}</span>
                          <Badge className={getTierColor(item.data.customerTier)} variant="secondary">
                            {item.data.customerTier}
                          </Badge>
                          <span className="text-sm text-muted-foreground">({item.data.customerId})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getPriorityColor(item.data.priority) as any}>{item.data.priority}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {item.data.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>

                      {/* Message Content */}
                      <div className="space-y-2">
                        <p className="text-sm line-clamp-2">{item.data.message}</p>
                        <div className="flex flex-wrap gap-1">
                          {item.data.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Sentiment Analysis */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`px-2 py-1 rounded-md border text-xs font-medium ${getEmotionColor(item.data.emotion)}`}
                          >
                            {item.data.emotion}
                          </div>
                          <span
                            className={`font-mono text-sm ${item.data.sentimentScore >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {item.data.sentimentScore.toFixed(2)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {(item.data.confidenceScore * 100).toFixed(0)}% confidence
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`border rounded-lg p-4 space-y-2 ${
                        item.data.severity === "critical"
                          ? "border-red-500 bg-red-50 dark:bg-red-950"
                          : item.data.severity === "high"
                            ? "border-orange-500 bg-orange-50 dark:bg-orange-950"
                            : "border-yellow-500 bg-yellow-50 dark:bg-yellow-950"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getAlertIcon(item.data.alertType)}
                          <span className="font-medium text-sm">Alert Triggered</span>
                          <Badge
                            variant={
                              item.data.severity === "critical"
                                ? "destructive"
                                : item.data.severity === "high"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {item.data.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {item.data.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm">{item.data.summary}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{item.data.messageCount} messages</span>
                        <span>Avg sentiment: {item.data.averageSentiment.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                  {index < combinedFeed.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Sidebar Stats */}
      <div className="space-y-6">
        {/* Top Negative Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <TrendingDown className="h-4 w-4" />
              Top Negative Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-3">
                {messages
                  .filter((msg) => msg.sentimentScore < -0.3)
                  .slice(0, 10)
                  .map((message) => (
                    <div
                      key={message.id}
                      className="border border-red-200 rounded-lg p-3 space-y-2 bg-red-50 dark:bg-red-950"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getChannelIcon(message.channel)}
                          <span className="font-medium text-sm">{message.customerName}</span>
                        </div>
                        <span className="font-mono text-red-600 text-sm">{message.sentimentScore.toFixed(2)}</span>
                      </div>
                      <p className="text-sm line-clamp-2">{message.summary}</p>
                      <div className="flex items-center justify-between text-xs">
                        <Badge variant="outline" className="text-red-600">
                          {message.emotion}
                        </Badge>
                        <span className="text-muted-foreground">{message.timestamp.toLocaleTimeString()}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-orange-600 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-3">
                {alerts.slice(0, 10).map((alert) => (
                  <div
                    key={alert.id}
                    className="border border-orange-200 rounded-lg p-3 space-y-2 bg-orange-50 dark:bg-orange-950"
                  >
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={
                          alert.severity === "critical"
                            ? "destructive"
                            : alert.severity === "high"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {alert.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alert.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <p className="text-sm">{alert.summary}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span>{alert.messageCount} messages</span>
                      <span>Avg: {alert.averageSentiment.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Channel Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Channel Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {["email", "chat", "ticket", "phone", "social"].map((channel) => {
                const channelMessages = messages.filter((msg) => msg.channel === channel)
                const count = channelMessages.length
                const avgSentiment =
                  count > 0 ? channelMessages.reduce((sum, msg) => sum + msg.sentimentScore, 0) / count : 0

                return (
                  <div key={channel} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      {getChannelIcon(channel)}
                      <span className="capitalize text-sm font-medium">{channel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {count}
                      </Badge>
                      <span className={`text-xs font-mono ${avgSentiment >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {avgSentiment.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
