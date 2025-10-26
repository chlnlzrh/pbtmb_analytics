"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  title: string
  href: string
  isActive?: boolean
}

interface BreadcrumbProps {
  className?: string
}

const routeMapping: Record<string, string> = {
  "/": "Dashboard",
  "/financial": "Financial Performance",
  "/financial/revenue": "Revenue & Sales",
  "/financial/profitability": "Profitability & Margins",
  "/financial/india-specific": "India-Specific Financial",
  "/operational": "Operational Efficiency",
  "/operational/service": "Service & Capacity",
  "/operational/productivity": "Labor Productivity",
  "/operational/inventory": "Inventory & Assets",
  "/operational/accuracy": "Order Accuracy & Waste",
  "/customer": "Customer Experience",
  "/customer/acquisition": "Acquisition & Traffic",
  "/customer/retention": "Retention & Loyalty",
  "/customer/satisfaction": "Satisfaction & Reputation",
  "/food-cost": "Food Cost & Inventory",
  "/food-cost/metrics": "Cost Metrics",
  "/food-cost/variance": "Variance & Yield",
  "/food-cost/optimization": "Inventory Optimization",
  "/food-cost/suppliers": "Supplier Performance",
  "/labor": "Labor Management",
  "/labor/productivity": "Cost & Productivity",
  "/labor/stability": "Workforce Stability",
  "/labor/training": "Staffing & Training",
  "/quality": "Quality & Compliance",
  "/quality/safety": "Food Safety & Hygiene",
  "/quality/compliance": "Operational Compliance",
  "/digital": "Digital & Aggregator",
  "/digital/channels": "Digital Channel Mix",
  "/digital/aggregator": "Aggregator Operations",
  "/digital/marketing": "Marketing Performance",
  "/comparative": "Comparative Analytics",
  "/comparative/locations": "Location Performance",
  "/comparative/menu": "Item & Menu Analytics",
  "/comparative/consistency": "Operational Consistency",
  "/comparative/best-practices": "Best Practice ID",
  "/reports": "Reports",
  "/reports/templates": "Pre-built Templates",
  "/reports/builder": "Custom Report Builder",
  "/reports/exports": "Scheduled Exports",
  "/settings": "Settings",
  "/settings/data": "Data Configuration",
  "/settings/kpi": "KPI Definitions",
  "/settings/users": "User Permissions",
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = []
  
  // Always start with dashboard (home)
  if (pathname !== "/") {
    breadcrumbs.push({
      title: "Dashboard",
      href: "/",
      isActive: false
    })
  }

  // Split pathname and build breadcrumb trail
  const pathSegments = pathname.split("/").filter(Boolean)
  
  for (let i = 0; i < pathSegments.length; i++) {
    const href = "/" + pathSegments.slice(0, i + 1).join("/")
    const title = routeMapping[href] || pathSegments[i]
    const isActive = i === pathSegments.length - 1
    
    breadcrumbs.push({
      title,
      href,
      isActive
    })
  }

  return breadcrumbs
}

export function Breadcrumb({ className }: BreadcrumbProps) {
  const pathname = usePathname()
  const breadcrumbs = generateBreadcrumbs(pathname)

  // Don't show breadcrumbs on homepage
  if (pathname === "/" || breadcrumbs.length <= 1) {
    return null
  }

  return (
    <nav className={cn("flex items-center space-x-1 text-xs font-normal text-gray-500 dark:text-gray-400", className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbs.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="mx-2 h-3 w-3 text-muted-foreground" aria-hidden="true" />
            )}
            {item.isActive ? (
              <span 
                className="text-xs font-normal text-gray-900 dark:text-white"
                aria-current="page"
              >
                {item.title}
              </span>
            ) : (
              <Link
                href={item.href as any}
                className="text-xs font-normal text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                {index === 0 && item.href === "/" ? (
                  <span className="flex items-center">
                    <Home className="h-3 w-3 mr-1" aria-hidden="true" />
                    {item.title}
                  </span>
                ) : (
                  item.title
                )}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function useBreadcrumbs() {
  const pathname = usePathname()
  return React.useMemo(() => generateBreadcrumbs(pathname), [pathname])
}