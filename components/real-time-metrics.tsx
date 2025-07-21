"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Zap, Target, Clock, Users } from "lucide-react"

interface RealTimeMetricsProps {
  stats: {
    customerSatisfaction: number
    escalationRate: number
    processingRate: number
    accuracyScore: number
    responseTime: number
    activeAgents: number
  }
}

export function RealTimeMetrics({ stats }: RealTimeMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-emerald-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
          <TrendingUp className="h-4 w-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-700 mb-2">{stats.customerSatisfaction.toFixed(1)}%</div>
          <Progress value={stats.customerSatisfaction} className="h-2 mb-2" />
          <div className="flex items-center justify-between text-xs">
            <span className="text-emerald-600">Excellent</span>
            <Badge variant="secondary" className="text-emerald-700">
              +2.3%
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Escalation Rate</CardTitle>
          <TrendingDown className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-700 mb-2">{stats.escalationRate.toFixed(1)}%</div>
          <Progress value={stats.escalationRate} className="h-2 mb-2" />
          <div className="flex items-center justify-between text-xs">
            <span className="text-orange-600">Target: &lt;5%</span>
            <Badge variant="secondary" className="text-orange-700">
              -0.8%
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-cyan-50 to-cyan-100 dark:from-cyan-950 dark:to-cyan-900 border-cyan-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Processing Rate</CardTitle>
          <Zap className="h-4 w-4 text-cyan-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-cyan-700 mb-2">{stats.processingRate.toFixed(1)}%</div>
          <Progress value={stats.processingRate} className="h-2 mb-2" />
          <div className="flex items-center justify-between text-xs">
            <span className="text-cyan-600">Real-time</span>
            <Badge variant="secondary" className="text-cyan-700">
              Optimal
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-violet-50 to-violet-100 dark:from-violet-950 dark:to-violet-900 border-violet-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">AI Accuracy Score</CardTitle>
          <Target className="h-4 w-4 text-violet-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-violet-700 mb-2">{(stats.accuracyScore * 100).toFixed(1)}%</div>
          <Progress value={stats.accuracyScore * 100} className="h-2 mb-2" />
          <div className="flex items-center justify-between text-xs">
            <span className="text-violet-600">ML Model</span>
            <Badge variant="secondary" className="text-violet-700">
              High
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-rose-50 to-rose-100 dark:from-rose-950 dark:to-rose-900 border-rose-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
          <Clock className="h-4 w-4 text-rose-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-rose-700 mb-2">{stats.responseTime.toFixed(1)}m</div>
          <Progress value={Math.max(0, 100 - stats.responseTime * 10)} className="h-2 mb-2" />
          <div className="flex items-center justify-between text-xs">
            <span className="text-rose-600">Target: &lt;5m</span>
            <Badge variant="secondary" className="text-rose-700">
              Good
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-950 dark:to-teal-900 border-teal-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Agent Utilization</CardTitle>
          <Users className="h-4 w-4 text-teal-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-teal-700 mb-2">{stats.activeAgents}/24</div>
          <Progress value={(stats.activeAgents / 24) * 100} className="h-2 mb-2" />
          <div className="flex items-center justify-between text-xs">
            <span className="text-teal-600">Online now</span>
            <Badge variant="secondary" className="text-teal-700">
              Active
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
