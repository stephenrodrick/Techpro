"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

interface SentimentMessage {
  id: string
  sentimentScore: number
  timestamp: Date
}

interface SentimentChartProps {
  messages: SentimentMessage[]
}

export function SentimentChart({ messages }: SentimentChartProps) {
  // Group messages by hour and calculate average sentiment
  const hourlyData = messages.reduce(
    (acc, message) => {
      const hour = new Date(message.timestamp).getHours()
      const key = `${hour}:00`

      if (!acc[key]) {
        acc[key] = { time: key, scores: [], average: 0 }
      }

      acc[key].scores.push(message.sentimentScore)
      acc[key].average = acc[key].scores.reduce((sum, score) => sum + score, 0) / acc[key].scores.length

      return acc
    },
    {} as Record<string, { time: string; scores: number[]; average: number }>,
  )

  const chartData = Object.values(hourlyData)
    .sort((a, b) => Number.parseInt(a.time) - Number.parseInt(b.time))
    .slice(-12) // Last 12 hours

  const chartConfig = {
    sentiment: {
      label: "Average Sentiment",
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Sentiment Trend</CardTitle>
        <CardDescription>Average sentiment score over the last 12 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="time" tickLine={false} axisLine={false} className="text-xs" />
              <YAxis domain={[-1, 1]} tickLine={false} axisLine={false} className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="average"
                stroke="var(--color-sentiment)"
                strokeWidth={2}
                dot={{ fill: "var(--color-sentiment)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
