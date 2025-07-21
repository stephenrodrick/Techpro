"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
  Building,
  Globe,
  Linkedin,
  Twitter,
  Github,
  CheckCircle,
  AlertCircle,
  Star,
  Award,
  GraduationCap,
} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    inquiryType: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSubmitStatus("success")
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
        inquiryType: "",
      })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Ready to transform your brand monitoring? Our team is here to help you get started with Sentiment Watchdog
              Pro.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                  Send us a Message
                </CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent>
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
                    <CheckCircle className="h-5 w-5" />
                    <span>Thank you! Your message has been sent successfully.</span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
                    <AlertCircle className="h-5 w-5" />
                    <span>Sorry, there was an error sending your message. Please try again.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        placeholder="Your company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select
                        value={formData.inquiryType}
                        onValueChange={(value) => handleInputChange("inquiryType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sales">Sales Inquiry</SelectItem>
                          <SelectItem value="demo">Request Demo</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="media">Media & Press</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Brief description of your inquiry"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us more about your needs, current challenges, or questions..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information & Team */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-purple-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">hello@sentimentwatchdog.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">Chennai, Tamil Nadu, India</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri: 9:00 AM - 6:00 PM IST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  Meet Our Team
                </CardTitle>
                <CardDescription>The minds behind techpro</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Stephen */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                    S
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">Stephen</h3>
                      <Badge variant="secondary" className="text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        Co-Founder
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      <GraduationCap className="h-4 w-4 inline mr-1" />
                      SRM Institute of Science and Technology
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      AI/ML Engineer specializing in sentiment analysis and natural language processing. Passionate
                      about building intelligent systems that help businesses understand their customers better.
                    </p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Linkedin className="h-4 w-4 mr-1" />
                        LinkedIn
                      </Button>
                      <Button variant="outline" size="sm">
                        <Github className="h-4 w-4 mr-1" />
                        GitHub
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Swati */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                    S
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">Swati</h3>
                      <Badge variant="secondary" className="text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        Co-Founder
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      <GraduationCap className="h-4 w-4 inline mr-1" />
                      SRM Institute of Science and Technology
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Full-stack developer and product strategist with expertise in building scalable web applications.
                      Focused on creating intuitive user experiences and robust backend systems.
                    </p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Linkedin className="h-4 w-4 mr-1" />
                        LinkedIn
                      </Button>
                      <Button variant="outline" size="sm">
                        <Twitter className="h-4 w-4 mr-1" />
                        Twitter
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-purple-600" />
                  Why Choose Us?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Response Time</span>
                  <Badge variant="outline">{"< 24 hours"}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Customer Satisfaction</span>
                  <Badge variant="outline">98%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Uptime Guarantee</span>
                  <Badge variant="outline">99.9%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Processing</span>
                  <Badge variant="outline">Real-time</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-600" />
                  Follow Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Twitter className="h-4 w-4 mr-1" />
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Linkedin className="h-4 w-4 mr-1" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm">
                    <Github className="h-4 w-4 mr-1" />
                    GitHub
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions about techpro</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">How quickly can I get started?</h3>
                    <p className="text-sm text-muted-foreground">
                      You can be up and running in under 15 minutes. Our setup process is streamlined and we provide
                      comprehensive onboarding support.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">What platforms do you monitor?</h3>
                    <p className="text-sm text-muted-foreground">
                      We monitor Twitter, Instagram, Facebook, LinkedIn, TikTok, YouTube, Reddit, and major news sites
                      for comprehensive brand coverage.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Do you offer custom integrations?</h3>
                    <p className="text-sm text-muted-foreground">
                      Yes! We can integrate with your existing CRM, Slack, Microsoft Teams, and other business tools to
                      fit your workflow.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Is my data secure?</h3>
                    <p className="text-sm text-muted-foreground">
                      Absolutely. We use enterprise-grade encryption, comply with GDPR and SOC 2 standards, and never
                      share your data with third parties.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Can I try before I buy?</h3>
                    <p className="text-sm text-muted-foreground">
                      Yes! We offer a 14-day free trial with full access to all features. No credit card required to get
                      started.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">What kind of support do you provide?</h3>
                    <p className="text-sm text-muted-foreground">
                      We provide 24/7 email support, live chat during business hours, and dedicated account management
                      for enterprise customers.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
