"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts"
import { Activity, TrendingUp, Users, MessageCircle } from "lucide-react"

interface RealTimeDashboardProps {
  mentions: any[]
  messages: any[]
  isLive: boolean
}

export function RealTimeDashboard({ mentions, messages, isLive }: RealTimeDashboardProps) {
  // Real-time metrics
  const realtimeMetrics = {
    mentionsPerHour: mentions.filter(m => {
      const hourAgo = new Date(Date.now() - 60 * 60 * 1000)
      return new Date(m.timestamp) > hourAgo
    }).length,
    messagesPerHour: messages.filter(m => {
      const hourAgo = new Date(Date.now() - 60 * 60 * 1000)
      return new Date(m.timestamp) > hourAgo
    }).length,
    avgResponseTime: 4.2,
    activeUsers: 1247
  }

  // Generate real-time activity data (last 30 minutes)
  const realtimeData = Array.from({ length: 30 }, (_, i) => {
    const time = new Date(Date.now() - (29 - i) * 60 * 1000)
    const mentions = Math.floor(Math.random() * 10) + 1
    const sentiment = (Math.random() - 0.5) * 2
    
    return {
      time: time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      mentions,
      sentiment: Number(sentiment.toFixed(2)),
      messages: Math.floor(Math.random() * 15) + 1
    }
  })

  const chartConfig = {
    mentions: { label: "Mentions", color: "hsl(var(--chart-1))" },
    sentiment: { label: "Sentiment", color: "hsl(var(--chart-2))" },
    messages: { label: "Messages", color: "hsl(var(--chart-3))" },
  }

  return (
    <div className="space-y-6">
      {/* Live Status Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Real-Time Analytics</h2>
          <p className="text-muted-foreground">Live monitoring dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          {isLive ? (
            <Badge variant="default" className="animate-pulse">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              LIVE
            </Badge>
          ) : (
            <Badge variant="secondary">OFFLINE</Badge>
          )}
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mentions/Hour</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realtimeMetrics.mentionsPerHour}</div>
            <Progress value={Math.min((realtimeMetrics.mentionsPerHour / 50) * 100, 100)} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages/Hour</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realtimeMetrics.messagesPerHour}</div>
            <Progress value={Math.min((realtimeMetrics.messagesPerHour / 100) * 100, 100)} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realtimeMetrics.avgResponseTime}m</div>
            <Progress value={Math.max(100 - (realtimeMetrics.avgResponseTime / 10) * 100, 0)} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realtimeMetrics.activeUsers.toLocaleString()}</div>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Real-time Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Activity Stream */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Live Activity Stream
              {isLive && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
            </CardTitle>
            <CardDescription>Real-time mentions and sentiment (last 30 minutes)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart data={realtimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" domain={[-1, 1]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="mentions"
                  stackId="1"
                  stroke="var(--color-mentions)"
                  fill="var(--color-mentions)"
                  fillOpacity={0.6}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="sentiment"
                  stroke="var(--color-sentiment)"
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Message Volume Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Message Volume Trend</CardTitle>
            <CardDescription>Customer messages over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart data={realtimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="messages"
                  stroke="var(--color-messages)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-messages)", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "var(--color-messages)", strokeWidth: 2 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Live Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Live Activity Feed</CardTitle>
          <CardDescription>Recent mentions and messages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {[...mentions.slice(0, 3), ...messages.slice(0, 2)]
              .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
              .slice(0, 8)
              .map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 animate-pulse" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {'platform' in item ? item.platform : item.channel}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm">
                      {'content' in item ? item.content.text : item.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge 
                        variant={'sentiment' in item ? 
                          (item.sentiment.score > 0 ? "default" : item.sentiment.score < 0 ? "destructive" : "secondary") :
                          (item.sentimentScore > 0 ? "default" : item.sentimentScore < 0 ? "destructive" : "secondary")
                        }
                        className="text-xs"
                      >
                        {'sentiment' in item ? item.sentiment.emotion : item.emotion}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}