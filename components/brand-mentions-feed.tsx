"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Share, MessageSquare, Eye, ExternalLink, Flame, Star } from "lucide-react"

interface BrandMention {
  id: string
  platform: string
  author: {
    username: string
    displayName: string
    followers: number
    verified: boolean
    profileImage: string
    influencerTier: string
  }
  content: {
    text: string
    url: string
    images?: string[]
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
    emotion: string
    confidence: number
  }
  hashtags: string[]
  timestamp: Date
  viralPotential: number
  priority: string
  category: string
}

interface BrandMentionsFeedProps {
  mentions: BrandMention[]
  isLive?: boolean
}

export function BrandMentionsFeed({ mentions, isLive = false }: BrandMentionsFeedProps) {
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
    if (score > 0.3) return "text-green-600 border-green-200 bg-green-50"
    if (score < -0.3) return "text-red-600 border-red-200 bg-red-50"
    return "text-yellow-600 border-yellow-200 bg-yellow-50"
  }

  const getInfluencerTierColor = (tier: string) => {
    const colors = {
      nano: "bg-gray-100 text-gray-800",
      micro: "bg-blue-100 text-blue-800",
      macro: "bg-purple-100 text-purple-800",
      mega: "bg-orange-100 text-orange-800",
      celebrity: "bg-red-100 text-red-800",
    }
    return colors[tier as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            Brand Mentions Feed
            {isLive && (
              <Badge variant="default" className="animate-pulse">
                LIVE
              </Badge>
            )}
          </span>
          <Badge variant="outline">{mentions.length} mentions</Badge>
        </CardTitle>
        <CardDescription>Real-time brand mentions across all social media platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {mentions.slice(0, 20).map((mention) => (
            <div
              key={mention.id}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-all duration-200 hover:shadow-md"
            >
              {/* Author Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm">
                    {mention.author.displayName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{mention.author.displayName}</p>
                      {mention.author.verified && (
                        <Badge variant="secondary" className="text-xs px-1 py-0">
                          ✓
                        </Badge>
                      )}
                      <Badge className={`text-xs px-2 py-0 ${getInfluencerTierColor(mention.author.influencerTier)}`}>
                        {mention.author.influencerTier}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      @{mention.author.username} • {mention.author.followers.toLocaleString()} followers
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getPlatformIcon(mention.platform)}</span>
                  <Badge variant={mention.priority === "critical" ? "destructive" : "outline"} className="text-xs">
                    {mention.priority}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="mb-3">
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{mention.content.text}</p>
                {mention.content.images && mention.content.images.length > 0 && (
                  <div className="mt-2 flex gap-2">
                    {mention.content.images.map((image, index) => (
                      <img
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt="Post content"
                        className="w-16 h-16 rounded-lg object-cover border"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Metrics */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1 hover:text-red-500 transition-colors">
                    <Heart className="h-4 w-4" />
                    {mention.metrics.likes.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                    <Share className="h-4 w-4" />
                    {mention.metrics.shares.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 hover:text-green-500 transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    {mention.metrics.comments.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 hover:text-purple-500 transition-colors">
                    <Eye className="h-4 w-4" />
                    {mention.metrics.views.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={`text-xs ${getSentimentColor(mention.sentiment.score)}`}>
                    {mention.sentiment.emotion} ({mention.sentiment.score.toFixed(2)})
                  </Badge>
                  {mention.viralPotential > 0.7 && (
                    <Badge variant="destructive" className="animate-pulse text-xs">
                      <Flame className="h-3 w-3 mr-1" />
                      Viral
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">{mention.timestamp.toLocaleTimeString()}</span>
                </div>
              </div>

              {/* Hashtags and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {mention.hashtags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs px-2 py-0">
                      {tag}
                    </Badge>
                  ))}
                  {mention.hashtags.length > 3 && (
                    <Badge variant="outline" className="text-xs px-2 py-0">
                      +{mention.hashtags.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  {mention.author.influencerTier !== "nano" && (
                    <Button variant="ghost" size="sm" className="h-7 px-2">
                      <Star className="h-3 w-3 mr-1" />
                      Track
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {mentions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No brand mentions found</p>
              <p className="text-sm">Start monitoring to see real-time mentions</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
