"use client";

import { useState, useMemo } from 'react';
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  CameraOff,
  Download,
  Users,
  UserCheck,
  BrainCircuit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { allStudents } from "@/lib/data";

type Student = {
  id: string;
  name: string;
  email: string;
};

export default function LiveAttendancePage() {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [recognizedStudents, setRecognizedStudents] = useState<Student[]>([]);
  
  const liveBg = PlaceHolderImages.find(p => p.id === 'live-bg');

  const handleRecognizeStudent = () => {
    if (recognizedStudents.length < allStudents.length) {
      const unrecognized = allStudents.filter(
        (s) => !recognizedStudents.some((rs) => rs.id === s.id)
      );
      if (unrecognized.length > 0) {
        const randomIndex = Math.floor(Math.random() * unrecognized.length);
        setRecognizedStudents((prev) => [...prev, unrecognized[randomIndex]]);
      }
    }
  };

  return (
    <div className="relative -m-4 md:-m-8">
      <Image
        src={liveBg?.imageUrl || "https://picsum.photos/seed/livebg/1920/1080"}
        alt="Abstract background"
        fill
        className="object-cover"
        data-ai-hint={liveBg?.imageHint}
      />
      <div className="relative flex min-h-screen flex-col gap-4 bg-background/30 p-4 backdrop-blur-sm md:p-8">
        <header className="flex items-center justify-between">
          <Button asChild variant="outline" size="icon">
            <Link href="/dashboard/attendance">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-white shadow-black/50 [text-shadow:0_2px_4px_var(--tw-shadow-color)] md:text-2xl">
              Live Face Recognition Attendance
            </h1>
            <p className="text-sm text-white/80 shadow-black/50 [text-shadow:0_2px_4px_var(--tw-shadow-color)]">
              Subject: Computer Science | Class: Third Year (A)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              <span>Excel</span>
            </Button>
            {isCameraOn ? (
              <Button variant="destructive" onClick={() => setIsCameraOn(false)}>
                <CameraOff className="mr-2 h-4 w-4" />
                <span>Stop</span>
              </Button>
            ) : (
              <Button onClick={() => setIsCameraOn(true)}>
                <Camera className="mr-2 h-4 w-4" />
                <span>Start Camera</span>
              </Button>
            )}
          </div>
        </header>

        <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="flex items-center justify-center rounded-lg glassmorphism-dark lg:col-span-2">
            <div className="aspect-video w-full max-w-4xl p-2">
              {isCameraOn ? (
                // In a real application, this would be a video element
                // For this UI, we use the specified img tag
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="http://127.0.0.1:5000/video_feed"
                  alt="Live video feed"
                  className="h-full w-full rounded-md border-2 border-primary/50 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://picsum.photos/seed/webcamerror/1280/720";
                    (e.target as HTMLImageElement).alt = "Error loading live feed. Showing placeholder.";
                  }}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-600 bg-slate-900/50">
                  <CameraOff className="h-16 w-16 text-slate-500" />
                  <p className="mt-4 text-slate-400">Camera is off</p>
                  <p className="text-sm text-slate-500">
                    Click "Start Camera" to begin the session
                  </p>
                </div>
              )}
            </div>
          </div>
          <Card className="flex flex-col bg-background/80 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recognized Students</span>
                <Badge variant="secondary">
                  <UserCheck className="mr-2 h-4 w-4" />
                  {recognizedStudents.length} / {allStudents.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-full max-h-[calc(100vh-250px)]">
                <div className="space-y-2 p-4">
                {recognizedStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between rounded-md bg-secondary/50 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                           <AvatarImage src={`https://picsum.photos/seed/${student.id}/100/100`} alt={student.name} data-ai-hint="person portrait"/>
                          <AvatarFallback>
                            {student.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.id}</p>
                        </div>
                      </div>
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30">Present</Badge>
                    </div>
                  ))}
                  {recognizedStudents.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <Users className="h-12 w-12 text-muted-foreground" />
                      <p className="mt-4 font-medium text-muted-foreground">No students recognized yet.</p>
                      <p className="text-sm text-muted-foreground/80">Students will appear here as they are identified.</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
            {isCameraOn && (
               <div className="border-t p-4">
                 <Button className="w-full" variant="outline" onClick={handleRecognizeStudent}>
                   <BrainCircuit className="mr-2 h-4 w-4" />
                   Simulate Recognition
                 </Button>
               </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
