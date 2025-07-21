"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface BrandMention {
  id: string
  platform: "twitter" | "instagram" | "facebook" | "linkedin" | "tiktok" | "youtube" | "reddit" | "news"
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
    images?: string[]
    videos?: string[]
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
  keywords: string[]
  hashtags: string[]
  mentions: string[]
  timestamp: Date
  location?: string
  language: string
  brandRelevance: number
  viralPotential: number
  isCompetitor: boolean
  competitorBrand?: string
  priority: "low" | "medium" | "high" | "critical"
  category: "product" | "service" | "brand" | "campaign" | "crisis" | "opportunity"
}

interface BrandSentimentChartProps {
  mentions: BrandMention[]
}

export function BrandSentimentChart({ mentions }: BrandSentimentChartProps) {
  // Group mentions by hour for trend analysis
  const hourlyData = mentions.reduce((acc, mention) => {
    const hour = new Date(mention.timestamp).getHours()
    const key = `${hour}:00`
    
    if (!acc[key]) {
      acc[key] = {
        time: key,
        hour,
        positive: 0,
        negative: 0,
        neutral: 0,
        total: 0,
        avgSentiment: 0,
        sentimentSum: 0
      }
    }
    
    acc[key].total += 1
    acc[key].sentimentSum += mention.sentiment.score
    
    if (mention.sentiment.score > 0.1) {
      acc[key].positive += 1
    } else if (mention.sentiment.score < -0.1) {
      acc[key].negative += 1
    } else {
      acc[key].neutral += 1
    }
    
    return acc
  }, {} as Record<string, any>)

  // Calculate average sentiment for each hour
  Object.values(hourlyData).forEach((data: any) => {
    data.avgSentiment = data.total > 0 ? data.sentimentSum / data.total : 0
  })

  const chartData = Object.values(hourlyData)
    .sort((a: any, b: any) => a.hour - b.hour)
    .map((data: any) => ({
      ...data,
      avgSentiment: Number(data.avgSentiment.toFixed(3))
    }))

  // Overall sentiment stats
  const totalMentions = mentions.length
  const positiveMentions = mentions.filter(m => m.sentiment.score > 0.1).length
  const negativeMentions = mentions.filter(m => m.sentiment.score < -0.1).length
  const neutralMentions = mentions.filter(m => Math.abs(m.sentiment.score) <= 0.1).length
  
  const averageSentiment = totalMentions > 0 
    ? mentions.reduce((sum, m) => sum + m.sentiment.score, 0) / totalMentions 
    : 0

  const sentimentTrend = chartData.length > 1 
    ? chartData[chartData.length - 1].avgSentiment - chartData[0].avgSentiment
    : 0

  const getSentimentColor = (score: number) => {
    if (score > 0.3) return "text-green-600"
    if (score < -0.3) return "text-red-600"
    return "text-yellow-600"
  }

  const getSentimentIcon = (trend: number) => {
    if (trend > 0.1) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (trend < -0.1) return <TrendingDown className="h-4 w-4 text-red-600" />
    return <Minus className="h-4 w-4 text-yellow-600" />
  }

  const formatTooltip = (value: any, name: string) => {
    if (name === 'avgSentiment') {
      return [value.toFixed(3), 'Average Sentiment']
    }
    return [value, name]
  }

  return (
    <div className="space-y-6">
      {/* Sentiment Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Positive</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{positiveMentions}</div>
            <p className="text-xs text-muted-foreground">
              {totalMentions > 0 ? ((positiveMentions / totalMentions) * 100).toFixed(1) : 0}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Negative</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{negativeMentions}</div>
            <p className="text-xs text-muted-foreground">
              {totalMentions > 0 ? ((negativeMentions / totalMentions) * 100).toFixed(1) : 0}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Neutral</CardTitle>
            <Minus className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{neutralMentions}</div>
            <p className="text-xs text-muted-foreground">
              {totalMentions > 0 ? ((neutralMentions / totalMentions) * 100).toFixed(1) : 0}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average</CardTitle>
            {getSentimentIcon(sentimentTrend)}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getSentimentColor(averageSentiment)}`}>
              {averageSentiment.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Trend: {sentimentTrend > 0 ? '+' : ''}{sentimentTrend.toFixed(3)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sentiment Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sentiment Trend Over Time</CardTitle>
          <CardDescription>
            Average sentiment score by hour (range: -1 to +1)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[-1, 1]} />
              <Tooltip formatter={formatTooltip} />
              <Area 
                type="monotone" 
                dataKey="avgSentiment" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.3}
                name="Average Sentiment"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Sentiment Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Hourly Sentiment Distribution</CardTitle>
          <CardDescription>Positive, negative, and neutral mentions by hour</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="positive" 
                stroke="#22c55e" 
                strokeWidth={2}
                name="Positive"
              />
              <Line 
                type="monotone" 
                dataKey="negative" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Negative"
              />
              <Line 
                type="monotone" 
                dataKey="neutral" 
                stroke="#eab308" 
                strokeWidth={2}
                name="Neutral"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Sentiment Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Sentiment Insights</CardTitle>
          <CardDescription>Key observations from sentiment analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Overall Brand Health</p>
                <p className="text-sm text-muted-foreground">
                  Based on average sentiment score
                </p>
              </div>
              <Badge 
                variant={averageSentiment > 0.3 ? "default" : averageSentiment < -0.3 ? "destructive" : "secondary"}
                className="text-lg px-3 py-1"
              >
                {averageSentiment > 0.3 ? "Healthy" : averageSentiment < -0.3 ? "At Risk" : "Neutral"}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Sentiment Trend</p>
                <p className="text-sm text-muted-foreground">
                  Change over the monitored period
                </p>
              </div>
              <div className="flex items-center\
