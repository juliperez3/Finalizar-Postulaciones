"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, CheckCircle, AlertCircle, Users, FileText, RefreshCw, Calendar, Timer, Eye, X } from "lucide-react"

interface Project {
  id: number
  name: string
  closingDate: string
  closingTime: string
  status: "Iniciado" | "Cerrado" | "En evaluacion"
  applicationsCount: number
  positionsCount: number
  processed: boolean
  projectCode: string
}

interface Application {
  id: number
  projectId: number
  projectNumber: string
  applicantName: string
  position: string | React.ReactNode
  status: "Registrada" | "En evaluacion"
  submissionDate: string
}

interface ProcessLog {
  id: number
  timestamp: string
  type: "info" | "success" | "warning" | "error"
  message: string
  projectId?: number
  projectCode?: string
}

export default function FinalizationDashboard() {
  const [isDaemonRunning, setIsDaemonRunning] = useState(true)
  const [lastExecution, setLastExecution] = useState("17/06/2025 11:30:08")

  // Función para formatear fechas al formato DD/MM/YYYY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

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

  // Proyectos con diferentes estados y fechas
  const [allProjects, setAllProjects] = useState<Project[]>([
    // Proyectos ya procesados
    {
      id: 6,
      name: "Sistema de Inventario Inteligente",
      closingDate: "2025-06-14",
      closingTime: "16:00:00",
      status: "En evaluacion",
      applicationsCount: 22,
      positionsCount: 2,
      processed: true,
      projectCode: "00003",
    },
    {
      id: 7,
      name: "Plataforma de Análisis de Datos",
      closingDate: "2025-06-17",
      closingTime: "11:30:00",
      status: "En evaluacion",
      applicationsCount: 14,
      positionsCount: 1,
      processed: true,
      projectCode: "00004",
    },
    // Proyectos iniciados (basados en la imagen)
    {
      id: 1,
      name: "Sistema de Gestión Empresarial",
      closingDate: "2025-08-15",
      closingTime: "18:00:00",
      status: "Iniciado",
      applicationsCount: 25,
      positionsCount: 3,
      processed: false,
      projectCode: "00001",
    },
    {
      id: 2,
      name: "Plataforma E-Learning",
      closingDate: "2025-07-20",
      closingTime: "17:00:00",
      status: "Iniciado",
      applicationsCount: 18,
      positionsCount: 2,
      processed: false,
      projectCode: "00002",
    },
  ])

  const processedProjects = allProjects.filter((p) => p.processed)
  const upcomingProjects = allProjects.filter((p) => !p.processed)

  const [applications, setApplications] = useState<Application[]>([
    // Aplicaciones de proyectos procesados
    {
      id: 4,
      projectId: 6,
      projectNumber: "00001",
      applicantName: "Luis Fernández",
      position: "Desarrollador Frontend",
      status: "En evaluacion",
      submissionDate: "2025-05-15T10:20:00",
    },
    {
      id: 5,
      projectId: 6,
      projectNumber: "00002",
      applicantName: "Patricia Silva",
      position: "Especialista en Producción Industrial",
      status: "En evaluacion",
      submissionDate: "2025-05-18T14:45:00",
    },
    {
      id: 6,
      projectId: 7,
      projectNumber: "00001",
      applicantName: "Roberto Méndez",
      position: (
        <div>
          Analista Jr. en Automatización
          <br />y Sistemas Embebidos
        </div>
      ),
      status: "En evaluacion",
      submissionDate: "2025-06-10T09:30:00",
    },
    {
      id: 7,
      projectId: 7,
      projectNumber: "00002",
      applicantName: "Carmen López",
      position: "Desarrollador Frontend",
      status: "En evaluacion",
      submissionDate: "2025-06-16T16:15:00",
    },
    // Aplicaciones de proyectos iniciados
    {
      id: 1,
      projectId: 1,
      projectNumber: "00003",
      applicantName: "María González",
      position: "Especialista en Producción Industrial",
      status: "Registrada",
      submissionDate: "2025-06-10T14:30:00",
    },
    {
      id: 2,
      projectId: 1,
      projectNumber: "00004",
      applicantName: "Carlos Rodríguez",
      position: "Desarrollador Frontend",
      status: "Registrada",
      submissionDate: "2025-06-12T09:15:00",
    },
    {
      id: 3,
      projectId: 2,
      projectNumber: "00003",
      applicantName: "Ana Martínez",
      position: (
        <div>
          Analista Jr. en Automatización
          <br />y Sistemas Embebidos
        </div>
      ),
      status: "Registrada",
      submissionDate: "2025-06-13T16:45:00",
    },
  ])

  const [logs, setLogs] = useState<ProcessLog[]>([
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
      projectCode: "00004",
    },
    {
      id: 4,
      timestamp: "17/06/2025 11:30:08",
      type: "success",
      message: "Proceso de selección iniciado automáticamente",
      projectId: 7,
      projectCode: "00004",
    },
    {
      id: 3,
      timestamp: "17/06/2025 11:30:05",
      type: "success",
      message: '14 postulaciones actualizadas a estado "En evaluación"',
      projectId: 7,
      projectCode: "00004",
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
      projectCode: "00005",
    },
    {
      id: 8,
      timestamp: "15/06/2025 16:00:08",
      type: "success",
      message: "Proceso de selección iniciado automáticamente",
      projectId: 6,
      projectCode: "00005",
    },
    {
      id: 7,
      timestamp: "15/06/2025 16:00:05",
      type: "success",
      message: '22 postulaciones actualizadas a estado "En evaluación"',
      projectId: 6,
      projectCode: "00005",
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
      id: 13,
      timestamp: "13/06/2025 00:00:01",
      type: "error",
      message: "La postulación no se encuentra en estado Registrada",
      projectId: 6,
      projectCode: "00005",
    },
    {
      id: 14,
      timestamp: "12/06/2025 00:00:01",
      type: "error",
      message: "La postulacion encontrada pertenece a otro proyecto",
      projectId: 6,
      projectCode: "00005",
    },
    {
      id: 15,
      timestamp: "11/06/2025 00:00:01",
      type: "error",
      message: "El proyecto puesto fue dado de baja",
      projectId: 6,
      projectCode: "00005",
    },
    {
      id: 16,
      timestamp: "10/06/2025 00:00:01",
      type: "error",
      message: "No se encontró ningun proyecto iniciado",
      projectId: 6,
      projectCode: "00005",
    },
    {
      id: 17,
      timestamp: "09/06/2025 00:00:01",
      type: "error",
      message: "No se encontró ningún proyecto con postulaciones a cerrar hoy",
      projectId: 6,
      projectCode: "00005",
    },
  ])

  const toggleDaemon = () => {
    setIsDaemonRunning(!isDaemonRunning)
  }

  const manualExecution = () => {
    const newLog: ProcessLog = {
      id: logs.length + 1,
      timestamp: formatDateTime(new Date().toISOString()),
      type: "info",
      message: "Verificación manual de fechas de cierre - No hay proyectos para procesar hoy",
    }
    setLogs([newLog, ...logs])
  }

  const getTimeUntilClosing = (closingDate: string, closingTime: string) => {
    const now = new Date()
    const closing = new Date(`${closingDate}T${closingTime}`)
    const diff = closing.getTime() - now.getTime()

    if (diff <= 0) return "Vencido"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) return `${days} días`
    if (hours > 0) return `${hours} horas`
    return "Menos de 1 hora"
  }

  const getNextClosingProject = () => {
    const activeProjects = allProjects.filter((p) => !p.processed)
    if (activeProjects.length === 0) return null

    return activeProjects.reduce((earliest, current) => {
      const earliestDate = new Date(`${earliest.closingDate}T${earliest.closingTime}`)
      const currentDate = new Date(`${current.closingDate}T${current.closingTime}`)
      return currentDate < earliestDate ? current : earliest
    })
  }

  const nextProject = getNextClosingProject()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Main System Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Sistema de Prácticas Profesionales</h1>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Finalización de Postulaciones</h2>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={toggleDaemon} variant="outline">
              {isDaemonRunning ? "Pausar" : "Activar"} Demonio
            </Button>
            <Button onClick={manualExecution}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Verificar Ahora
            </Button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estado del Demonio</CardTitle>
              <Timer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${isDaemonRunning ? "text-green-600" : "text-red-600"}`}>
                {isDaemonRunning ? "Activo" : "Detenido"}
              </div>
              <p className="text-xs text-muted-foreground">Última verificación: {lastExecution}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Proyectos Iniciados</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingProjects.length}</div>
              <p className="text-xs text-muted-foreground">Esperando fecha de cierre</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Proyectos En evaluación</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{processedProjects.length}</div>
              <p className="text-xs text-muted-foreground">Finalizados automáticamente</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximo Cierre</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {nextProject ? getTimeUntilClosing(nextProject.closingDate, nextProject.closingTime) : "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                {nextProject ? nextProject.name : "No hay proyectos activos"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alert for current status */}
        <Alert>
          <Eye className="h-4 w-4" />
          <AlertDescription>
            El demonio se ejecuta automáticamente cada 24 horas para verificar las fechas de cierre de los proyectos.
          </AlertDescription>
        </Alert>

        {/* Main Content */}
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Proyectos Iniciados</TabsTrigger>
            <TabsTrigger value="processed">Proyectos En evaluación</TabsTrigger>
            <TabsTrigger value="applications">Postulaciones</TabsTrigger>
            <TabsTrigger value="logs">Logs del Sistema</TabsTrigger>
            <TabsTrigger value="config">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Proyectos Iniciados</CardTitle>
                <CardDescription>
                  Proyectos que están esperando su fecha de cierre para finalización automática
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingProjects.map((project) => (
                    <div key={project.id} className="relative flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h3 className="font-medium">{project.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Cierre: {formatDate(project.closingDate)} a las {project.closingTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {project.applicationsCount} postulaciones
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {project.positionsCount} puestos
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-50">
                          {getTimeUntilClosing(project.closingDate, project.closingTime)}
                        </Badge>
                        <Badge variant="secondary">{project.status}</Badge>
                        <Clock className="w-5 h-5 text-blue-500" />
                      </div>
                      <div className="absolute top-2 right-2 text-gray-500 text-xs">#{project.projectCode}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="processed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Proyectos En evaluación</CardTitle>
                <CardDescription>
                  Proyectos que fueron finalizados automáticamente al alcanzar su fecha de cierre o quedarse sin cupo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {processedProjects.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No hay proyectos procesados aún</p>
                    <p className="text-sm">Los proyectos aparecerán aquí cuando se alcance su fecha de cierre</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {processedProjects.map((project) => (
                      <div
                        key={project.id}
                        className="relative flex items-center justify-between p-4 border rounded-lg bg-green-50"
                      >
                        <div className="space-y-1">
                          <h3 className="font-medium">{project.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Cerrado: {formatDate(project.closingDate)} a las {project.closingTime}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {project.applicationsCount} postulaciones procesadas
                            </span>
                            <span className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              {project.positionsCount} puestos
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="default" className="bg-green-600">
                            {project.status}
                          </Badge>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="absolute top-2 right-2 text-gray-500 text-xs">#{project.projectCode}</div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Postulaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.map((application) => (
                    <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h3 className="font-medium">{application.applicantName}</h3>
                        <div className="flex items-start gap-4 text-sm text-gray-600">
                          <div>
                            {typeof application.position === "object" ? (
                              <div>
                                <span className="whitespace-nowrap">Puesto: Analista Jr. en Automatización</span>
                                <br />
                                <span>y Sistemas Embebidos</span>
                              </div>
                            ) : (
                              <span className="flex gap-1">
                                <span className="whitespace-nowrap">Puesto:</span>
                                <span>{application.position}</span>
                              </span>
                            )}
                          </div>
                          <span className="flex items-center gap-1 whitespace-nowrap">
                            Fecha: {formatDateTime(application.submissionDate)}
                          </span>
                          <span className="flex items-center gap-1 whitespace-nowrap">
                            N° Proyecto: #{application.projectNumber}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={application.status === "En evaluacion" ? "default" : "secondary"}>
                          {application.status}
                        </Badge>
                        {application.status === "En evaluacion" && <CheckCircle className="w-5 h-5 text-green-500" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Logs del Sistema</CardTitle>
                <CardDescription>Registro de verificaciones diarias del demonio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {logs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="flex-shrink-0 mt-0.5">
                        {log.type === "success" && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {log.type === "info" && <Clock className="w-4 h-4 text-blue-500" />}
                        {log.type === "warning" && <AlertCircle className="w-4 h-4 text-yellow-500" />}
                        {log.type === "error" && <X className="w-4 h-4 text-red-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono text-gray-500">{log.timestamp}</span>
                          {log.projectCode && (
                            <Badge variant="outline" className="text-xs">
                              Proyecto #{log.projectCode}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm mt-1">{log.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="config" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Demonio</CardTitle>
                <CardDescription>Configuración del monitoreo automático de fechas de cierre</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Frecuencia de Verificación</label>
                    <select className="w-full p-2 border rounded-md" defaultValue="daily">
                      <option value="daily">Cada 24 horas</option>
                      <option value="hourly">Cada hora</option>
                      <option value="30min">Cada 30 minutos</option>
                      <option value="15min">Cada 15 minutos</option>
                    </select>
                    <p className="text-xs text-gray-500">Frecuencia con la que se verifican las fechas de cierre</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Hora de Verificación Diaria</label>
                    <select className="w-full p-2 border rounded-md" defaultValue="00:00">
                      <option value="00:00">00:00 (Medianoche)</option>
                      <option value="06:00">06:00 (Madrugada)</option>
                      <option value="12:00">12:00 (Mediodía)</option>
                      <option value="18:00">18:00 (Tarde)</option>
                    </select>
                    <p className="text-xs text-gray-500">Hora del día en que se ejecuta la verificación</p>
                  </div>
                </div>

                <Alert>
                  <Timer className="h-4 w-4" />
                  <AlertDescription>
                    El demonio verifica diariamente (cada 24 horas) las fechas de cierre de todos los proyectos
                    iniciados. Cuando encuentra un proyecto que ha alcanzado su fecha de cierre, ejecuta automáticamente
                    el proceso de finalización de postulaciones.
                  </AlertDescription>
                </Alert>

                <div className="flex gap-2">
                  <Button>Guardar Configuración</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
