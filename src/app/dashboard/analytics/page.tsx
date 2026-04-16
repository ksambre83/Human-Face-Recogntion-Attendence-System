"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { analytics } from "@/lib/data";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  XAxis,
  YAxis,
} from "recharts";
import type { PieSectorDataItem } from 'recharts';

const overallChartConfig = {
  present: { label: "Present", color: "hsl(var(--chart-1))" },
  absent: { label: "Absent", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const defaulterChartConfig = {
  defaulters: { label: "Below 75%", color: "hsl(var(--chart-2))" },
  compliant: { label: "Above 75%", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

const monthlyTrendConfig = {
  attendance: { label: "Attendance %", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

const subjectWiseConfig = {
  attendance: { label: "Attendance %", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;


export default function AnalyticsPage() {
  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Analytics Overview</CardTitle>
          <CardDescription>
            Visual insights into attendance patterns and trends.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Overall Attendance</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={analytics.overallAttendance}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  strokeWidth={5}
                  activeIndex={0}
                  activeShape={({ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload }: PieSectorDataItem) => (
                    <g>
                      <text x={cx} y={cy} dy={-5} textAnchor="middle" fill={fill} fontSize={24} fontWeight="bold">
                        {`${((payload.present / (payload.present + payload.absent)) * 100).toFixed(1)}%`}
                      </text>
                       <text x={cx} y={cy} dy={20} textAnchor="middle" fill="hsl(var(--muted-foreground))">
                        Present
                      </text>
                      <Sector
                        cx={cx}
                        cy={cy}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        fill={fill}
                      />
                    </g>
                  )}
                />
                 <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Defaulter Distribution</CardTitle>
            <CardDescription>Students with attendance below 75%</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.defaulterData} layout="vertical" margin={{left: 20}}>
                <CartesianGrid horizontal={false} />
                <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tickMargin={10} width={80}/>
                <XAxis type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="students" fill="var(--color-fill)" radius={5} />
                 <Legend />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Monthly Attendance Trend</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.monthlyTrend} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis domain={[80, 100]} tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="attendance" stroke="var(--color-attendance)" strokeWidth={2} dot={true} />
                    <Legend />
                </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Subject-wise Attendance</CardTitle>
                <CardDescription>Average attendance percentage per subject.</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.subjectWiseAttendance} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="subject" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis domain={[80, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="attendance" fill="var(--color-attendance)" radius={4} />
                    <Legend />
                </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
