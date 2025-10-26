"use client"

import * as React from "react"
import { useMenuState } from "@/lib/menu-state"

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  onScrollPositionChange?: (position: number) => void
}

export function ScrollArea({ 
  children, 
  className = "", 
  onScrollPositionChange,
  ...props 
}: ScrollAreaProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { scrollPosition, setScrollPosition } = useMenuState()

  // Restore scroll position on mount
  React.useEffect(() => {
    if (scrollRef.current && scrollPosition > 0) {
      scrollRef.current.scrollTop = scrollPosition
    }
  }, [scrollPosition])

  const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    const position = target.scrollTop
    
    // Debounce scroll position updates
    const timeoutId = setTimeout(() => {
      setScrollPosition(position)
      onScrollPositionChange?.(position)
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [setScrollPosition, onScrollPositionChange])

  return (
    <div
      ref={scrollRef}
      className={`overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 ${className}`}
      onScroll={handleScroll}
      {...props}
    >
      {children}
    </div>
  )
}