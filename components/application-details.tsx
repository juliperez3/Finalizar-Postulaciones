"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Calendar, FileText, ArrowRight } from "lucide-react"

interface ApplicationDetailsProps {
  applicationId: number
  applicantName: string
  position: string
  projectName: string
  submissionDate: string
  previousStatus: string
  currentStatus: string
  statusChangeDate: string
}

export function ApplicationDetails({
  applicationId,
  applicantName,
  position,
  projectName,
  submissionDate,
  previousStatus,
  currentStatus,
  statusChangeDate,
}: ApplicationDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Postulación #{applicationId}</span>
          <Badge variant="outline">{currentStatus}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
            <TabsTrigger value="actions">Acciones</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">Postulante</span>
                </div>
                <p className="text-sm">{applicantName}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">Puesto</span>
                </div>
                <p className="text-sm">{position}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">Proyecto</span>
                </div>
                <p className="text-sm">{projectName}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">Fecha de Postulación</span>
                </div>
                <p className="text-sm">{submissionDate}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Estado: {currentStatus}</span>
                    <span className="text-sm text-gray-500">{statusChangeDate}</span>
                  </div>
                  <p className="text-sm text-gray-600">Cambio automático por finalización de postulaciones</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Estado: {previousStatus}</span>
                    <span className="text-sm text-gray-500">{submissionDate}</span>
                  </div>
                  <p className="text-sm text-gray-600">Postulación registrada inicialmente</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <Badge variant="secondary">{previousStatus}</Badge>
              <ArrowRight className="w-4 h-4 text-gray-500" />
              <Badge variant="default">{currentStatus}</Badge>
              <span className="text-sm text-gray-600 ml-2">Transición automática</span>
            </div>
          </TabsContent>

          <TabsContent value="actions" className="space-y-4">
            <div className="space-y-3">
              <Button className="w-full" variant="outline">
                Ver Perfil del Postulante
              </Button>
              <Button className="w-full" variant="outline">
                Descargar CV
              </Button>
              <Button className="w-full" variant="outline">
                Ver Detalles del Proyecto
              </Button>
              <Button className="w-full" variant="outline">
                Ir al Proceso de Selección
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
