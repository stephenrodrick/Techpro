"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Users, MessageCircle, Share, Eye, Heart } from "lucide-react"

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

interface SocialMediaMetricsProps {
  mentions: BrandMention[]
}

export function SocialMediaMetrics({ mentions }: SocialMediaMetricsProps) {
  // Platform distribution
  const platformData = mentions.reduce(
    (acc, mention) => {
      acc[mention.platform] = (acc[mention.platform] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const platformChartData = Object.entries(platformData).map(([platform, count]) => ({
    platform: platform.charAt(0).toUpperCase() + platform.slice(1),
    mentions: count,
    percentage: mentions.length > 0 ? (count / mentions.length) * 100 : 0,
  }))

  // Engagement metrics by platform
  const engagementByPlatform = mentions.reduce(
    (acc, mention) => {
      if (!acc[mention.platform]) {
        acc[mention.platform] = {
          platform: mention.platform,
          totalLikes: 0,
          totalShares: 0,
          totalComments: 0,
          totalViews: 0,
          totalReach: 0,
          count: 0,
        }
      }
      acc[mention.platform].totalLikes += mention.metrics.likes
      acc[mention.platform].totalShares += mention.metrics.shares
      acc[mention.platform].totalComments += mention.metrics.comments
      acc[mention.platform].totalViews += mention.metrics.views
      acc[mention.platform].totalReach += mention.metrics.reach
      acc[mention.platform].count += 1
      return acc
    },
    {} as Record<string, any>,
  )

  const engagementChartData = Object.values(engagementByPlatform).map((data: any) => ({
    platform: data.platform.charAt(0).toUpperCase() + data.platform.slice(1),
    avgLikes: Math.round(data.totalLikes / data.count),
    avgShares: Math.round(data.totalShares / data.count),
    avgComments: Math.round(data.totalComments / data.count),
    avgViews: Math.round(data.totalViews / data.count),
    totalReach: data.totalReach,
  }))

  // Total metrics
  const totalMetrics = mentions.reduce(
    (acc, mention) => ({
      likes: acc.likes + mention.metrics.likes,
      shares: acc.shares + mention.metrics.shares,
      comments: acc.comments + mention.metrics.comments,
      views: acc.views + mention.metrics.views,
      reach: acc.reach + mention.metrics.reach,
    }),
    { likes: 0, shares: 0, comments: 0, views: 0, reach: 0 },
  )

  // Platform colors for charts
  const platformColors = {
    Twitter: "#1DA1F2",
    Instagram: "#E4405F",
    Facebook: "#1877F2",
    LinkedIn: "#0A66C2",
    TikTok: "#000000",
    YouTube: "#FF0000",
    Reddit: "#FF4500",
    News: "#6B7280",
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
    return icons[platform.toLowerCase() as keyof typeof icons] || "🌐"
  }

  return (
    <div className="space-y-6">
      {/* Overall Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMetrics.likes.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
            <Share className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMetrics.shares.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMetrics.comments.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalMetrics.views / 1000000).toFixed(1)}M</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalMetrics.reach / 1000000).toFixed(1)}M</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Distribution</CardTitle>
            <CardDescription>Mentions across social media platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platformChartData.map((data) => (
                <div key={data.platform} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getPlatformIcon(data.platform.toLowerCase())}</span>
                      <span className="font-medium">{data.platform}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{data.mentions} mentions</span>
                      <span className="font-semibold">{data.percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                  <Progress value={data.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Engagement by Platform */}
        <Card>
          <CardHeader>
            <CardTitle>Average Engagement by Platform</CardTitle>
            <CardDescription>Average likes, shares, and comments per mention</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagementChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgLikes" fill="#8884d8" name="Avg Likes" />
                <Bar dataKey="avgShares" fill="#82ca9d" name="Avg Shares" />
                <Bar dataKey="avgComments" fill="#ffc658" name="Avg Comments" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Platform Performance Details */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Performance Details</CardTitle>
          <CardDescription>Detailed metrics breakdown by platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {engagementChartData.map((platform) => (
              <div key={platform.platform} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getPlatformIcon(platform.platform.toLowerCase())}</span>
                    <h3 className="font-semibold">{platform.platform}</h3>
                    <Badge variant="outline">
                      {platformChartData.find((p) => p.platform === platform.platform)?.mentions || 0} mentions
                    </Badge>
                  </div>
                  <Badge variant="secondary">{(platform.totalReach / 1000000).toFixed(1)}M total reach</Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="font-medium">Avg Likes</span>
                    </div>
                    <p className="text-lg font-bold">{platform.avgLikes.toLocaleString()}</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Share className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Avg Shares</span>
                    </div>
                    <p className="text-lg font-bold">{platform.avgShares.toLocaleString()}</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <MessageCircle className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Avg Comments</span>
                    </div>
                    <p className="text-lg font-bold">{platform.avgComments.toLocaleString()}</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Eye className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">Avg Views</span>
                    </div>
                    <p className="text-lg font-bold">{platform.avgViews.toLocaleString()}</p>
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
