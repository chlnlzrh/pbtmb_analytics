import { useEffect, useState } from 'react'

const MENU_STATE_KEY = 'petpooja-menu-state'
const SCROLL_POSITION_KEY = 'petpooja-menu-scroll'

interface MenuState {
  expandedSections: string[]
  selectedItem: string | null
  scrollPosition: number
}

const defaultState: MenuState = {
  expandedSections: [],
  selectedItem: null,
  scrollPosition: 0,
}

export function useMenuState() {
  const [menuState, setMenuState] = useState<MenuState>(defaultState)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(MENU_STATE_KEY)
        if (stored) {
          const parsedState = JSON.parse(stored)
          setMenuState(parsedState)
        }
      } catch (error) {
        console.warn('Failed to load menu state from localStorage:', error)
      } finally {
        setIsLoaded(true)
      }
    }
  }, [])

  // Save state to localStorage when it changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      try {
        localStorage.setItem(MENU_STATE_KEY, JSON.stringify(menuState))
      } catch (error) {
        console.warn('Failed to save menu state to localStorage:', error)
      }
    }
  }, [menuState, isLoaded])

  const toggleSection = (sectionTitle: string) => {
    setMenuState(prev => ({
      ...prev,
      expandedSections: prev.expandedSections.includes(sectionTitle)
        ? prev.expandedSections.filter(item => item !== sectionTitle)
        : [...prev.expandedSections, sectionTitle]
    }))
  }

  const setSelectedItem = (item: string | null) => {
    setMenuState(prev => ({
      ...prev,
      selectedItem: item
    }))
  }

  const setScrollPosition = (position: number) => {
    setMenuState(prev => ({
      ...prev,
      scrollPosition: position
    }))
  }

  const clearMenuState = () => {
    setMenuState(defaultState)
    if (typeof window !== 'undefined') {
      localStorage.removeItem(MENU_STATE_KEY)
    }
  }

  return {
    expandedSections: menuState.expandedSections,
    selectedItem: menuState.selectedItem,
    scrollPosition: menuState.scrollPosition,
    isLoaded,
    toggleSection,
    setSelectedItem,
    setScrollPosition,
    clearMenuState,
  }
}