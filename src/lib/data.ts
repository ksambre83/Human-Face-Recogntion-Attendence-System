export const totalStudents = 60;
export const presentToday = 54;
export const absentToday = totalStudents - presentToday;
export const attendancePercentage = (presentToday / totalStudents) * 100;

export const attendanceTrendData = [
  { date: 'Mon', attendance: 90 },
  { date: 'Tue', attendance: 92 },
  { date: 'Wed', attendance: 88 },
  { date: 'Thu', attendance: 95 },
  { date: 'Fri', attendance: 91 },
  { date: 'Sat', attendance: 85 },
];

export const recentActivity = [
  { id: 1, activity: 'Attendance marked for Computer Science (A)', time: '10:15 AM' },
  { id: 2, activity: 'Downloaded report for Mathematics (B)', time: 'Yesterday' },
  { id: 3, activity: 'Viewed analytics for last month', time: 'Yesterday' },
  { id: 4, activity: '3 new students added to Physics (A)', time: '2 days ago' },
];

export const defaulterList = [
  { id: 'S015', name: 'Adarsh Dora', attendance: 68, className: 'CS-A' },
  { id: 'S023', name: 'Shivam Dubey', attendance: 71, className: 'PHY-B' },
  { id: 'S042', name: 'Roshan Jethani', attendance: 65, className: 'CS-B' },
  { id: 'S007', name: 'Sarthak Nichat', attendance: 74, className: 'MTH-A' },
];

export const allStudents = Array.from({ length: 60 }, (_, i) => ({
    id: `S${String(i + 1).padStart(3, '0')}`,
    name: `Student ${i + 1}`,
    email: `student${i + 1}@college.edu`,
}));

export const attendanceReportData = [
  { id: 'S001', name: 'Adarsh Dora', date: '2024-07-22', subject: 'Computer Science', status: 'Present' },
  { id: 'S002', name: 'Shivam Dubey', date: '2024-07-22', subject: 'Computer Science', status: 'Present' },
  { id: 'S003', name: 'Roshan Jethani', date: '2024-07-22', subject: 'Computer Science', status: 'Absent' },
  { id: 'S004', name: 'Sarthak Nichat', date: '2024-07-22', subject: 'Computer Science', status: 'Present' },
  { id: 'S005', name: 'Adarsh Dora', date: '2024-07-21', subject: 'Physics', status: 'Present' },
  { id: 'S006', name: 'Shivam Dubey', date: '2024-07-21', subject: 'Physics', status: 'Absent' },
  { id: 'S007', name: 'Roshan Jethani', date: '2024-07-21', subject: 'Physics', status: 'Present' },
  { id: 'S008', name: 'Sarthak Nichat', date: '2024-07-21', subject: 'Physics', status: 'Present' },
  { id: 'S009', name: 'Adarsh Dora', date: '2024-07-20', subject: 'Mathematics', status: 'Absent' },
  { id: 'S010', name: 'Shivam Dubey', date: '2024-07-20', subject: 'Mathematics', status: 'Present' },
  { id: 'S011', name: 'Roshan Jethani', date: '2024-07-20', subject: 'Mathematics', status: 'Present' },
  { id: 'S012', name: 'Sarthak Nichat', date: '2024-07-20', subject: 'Mathematics', status: 'Present' },
];

export const analytics = {
  overallAttendance: [
    { name: 'Present', value: 450, fill: 'var(--color-present)' },
    { name: 'Absent', value: 50, fill: 'var(--color-absent)' },
  ],
  monthlyTrend: [
    { month: 'Jan', attendance: 85 },
    { month: 'Feb', attendance: 88 },
    { month: 'Mar', attendance: 86 },
    { month: 'Apr', attendance: 90 },
    { month: 'May', attendance: 92 },
    { month: 'Jun', attendance: 91 },
  ],
  subjectWiseAttendance: [
    { subject: 'Computer Science', attendance: 95 },
    { subject: 'Physics', attendance: 88 },
    { subject: 'Mathematics', attendance: 92 },
    { subject: 'Chemistry', attendance: 85 },
    { subject: 'Biology', attendance: 90 },
  ],
  defaulterData: [
    { name: 'Below 75%', students: 8, fill: 'var(--color-defaulters)' },
    { name: 'Above 75%', students: 52, fill: 'var(--color-compliant)' },
  ],
};
