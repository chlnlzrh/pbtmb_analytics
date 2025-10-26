"use client"

import * as React from "react"
import { MapPin } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const locations = [
  { id: "all", name: "All Locations" },
  { id: "gurgaon-mg", name: "Gurgaon - MG Road" },
  { id: "gurgaon-cyber", name: "Gurgaon - Cyber City" },
  { id: "gurgaon-sohna", name: "Gurgaon - Sohna Road" },
  { id: "delhi-cp", name: "Delhi - Connaught Place" },
  { id: "noida-sector18", name: "Noida - Sector 18" },
  { id: "faridabad-crown", name: "Faridabad - Crown Plaza" },
]

interface LocationSelectorProps {
  value?: string
  onValueChange?: (value: string) => void
}

export function LocationSelector({ value = "all", onValueChange }: LocationSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <MapPin className="h-4 w-4 text-gray-500" />
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select location" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((location) => (
            <SelectItem key={location.id} value={location.id}>
              {location.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}