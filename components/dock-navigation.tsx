"use client"

import type React from "react"

import { Home, Search, Plus, Brain } from "lucide-react"
import "./dock.css"

export type DockItemData = {
  icon: React.ReactNode
  label: React.ReactNode
  onClick: () => void
  className?: string
  badge?: React.ReactNode
}

type DockItemProps = {
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

function DockItem({ children, className = "", onClick }: DockItemProps) {
  return (
    <div onClick={onClick} className={`dock-item ${className}`} tabIndex={0} role="button" aria-haspopup="true">
      {children}
    </div>
  )
}

type DockLabelProps = {
  className?: string
  children: React.ReactNode
}

function DockLabel({ children, className = "" }: DockLabelProps) {
  return (
    <div className={`dock-label ${className}`} role="tooltip">
      {children}
    </div>
  )
}

type DockIconProps = {
  className?: string
  children: React.ReactNode
  badge?: React.ReactNode
}

function DockIcon({ children, className = "", badge }: DockIconProps) {
  return (
    <div className={`dock-icon ${className}`}>
      {children}
      {badge && <div className="new-badge">{badge}</div>}
    </div>
  )
}

export type DockProps = {
  items: DockItemData[]
  className?: string
}

export default function Dock({ items, className = "" }: DockProps) {
  return (
    <div className="dock-outer">
      <div className={`dock-panel ${className}`} role="toolbar" aria-label="Application dock">
        {items.map((item, index) => (
          <DockItem key={index} onClick={item.onClick} className={item.className}>
            <DockIcon badge={item.badge}>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </div>
    </div>
  )
}

interface DockNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function DockNavigation({ activeTab, onTabChange }: DockNavigationProps) {
  const dockItems: DockItemData[] = [
    {
      icon: <Home className="h-5 w-5" />,
      label: "Home",
      onClick: () => onTabChange("home"),
      className: activeTab === "home" ? "active" : "",
    },
    {
      icon: <Search className="h-5 w-5" />,
      label: "Explore Tools",
      onClick: () => onTabChange("explore"),
      className: activeTab === "explore" ? "active" : "",
      badge: "New",
    },
    {
      icon: <Plus className="h-5 w-5" />,
      label: "Suggest A Tool",
      onClick: () => onTabChange("suggest-tool"),
      className: activeTab === "suggest-tool" ? "active" : "",
    },
    {
      icon: <Brain className="h-5 w-5" />,
      label: "AI Assistant",
      onClick: () => onTabChange("ai-assistant"),
      className: activeTab === "ai-assistant" ? "active" : "",
      badge: "AI",
    },
  ]

  return <Dock items={dockItems} />
}
