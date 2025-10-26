"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BarChart3, 
  DollarSign, 
  Cog, 
  Users, 
  ShoppingCart, 
  Briefcase, 
  Shield, 
  Smartphone, 
  TrendingUp,
  FileText,
  Settings,
  ChevronRight,
  Menu
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  items?: {
    title: string
    href: string
  }[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: BarChart3,
  },
  {
    title: "Financial Performance",
    href: "/financial",
    icon: DollarSign,
    items: [
      { title: "Revenue & Sales", href: "/financial/revenue" },
      { title: "Profitability & Margins", href: "/financial/profitability" },
      { title: "India-Specific Financial", href: "/financial/india-specific" },
    ]
  },
  {
    title: "Operational Efficiency",
    href: "/operational",
    icon: Cog,
    items: [
      { title: "Service & Capacity", href: "/operational/service" },
      { title: "Labor Productivity", href: "/operational/productivity" },
      { title: "Inventory & Assets", href: "/operational/inventory" },
      { title: "Order Accuracy & Waste", href: "/operational/accuracy" },
    ]
  },
  {
    title: "Customer Experience",
    href: "/customer",
    icon: Users,
    items: [
      { title: "Acquisition & Traffic", href: "/customer/acquisition" },
      { title: "Retention & Loyalty", href: "/customer/retention" },
      { title: "Satisfaction & Reputation", href: "/customer/satisfaction" },
    ]
  },
  {
    title: "Food Cost & Inventory",
    href: "/food-cost",
    icon: ShoppingCart,
    items: [
      { title: "Cost Metrics", href: "/food-cost/metrics" },
      { title: "Variance & Yield", href: "/food-cost/variance" },
      { title: "Inventory Optimization", href: "/food-cost/optimization" },
      { title: "Supplier Performance", href: "/food-cost/suppliers" },
    ]
  },
  {
    title: "Labor Management",
    href: "/labor",
    icon: Briefcase,
    items: [
      { title: "Cost & Productivity", href: "/labor/productivity" },
      { title: "Workforce Stability", href: "/labor/stability" },
      { title: "Staffing & Training", href: "/labor/training" },
    ]
  },
  {
    title: "Quality & Compliance",
    href: "/quality",
    icon: Shield,
    items: [
      { title: "Food Safety & Hygiene", href: "/quality/safety" },
      { title: "Operational Compliance", href: "/quality/compliance" },
    ]
  },
  {
    title: "Digital & Aggregator",
    href: "/digital",
    icon: Smartphone,
    items: [
      { title: "Digital Channel Mix", href: "/digital/channels" },
      { title: "Aggregator Operations", href: "/digital/aggregator" },
      { title: "Marketing Performance", href: "/digital/marketing" },
    ]
  },
  {
    title: "Comparative Analytics",
    href: "/comparative",
    icon: TrendingUp,
    items: [
      { title: "Location Performance", href: "/comparative/locations" },
      { title: "Item & Menu Analytics", href: "/comparative/menu" },
      { title: "Operational Consistency", href: "/comparative/consistency" },
      { title: "Best Practice ID", href: "/comparative/best-practices" },
    ]
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
    items: [
      { title: "Pre-built Templates", href: "/reports/templates" },
      { title: "Custom Report Builder", href: "/reports/builder" },
      { title: "Scheduled Exports", href: "/reports/exports" },
    ]
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    items: [
      { title: "Data Configuration", href: "/settings/data" },
      { title: "KPI Definitions", href: "/settings/kpi" },
      { title: "User Permissions", href: "/settings/users" },
    ]
  },
]

interface SidebarContentProps {
  onItemClick?: () => void
}

function SidebarContent({ onItemClick }: SidebarContentProps) {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = React.useState<string[]>([])

  const toggleSection = (title: string) => {
    setExpandedSections(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <div className="space-y-0.5 py-2">
      {navItems.map((item) => {
        const isItemActive = isActive(item.href)
        const isExpanded = expandedSections.includes(item.title)
        
        if (item.items) {
          return (
            <Collapsible
              key={item.title}
              open={isExpanded}
              onOpenChange={() => toggleSection(item.title)}
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between py-1 px-3 text-baseline text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
                <div className="flex items-center space-x-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </div>
                <ChevronRight className={cn(
                  "h-3 w-3 transition-transform duration-300",
                  isExpanded && "rotate-90"
                )} />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-0.5 ml-6">
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    onClick={onItemClick}
                    className={cn(
                      "block py-1 px-3 text-baseline transition-colors duration-300",
                      isActive(subItem.href)
                        ? "text-black dark:text-white"
                        : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    )}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          )
        }

        return (
          <Link
            key={item.title}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "flex items-center space-x-2 py-1 px-3 text-baseline transition-colors duration-300",
              isItemActive
                ? "text-black dark:text-white"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        )
      })}
    </div>
  )
}

export function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow pt-5 bg-background border-r overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-baseline">PetPooja Analytics</h1>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              <SidebarContent />
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-ring">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center flex-shrink-0 px-4 py-5">
                <h1 className="text-baseline">PetPooja Analytics</h1>
              </div>
              <div className="flex-grow overflow-y-auto">
                <nav className="px-2 space-y-1">
                  <SidebarContent onItemClick={() => {
                    // Close the sheet when an item is clicked
                    const closeButton = document.querySelector('[data-state="open"] button[aria-label="Close"]') as HTMLButtonElement
                    closeButton?.click()
                  }} />
                </nav>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}