"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Download, Eye, FileText, Wrench } from "lucide-react"

interface PastEventsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock data for RAG pipeline history
const pastEvents = [
  {
    id: 1,
    title: "Document Processing",
    date: "2024-01-15",
    time: "10:30 AM",
    type: "Document",
    status: "Completed",
    description: "Uploaded and processed course syllabus for CS101",
    fileSize: "2.3 MB",
    fileName: "CS101_Syllabus.pdf",
    action: "download"
  },
  {
    id: 2,
    title: "Schedule Tool Call",
    date: "2024-01-15",
    time: "11:45 AM",
    type: "Tool",
    status: "Completed",
    description: "Scheduled office hours with Dr. Smith for next week",
    toolUsed: "Calendar",
    action: "view"
  },
  {
    id: 3,
    title: "Document Processing",
    date: "2024-01-16",
    time: "2:15 PM",
    type: "Document",
    status: "Completed",
    description: "Processed lab assignment guidelines for Physics Lab",
    fileSize: "1.8 MB",
    fileName: "Physics_Lab_Guidelines.pdf",
    action: "download"
  },
  {
    id: 4,
    title: "Research Tool Call",
    date: "2024-01-16",
    time: "3:30 PM",
    type: "Tool",
    status: "Completed",
    description: "Researched latest papers on machine learning algorithms",
    toolUsed: "Research",
    action: "view"
  },
  {
    id: 5,
    title: "Document Processing",
    date: "2024-01-17",
    time: "9:20 AM",
    type: "Document",
    status: "Completed",
    description: "Uploaded and analyzed exam schedule for Spring 2024",
    fileSize: "3.1 MB",
    fileName: "Spring_Exam_Schedule.pdf",
    action: "download"
  },
  {
    id: 6,
    title: "Booking Tool Call",
    date: "2024-01-17",
    time: "10:45 AM",
    type: "Tool",
    status: "Completed",
    description: "Booked study room in library for group project",
    toolUsed: "Booking",
    action: "view"
  },
  {
    id: 7,
    title: "Document Processing",
    date: "2024-01-18",
    time: "1:15 PM",
    type: "Document",
    status: "Completed",
    description: "Processed course registration form and requirements",
    fileSize: "4.2 MB",
    fileName: "Course_Registration.pdf",
    action: "download"
  },
  {
    id: 8,
    title: "Notification Tool Call",
    date: "2024-01-18",
    time: "2:00 PM",
    type: "Tool",
    status: "Completed",
    description: "Set up reminders for upcoming assignment deadlines",
    toolUsed: "Notifications",
    action: "view"
  }
]

export function PastEventsDialog({ open, onOpenChange }: PastEventsDialogProps) {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'Document': return 'bg-blue-100 text-blue-800'
      case 'Tool': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col w-[calc(100vw-3rem)] sm:w-auto max-w-[calc(100vw-3rem)] sm:max-w-4xl" showCloseButton={false}>
        {/* Fixed Header */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
              Past Events
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-sm"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
          
          <DialogDescription className="mt-2">
            View all completed/pending activities.
          </DialogDescription>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto mt-4">
          <div className="space-y-4">
          {pastEvents.map((event) => (
            <div
              key={event.id}
              className="p-4 rounded-lg border border-border transition-all duration-200 hover:shadow-md"
            >
                             <div className="flex-1">
                 <div className="flex items-center gap-3 mb-2">
                   <h3 className="font-semibold text-lg">{event.title}</h3>
                   <Badge className={getEventTypeColor(event.type)}>
                     {event.type}
                   </Badge>
                   <Badge variant="secondary" className="bg-green-100 text-green-800">
                     {event.status}
                   </Badge>
                 </div>
                 
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                     <div className="flex items-center gap-2">
                       <Calendar className="h-4 w-4" />
                       <span>{formatDate(event.date)}</span>
                     </div>
                     <div className="flex items-center gap-2">
                       <Clock className="h-4 w-4" />
                       <span>{event.time}</span>
                     </div>
                   </div>
                   
                   <div className="flex items-center gap-2 mt-3">
                     {event.type === 'Document' ? (
                       <>
                         <FileText className="h-4 w-4 text-muted-foreground" />
                         <span className="text-sm text-muted-foreground">
                           {event.fileSize} • {event.fileName}
                         </span>
                       </>
                     ) : (
                       <>
                         <Wrench className="h-4 w-4 text-muted-foreground" />
                         <span className="text-sm text-muted-foreground">
                           {event.toolUsed} Tool
                         </span>
                       </>
                     )}
                   </div>
                   
                   <div className="flex items-center gap-2 mt-3">
                     <Button
                       variant="outline"
                       size="sm"
                       className="h-7 px-2 text-xs"
                       onClick={() => {
                         if (event.action === 'download') {
                           console.log(`Downloading ${event.fileName}`)
                         } else {
                           console.log(`Viewing ${event.title}`)
                         }
                       }}
                     >
                       {event.action === 'download' ? (
                         <>
                           <Download className="h-3 w-3 mr-1" />
                           Download
                         </>
                       ) : (
                         <>
                           <Eye className="h-3 w-3 mr-1" />
                           View
                         </>
                       )}
                     </Button>
                   </div>
               </div>
            </div>
          ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 