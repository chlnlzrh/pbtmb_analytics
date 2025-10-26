import { Sidebar } from "@/components/sidebar"
import { LocationSelector } from "@/components/location-selector"

export default function FoodCostPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        <div className="border-b bg-background px-4 py-3 md:px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-baseline">Food Cost, Beverage & Inventory Management</h1>
            <LocationSelector />
          </div>
        </div>

        <div className="flex-1 space-y-4 p-4 md:p-6">
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <p className="text-baseline">Food Cost & Inventory analytics will be implemented here</p>
          </div>
        </div>
      </div>
    </div>
  )
}