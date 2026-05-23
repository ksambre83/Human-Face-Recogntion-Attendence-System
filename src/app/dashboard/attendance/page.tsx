"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  CalendarIcon,
  ArrowRight,
  Download,
  Camera,
} from "lucide-react";
import { format } from "date-fns";

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const downloadExcel = () => {
    window.open("http://127.0.0.1:5000/download", "_blank");
  };

  return (
    <div className="flex items-start justify-center p-6">
      <Card className="w-full max-w-3xl shadow-xl border-0 rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-bold text-slate-800">
            Start New Attendance Session
          </CardTitle>
          <CardDescription className="text-base text-slate-500">
            Select class details and start AI-powered face attendance.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-8">
          {/* Subject + Class */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="phy">Physics</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="chem">Chemistry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select>
                <SelectTrigger id="class">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fy">First Year</SelectItem>
                  <SelectItem value="sy">Second Year</SelectItem>
                  <SelectItem value="ty">Third Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Division + Date */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="division">Division</Label>
              <Select>
                <SelectTrigger id="division">
                  <SelectValue placeholder="Select division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">A</SelectItem>
                  <SelectItem value="b">B</SelectItem>
                  <SelectItem value="c">C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(selectedDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) =>
                      setSelectedDate(date || new Date())
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>

        {/* FOOTER BUTTONS */}
        <CardFooter className="flex flex-col gap-4 sm:flex-row sm:justify-end">
          {/* Download Excel */}
          <Button
            onClick={downloadExcel}
            variant="outline"
            className="w-full sm:w-auto"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Excel
          </Button>

          {/* Take Attendance - FIXED */}
          <Button
            asChild
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
          >
            <Link href="/dashboard/attendance/live">
              <Camera className="mr-2 h-4 w-4" />
              Take Attendance
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}