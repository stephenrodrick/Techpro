"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface SentimentMessage {
  emotion: "anger" | "frustration" | "confusion" | "joy" | "satisfaction" | "neutral"
}

interface EmotionPieChartProps {
  messages: SentimentMessage[]
}

export function EmotionPieChart({ messages }: EmotionPieChartProps) {
  const emotionCounts = messages.reduce(
    (acc, message) => {
      acc[message.emotion] = (acc[message.emotion] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const chartData = Object.entries(emotionCounts).map(([emotion, count]) => ({
    emotion,
    count,
    percentage: ((count / messages.length) * 100).toFixed(1),
  }))

  const COLORS = {
    anger: "#ef4444",
    frustration: "#f97316",
    confusion: "#eab308",
    joy: "#22c55e",
    satisfaction: "#3b82f6",
    neutral: "#6b7280",
  }

  const chartConfig = {
    count: {
      label: "Messages",
    },
    anger: {
      label: "Anger",
      color: COLORS.anger,
    },
    frustration: {
      label: "Frustration",
      color: COLORS.frustration,
    },
    confusion: {
      label: "Confusion",
      color: COLORS.confusion,
    },
    joy: {
      label: "Joy",
      color: COLORS.joy,
    },
    satisfaction: {
      label: "Satisfaction",
      color: COLORS.satisfaction,
    },
    neutral: {
      label: "Neutral",
      color: COLORS.neutral,
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Emotion Distribution</CardTitle>
        <CardDescription>Frequency of detected emotions in customer messages</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ emotion, percentage }) => `${emotion}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.emotion as keyof typeof COLORS]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
