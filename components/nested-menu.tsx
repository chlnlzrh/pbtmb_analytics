"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMenuState } from "@/lib/menu-state"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface NestedMenuItem {
  title: string
  href?: string
  icon?: React.ComponentType<{ className?: string }>
  items?: NestedMenuItem[]
  level?: number
}

interface NestedMenuProps {
  items: NestedMenuItem[]
  maxDepth?: number
  onItemClick?: () => void
  level?: number
}

export function NestedMenu({ 
  items, 
  maxDepth = 3, 
  onItemClick, 
  level = 0 
}: NestedMenuProps) {
  const pathname = usePathname()
  const { expandedSections, toggleSection } = useMenuState()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const getIndentClass = (currentLevel: number) => {
    const indentMap = {
      0: "",
      1: "ml-4",
      2: "ml-6", 
      3: "ml-8"
    }
    return indentMap[currentLevel as keyof typeof indentMap] || "ml-8"
  }

  return (
    <div className={cn("space-y-0.5", level > 0 && getIndentClass(level))}>
      {items.map((item) => {
        const hasChildren = item.items && item.items.length > 0 && level < maxDepth
        const isExpanded = expandedSections.includes(`${item.title}-${level}`)
        const itemKey = `${item.title}-${level}`

        if (hasChildren) {
          return (
            <Collapsible
              key={itemKey}
              open={isExpanded}
              onOpenChange={() => toggleSection(itemKey)}
            >
              <CollapsibleTrigger 
                className={cn(
                  "flex w-full items-center justify-between py-1 px-3 text-baseline transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm",
                  level === 0 
                    ? "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-400"
                )}
                aria-expanded={isExpanded}
                aria-controls={`submenu-${itemKey}`}
              >
                <div className="flex items-center space-x-2">
                  {item.icon && level === 0 && (
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span>{item.title}</span>
                </div>
                <ChevronRight 
                  className={cn(
                    "h-3 w-3 transition-transform duration-300",
                    isExpanded && "rotate-90"
                  )} 
                  aria-hidden="true" 
                />
              </CollapsibleTrigger>
              
              <CollapsibleContent 
                id={`submenu-${itemKey}`}
                role="group"
                aria-labelledby={`header-${itemKey}`}
                className="space-y-0.5"
              >
                <NestedMenu
                  items={item.items || []}
                  maxDepth={maxDepth}
                  onItemClick={onItemClick}
                  level={level + 1}
                />
              </CollapsibleContent>
            </Collapsible>
          )
        }

        // Leaf node with href
        if (item.href) {
          return (
            <Link
              key={itemKey}
              href={item.href}
              onClick={onItemClick}
              className={cn(
                "flex items-center space-x-2 py-1 px-3 text-baseline transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm",
                isActive(item.href)
                  ? "text-black dark:text-white"
                  : level === 0
                  ? "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-400"
              )}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.icon && level === 0 && (
                <item.icon className="h-4 w-4" aria-hidden="true" />
              )}
              <span>{item.title}</span>
            </Link>
          )
        }

        // Non-clickable header
        return (
          <div
            key={itemKey}
            className={cn(
              "py-1 px-3 text-baseline",
              level === 0 
                ? "text-gray-500"
                : "text-gray-400"
            )}
          >
            <div className="flex items-center space-x-2">
              {item.icon && level === 0 && (
                <item.icon className="h-4 w-4" aria-hidden="true" />
              )}
              <span>{item.title}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}