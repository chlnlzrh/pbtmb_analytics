"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"

interface MenuItem {
  title: string
  href: string
  category: string
  keywords?: string[]
}

const menuItems: MenuItem[] = [
  // Dashboard
  { title: "Dashboard", href: "/", category: "Main", keywords: ["home", "overview", "summary"] },
  
  // Financial Performance
  { title: "Revenue & Sales", href: "/financial/revenue", category: "Financial", keywords: ["sales", "income", "money"] },
  { title: "Profitability & Margins", href: "/financial/profitability", category: "Financial", keywords: ["profit", "margin", "ebitda"] },
  { title: "India-Specific Financial", href: "/financial/india-specific", category: "Financial", keywords: ["gst", "tax", "aggregator"] },
  
  // Operational Efficiency
  { title: "Service & Capacity", href: "/operational/service", category: "Operations", keywords: ["table", "seating", "capacity"] },
  { title: "Labor Productivity", href: "/operational/productivity", category: "Operations", keywords: ["staff", "efficiency", "labor"] },
  { title: "Inventory & Assets", href: "/operational/inventory", category: "Operations", keywords: ["stock", "assets", "equipment"] },
  { title: "Order Accuracy & Waste", href: "/operational/accuracy", category: "Operations", keywords: ["errors", "waste", "quality"] },
  
  // Customer Experience
  { title: "Acquisition & Traffic", href: "/customer/acquisition", category: "Customer", keywords: ["new customers", "marketing", "cac"] },
  { title: "Retention & Loyalty", href: "/customer/retention", category: "Customer", keywords: ["repeat", "loyalty", "clv"] },
  { title: "Satisfaction & Reputation", href: "/customer/satisfaction", category: "Customer", keywords: ["reviews", "nps", "ratings"] },
  
  // Food Cost & Inventory
  { title: "Cost Metrics", href: "/food-cost/metrics", category: "Food Cost", keywords: ["cogs", "food cost", "beverage"] },
  { title: "Variance & Yield", href: "/food-cost/variance", category: "Food Cost", keywords: ["portion", "recipe", "yield"] },
  { title: "Inventory Optimization", href: "/food-cost/optimization", category: "Food Cost", keywords: ["stock", "turnover", "par level"] },
  { title: "Supplier Performance", href: "/food-cost/suppliers", category: "Food Cost", keywords: ["vendors", "otif", "quality"] },
  
  // Labor Management
  { title: "Cost & Productivity", href: "/labor/productivity", category: "Labor", keywords: ["wages", "productivity", "efficiency"] },
  { title: "Workforce Stability", href: "/labor/stability", category: "Labor", keywords: ["turnover", "retention", "tenure"] },
  { title: "Staffing & Training", href: "/labor/training", category: "Labor", keywords: ["training", "certification", "skills"] },
  
  // Quality & Compliance
  { title: "Food Safety & Hygiene", href: "/quality/safety", category: "Quality", keywords: ["fssai", "hygiene", "safety"] },
  { title: "Operational Compliance", href: "/quality/compliance", category: "Quality", keywords: ["gst", "license", "legal"] },
  
  // Digital & Aggregator
  { title: "Digital Channel Mix", href: "/digital/channels", category: "Digital", keywords: ["online", "app", "website"] },
  { title: "Aggregator Operations", href: "/digital/aggregator", category: "Digital", keywords: ["zomato", "swiggy", "delivery"] },
  { title: "Marketing Performance", href: "/digital/marketing", category: "Digital", keywords: ["campaigns", "roi", "social"] },
  
  // Comparative Analytics
  { title: "Location Performance", href: "/comparative/locations", category: "Analytics", keywords: ["locations", "variance", "comparison"] },
  { title: "Item & Menu Analytics", href: "/comparative/menu", category: "Analytics", keywords: ["menu", "items", "contribution"] },
  { title: "Operational Consistency", href: "/comparative/consistency", category: "Analytics", keywords: ["consistency", "standards", "gaps"] },
  { title: "Best Practice ID", href: "/comparative/best-practices", category: "Analytics", keywords: ["best practices", "optimization", "outliers"] },
  
  // Reports & Settings
  { title: "Pre-built Templates", href: "/reports/templates", category: "Reports", keywords: ["templates", "reports", "export"] },
  { title: "Custom Report Builder", href: "/reports/builder", category: "Reports", keywords: ["custom", "builder", "create"] },
  { title: "Scheduled Exports", href: "/reports/exports", category: "Reports", keywords: ["schedule", "automation", "export"] },
  { title: "Data Configuration", href: "/settings/data", category: "Settings", keywords: ["data", "sync", "config"] },
  { title: "KPI Definitions", href: "/settings/kpi", category: "Settings", keywords: ["kpi", "formulas", "metrics"] },
  { title: "User Permissions", href: "/settings/users", category: "Settings", keywords: ["users", "permissions", "access"] },
]

interface MenuSearchProps {
  onItemSelect?: (href: string) => void
}

export function MenuSearch({ onItemSelect }: MenuSearchProps) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 relative h-8 w-full justify-start rounded-md bg-white dark:bg-gray-900 text-xs font-normal text-gray-500 dark:text-gray-400 shadow-sm"
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search menu...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search menu items..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {["Main", "Financial", "Operations", "Customer", "Food Cost", "Labor", "Quality", "Digital", "Analytics", "Reports", "Settings"].map((category) => {
            const categoryItems = menuItems.filter(item => item.category === category)
            if (categoryItems.length === 0) return null
            
            return (
              <CommandGroup key={category} heading={category}>
                {categoryItems.map((item) => (
                  <CommandItem
                    key={item.href}
                    value={`${item.title} ${item.keywords?.join(" ") || ""}`}
                    onSelect={() => {
                      runCommand(() => {
                        router.push(item.href as any)
                        onItemSelect?.(item.href)
                      })
                    }}
                  >
                    <div className="flex items-center">
                      <span>{item.title}</span>
                    </div>
                    <CommandShortcut>{item.category}</CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}