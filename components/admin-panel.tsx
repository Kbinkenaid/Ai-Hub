"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Settings, Eye, Save, RefreshCw, Download, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Orb from "@/components/orb"

export interface OrbConfig {
  id: string
  name: string
  hue: number
  hoverIntensity: number
  rotateOnHover: boolean
  forceHoverState: boolean
  enabled: boolean
  position: {
    top?: string
    left?: string
    right?: string
    bottom?: string
  }
  size: {
    width: number
    height: number
  }
  opacity: number
  zIndex: number
}

export interface OrbSettings {
  hero: OrbConfig
  floating1: OrbConfig
  floating2: OrbConfig
  stats: OrbConfig
  cards: {
    enabled: boolean
    hoverIntensity: number
    rotateOnHover: boolean
  }
  featured: {
    enabled: boolean
    hoverIntensity: number
    rotateOnHover: boolean
  }
  global: {
    performanceMode: boolean
    showOnMobile: boolean
    animationSpeed: number
  }
}

const defaultOrbSettings: OrbSettings = {
  hero: {
    id: "hero",
    name: "Hero Orb",
    hue: 240,
    hoverIntensity: 0.3,
    rotateOnHover: true,
    forceHoverState: true,
    enabled: true,
    position: { top: "50%", right: "10%" },
    size: { width: 400, height: 400 },
    opacity: 1,
    zIndex: 1,
  },
  floating1: {
    id: "floating1",
    name: "Floating Orb 1",
    hue: 120,
    hoverIntensity: 0.1,
    rotateOnHover: false,
    forceHoverState: true,
    enabled: true,
    position: { top: "20%", left: "5%" },
    size: { width: 200, height: 200 },
    opacity: 0.6,
    zIndex: 0,
  },
  floating2: {
    id: "floating2",
    name: "Floating Orb 2",
    hue: 300,
    hoverIntensity: 0.1,
    rotateOnHover: false,
    forceHoverState: true,
    enabled: true,
    position: { bottom: "20%", right: "5%" },
    size: { width: 200, height: 200 },
    opacity: 0.6,
    zIndex: 0,
  },
  stats: {
    id: "stats",
    name: "Stats Orb",
    hue: 270,
    hoverIntensity: 0.2,
    rotateOnHover: false,
    forceHoverState: true,
    enabled: true,
    position: { top: "50%", left: "50%" },
    size: { width: 150, height: 150 },
    opacity: 0.3,
    zIndex: 0,
  },
  cards: {
    enabled: true,
    hoverIntensity: 0.4,
    rotateOnHover: true,
  },
  featured: {
    enabled: true,
    hoverIntensity: 0.5,
    rotateOnHover: true,
  },
  global: {
    performanceMode: false,
    showOnMobile: false,
    animationSpeed: 1,
  },
}

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
  onSettingsChange: (settings: OrbSettings) => void
  currentSettings: OrbSettings
}

