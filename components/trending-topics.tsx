"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Hash, TrendingUp, Flame, MessageCircle } from "lucide-react"

interface BrandMention {
  id: string
  platform: string
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
  viralPotential: number
}

interface TrendingTopicsProps {
  mentions: BrandMention[]
}

export function TrendingTopics({ mentions }: TrendingTopicsProps) {
  // Extract and analyze hashtags
  const hashtagAnalysis = mentions.reduce(
    (acc, mention) => {
      mention.hashtags.forEach((hashtag) => {
        if (!acc[hashtag]) {
          acc[hashtag] = {
            hashtag,
            count: 0,
            totalEngagement: 0,
            totalReach: 0,
            averageSentiment: 0,
            sentimentSum: 0,
            platforms: new Set(),
            mentions: [],
            viralPot: 0,
          }
        }

        acc[hashtag].count += 1
        acc[hashtag].totalEngagement += mention.metrics.likes + mention.metrics.shares + mention.metrics.comments
        acc[hashtag].totalReach += mention.metrics.reach
        acc[hashtag].sentimentSum += mention.sentiment.score
        acc[hashtag].platforms.add(mention.platform)
        acc[hashtag].mentions.push(mention)
        acc[hashtag].viralPot += mention.viralPotential
      })
      return acc
    },
    {} as Record<string, any>,
  )

  // Calculate averages and trending scores
  const trendingHashtags = Object.values(hashtagAnalysis)
    .map((tag: any) => ({
      ...tag,
      averageSentiment: tag.sentimentSum / tag.count,
      averageViralPotential: tag.viralPot / tag.count,
      platformCount: tag.platforms.size,
      trendingScore:
        tag.count * 0.4 + tag.totalEngagement * 0.0001 + tag.averageViralPotential * 100 * 0.3 + tag.platformCount * 10,
    }))
    .sort((a, b) => b.trendingScore - a.trendingScore)
    .slice(0, 10)

  // Extract and analyze keywords
  const keywordAnalysis = mentions.reduce(
    (acc, mention) => {
      mention.keywords.forEach((keyword) => {
        if (!acc[keyword]) {
          acc[keyword] = {
            keyword,
            count: 0,
            totalEngagement: 0,
            averageSentiment: 0,
            sentimentSum: 0,
            mentions: [],
          }
        }

        acc[keyword].count += 1
        acc[keyword].totalEngagement += mention.metrics.likes + mention.metrics.shares + mention.metrics.comments
        acc[keyword].sentimentSum += mention.sentiment.score
        acc[keyword].mentions.push(mention)
      })
      return acc
    },
    {} as Record<string, any>,
  )

  const trendingKeywords = Object.values(keywordAnalysis)
    .map((keyword: any) => ({
      ...keyword,
      averageSentiment: keyword.sentimentSum / keyword.count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)

  // Analyze viral content
  const viralContent = mentions
    .filter((mention) => mention.viralPotential > 0.7)
    .sort((a, b) => b.viralPotential - a.viralPotential)
    .slice(0, 5)

  // Emerging topics (recent mentions with high engagement)
  const recentMentions = mentions.filter((m) => {
    const hourAgo = new Date(Date.now() - 60 * 60 * 1000)
    return new Date(m.timestamp) > hourAgo
  })

  const emergingTopics = recentMentions
    .filter((m) => m.metrics.engagement > 5 || m.viralPotential > 0.6)
    .sort((a, b) => b.metrics.engagement - a.metrics.engagement)
    .slice(0, 3)

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
      {/* Trending Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trending Hashtags</CardTitle>
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trendingHashtags.length}</div>
            <p className="text-xs text-muted-foreground">Active hashtags</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Viral Content</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{viralContent.length}</div>
            <p className="text-xs text-muted-foreground">High viral potential</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emerging Topics</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emergingTopics.length}</div>
            <p className="text-xs text-muted-foreground">Recent high engagement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Keywords</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trendingKeywords.length}</div>
            <p className="text-xs text-muted-foreground">Popular keywords</p>
          </CardContent>
        </Card>
      </div>

      {/* Trending Hashtags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Trending Hashtags
          </CardTitle>
          <CardDescription>Most popular hashtags in brand mentions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trendingHashtags.map((tag, index) => (
              <div
                key={tag.hashtag}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    #{index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{tag.hashtag}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{tag.count} mentions</span>
                      <span>{tag.totalEngagement.toLocaleString()} engagement</span>
                      <span>{tag.platformCount} platforms</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-semibold">Score: {tag.trendingScore.toFixed(0)}</div>
                    <Badge variant="outline" className={`${getSentimentColor(tag.averageSentiment)} border-current`}>
                      {tag.averageSentiment.toFixed(2)}
                    </Badge>
                  </div>
                  {tag.averageViralPotential > 0.7 && (
                    <Badge variant="destructive" className="animate-pulse">
                      <Flame className="h-3 w-3 mr-1" />
                      Hot
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Viral Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5" />
              Viral Content
            </CardTitle>
            <CardDescription>Content with highest viral potential</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {viralContent.map((mention, index) => (
                <div key={mention.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{mention.author.displayName}</p>
                          {mention.author.verified && <Badge variant="secondary">✓</Badge>}
                          <span className="text-lg">{getPlatformIcon(mention.platform)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {mention.author.followers.toLocaleString()} followers
                        </p>
                      </div>
                    </div>
                    <Badge variant="destructive" className="animate-pulse">
                      {(mention.viralPotential * 100).toFixed(0)}% viral
                    </Badge>
                  </div>

                  <p className="text-sm mb-3 leading-relaxed">
                    {mention.content.text.substring(0, 150)}
                    {mention.content.text.length > 150 && "..."}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{mention.metrics.likes.toLocaleString()} likes</span>
                      <span>{mention.metrics.shares.toLocaleString()} shares</span>
                      <span>{mention.metrics.comments.toLocaleString()} comments</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{mention.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emerging Topics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Emerging Topics
            </CardTitle>
            <CardDescription>Recent high-engagement mentions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emergingTopics.map((mention, index) => (
                <div key={mention.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{mention.author.displayName}</p>
                          <span className="text-lg">{getPlatformIcon(mention.platform)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {mention.author.followers.toLocaleString()} followers
                        </p>
                      </div>
                    </div>
                    <Badge variant="default">{mention.metrics.engagement.toFixed(1)}% engagement</Badge>
                  </div>

                  <p className="text-sm mb-3 leading-relaxed">
                    {mention.content.text.substring(0, 120)}
                    {mention.content.text.length > 120 && "..."}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {mention.hashtags.slice(0, 3).map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(mention.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Keywords */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Keywords</CardTitle>
          <CardDescription>Most frequently mentioned keywords in brand discussions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trendingKeywords.map((keyword, index) => (
              <div key={keyword.keyword} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded flex items-center justify-center text-white font-bold text-xs">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">{keyword.keyword}</h4>
                    <p className="text-sm text-muted-foreground">
                      {keyword.count} mentions • {keyword.totalEngagement.toLocaleString()} engagement
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className={`${getSentimentColor(keyword.averageSentiment)} border-current`}>
                  {keyword.averageSentiment.toFixed(2)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
