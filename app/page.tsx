"use client"

import * as React from "react"
import { Sidebar } from "@/components/sidebar"
import { LocationSelector } from "@/components/location-selector"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, TrendingUp, DollarSign, Users } from "lucide-react"

export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] = React.useState("all")

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <div className="border-b bg-background px-4 py-3 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile menu trigger is now in Sidebar component */}
              <div className="md:hidden">
                <Sidebar />
              </div>
              <h1 className="text-baseline">Dashboard</h1>
            </div>
            <LocationSelector value={selectedLocation} onValueChange={setSelectedLocation} />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 space-y-4 p-4 md:p-6">
          {/* Executive Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹45,23,100</div>
                <p className="text-baseline text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Prime Cost %</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">57.2%</div>
                <p className="text-baseline text-muted-foreground">
                  -2.3% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Customer Covers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,450</div>
                <p className="text-baseline text-muted-foreground">
                  +15.3% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Avg Check Size</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹456</div>
                <p className="text-baseline text-muted-foreground">
                  +4.2% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <span>Real-time Alerts & Anomalies</span>
              </CardTitle>
              <CardDescription>
                Performance indicators requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-md">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-baseline">High food cost variance at Cyber City location</p>
                    <p className="text-baseline text-muted-foreground">Food cost % increased to 34.2% (target: 30%)</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-md">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-baseline">Employee turnover spike at MG Road</p>
                    <p className="text-baseline text-muted-foreground">3 departures this week (monthly target: 2)</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-md">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-baseline">Low table turnover during dinner</p>
                    <p className="text-baseline text-muted-foreground">1.8x turnover vs target 2.2x at Sohna Road</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Multi-unit Toggle Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Multi-Unit Performance Overview</CardTitle>
              <CardDescription>
                Comparative performance across all {selectedLocation === 'all' ? '6 locations' : '1 location'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-32 text-muted-foreground">
                <p className="text-baseline">Performance charts and comparative analytics will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}