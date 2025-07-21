"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Star, Users, TrendingUp, Heart, MessageCircle, Share, Eye } from "lucide-react"

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

interface InfluencerTrackerProps {
  mentions: BrandMention[]
}

export function InfluencerTracker({ mentions }: InfluencerTrackerProps) {
  // Group mentions by influencer
  const influencerMentions = mentions.filter(
    (mention) =>
      mention.author.influencerTier === "micro" ||
      mention.author.influencerTier === "macro" ||
      mention.author.influencerTier === "mega" ||
      mention.author.influencerTier === "celebrity",
  )

  const influencerStats = influencerMentions.reduce(
    (acc, mention) => {
      const key = mention.author.username
      if (!acc[key]) {
        acc[key] = {
          author: mention.author,
          mentions: [],
          totalReach: 0,
          totalEngagement: 0,
          averageSentiment: 0,
          platforms: new Set<string>(),
        }
      }
      acc[key].mentions.push(mention)
      acc[key].totalReach += mention.metrics.reach
      acc[key].totalEngagement += mention.metrics.engagement
      acc[key].platforms.add(mention.platform)
      return acc
    },
    {} as Record<string, any>,
  )

  // Calculate average sentiment for each influencer
  Object.keys(influencerStats).forEach((key) => {
    const stats = influencerStats[key]
    stats.averageSentiment =
      stats.mentions.reduce((sum: number, m: BrandMention) => sum + m.sentiment.score, 0) / stats.mentions.length
  })

  // Sort by total reach
  const topInfluencers = Object.values(influencerStats)
    .sort((a: any, b: any) => b.totalReach - a.totalReach)
    .slice(0, 10)

  const getTierColor = (tier: string) => {
    const colors = {
      nano: "bg-gray-100 text-gray-800",
      micro: "bg-blue-100 text-blue-800",
      macro: "bg-purple-100 text-purple-800",
      mega: "bg-orange-100 text-orange-800",
      celebrity: "bg-red-100 text-red-800",
    }
    return colors[tier as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getSentimentColor = (score: number) => {
    if (score > 0.3) return "text-green-600"
    if (score < -0.3) return "text-red-600"
    return "text-yellow-600"
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

  return (
    <div className="space-y-6">
      {/* Influencer Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Influencers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(influencerStats).length}</div>
            <p className="text-xs text-muted-foreground">Active this period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                Object.values(influencerStats).reduce((sum: number, stats: any) => sum + stats.totalReach, 0) / 1000000
              ).toFixed(1)}
              M
            </div>
            <p className="text-xs text-muted-foreground">Combined reach</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Sentiment</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.keys(influencerStats).length > 0
                ? (
                    Object.values(influencerStats).reduce(
                      (sum: number, stats: any) => sum + stats.averageSentiment,
                      0,
                    ) / Object.keys(influencerStats).length
                  ).toFixed(2)
                : "0.00"}
            </div>
            <p className="text-xs text-muted-foreground">Overall sentiment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Tier</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                influencerMentions.filter(
                  (m) => m.author.influencerTier === "mega" || m.author.influencerTier === "celebrity",
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">Mega/Celebrity mentions</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Influencers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Top Influencers by Reach
          </CardTitle>
          <CardDescription>Influencers with the highest combined reach mentioning your brand</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topInfluencers.map((influencer: any, index) => (
              <div key={influencer.author.username} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={influencer.author.profileImage || "/placeholder.svg"}
                        alt={influencer.author.displayName}
                      />
                      <AvatarFallback>{influencer.author.displayName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{influencer.author.displayName}</p>
                      {influencer.author.verified && <Badge variant="secondary">✓</Badge>}
                      <Badge className={getTierColor(influencer.author.influencerTier)}>
                        {influencer.author.influencerTier}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      @{influencer.author.username} • {influencer.author.followers.toLocaleString()} followers
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{influencer.mentions.length} mentions</span>
                      <span>Reach: {(influencer.totalReach / 1000000).toFixed(1)}M</span>
                      <span className={getSentimentColor(influencer.averageSentiment)}>
                        Sentiment: {influencer.averageSentiment.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {Array.from(influencer.platforms).map((platform: string) => (
                      <span key={platform} className="text-sm">
                        {getPlatformIcon(platform)}
                      </span>
                    ))}
                  </div>
                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Heart className="h-3 w-3" />
                      {influencer.mentions
                        .reduce((sum: number, m: BrandMention) => sum + m.metrics.likes, 0)
                        .toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Share className="h-3 w-3" />
                      {influencer.mentions
                        .reduce((sum: number, m: BrandMention) => sum + m.metrics.shares, 0)
                        .toLocaleString()}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Influencer Tier Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Influencer Tier Distribution</CardTitle>
          <CardDescription>Breakdown of mentions by influencer tier</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["celebrity", "mega", "macro", "micro"].map((tier) => {
              const tierMentions = influencerMentions.filter((m) => m.author.influencerTier === tier)
              const percentage =
                influencerMentions.length > 0 ? (tierMentions.length / influencerMentions.length) * 100 : 0

              return (
                <div key={tier} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getTierColor(tier)}>{tier.charAt(0).toUpperCase() + tier.slice(1)}</Badge>
                      <span className="text-sm text-muted-foreground">{tierMentions.length} mentions</span>
                    </div>
                    <span className="text-sm font-medium">{percentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Influencer Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Influencer Activity</CardTitle>
          <CardDescription>Latest mentions from top-tier influencers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {influencerMentions
              .filter((m) => m.author.influencerTier === "mega" || m.author.influencerTier === "celebrity")
              .slice(0, 5)
              .map((mention) => (
                <div key={mention.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={mention.author.profileImage || "/placeholder.svg"}
                          alt={mention.author.displayName}
                        />
                        <AvatarFallback>{mention.author.displayName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{mention.author.displayName}</p>
                          {mention.author.verified && (
                            <Badge variant="secondary" className="text-xs">
                              ✓
                            </Badge>
                          )}
                          <Badge className={`${getTierColor(mention.author.influencerTier)} text-xs`}>
                            {mention.author.influencerTier}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {mention.author.followers.toLocaleString()} followers
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{getPlatformIcon(mention.platform)}</span>
                      <Badge
                        variant="outline"
                        className={`${getSentimentColor(mention.sentiment.score)} border-current text-xs`}
                      >
                        {mention.sentiment.emotion}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm mb-2">{mention.content.text}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {mention.metrics.likes.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share className="h-3 w-3" />
                        {mention.metrics.shares.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {mention.metrics.comments.toLocaleString()}
                      </span>
                    </div>
                    <span>{mention.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
