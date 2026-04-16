'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating a natural language summary of live attendance.
 *
 * - generateLiveAttendanceSummary - A function that generates a summary of live attendance based on recognized students.
 * - GenerateLiveAttendanceSummaryInput - The input type for the generateLiveAttendanceSummary function.
 * - GenerateLiveAttendanceSummaryOutput - The return type for the generateLiveAttendanceSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the flow
const GenerateLiveAttendanceSummaryInputSchema = z.object({
  recognizedStudents: z.array(z.string()).describe('A list of names of students who have been recognized as present.'),
  className: z.string().describe('The name of the class.'),
  subjectName: z.string().describe('The name of the subject.'),
  divisionName: z.string().describe('The name of the division.'),
  totalStudents: z.number().optional().describe('The total number of students expected in the class.'),
});
export type GenerateLiveAttendanceSummaryInput = z.infer<typeof GenerateLiveAttendanceSummaryInputSchema>;

// Define the output schema for the flow (a simple string summary)
const GenerateLiveAttendanceSummaryOutputSchema = z.string().describe('A natural language summary of the live attendance status.');
export type GenerateLiveAttendanceSummaryOutput = z.infer<typeof GenerateLiveAttendanceSummaryOutputSchema>;

// Define an internal schema for the prompt, which includes calculated fields
const PromptInputSchema = GenerateLiveAttendanceSummaryInputSchema.extend({
  presentCount: z.number(),
  absentCount: z.number().optional(),
  attendancePercentage: z.number().optional(),
});
type PromptInput = z.infer<typeof PromptInputSchema>;

// Define the prompt
const liveAttendanceSummaryPrompt = ai.definePrompt({
  name: 'liveAttendanceSummaryPrompt',
  input: {schema: PromptInputSchema},
  output: {schema: GenerateLiveAttendanceSummaryOutputSchema}, // Output is just a string
  prompt: `You are an AI assistant tasked with generating a concise, natural language summary of live attendance for a class.
Provide a clear overview of who is present, the total count of present students, and if available, the total class size, absent count, and attendance percentage.

Class: {{{className}}}
Subject: {{{subjectName}}}
Division: {{{divisionName}}}

Current Status:
Number of Students Recognized as Present: {{{presentCount}}}
{{#if totalStudents}}
Total Students in Class: {{{totalStudents}}}
Absent Students: {{{absentCount}}}
Attendance Percentage: {{attendancePercentage}}%
{{/if}}

Recognized Students:
{{#each recognizedStudents}}
- {{this}}
{{/each}}
{{#unless recognizedStudents}}
No students have been recognized yet.
{{/unless}}

Based on the above information, generate a natural language summary of the live attendance status.
Start directly with the summary, without any preamble like 'Here is the summary:'.
Focus on providing a human-readable overview.
`
});

// Define the Genkit flow
const generateLiveAttendanceSummaryFlow = ai.defineFlow(
  {
    name: 'generateLiveAttendanceSummaryFlow',
    inputSchema: GenerateLiveAttendanceSummaryInputSchema,
    outputSchema: GenerateLiveAttendanceSummaryOutputSchema,
  },
  async (input) => {
    const presentCount = input.recognizedStudents.length;
    let absentCount: number | undefined;
    let attendancePercentage: number | undefined;

    if (input.totalStudents !== undefined) {
      absentCount = input.totalStudents - presentCount;
      attendancePercentage = (presentCount / input.totalStudents) * 100;
      // Round to two decimal places
      attendancePercentage = parseFloat(attendancePercentage.toFixed(2));
    }

    const promptInput: PromptInput = {
      ...input,
      presentCount,
      absentCount,
      attendancePercentage,
    };

    const {output} = await liveAttendanceSummaryPrompt(promptInput);
    return output!;
  }
);

// Wrapper function to call the Genkit flow
export async function generateLiveAttendanceSummary(
  input: GenerateLiveAttendanceSummaryInput
): Promise<GenerateLiveAttendanceSummaryOutput> {
  return generateLiveAttendanceSummaryFlow(input);
}
