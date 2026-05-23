"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  CameraOff,
  Download,
  Users,
  UserCheck,
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
import { ScrollArea } from "@/components/ui/scroll-area";

type Student = {
  id: string;
  name: string;
};

export default function LiveAttendancePage() {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [recognizedStudents, setRecognizedStudents] = useState<Student[]>([]);

  const startCamera = async () => {
    setIsCameraOn(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/get_attendance");
      const data = await res.json();

      const students = data.map((item: any, index: number) => ({
        id: String(index + 1),
        name: item.name,
      }));

      setRecognizedStudents(students);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const stopCamera = () => {
    setIsCameraOn(false);
  };

  const downloadExcel = () => {
    window.open("http://127.0.0.1:5000/download", "_blank");
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white">
      {/* Background */}
      <Image
        src="https://picsum.photos/seed/livebg/1920/1080"
        alt="background"
        fill
        className="object-cover opacity-20"
      />

      <div className="relative flex min-h-screen flex-col gap-6 p-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Button asChild variant="outline" size="icon">
            <Link href="/dashboard/attendance">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>

          <div className="text-center">
            <h1 className="text-2xl font-bold">
              Live Face Recognition Attendance
            </h1>
            <p className="text-sm text-slate-300">
              Subject: Computer Science | Third Year A
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={downloadExcel}>
              <Download className="mr-2 h-4 w-4" />
              Excel
            </Button>

            {isCameraOn ? (
              <Button variant="destructive" onClick={stopCamera}>
                <CameraOff className="mr-2 h-4 w-4" />
                Stop
              </Button>
            ) : (
              <Button onClick={startCamera}>
                <Camera className="mr-2 h-4 w-4" />
                Start Camera
              </Button>
            )}
          </div>
        </header>

        {/* Main layout */}
        <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Live feed */}
          <div className="lg:col-span-2 rounded-xl border border-slate-700 bg-slate-900/60 p-4 backdrop-blur-lg">
            <div className="aspect-video w-full">
              {isCameraOn ? (
                <img
                  src="http://127.0.0.1:5000/video_feed"
                  alt="Live Feed"
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-600">
                  <CameraOff className="h-16 w-16 text-slate-500" />
                  <p className="mt-4 text-slate-400">Camera is Off</p>
                </div>
              )}
            </div>
          </div>

          {/* Recognized students */}
          <Card className="bg-slate-900/70 text-white border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recognized Students</span>
                <Badge>
                  <UserCheck className="mr-2 h-4 w-4" />
                  {recognizedStudents.length}
                </Badge>
              </CardTitle>
            </CardHeader>

            <Separator />

            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                <div className="space-y-2 p-4">
                  {recognizedStudents.length > 0 ? (
                    recognizedStudents.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between rounded-md bg-slate-800 p-3"
                      >
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-slate-400">
                            Roll No: {student.id}
                          </p>
                        </div>

                        <Badge className="bg-green-600">
                          Present
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <Users className="h-12 w-12 text-slate-500" />
                      <p className="mt-4 text-slate-400">
                        No students recognized yet
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
