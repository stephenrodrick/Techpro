"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mail, MessageCircle, Ticket, Phone, Share, ArrowUp, Download } from "lucide-react"

interface SentimentMessage {
  id: string
  customerName: string
  customerId: string
  channel: "email" | "chat" | "ticket" | "social" | "phone"
  message: string
  summary: string
  emotion: "anger" | "frustration" | "confusion" | "joy" | "satisfaction" | "neutral" | "urgency" | "complaint"
  sentimentScore: number
  confidenceScore: number
  priority: "low" | "medium" | "high" | "critical"
  timestamp: Date
  processed: boolean
  language: string
  customerTier: "bronze" | "silver" | "gold" | "platinum"
  previousInteractions: number
  responseTime?: number
  escalated: boolean
  tags: string[]
}

interface MessageListProps {
  messages: SentimentMessage[]
  onExport: (format: "csv" | "json" | "pdf") => void
  onEscalate: (messageId: string) => void
}

export function MessageList({ messages, onExport, onEscalate }: MessageListProps) {
  const negativeMessages = messages.filter((msg) => msg.sentimentScore < -0.1).slice(0, 10)
  const criticalMessages = messages.filter((msg) => msg.priority === "critical").slice(0, 5)

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
        return <Share className="h-4 w-4" />
      default:
        return <MessageCircle className="h-4 w-4" />
    }
  }

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case "anger":
        return "destructive"
      case "frustration":
        return "destructive"
      case "urgency":
        return "destructive"
      case "complaint":
        return "destructive"
      case "confusion":
        return "secondary"
      case "joy":
        return "default"
      case "satisfaction":
        return "default"
      default:
        return "outline"
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

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Message Analysis</h2>
          <Badge variant="secondary">{messages.length} total messages</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onExport("csv")}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => onExport("json")}>
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* All Recent Messages */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Messages
              <Badge variant="outline">{messages.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[700px]">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getChannelIcon(message.channel)}
                        <span className="font-medium">{message.customerName}</span>
                        <Badge className={getTierColor(message.customerTier)} variant="secondary">
                          {message.customerTier}
                        </Badge>
                        <span className="text-sm text-muted-foreground">({message.customerId})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityColor(message.priority) as any}>{message.priority}</Badge>
                        {message.escalated && (
                          <Badge variant="destructive">
                            <ArrowUp className="h-3 w-3 mr-1" />
                            Escalated
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Message Content */}
                    <div className="space-y-2">
                      <p className="text-sm">{message.message}</p>
                      <div className="flex flex-wrap gap-1">
                        {message.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Badge variant={getEmotionColor(message.emotion) as any}>{message.emotion}</Badge>
                          <span
                            className={`font-mono ${message.sentimentScore >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {message.sentimentScore.toFixed(2)}
                          </span>
                          <span className="text-muted-foreground">
                            ({(message.confidenceScore * 100).toFixed(0)}% confidence)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{message.previousInteractions} prev interactions</span>
                        <span className="text-muted-foreground">{message.timestamp.toLocaleTimeString()}</span>
                        {!message.escalated && message.sentimentScore < -0.5 && (
                          <Button size="sm" variant="outline" onClick={() => onEscalate(message.id)}>
                            <ArrowUp className="h-3 w-3 mr-1" />
                            Escalate
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Sidebar with Critical Messages */}
        <div className="space-y-6">
          {/* Critical Priority Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center justify-between">
                Critical Priority
                <Badge variant="destructive">{criticalMessages.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-3">
                  {criticalMessages.map((message) => (
                    <div
                      key={message.id}
                      className="border border-red-200 rounded-lg p-3 space-y-2 bg-red-50 dark:bg-red-950"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getChannelIcon(message.channel)}
                          <span className="font-medium text-sm">{message.customerName}</span>
                        </div>
                        <Badge variant="destructive" className="text-xs">
                          {message.emotion}
                        </Badge>
                      </div>
                      <p className="text-sm">{message.summary}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-red-600">{message.sentimentScore.toFixed(2)}</span>
                        <span className="text-muted-foreground">{message.timestamp.toLocaleTimeString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Top Negative Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-600 flex items-center justify-between">
                Most Negative
                <Badge variant="secondary">{negativeMessages.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[350px]">
                <div className="space-y-3">
                  {negativeMessages.map((message) => (
                    <div
                      key={message.id}
                      className="border border-orange-200 rounded-lg p-3 space-y-2 bg-orange-50 dark:bg-orange-950"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getChannelIcon(message.channel)}
                          <span className="font-medium text-sm">{message.customerName}</span>
                          <Badge className={getTierColor(message.customerTier)} variant="secondary">
                            {message.customerTier}
                          </Badge>
                        </div>
                        <Badge variant={getEmotionColor(message.emotion) as any} className="text-xs">
                          {message.emotion}
                        </Badge>
                      </div>
                      <p className="text-sm">{message.summary}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-red-600">{message.sentimentScore.toFixed(2)}</span>
                        <span className="text-muted-foreground">{message.timestamp.toLocaleTimeString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
