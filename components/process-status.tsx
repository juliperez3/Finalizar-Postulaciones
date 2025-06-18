"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertTriangle } from "lucide-react"

interface ProcessStep {
  id: number
  name: string
  status: "pending" | "running" | "completed" | "error"
  description: string
  progress?: number
}

interface ProcessStatusProps {
  projectId: number
  projectName: string
  steps: ProcessStep[]
}

export function ProcessStatus({ projectId, projectName, steps }: ProcessStatusProps) {
  const getStatusIcon = (status: ProcessStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "running":
        return <Clock className="w-4 h-4 text-blue-500 animate-spin" />
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
    }
  }

  const getStatusBadge = (status: ProcessStep["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-500">
            Completado
          </Badge>
        )
      case "running":
        return (
          <Badge variant="default" className="bg-blue-500">
            En Proceso
          </Badge>
        )
      case "error":
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="secondary">Pendiente</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Proceso: {projectName}</span>
          <Badge variant="outline">ID: {projectId}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-4 p-3 border rounded-lg">
              <div className="flex-shrink-0 mt-1">{getStatusIcon(step.status)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{step.name}</h4>
                  {getStatusBadge(step.status)}
                </div>
                <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                {step.progress !== undefined && step.status === "running" && (
                  <Progress value={step.progress} className="w-full" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
