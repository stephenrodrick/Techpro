"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Save, RefreshCw, Bell, Zap, Shield } from "lucide-react"

interface SystemConfig {
  alertThreshold: number
  timeWindow: number
  enableSlackNotifications: boolean
  enableEmailNotifications: boolean
  enableRealTimeProcessing: boolean
  sentimentModel: "openai" | "huggingface" | "google" | "azure"
  languages: string[]
  priorityFilters: string[]
  channelFilters: string[]
  autoEscalation: boolean
  escalationThreshold: number
}

interface ConfigurationPanelProps {
  config: SystemConfig
  onConfigChange: (config: SystemConfig) => void
}

export function ConfigurationPanel({ config, onConfigChange }: ConfigurationPanelProps) {
  const updateConfig = (key: keyof SystemConfig, value: any) => {
    onConfigChange({ ...config, [key]: value })
  }

  const saveConfiguration = async () => {
    try {
      await fetch("/api/save-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      })
      // Show success message
    } catch (error) {
      console.error("Failed to save configuration:", error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Alert Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Alert Configuration
          </CardTitle>
          <CardDescription>Configure when and how alerts are triggered</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="alertThreshold">Alert Threshold (messages)</Label>
              <Input
                id="alertThreshold"
                type="number"
                value={config.alertThreshold}
                onChange={(e) => updateConfig("alertThreshold", Number.parseInt(e.target.value))}
                min="1"
                max="50"
              />
              <p className="text-xs text-muted-foreground">
                Trigger alert when this many negative messages are received
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeWindow">Time Window (minutes)</Label>
              <Input
                id="timeWindow"
                type="number"
                value={config.timeWindow}
                onChange={(e) => updateConfig("timeWindow", Number.parseInt(e.target.value))}
                min="5"
                max="120"
              />
              <p className="text-xs text-muted-foreground">Time period to monitor for negative messages</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Slack Notifications</Label>
                <p className="text-sm text-muted-foreground">Send alerts to Slack channels</p>
              </div>
              <Switch
                checked={config.enableSlackNotifications}
                onCheckedChange={(checked) => updateConfig("enableSlackNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Send alerts via email</p>
              </div>
              <Switch
                checked={config.enableEmailNotifications}
                onCheckedChange={(checked) => updateConfig("enableEmailNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Escalation</Label>
                <p className="text-sm text-muted-foreground">Automatically escalate critical messages</p>
              </div>
              <Switch
                checked={config.autoEscalation}
                onCheckedChange={(checked) => updateConfig("autoEscalation", checked)}
              />
            </div>
          </div>

          {config.autoEscalation && (
            <div className="space-y-2">
              <Label htmlFor="escalationThreshold">Escalation Threshold</Label>
              <Input
                id="escalationThreshold"
                type="number"
                step="0.1"
                value={config.escalationThreshold}
                onChange={(e) => updateConfig("escalationThreshold", Number.parseFloat(e.target.value))}
                min="-1"
                max="0"
              />
              <p className="text-xs text-muted-foreground">
                Auto-escalate messages with sentiment score below this value
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Model Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            AI Model Configuration
          </CardTitle>
          <CardDescription>Configure sentiment analysis models and processing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sentimentModel">Primary Sentiment Model</Label>
            <Select value={config.sentimentModel} onValueChange={(value: any) => updateConfig("sentimentModel", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">
                  <div className="flex items-center gap-2">
                    OpenAI GPT-4o
                    <Badge variant="secondary">Recommended</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="huggingface">HuggingFace Transformers</SelectItem>
                <SelectItem value="google">Google Cloud Natural Language</SelectItem>
                <SelectItem value="azure">Azure Text Analytics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Real-time Processing</Label>
              <p className="text-sm text-muted-foreground">Process messages as they arrive</p>
            </div>
            <Switch
              checked={config.enableRealTimeProcessing}
              onCheckedChange={(checked) => updateConfig("enableRealTimeProcessing", checked)}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Supported Languages</Label>
            <div className="flex flex-wrap gap-2">
              {["en", "es", "fr", "de", "it", "pt", "ja", "ko", "zh"].map((lang) => (
                <Badge
                  key={lang}
                  variant={config.languages.includes(lang) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    const newLanguages = config.languages.includes(lang)
                      ? config.languages.filter((l) => l !== lang)
                      : [...config.languages, lang]
                    updateConfig("languages", newLanguages)
                  }}
                >
                  {lang.toUpperCase()}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & Privacy
          </CardTitle>
          <CardDescription>Data protection and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data Retention (days)</Label>
              <Input type="number" defaultValue="90" min="1" max="365" />
            </div>

            <div className="space-y-2">
              <Label>Encryption Level</Label>
              <Select defaultValue="aes256">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aes128">AES-128</SelectItem>
                  <SelectItem value="aes256">AES-256</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>PII Detection</Label>
                <p className="text-sm text-muted-foreground">Automatically detect and mask personal information</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>GDPR Compliance</Label>
                <p className="text-sm text-muted-foreground">Enable GDPR data protection features</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Configuration */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => window.location.reload()}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset
        </Button>
        <Button onClick={saveConfiguration}>
          <Save className="h-4 w-4 mr-2" />
          Save Configuration
        </Button>
      </div>
    </div>
  )
}
