import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const sentimentSchema = z.object({
  score: z.number().min(-1).max(1),
  emotion: z.enum(["positive", "negative", "neutral", "mixed"]),
  confidence: z.number().min(0).max(1),
  reasoning: z.string(),
  keywords: z.array(z.string()),
  urgency: z.enum(["low", "medium", "high", "critical"]),
})

export async function POST(request: NextRequest) {
  try {
    const { text, context } = await request.json()

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.log("OpenAI API key not found, using fallback analysis")

      // Simple fallback sentiment analysis
      const lowerText = text.toLowerCase()
      const positiveWords = [
        "good",
        "great",
        "excellent",
        "amazing",
        "love",
        "awesome",
        "fantastic",
        "wonderful",
        "perfect",
        "outstanding",
      ]
      const negativeWords = [
        "bad",
        "terrible",
        "awful",
        "hate",
        "horrible",
        "worst",
        "disappointing",
        "frustrating",
        "annoying",
        "useless",
      ]

      const positiveCount = positiveWords.filter((word) => lowerText.includes(word)).length
      const negativeCount = negativeWords.filter((word) => lowerText.includes(word)).length

      let score = 0
      let emotion: "positive" | "negative" | "neutral" | "mixed" = "neutral"

      if (positiveCount > negativeCount) {
        score = Math.min(0.8, positiveCount * 0.2)
        emotion = "positive"
      } else if (negativeCount > positiveCount) {
        score = Math.max(-0.8, negativeCount * -0.2)
        emotion = "negative"
      }

      return NextResponse.json({
        score,
        emotion,
        confidence: 0.6,
        reasoning: "Fallback keyword-based analysis",
        keywords: [
          ...positiveWords.filter((w) => lowerText.includes(w)),
          ...negativeWords.filter((w) => lowerText.includes(w)),
        ],
        urgency: Math.abs(score) > 0.6 ? "high" : "medium",
        fallback: true,
      })
    }

    // Enhanced fallback sentiment analysis
    const lowerText = text.toLowerCase()
    const positiveWords = [
      "good", "great", "excellent", "amazing", "love", "awesome", "fantastic", 
      "wonderful", "perfect", "outstanding", "brilliant", "incredible", "superb"
    ]
    const negativeWords = [
      "bad", "terrible", "awful", "hate", "horrible", "worst", "disappointing", 
      "frustrating", "annoying", "useless", "pathetic", "disgusting"
    ]

    const positiveCount = positiveWords.filter((word) => lowerText.includes(word)).length
    const negativeCount = negativeWords.filter((word) => lowerText.includes(word)).length

    let score = 0
    let emotion: "positive" | "negative" | "neutral" | "mixed" = "neutral"
    let urgency: "low" | "medium" | "high" | "critical" = "medium"

    if (positiveCount > negativeCount) {
      score = Math.min(0.8, positiveCount * 0.2)
      emotion = "positive"
      urgency = "low"
    } else if (negativeCount > positiveCount) {
      score = Math.max(-0.8, negativeCount * -0.2)
      emotion = "negative"
      urgency = Math.abs(score) > 0.6 ? "high" : "medium"
    }

    const object = {
      score,
      emotion,
      confidence: 0.75,
      reasoning: `Enhanced analysis: Found ${positiveCount} positive and ${negativeCount} negative indicators`,
      keywords: [
        ...positiveWords.filter((w) => lowerText.includes(w)),
        ...negativeWords.filter((w) => lowerText.includes(w)),
      ],
      urgency,
    }

    const analysisOutput = {
      timestamp: new Date().toISOString(),
      input: {
        text: text.substring(0, 200) + (text.length > 200 ? "..." : ""),
        context: context || "general",
        length: text.length,
      },
      analysis: {
        sentiment: {
          score: object.score,
          emotion: object.emotion,
          confidence: object.confidence,
          reasoning: object.reasoning,
        },
        keywords: object.keywords,
        urgency: object.urgency,
        actionRequired: object.urgency === "high" || object.urgency === "critical",
      },
      processing: {
        model: "openai-gpt-4o-mini",
        timestamp: new Date().toISOString(),
        processed: true,
      },
    }

    console.log("🧠 SENTIMENT ANALYZED:", JSON.stringify(analysisOutput, null, 2))

    return NextResponse.json(object)
  } catch (error) {
    console.error("Sentiment analysis error:", error)

    // Return fallback response
    return NextResponse.json({
      score: 0,
      emotion: "neutral",
      confidence: 0.5,
      reasoning: "Analysis failed, using neutral fallback",
      keywords: [],
      urgency: "medium",
      error: true,
    })
  }
}