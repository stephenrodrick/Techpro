import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, X, Zap, Shield, Users, Crown } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      icon: Zap,
      price: "$99",
      period: "per month",
      description: "Perfect for small teams getting started with sentiment analysis",
      features: [
        "Up to 10,000 messages/month",
        "3 communication channels",
        "Basic sentiment analysis",
        "Email alerts",
        "Standard support",
        "7-day data retention",
      ],
      notIncluded: ["Advanced AI models", "Custom integrations", "Priority support", "Advanced analytics"],
      popular: false,
      cta: "Start Free Trial",
    },
    {
      name: "Professional",
      icon: Users,
      price: "$299",
      period: "per month",
      description: "Ideal for growing businesses with advanced sentiment monitoring needs",
      features: [
        "Up to 100,000 messages/month",
        "All communication channels",
        "Advanced AI models (GPT-4)",
        "Real-time alerts & escalation",
        "Custom dashboards",
        "Slack & email notifications",
        "30-day data retention",
        "Priority support",
        "API access",
      ],
      notIncluded: ["Custom AI models", "Dedicated support", "SLA guarantees"],
      popular: true,
      cta: "Start Free Trial",
    },
    {
      name: "Enterprise",
      icon: Crown,
      price: "Custom",
      period: "pricing",
      description: "Tailored solution for large organizations with specific requirements",
      features: [
        "Unlimited messages",
        "All channels + custom integrations",
        "Custom AI model training",
        "Advanced analytics & reporting",
        "White-label options",
        "Dedicated account manager",
        "24/7 priority support",
        "Custom data retention",
        "SLA guarantees",
        "On-premise deployment",
        "Advanced security features",
        "Custom workflows",
      ],
      notIncluded: [],
      popular: false,
      cta: "Contact Sales",
    },
  ]

  const addOns = [
    {
      name: "Additional Messages",
      description: "Extra message processing beyond plan limits",
      price: "$0.01 per message",
    },
    {
      name: "Extended Data Retention",
      description: "Keep your data longer than standard retention",
      price: "$50/month per additional 30 days",
    },
    {
      name: "Custom AI Model Training",
      description: "Train models specific to your industry/use case",
      price: "$2,500 one-time setup",
    },
    {
      name: "Dedicated Support",
      description: "Dedicated customer success manager",
      price: "$500/month",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Simple, Transparent{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Choose the perfect plan for your business. All plans include a 14-day free trial with no credit card
              required.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.popular ? "border-blue-500 shadow-xl scale-105" : "border-gray-200"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">{plan.period}</span>
                  </div>
                  <CardDescription className="mt-4 text-base">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feature, idx) => (
                      <div key={idx} className="flex items-center opacity-50">
                        <X className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${plan.popular ? "bg-blue-500 hover:bg-blue-600" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                    asChild
                  >
                    <Link href={plan.name === "Enterprise" ? "/contact" : "/platform"}>{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Add-ons & Extensions</h2>
              <p className="text-xl text-muted-foreground">
                Enhance your plan with additional features and capabilities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addOns.map((addon, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold">{addon.name}</h3>
                      <Badge variant="secondary">{addon.price}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">{addon.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground">Everything you need to know about our pricing</p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">What happens during the free trial?</h3>
                <p className="text-muted-foreground">
                  You get full access to all Professional plan features for 14 days. No credit card required. You can
                  process up to 10,000 messages during the trial period.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll
                  prorate the billing accordingly.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">What happens if I exceed my message limit?</h3>
                <p className="text-muted-foreground">
                  We'll notify you when you're approaching your limit. You can either upgrade your plan or purchase
                  additional messages at $0.01 per message.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Do you offer annual discounts?</h3>
                <p className="text-muted-foreground">
                  Yes! Pay annually and save 20% on all plans. Enterprise customers can also negotiate custom terms for
                  multi-year agreements.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Is there a setup fee?</h3>
                <p className="text-muted-foreground">
                  No setup fees for Starter and Professional plans. Enterprise customers may have custom setup costs
                  depending on integration complexity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-6 text-white">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join hundreds of companies using techpro to improve customer satisfaction
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
                <Link href="/platform">
                  <Shield className="h-5 w-5 mr-2" />
                  Start Free Trial
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
                asChild
              >
                <Link href="/contact">Talk to Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
