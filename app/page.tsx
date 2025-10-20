"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, AlertCircle, Bell, Check, X } from "lucide-react"

interface ProcessLog {
  id: number
  timestamp: string
  type: "info" | "success" | "warning" | "error"
  message: string
  projectId?: number
  projectCode?: string
}

export default function NotificationsDashboard() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [readNotifications, setReadNotifications] = useState<Set<number>>(new Set())
  const [showAllLogs, setShowAllLogs] = useState(false)

  // Función para formatear fecha y hora completa
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString)
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const seconds = date.getSeconds().toString().padStart(2, "0")
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
  }

  const isOldNotification = (timestamp: string) => {
    const [datePart] = timestamp.split(" ")
    const [day, month, year] = datePart.split("/").map(Number)
    const notificationDate = new Date(year, month - 1, day)
    const cutoffDate = new Date(2025, 5, 17) // June 17, 2025
    return notificationDate <= cutoffDate
  }

  const markAllAsRead = () => {
    const allIds = new Set(logs.map((log) => log.id))
    setReadNotifications(allIds)
  }

  const [logs, setLogs] = useState<ProcessLog[]>([
    {
      id: 18,
      timestamp: "19/06/2025 00:00:01",
      type: "info",
      message: "Verificación diaria de fechas de cierre - No hay proyectos para procesar hoy",
    },
    // Logs del proyecto cerrado hoy (17 de junio)
    {
      id: 1,
      timestamp: "18/06/2025 00:00:01",
      type: "info",
      message: "Verificación diaria de fechas de cierre - No hay proyectos para procesar hoy",
    },
    {
      id: 2,
      timestamp: "17/06/2025 11:30:02",
      type: "success",
      message: 'Proyecto cambiado a estado "En evaluación" exitosamente',
      projectId: 7,
      projectCode: "PRJ004",
    },
    {
      id: 4,
      timestamp: "17/06/2025 11:30:08",
      type: "success",
      message: "Proceso de selección iniciado automáticamente",
      projectId: 7,
      projectCode: "PRJ004",
    },
    {
      id: 3,
      timestamp: "17/06/2025 11:30:05",
      type: "success",
      message: '14 postulaciones actualizadas a estado "En evaluación"',
      projectId: 7,
      projectCode: "PRJ004",
    },
    {
      id: 9,
      timestamp: "17/06/2025 00:00:01",
      type: "info",
      message: "Verificación diaria de fechas de cierre - 1 proyecto encontrado para procesar",
    },
    {
      id: 10,
      timestamp: "16/06/2025 00:00:01",
      type: "info",
      message: "Verificación diaria de fechas de cierre - No hay proyectos para procesar hoy",
    },
    // Logs del proyecto cerrado en mayo
    {
      id: 6,
      timestamp: "15/06/2025 16:00:02",
      type: "success",
      message: 'Proyecto cambiado a estado "En evaluación" exitosamente',
      projectId: 6,
      projectCode: "PRJ005",
    },
    {
      id: 8,
      timestamp: "15/06/2025 16:00:08",
      type: "success",
      message: "Proceso de selección iniciado automáticamente",
      projectId: 6,
      projectCode: "PRJ005",
    },
    {
      id: 7,
      timestamp: "15/06/2025 16:00:05",
      type: "success",
      message: '22 postulaciones actualizadas a estado "En evaluación"',
      projectId: 6,
      projectCode: "PRJ005",
    },
    {
      id: 11,
      timestamp: "15/06/2025 00:00:01",
      type: "info",
      message: "Verificación diaria de fechas de cierre - 1 proyecto encontrado para procesar",
    },
    // Logs recientes de verificación diaria
    {
      id: 12,
      timestamp: "14/06/2025 00:00:01",
      type: "info",
      message: "Verificación diaria de fechas de cierre - No hay proyectos para procesar hoy",
    },
    {
      id: 17,
      timestamp: "13/06/2025 00:00:05",
      type: "error",
      message: "No se encontró ningún proyecto con postulaciones a cerrar hoy",
      projectId: 6,
      projectCode: "PRJ006",
    },
    {
      id: 16,
      timestamp: "13/06/2025 00:00:04",
      type: "error",
      message: "No se encontró ningun proyecto iniciado",
      projectId: 6,
      projectCode: "PRJ006",
    },
    {
      id: 15,
      timestamp: "13/06/2025 00:00:03",
      type: "error",
      message: "El proyecto puesto fue dado de baja",
      projectId: 6,
      projectCode: "PRJ006",
    },
    {
      id: 14,
      timestamp: "13/06/2025 00:00:02",
      type: "error",
      message: "La postulacion encontrada pertenece a otro proyecto",
      projectId: 6,
      projectCode: "PRJ006",
    },
    {
      id: 13,
      timestamp: "13/06/2025 00:00:01",
      type: "error",
      message: "La postulación no se encuentra en estado Registrada",
      projectId: 6,
      projectCode: "PRJ006",
    },
    {
      id: 20,
      timestamp: "13/06/2025 00:00:01",
      type: "error",
      message: 'El estado "Simulado despues Finalizar Postulaciones" no se encuentra en el sistema. Intente nuevamente',
      projectId: 6,
      projectCode: "PRJ006",
    },
    {
      id: 21,
      timestamp: "13/06/2025 00:00:01",
      type: "error",
      message: 'El estado "En evaluacion" no se encuentra en el sistema. Intente nuevamente',
      projectId: 6,
      projectCode: "PRJ006",
    },
    {
      id: 22,
      timestamp: "13/06/2025 00:00:01",
      type: "error",
      message: "No se encontró ninguna postulacion para el proyecto, no se puede finalizar",
      projectId: 6,
      projectCode: "PRJ006",
    },
    {
      id: 23,
      timestamp: "13/06/2025 00:00:01",
      type: "error",
      message: "No se encontró el estado para el proyecto",
      projectId: 6,
      projectCode: "PRJ006",
    },
    {
      id: 23,
      timestamp: "13/06/2025 00:00:01",
      type: "error",
      message: "Proyecto Suspendido. La cantidad de Postulaciones del Puesto no alcanzó la cantidad necesaria",
      projectId: 7,
      projectCode: "PRJ007",
    },
    {
      id: 29,
      timestamp: "13/06/2025 00:00:00",
      type: "info",
      message: "Verificación diaria de fechas de cierre - 1 proyecto encontrado para procesar",
    },
    {
      id: 19,
      timestamp: "12/06/2025 00:00:01",
      type: "info",
      message: "Verificación diaria de fechas de cierre - No hay proyectos para procesar hoy",
    },
  ])

  // Logs adicionales para mostrar cuando se hace clic en "Ver más"
  const allLogs = [
    ...logs,
    {
      id: 20,
      timestamp: "11/06/2025 00:00:01",
      type: "info" as const,
      message: "Verificación diaria de fechas de cierre - No hay proyectos para procesar hoy",
    },
    {
      id: 21,
      timestamp: "10/06/2025 00:00:01",
      type: "info" as const,
      message: "Verificación diaria de fechas de cierre - No hay proyectos para procesar hoy",
    },
    {
      id: 22,
      timestamp: "09/06/2025 00:00:01",
      type: "info" as const,
      message: "Verificación diaria de fechas de cierre - No hay proyectos para procesar hoy",
    },
    {
      id: 23,
      timestamp: "08/06/2025 00:00:01",
      type: "info" as const,
      message: "Verificación diaria de fechas de cierre - No hay proyectos para procesar hoy",
    },
    {
      id: 24,
      timestamp: "07/06/2025 00:00:01",
      type: "info" as const,
      message: "Verificación diaria de fechas de cierre - No hay proyectos para procesar hoy",
    },
    {
      id: 25,
      timestamp: "06/06/2025 00:00:01",
      type: "info" as const,
      message: "Verificación diaria de fechas de cierre - No hay proyectos para procesar hoy",
    },
    {
      id: 26,
      timestamp: "05/06/2025 00:00:01",
      type: "info" as const,
      message: "Verificación diaria de fechas de cierre - No hay proyectos para procesar hoy",
    },
  ]

  const displayLogs = showAllLogs ? allLogs : logs

  return (
    <div className="min-h-screen">
      {/* Header area - levemente más oscuro que el fondo */}
      <div className="bg-gradient-to-br from-blue-100 to-indigo-200 h-16 relative">
        {/* Header with notification bell */}
        <div className="absolute top-2 bottom-2 right-4 flex items-center">
          <Button
            onClick={() => setShowNotifications(true)}
            variant="ghost"
            size="icon"
            className="bg-white hover:bg-gray-50 text-gray-600 shadow-md"
          >
            <Bell className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-[calc(100vh-4rem)]">
        <div className="flex items-start justify-center pt-8">
          <div className="text-gray-800 text-center">
            <h1 className="text-4xl font-bold mb-4">Sistema de Prácticas Profesionales</h1>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[85vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
              <h2 className="text-2xl font-semibold text-gray-800">Notificaciones</h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-gray-500" onClick={markAllAsRead}>
                  <Check className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500"
                  onClick={() => {
                    setShowNotifications(false)
                    setShowAllLogs(false)
                  }}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              {displayLogs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No tienes notificaciones</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {displayLogs.map((log) => (
                    <div
                      key={log.id}
                      className={`flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 ${
                        isOldNotification(log.timestamp) || readNotifications.has(log.id) ? "bg-gray-100" : "bg-white"
                      }`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {log.type === "success" && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {log.type === "info" && <Clock className="w-4 h-4 text-blue-500" />}
                        {log.type === "warning" && <AlertCircle className="w-4 h-4 text-yellow-500" />}
                        {log.type === "error" && <X className="w-4 h-4 text-red-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-sm font-mono text-gray-500">{log.timestamp}</span>
                          {log.projectCode && (
                            <Badge variant="outline" className="text-xs">
                              Proyecto #{log.projectCode}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-800 break-words">{log.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - botón más pequeño */}
            <div className="p-4 border-t text-center flex-shrink-0">
              <Button
                variant="link"
                size="sm"
                className="text-gray-600 text-sm px-3 py-1"
                onClick={() => setShowAllLogs(!showAllLogs)}
              >
                {showAllLogs ? "Ver menos" : "Ver más"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
