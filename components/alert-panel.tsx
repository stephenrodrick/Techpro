"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, CheckCircle, Clock, Users, TrendingDown } from "lucide-react"

interface SentimentMessage {
  id: string
  customerName: string
  customerId: string
  channel: "email" | "chat" | "ticket" | "social" | "phone"
  emotion: string
  sentimentScore: number
  timestamp: Date
}

interface SentimentAlert {
  id: string
  timestamp: Date
  messageCount: number
  averageSentiment: number
  summary: string
  messages: SentimentMessage[]
  severity: "low" | "medium" | "high" | "critical"
  acknowledged: boolean
  assignedTo?: string
}

interface AlertPanelProps {
  alerts: SentimentAlert[]
  onAcknowledge: (alertId: string) => void
  showAll?: boolean
}

export function AlertPanel({ alerts, onAcknowledge, showAll = false }: AlertPanelProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "high":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case "medium":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "low":
        return <TrendingDown className="h-4 w-4 text-blue-600" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const displayAlerts = showAll ? alerts : alerts.slice(0, 5)

  if (displayAlerts.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <p className="text-muted-foreground">No active alerts</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {!showAll && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-red-600">🚨 Active Alerts</h3>
          <Badge variant="destructive">{alerts.filter((a) => !a.acknowledged).length} unacknowledged</Badge>
        </div>
      )}

      <div className="space-y-3">
        {displayAlerts.map((alert) => (
          <Alert
            key={alert.id}
            variant={alert.severity === "critical" || alert.severity === "high" ? "destructive" : "default"}
          >
            <div className="flex items-start justify-between w-full">
              <div className="flex items-start gap-3 flex-1">
                {getSeverityIcon(alert.severity)}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <AlertDescription className="font-medium">{alert.summary}</AlertDescription>
                    <div className="flex items-center gap-2">
                      <Badge variant={getSeverityColor(alert.severity) as any}>{alert.severity.toUpperCase()}</Badge>
                      {alert.acknowledged && (
                        <Badge variant="outline" className="text-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Acknowledged
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{alert.messageCount} messages affected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-muted-foreground" />
                      <span>Avg sentiment: {alert.averageSentiment.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{alert.timestamp.toLocaleString()}</span>
                    </div>
                  </div>

                  {showAll && (
                    <div className="mt-3">
                      <ScrollArea className="h-32 w-full border rounded p-2">
                        <div className="space-y-1">
                          {alert.messages.slice(0, 5).map((msg) => (
                            <div key={msg.id} className="text-xs p-2 bg-muted rounded">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium">{msg.customerName}</span>
                                <span className="text-red-600">{msg.sentimentScore.toFixed(2)}</span>
                              </div>
                              <p className="text-muted-foreground truncate">
                                {msg.channel}: {msg.emotion}
                              </p>
                            </div>
                          ))}
                          {alert.messages.length > 5 && (
                            <p className="text-xs text-muted-foreground text-center py-1">
                              +{alert.messages.length - 5} more messages
                            </p>
                          )}
                        </div>
                      </ScrollArea>
                    </div>
                  )}
                </div>
              </div>

              {!alert.acknowledged && (
                <Button size="sm" variant="outline" onClick={() => onAcknowledge(alert.id)} className="ml-4">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Acknowledge
                </Button>
              )}
            </div>
          </Alert>
        ))}
      </div>
    </div>
  )
}
