"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Users, BarChart3, Target, AlertTriangle } from "lucide-react"

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

interface CompetitorAnalysisProps {
  mentions: BrandMention[]
  competitors: string[]
}

export function CompetitorAnalysis({ mentions, competitors }: CompetitorAnalysisProps) {
  // Filter competitor mentions
  const competitorMentions = mentions.filter((mention) => mention.isCompetitor)
  const brandMentions = mentions.filter((mention) => !mention.isCompetitor)

  // Calculate competitor stats
  const competitorStats = competitors.map((competitor) => {
    const competitorMentionsFiltered = competitorMentions.filter(
      (mention) =>
        mention.competitorBrand === competitor || mention.content.text.toLowerCase().includes(competitor.toLowerCase()),
    )

    const totalReach = competitorMentionsFiltered.reduce((sum, m) => sum + m.metrics.reach, 0)
    const totalEngagement = competitorMentionsFiltered.reduce((sum, m) => sum + m.metrics.engagement, 0)
    const averageSentiment =
      competitorMentionsFiltered.length > 0
        ? competitorMentionsFiltered.reduce((sum, m) => sum + m.sentiment.score, 0) / competitorMentionsFiltered.length
        : 0

    return {
      name: competitor,
      mentions: competitorMentionsFiltered.length,
      reach: totalReach,
      engagement: totalEngagement,
      sentiment: averageSentiment,
      shareOfVoice: mentions.length > 0 ? (competitorMentionsFiltered.length / mentions.length) * 100 : 0,
    }
  })

  // Calculate brand stats for comparison
  const brandStats = {
    mentions: brandMentions.length,
    reach: brandMentions.reduce((sum, m) => sum + m.metrics.reach, 0),
    engagement: brandMentions.reduce((sum, m) => sum + m.metrics.engagement, 0),
    sentiment:
      brandMentions.length > 0
        ? brandMentions.reduce((sum, m) => sum + m.sentiment.score, 0) / brandMentions.length
        : 0,
    shareOfVoice: mentions.length > 0 ? (brandMentions.length / mentions.length) * 100 : 0,
  }

  const getSentimentColor = (score: number) => {
    if (score > 0.3) return "text-green-600"
    if (score < -0.3) return "text-red-600"
    return "text-yellow-600"
  }

  const getSentimentBadgeVariant = (score: number) => {
    if (score > 0.3) return "default"
    if (score < -0.3) return "destructive"
    return "secondary"
  }

  const getComparisonIcon = (ourValue: number, theirValue: number) => {
    if (ourValue > theirValue) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (ourValue < theirValue) return <TrendingDown className="h-4 w-4 text-red-600" />
    return <BarChart3 className="h-4 w-4 text-yellow-600" />
  }

  return (
    <div className="space-y-6">
      {/* Competitive Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Share of Voice</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{brandStats.shareOfVoice.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Of total mentions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Competitor Mentions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{competitorMentions.length}</div>
            <p className="text-xs text-muted-foreground">This period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Sentiment</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getSentimentColor(brandStats.sentiment)}`}>
              {brandStats.sentiment.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Average sentiment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Competitive Threats</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {competitorStats.filter((c) => c.sentiment > brandStats.sentiment).length}
            </div>
            <p className="text-xs text-muted-foreground">Better sentiment</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
          <TabsTrigger value="share-of-voice">Share of Voice</TabsTrigger>
          <TabsTrigger value="threats">Competitive Threats</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Competitive Landscape</CardTitle>
              <CardDescription>How you stack up against your competitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Your Brand */}
                <div className="p-4 border-2 border-primary rounded-lg bg-primary/5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="default">Your Brand</Badge>
                      <h3 className="font-semibold">YourBrand</h3>
                    </div>
                    <Badge variant={getSentimentBadgeVariant(brandStats.sentiment)}>
                      Sentiment: {brandStats.sentiment.toFixed(2)}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Mentions</p>
                      <p className="font-semibold">{brandStats.mentions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Reach</p>
                      <p className="font-semibold">{(brandStats.reach / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Engagement</p>
                      <p className="font-semibold">{brandStats.engagement.toFixed(1)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Share of Voice</p>
                      <p className="font-semibold">{brandStats.shareOfVoice.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>

                {/* Competitors */}
                {competitorStats.map((competitor) => (
                  <div key={competitor.name} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Competitor</Badge>
                        <h3 className="font-semibold">{competitor.name}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getSentimentBadgeVariant(competitor.sentiment)}>
                          Sentiment: {competitor.sentiment.toFixed(2)}
                        </Badge>
                        {getComparisonIcon(brandStats.sentiment, competitor.sentiment)}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Mentions</p>
                        <div className="flex items-center gap-1">
                          <p className="font-semibold">{competitor.mentions.toLocaleString()}</p>
                          {getComparisonIcon(brandStats.mentions, competitor.mentions)}
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Reach</p>
                        <div className="flex items-center gap-1">
                          <p className="font-semibold">{(competitor.reach / 1000000).toFixed(1)}M</p>
                          {getComparisonIcon(brandStats.reach, competitor.reach)}
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Engagement</p>
                        <div className="flex items-center gap-1">
                          <p className="font-semibold">{competitor.engagement.toFixed(1)}</p>
                          {getComparisonIcon(brandStats.engagement, competitor.engagement)}
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Share of Voice</p>
                        <div className="flex items-center gap-1">
                          <p className="font-semibold">{competitor.shareOfVoice.toFixed(1)}%</p>
                          {getComparisonIcon(brandStats.shareOfVoice, competitor.shareOfVoice)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentiment">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Comparison</CardTitle>
              <CardDescription>How sentiment compares across brands</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">YourBrand (You)</span>
                    <span className={`font-semibold ${getSentimentColor(brandStats.sentiment)}`}>
                      {brandStats.sentiment.toFixed(2)}
                    </span>
                  </div>
                  <Progress value={((brandStats.sentiment + 1) / 2) * 100} className="h-3" />
                </div>

                {competitorStats.map((competitor) => (
                  <div key={competitor.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{competitor.name}</span>
                      <span className={`font-semibold ${getSentimentColor(competitor.sentiment)}`}>
                        {competitor.sentiment.toFixed(2)}
                      </span>
                    </div>
                    <Progress value={((competitor.sentiment + 1) / 2) * 100} className="h-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="share-of-voice">
          <Card>
            <CardHeader>
              <CardTitle>Share of Voice Analysis</CardTitle>
              <CardDescription>Market conversation distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">YourBrand (You)</span>
                    <span className="font-semibold">{brandStats.shareOfVoice.toFixed(1)}%</span>
                  </div>
                  <Progress value={brandStats.shareOfVoice} className="h-3" />
                </div>

                {competitorStats.map((competitor) => (
                  <div key={competitor.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{competitor.name}</span>
                      <span className="font-semibold">{competitor.shareOfVoice.toFixed(1)}%</span>
                    </div>
                    <Progress value={competitor.shareOfVoice} className="h-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="threats">
          <Card>
            <CardHeader>
              <CardTitle>Competitive Threats & Opportunities</CardTitle>
              <CardDescription>Areas where competitors are outperforming</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitorStats.map((competitor) => {
                  const threats = []
                  const opportunities = []

                  if (competitor.sentiment > brandStats.sentiment) {
                    threats.push("Better sentiment score")
                  } else {
                    opportunities.push("Sentiment advantage")
                  }

                  if (competitor.shareOfVoice > brandStats.shareOfVoice) {
                    threats.push("Higher share of voice")
                  } else {
                    opportunities.push("Share of voice lead")
                  }

                  if (competitor.reach > brandStats.reach) {
                    threats.push("Greater reach")
                  } else {
                    opportunities.push("Reach advantage")
                  }

                  return (
                    <div key={competitor.name} className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-3">{competitor.name}</h3>

                      {threats.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-red-600 mb-2">⚠️ Threats</h4>
                          <div className="space-y-1">
                            {threats.map((threat, index) => (
                              <Badge key={index} variant="destructive" className="mr-2 mb-1">
                                {threat}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {opportunities.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-green-600 mb-2">✅ Your Advantages</h4>
                          <div className="space-y-1">
                            {opportunities.map((opportunity, index) => (
                              <Badge key={index} variant="default" className="mr-2 mb-1">
                                {opportunity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
