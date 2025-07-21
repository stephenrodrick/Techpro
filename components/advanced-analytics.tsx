"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, AlertTriangle } from "lucide-react"

interface AdvancedAnalyticsProps {
  messages: any[]
  alerts: any[]
  stats: any
}

export function AdvancedAnalytics({ messages, alerts, stats }: AdvancedAnalyticsProps) {
  // Channel performance analysis
  const channelData = messages.reduce((acc, msg) => {
    if (!acc[msg.channel]) {
      acc[msg.channel] = { channel: msg.channel, count: 0, avgSentiment: 0, totalSentiment: 0 }
    }
    acc[msg.channel].count++
    acc[msg.channel].totalSentiment += msg.sentimentScore
    acc[msg.channel].avgSentiment = acc[msg.channel].totalSentiment / acc[msg.channel].count
    return acc
  }, {})

  const channelChartData = Object.values(channelData)

  // Hourly sentiment trends
  const hourlyData = messages.reduce((acc, msg) => {
    const hour = new Date(msg.timestamp).getHours()
    const key = `${hour}:00`
    if (!acc[key]) {
      acc[key] = { time: key, sentiment: 0, count: 0, total: 0 }
    }
    acc[key].count++
    acc[key].total += msg.sentimentScore
    acc[key].sentiment = acc[key].total / acc[key].count
    return acc
  }, {})

  const hourlyChartData = Object.values(hourlyData).sort(
    (a: any, b: any) => Number.parseInt(a.time) - Number.parseInt(b.time),
  )

  // Customer tier analysis
  const tierData = messages.reduce((acc, msg) => {
    if (!acc[msg.customerTier]) {
      acc[msg.customerTier] = { tier: msg.customerTier, count: 0, avgSentiment: 0, totalSentiment: 0 }
    }
    acc[msg.customerTier].count++
    acc[msg.customerTier].totalSentiment += msg.sentimentScore
    acc[msg.customerTier].avgSentiment = acc[msg.customerTier].totalSentiment / acc[msg.customerTier].count
    return acc
  }, {})

  const tierChartData = Object.values(tierData)

  const chartConfig = {
    sentiment: { label: "Sentiment", color: "hsl(var(--chart-1))" },
    count: { label: "Messages", color: "hsl(var(--chart-2))" },
    avgSentiment: { label: "Avg Sentiment", color: "hsl(var(--chart-3))" },
  }

  return (
    <div className="space-y-6">
      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Activity Hour</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">2:00 PM</div>
            <p className="text-xs text-blue-600 mt-1">Highest message volume</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Performing Channel</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">Email</div>
            <p className="text-xs text-green-600 mt-1">+0.42 avg sentiment</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alert Frequency</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{alerts.length}</div>
            <p className="text-xs text-red-600 mt-1">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Channel Performance Analysis</CardTitle>
            <CardDescription>Message volume and sentiment by communication channel</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={channelChartData}>
                  <XAxis dataKey="channel" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Hourly Sentiment Trend */}
        <Card>
          <CardHeader>
            <CardTitle>24-Hour Sentiment Pattern</CardTitle>
            <CardDescription>Sentiment fluctuations throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={hourlyChartData}>
                  <XAxis dataKey="time" tickLine={false} axisLine={false} />
                  <YAxis domain={[-1, 1]} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="sentiment"
                    stroke="var(--color-sentiment)"
                    fill="var(--color-sentiment)"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Customer Tier Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Tier Sentiment</CardTitle>
            <CardDescription>Sentiment analysis by customer tier level</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tierChartData}>
                  <XAxis dataKey="tier" tickLine={false} axisLine={false} />
                  <YAxis domain={[-1, 1]} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="avgSentiment" fill="var(--color-avgSentiment)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Alert Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Timeline</CardTitle>
            <CardDescription>Alert frequency and severity over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.slice(0, 5).map((alert, index) => (
                <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        alert.severity === "critical"
                          ? "destructive"
                          : alert.severity === "high"
                            ? "destructive"
                            : alert.severity === "medium"
                              ? "secondary"
                              : "outline"
                      }
                    >
                      {alert.severity}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium">{alert.summary}</p>
                      <p className="text-xs text-muted-foreground">{new Date(alert.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{alert.messageCount} messages</p>
                    <p className="text-xs text-muted-foreground">Avg: {alert.averageSentiment.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Performance Metrics</CardTitle>
          <CardDescription>Comprehensive system performance and accuracy metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{(stats.accuracyScore * 100).toFixed(1)}%</div>
              <p className="text-sm text-muted-foreground">Model Accuracy</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.processingRate.toFixed(1)}%</div>
              <p className="text-sm text-muted-foreground">Processing Rate</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{stats.responseTime.toFixed(1)}m</div>
              <p className="text-sm text-muted-foreground">Avg Response Time</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{stats.escalationRate.toFixed(1)}%</div>
              <p className="text-sm text-muted-foreground">Escalation Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
