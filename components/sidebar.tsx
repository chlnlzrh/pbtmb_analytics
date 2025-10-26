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
import { useMenuState } from "@/lib/menu-state"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuSkeleton } from "@/components/menu-skeleton"
import { MenuSearch } from "@/components/menu-search"
import { Breadcrumb } from "@/components/breadcrumb"
import { ScrollArea } from "@/components/scroll-area"

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
  const { expandedSections, isLoaded, toggleSection, setSelectedItem } = useMenuState()
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  // Set selected item when pathname changes
  React.useEffect(() => {
    setSelectedItem(pathname)
  }, [pathname, setSelectedItem])

  // Show skeleton while loading menu state
  if (!isLoaded) {
    return <MenuSkeleton />
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <div 
      ref={scrollContainerRef}
      className="space-y-0.5 py-2 overflow-y-auto"
      role="navigation"
      aria-label="Main navigation"
    >
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
              <CollapsibleTrigger 
                className="flex w-full items-center justify-between py-2 px-3 text-xs font-normal text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                aria-expanded={isExpanded}
                aria-controls={`submenu-${item.title.replace(/\s+/g, '-').toLowerCase()}`}
              >
                <div className="flex items-center space-x-2">
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  <span>{item.title}</span>
                </div>
                <ChevronRight className={cn(
                  "h-3 w-3 transition-transform duration-300",
                  isExpanded && "rotate-90"
                )} aria-hidden="true" />
              </CollapsibleTrigger>
              <CollapsibleContent 
                className="space-y-0.5 ml-6"
                id={`submenu-${item.title.replace(/\s+/g, '-').toLowerCase()}`}
                role="group"
                aria-labelledby={`header-${item.title.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href as any}
                    onClick={onItemClick}
                    className={cn(
                      "block py-2 px-3 ml-6 text-xs font-normal transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md",
                      isActive(subItem.href)
                        ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                    )}
                    aria-current={isActive(subItem.href) ? "page" : undefined}
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
            href={item.href as any}
            onClick={onItemClick}
            className={cn(
              "flex items-center space-x-2 py-2 px-3 text-xs font-normal transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md",
              isItemActive
                ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
            )}
            aria-current={isItemActive ? "page" : undefined}
          >
            <item.icon className="h-4 w-4" aria-hidden="true" />
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
        <div className="flex flex-col flex-grow pt-5 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center flex-shrink-0 px-4 mb-4">
            <h1 className="text-xs font-normal text-gray-900 dark:text-white">PetPooja Analytics</h1>
          </div>
          <div className="px-4 mb-3">
            <MenuSearch />
          </div>
          <div className="px-4 mb-3">
            <Breadcrumb />
          </div>
          <div className="flex-grow flex flex-col overflow-hidden">
            <div className="flex-1 px-2 overflow-y-auto">
              <nav className="space-y-1 py-2">
                <SidebarContent />
              </nav>
            </div>
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
          <SheetContent side="left" className="w-64 p-0 bg-white dark:bg-gray-900">
            <div className="flex flex-col h-full">
              <div className="flex items-center flex-shrink-0 px-4 py-5">
                <h1 className="text-xs font-normal text-gray-900 dark:text-white">PetPooja Analytics</h1>
              </div>
              <div className="px-4 mb-3">
                <MenuSearch onItemSelect={() => {
                  const closeButton = document.querySelector('[data-state="open"] button[aria-label="Close"]') as HTMLButtonElement
                  closeButton?.click()
                }} />
              </div>
              <div className="px-4 mb-3">
                <Breadcrumb />
              </div>
              <div className="flex-grow overflow-hidden">
                <div className="h-full px-2 overflow-y-auto">
                  <nav className="space-y-1 py-2">
                    <SidebarContent onItemClick={() => {
                      // Close the sheet when an item is clicked
                      const closeButton = document.querySelector('[data-state="open"] button[aria-label="Close"]') as HTMLButtonElement
                      closeButton?.click()
                    }} />
                  </nav>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}