export function AdminPanel({ isOpen, onClose, onSettingsChange, currentSettings }: AdminPanelProps) {
  const [settings, setSettings] = useState<OrbSettings>(currentSettings)
  const [previewOrb, setPreviewOrb] = useState<OrbConfig>(settings.hero)
  const [activeTab, setActiveTab] = useState("individual")

  useEffect(() => {
    setSettings(currentSettings)
  }, [currentSettings])

  const updateOrbConfig = (orbId: keyof OrbSettings, updates: Partial<OrbConfig>) => {
    if (orbId === "cards" || orbId === "featured" || orbId === "global") return

    setSettings((prev) => ({
      ...prev,
      [orbId]: {
        ...prev[orbId],
        ...updates,
      },
    }))
  }

  const updateCardSettings = (updates: Partial<OrbSettings["cards"]>) => {
    setSettings((prev) => ({
      ...prev,
      cards: {
        ...prev.cards,
        ...updates,
      },
    }))
  }

  const updateFeaturedSettings = (updates: Partial<OrbSettings["featured"]>) => {
    setSettings((prev) => ({
      ...prev,
      featured: {
        ...prev.featured,
        ...updates,
      },
    }))
  }

  const updateGlobalSettings = (updates: Partial<OrbSettings["global"]>) => {
    setSettings((prev) => ({
      ...prev,
      global: {
        ...prev.global,
        ...updates,
      },
    }))
  }

  const handleSave = () => {
    onSettingsChange(settings)
    localStorage.setItem("orbSettings", JSON.stringify(settings))
  }

  const handleReset = () => {
    setSettings(defaultOrbSettings)
    onSettingsChange(defaultOrbSettings)
    localStorage.removeItem("orbSettings")
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(settings, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "orb-settings.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedSettings = JSON.parse(e.target?.result as string)
        setSettings(importedSettings)
        onSettingsChange(importedSettings)
      } catch (error) {
        console.error("Failed to import settings:", error)
      }
    }
    reader.readAsText(file)
  }

  const colorPresets = [
    { name: "Cybersecurity Blue", hue: 240 },
    { name: "Threat Red", hue: 0 },
    { name: "Secure Green", hue: 120 },
    { name: "Warning Orange", hue: 30 },
    { name: "AI Purple", hue: 280 },
    { name: "Network Cyan", hue: 180 },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Orb Configuration Panel
            </CardTitle>
            <CardDescription>Customize orb colors, behaviors, and positioning</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <label>
              <Button variant="outline" size="sm" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </span>
              </Button>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              ×
            </Button>
          </div>
        </CardHeader>

        <CardContent className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="individual">Individual Orbs</TabsTrigger>
              <TabsTrigger value="groups">Group Settings</TabsTrigger>
              <TabsTrigger value="global">Global Settings</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="individual" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {(["hero", "floating1", "floating2", "stats"] as const).map((orbId) => {
                  const orb = settings[orbId]
                  return (
                    <Card key={orbId}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {orb.name}
                          <Switch
                            checked={orb.enabled}
                            onCheckedChange={(enabled) => updateOrbConfig(orbId, { enabled })}
                          />
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>Color Hue: {orb.hue}°</Label>
                          <Slider
                            value={[orb.hue]}
                            onValueChange={([hue]) => updateOrbConfig(orbId, { hue })}
                            max={360}
                            step={1}
                            className="mt-2"
                          />
                          <div className="flex flex-wrap gap-1 mt-2">
                            {colorPresets.map((preset) => (
                              <Button
                                key={preset.name}
                                variant="outline"
                                size="sm"
                                onClick={() => updateOrbConfig(orbId, { hue: preset.hue })}
                                className="text-xs"
                              >
                                {preset.name}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label>Hover Intensity: {orb.hoverIntensity}</Label>
                          <Slider
                            value={[orb.hoverIntensity]}
                            onValueChange={([hoverIntensity]) => updateOrbConfig(orbId, { hoverIntensity })}
                            max={1}
                            step={0.1}
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label>Opacity: {orb.opacity}</Label>
                          <Slider
                            value={[orb.opacity]}
                            onValueChange={([opacity]) => updateOrbConfig(orbId, { opacity })}
                            max={1}
                            step={0.1}
                            className="mt-2"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Width: {orb.size.width}px</Label>
                            <Slider
                              value={[orb.size.width]}
                              onValueChange={([width]) => updateOrbConfig(orbId, { size: { ...orb.size, width } })}
                              min={50}
                              max={500}
                              step={10}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label>Height: {orb.size.height}px</Label>
                            <Slider
                              value={[orb.size.height]}
                              onValueChange={([height]) => updateOrbConfig(orbId, { size: { ...orb.size, height } })}
                              min={50}
                              max={500}
                              step={10}
                              className="mt-2"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Label>Rotate on Hover</Label>
                          <Switch
                            checked={orb.rotateOnHover}
                            onCheckedChange={(rotateOnHover) => updateOrbConfig(orbId, { rotateOnHover })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label>Force Hover State</Label>
                          <Switch
                            checked={orb.forceHoverState}
                            onCheckedChange={(forceHoverState) => updateOrbConfig(orbId, { forceHoverState })}
                          />
                        </div>

                        <Button variant="outline" size="sm" onClick={() => setPreviewOrb(orb)} className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview This Orb
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="groups" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Card Orbs
                      <Switch
                        checked={settings.cards.enabled}
                        onCheckedChange={(enabled) => updateCardSettings({ enabled })}
                      />
                    </CardTitle>
                    <CardDescription>Orbs that appear on trending tool cards</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Hover Intensity: {settings.cards.hoverIntensity}</Label>
                      <Slider
                        value={[settings.cards.hoverIntensity]}
                        onValueChange={([hoverIntensity]) => updateCardSettings({ hoverIntensity })}
                        max={1}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Rotate on Hover</Label>
                      <Switch
                        checked={settings.cards.rotateOnHover}
                        onCheckedChange={(rotateOnHover) => updateCardSettings({ rotateOnHover })}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Featured Orbs
                      <Switch
                        checked={settings.featured.enabled}
                        onCheckedChange={(enabled) => updateFeaturedSettings({ enabled })}
                      />
                    </CardTitle>
                    <CardDescription>Orbs that appear on featured tool cards</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Hover Intensity: {settings.featured.hoverIntensity}</Label>
                      <Slider
                        value={[settings.featured.hoverIntensity]}
                        onValueChange={([hoverIntensity]) => updateFeaturedSettings({ hoverIntensity })}
                        max={1}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Rotate on Hover</Label>
                      <Switch
                        checked={settings.featured.rotateOnHover}
                        onCheckedChange={(rotateOnHover) => updateFeaturedSettings({ rotateOnHover })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="global" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Global Orb Settings</CardTitle>
                  <CardDescription>Settings that affect all orbs across the site</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Animation Speed: {settings.global.animationSpeed}x</Label>
                    <Slider
                      value={[settings.global.animationSpeed]}
                      onValueChange={([animationSpeed]) => updateGlobalSettings({ animationSpeed })}
                      min={0.1}
                      max={3}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Performance Mode</Label>
                      <p className="text-sm text-muted-foreground">Reduces orb quality for better performance</p>
                    </div>
                    <Switch
                      checked={settings.global.performanceMode}
                      onCheckedChange={(performanceMode) => updateGlobalSettings({ performanceMode })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show on Mobile</Label>
                      <p className="text-sm text-muted-foreground">Display orbs on mobile devices</p>
                    </div>
                    <Switch
                      checked={settings.global.showOnMobile}
                      onCheckedChange={(showOnMobile) => updateGlobalSettings({ showOnMobile })}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Orb Preview</CardTitle>
                  <CardDescription>Preview the selected orb configuration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <Label>Select Orb to Preview</Label>
                      <Select
                        value={previewOrb.id}
                        onValueChange={(value) => {
                          const orb = settings[value as keyof OrbSettings] as OrbConfig
                          if (orb) setPreviewOrb(orb)
                        }}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hero">Hero Orb</SelectItem>
                          <SelectItem value="floating1">Floating Orb 1</SelectItem>
                          <SelectItem value="floating2">Floating Orb 2</SelectItem>
                          <SelectItem value="stats">Stats Orb</SelectItem>
                        </SelectContent>
                      </Select>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Hue: {previewOrb.hue}°</Badge>
                          <Badge variant="outline">Intensity: {previewOrb.hoverIntensity}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            Size: {previewOrb.size.width}×{previewOrb.size.height}
                          </Badge>
                          <Badge variant="outline">Opacity: {previewOrb.opacity}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          {previewOrb.rotateOnHover && <Badge>Rotate on Hover</Badge>}
                          {previewOrb.forceHoverState && <Badge>Force Hover</Badge>}
                          {previewOrb.enabled && <Badge variant="secondary">Enabled</Badge>}
                        </div>
                      </div>
                    </div>

                    <div className="relative bg-gradient-to-br from-background to-muted rounded-lg p-8 min-h-[300px] flex items-center justify-center">
                      <div
                        className="relative"
                        style={{
                          width: Math.min(previewOrb.size.width, 200),
                          height: Math.min(previewOrb.size.height, 200),
                          opacity: previewOrb.opacity,
                        }}
                      >
                        <Orb
                          hue={previewOrb.hue}
                          hoverIntensity={previewOrb.hoverIntensity}
                          rotateOnHover={previewOrb.rotateOnHover}
                          forceHoverState={previewOrb.forceHoverState}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
