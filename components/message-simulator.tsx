"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Send, Zap, User, MessageCircle, Mail, Phone, Ticket, Share2 } from "lucide-react"

interface MessageSimulatorProps {
  onMessageGenerated: (message: any) => void
}

export function MessageSimulator({ onMessageGenerated }: MessageSimulatorProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    customerId: "",
    channel: "email",
    message: "",
    customerTier: "silver",
    priority: "medium",
  })

  const [isGenerating, setIsGenerating] = useState(false)

  const sampleMessages = [
    {
      category: "Angry Customer",
      message:
        "I'm absolutely furious! Your billing system charged me twice for the same subscription. This is the third time this has happened and I'm considering canceling my account entirely. I need this resolved immediately!",
      priority: "critical",
    },
    {
      category: "Happy Customer",
      message:
        "Thank you so much for the quick response yesterday! The technical team resolved my login issue within 30 minutes. Your customer service is outstanding and I really appreciate the professionalism.",
      priority: "low",
    },
    {
      category: "Confused Customer",
      message:
        "I'm having trouble understanding how to set up the new dashboard feature. The documentation seems incomplete and I can't find a clear step-by-step guide. Could someone please help me with this?",
      priority: "medium",
    },
    {
      category: "Frustrated Customer",
      message:
        "This is completely unacceptable! I've been waiting in your chat queue for over 2 hours with no response. I'm a premium customer and expect better service. I want to speak with a manager right now!",
      priority: "critical",
    },
    {
      category: "Satisfied Customer",
      message:
        "The new mobile app update is fantastic! The interface is much more intuitive and the performance improvements are noticeable. Great work on this release!",
      priority: "low",
    },
    {
      category: "Technical Issue",
      message:
        "My account keeps getting locked out every time I try to log in from my office computer. This is affecting my daily work and I need a permanent solution, not just a temporary password reset.",
      priority: "high",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    const mockMessage = {
      id: Math.random().toString(36).substr(2, 9),
      customerName: formData.customerName || "Test Customer",
      customerId: formData.customerId || `CUST-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      channel: formData.channel as "email" | "chat" | "ticket" | "social" | "phone",
      message: formData.message,
      priority: formData.priority as "low" | "medium" | "high" | "critical",
      timestamp: new Date(),
      language: "en",
      customerTier: formData.customerTier as "bronze" | "silver" | "gold" | "platinum",
      previousInteractions: Math.floor(Math.random() * 10) + 1,
      escalated: formData.priority === "critical" && Math.random() > 0.7,
      tags: generateTags(formData.message),
    }

    // Simulate processing delay
    setTimeout(() => {
      onMessageGenerated(mockMessage)
      setIsGenerating(false)

      // Reset form
      setFormData({
        customerName: "",
        customerId: "",
        channel: "email",
        message: "",
        customerTier: "silver",
        priority: "medium",
      })
    }, 1000)
  }

  const generateTags = (message: string): string[] => {
    const tags: string[] = []
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("billing") || lowerMessage.includes("charge")) tags.push("billing")
    if (lowerMessage.includes("login") || lowerMessage.includes("account")) tags.push("login")
    if (lowerMessage.includes("technical") || lowerMessage.includes("bug")) tags.push("technical")
    if (lowerMessage.includes("cancel") || lowerMessage.includes("refund")) tags.push("cancellation")
    if (lowerMessage.includes("thank") || lowerMessage.includes("great")) tags.push("praise")
    if (lowerMessage.includes("help") || lowerMessage.includes("support")) tags.push("support-request")
    if (lowerMessage.includes("urgent") || lowerMessage.includes("immediately")) tags.push("urgent")
    if (lowerMessage.includes("manager") || lowerMessage.includes("escalate")) tags.push("escalation")

    return tags.length > 0 ? tags : ["general"]
  }

  const loadSampleMessage = (sample: (typeof sampleMessages)[0]) => {
    setFormData((prev) => ({
      ...prev,
      message: sample.message,
      priority: sample.priority,
    }))
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "chat":
        return <MessageCircle className="h-4 w-4" />
      case "ticket":
        return <Ticket className="h-4 w-4" />
      case "phone":
        return <Phone className="h-4 w-4" />
      case "social":
        return <Share2 className="h-4 w-4" />
      default:
        return <MessageCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Message Simulator Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Message Simulator
          </CardTitle>
          <CardDescription>
            Test the sentiment analysis system with custom messages or use sample scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  placeholder="John Doe"
                  value={formData.customerName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, customerName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerId">Customer ID</Label>
                <Input
                  id="customerId"
                  placeholder="CUST-123456"
                  value={formData.customerId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, customerId: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="channel">Channel</Label>
                <Select
                  value={formData.channel}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, channel: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </div>
                    </SelectItem>
                    <SelectItem value="chat">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Live Chat
                      </div>
                    </SelectItem>
                    <SelectItem value="ticket">
                      <div className="flex items-center gap-2">
                        <Ticket className="h-4 w-4" />
                        Support Ticket
                      </div>
                    </SelectItem>
                    <SelectItem value="phone">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Call
                      </div>
                    </SelectItem>
                    <SelectItem value="social">
                      <div className="flex items-center gap-2">
                        <Share2 className="h-4 w-4" />
                        Social Media
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerTier">Customer Tier</Label>
                <Select
                  value={formData.customerTier}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, customerTier: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bronze">Bronze</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="platinum">Platinum</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Customer Message</Label>
              <Textarea
                id="message"
                rows={4}
                placeholder="Enter the customer message to analyze..."
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isGenerating || !formData.message.trim()}>
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Analyze Message
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Sample Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Sample Messages
          </CardTitle>
          <CardDescription>Click on any sample to load it into the simulator</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sampleMessages.map((sample, index) => (
              <div key={index}>
                <div
                  className="border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => loadSampleMessage(sample)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{sample.category}</Badge>
                    <Badge
                      variant={
                        sample.priority === "critical"
                          ? "destructive"
                          : sample.priority === "high"
                            ? "destructive"
                            : sample.priority === "medium"
                              ? "secondary"
                              : "outline"
                      }
                    >
                      {sample.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">{sample.message}</p>
                </div>
                {index < sampleMessages.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
