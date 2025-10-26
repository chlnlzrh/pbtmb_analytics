"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function MenuSkeleton() {
  return (
    <div className="space-y-0.5 py-2">
      {/* Dashboard item */}
      <div className="flex items-center space-x-2 py-1 px-3">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-3 w-16" />
      </div>
      
      {/* Collapsible sections */}
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="space-y-0.5">
          {/* Section header */}
          <div className="flex items-center justify-between py-1 px-3">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-3 w-3" />
          </div>
          
          {/* Sub-items (some sections expanded) */}
          {index % 3 === 0 && (
            <div className="space-y-0.5 ml-6">
              {Array.from({ length: 3 }).map((_, subIndex) => (
                <div key={subIndex} className="py-1 px-3">
                  <Skeleton className="h-3 w-20" />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      
      {/* Reports and Settings */}
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={`bottom-${index}`} className="space-y-0.5">
          <div className="flex items-center justify-between py-1 px-3">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-3 w-3" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function MenuSearchSkeleton() {
  return (
    <div className="flex items-center space-x-2 p-2">
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-3 w-24" />
      <div className="ml-auto">
        <Skeleton className="h-5 w-8" />
      </div>
    </div>
  )
}