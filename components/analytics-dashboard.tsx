"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, Users } from "lucide-react"

interface AnalyticsDashboardProps {
  mentions: any[]
  messages: any[]
  stats: any
}

export function AnalyticsDashboard({ mentions, messages, stats }: AnalyticsDashboardProps) {
  // Platform distribution data
  const platformData = mentions.reduce((acc, mention) => {
    acc[mention.platform] = (acc[mention.platform] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const platformChartData = Object.entries(platformData).map(([platform, count]) => ({
    platform: platform.charAt(0).toUpperCase() + platform.slice(1),
    mentions: count,
    percentage: mentions.length > 0 ? (count / mentions.length) * 100 : 0,
  }))

  // Sentiment distribution data
  const sentimentData = mentions.reduce((acc, mention) => {
    if (mention.sentiment.score > 0.1) acc.positive++
    else if (mention.sentiment.score < -0.1) acc.negative++
    else acc.neutral++
    return acc
  }, { positive: 0, negative: 0, neutral: 0 })

  const sentimentChartData = [
    { name: "Positive", value: sentimentData.positive, color: "#22c55e" },
    { name: "Negative", value: sentimentData.negative, color: "#ef4444" },
    { name: "Neutral", value: sentimentData.neutral, color: "#eab308" },
  ]

  // Hourly activity data
  const hourlyData = mentions.reduce((acc, mention) => {
    const hour = new Date(mention.timestamp).getHours()
    const key = `${hour}:00`
    if (!acc[key]) {
      acc[key] = { time: key, mentions: 0, sentiment: 0, count: 0 }
    }
    acc[key].mentions++
    acc[key].sentiment += mention.sentiment.score
    acc[key].count++
    return acc
  }, {} as Record<string, any>)

  const hourlyChartData = Object.values(hourlyData)
    .map((data: any) => ({
      ...data,
      avgSentiment: data.count > 0 ? data.sentiment / data.count : 0
    }))
    .sort((a: any, b: any) => parseInt(a.time) - parseInt(b.time))

  // Channel performance data
  const channelData = messages.reduce((acc, msg) => {
    if (!acc[msg.channel]) {
      acc[msg.channel] = { channel: msg.channel, count: 0, avgSentiment: 0, totalSentiment: 0 }
    }
    acc[msg.channel].count++
    acc[msg.channel].totalSentiment += msg.sentimentScore
    acc[msg.channel].avgSentiment = acc[msg.channel].totalSentiment / acc[msg.channel].count
    return acc
  }, {} as Record<string, any>)

  const channelChartData = Object.values(channelData)

  const chartConfig = {
    mentions: { label: "Mentions", color: "hsl(var(--chart-1))" },
    sentiment: { label: "Sentiment", color: "hsl(var(--chart-2))" },
    positive: { label: "Positive", color: "#22c55e" },
    negative: { label: "Negative", color: "#ef4444" },
    neutral: { label: "Neutral", color: "#eab308" },
    count: { label: "Messages", color: "hsl(var(--chart-3))" },
  }

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mentions.reduce((sum, m) => sum + m.metrics.likes + m.metrics.shares + m.metrics.comments, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5%
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reach</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(mentions.reduce((sum, m) => sum + m.metrics.reach, 0) / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2%
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sentiment Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.averageSentiment.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +0.15
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2.1%
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Distribution Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Distribution</CardTitle>
            <CardDescription>Mentions across social media platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart data={platformChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="mentions" fill="var(--color-mentions)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Sentiment Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Distribution</CardTitle>
            <CardDescription>Overall sentiment breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <PieChart>
                <Pie
                  data={sentimentChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sentimentChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Hourly Activity Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>24-Hour Activity Pattern</CardTitle>
            <CardDescription>Mentions and sentiment throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart data={hourlyChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" domain={[-1, 1]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar yAxisId="left" dataKey="mentions" fill="var(--color-mentions)" />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="avgSentiment" 
                  stroke="var(--color-sentiment)" 
                  strokeWidth={2}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Channel Performance Area Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Channel Performance</CardTitle>
            <CardDescription>Message volume and sentiment by channel</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart data={channelChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="channel" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stackId="1"
                  stroke="var(--color-count)" 
                  fill="var(--color-count)"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Content</CardTitle>
            <CardDescription>Highest engagement mentions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mentions
                .sort((a, b) => (b.metrics.likes + b.metrics.shares) - (a.metrics.likes + a.metrics.shares))
                .slice(0, 5)
                .map((mention, index) => (
                  <div key={mention.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">#{index + 1}</Badge>
                      <div>
                        <p className="text-sm font-medium">{mention.author.displayName}</p>
                        <p className="text-xs text-muted-foreground">
                          {mention.content.text.substring(0, 50)}...
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{(mention.metrics.likes + mention.metrics.shares).toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">engagements</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trending Hashtags</CardTitle>
            <CardDescription>Most popular hashtags</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mentions
                .flatMap(m => m.hashtags)
                .reduce((acc, tag) => {
                  acc[tag] = (acc[tag] || 0) + 1
                  return acc
                }, {} as Record<string, number>)
                && Object.entries(
                  mentions
                    .flatMap(m => m.hashtags)
                    .reduce((acc, tag) => {
                      acc[tag] = (acc[tag] || 0) + 1
                      return acc
                    }, {} as Record<string, number>)
                )
                .sort(([,a], [,b]) => b - a)
                .slice(0, 8)
                .map(([tag, count]) => (
                  <div key={tag} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{tag}</span>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sentiment Trends</CardTitle>
            <CardDescription>Recent sentiment changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Positive Mentions</p>
                  <p className="text-xs text-muted-foreground">Last 24 hours</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{sentimentData.positive}</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15%
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Negative Mentions</p>
                  <p className="text-xs text-muted-foreground">Last 24 hours</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-red-600">{sentimentData.negative}</p>
                  <p className="text-xs text-red-600 flex items-center">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -8%
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Neutral Mentions</p>
                  <p className="text-xs text-muted-foreground">Last 24 hours</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-yellow-600">{sentimentData.neutral}</p>
                  <p className="text-xs text-yellow-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +3%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}