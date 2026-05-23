import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CollegeLogo } from '@/components/icons/college-logo';
import { ProjectLogo } from '@/components/icons/project-logo';

const AnimatedShapes = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute -bottom-1/4 -left-1/4 h-1/2 w-1/2 rounded-full bg-primary/10 animate-[spin_20s_linear_infinite]"></div>
    <div className="absolute -top-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-accent/10 animate-[spin_25s_linear_infinite_reverse]"></div>
    <div className="absolute bottom-1/2 right-1/2 h-24 w-24 rounded-lg bg-primary/20 animate-[spin_15s_linear_infinite]"></div>
  </div>
);

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-background via-background to-accent/20 p-4">
      <AnimatedShapes />
      <div className="w-full max-w-4xl rounded-xl bg-card shadow-2xl md:grid md:grid-cols-2">
        <div className="hidden flex-col justify-between rounded-l-xl bg-primary/90 p-8 text-primary-foreground md:flex">
          <div className="flex items-center gap-4">
            <CollegeLogo className="h-12 w-12" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Welcome Back, Educator!</h2>
            <p className="mt-2 text-primary-foreground/80">
              Streamline your attendance process with the power of AI. Let's get you started for your next class.
            </p>
          </div>
          <div className="text-sm text-primary-foreground/60">
            &copy; {new Date().getFullYear()} AttendAI. All Rights Reserved.
          </div>
        </div>
        <div className="flex flex-col justify-center p-8">
          <Card className="border-0 shadow-none">
            <CardHeader className="items-center text-center md:items-start md:text-left">
              <ProjectLogo className="mb-4 h-14 w-14 text-primary" />
              <CardTitle className="text-3xl font-bold">Teacher Login</CardTitle>
              <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teacher-id">Teacher ID</Label>
                <Input id="teacher-id" placeholder="e.g., T-12345" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember-me" />
                  <Label htmlFor="remember-me" className="text-sm font-normal">Remember me</Label>
                </div>
                <Link href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Link href="/dashboard" className="block w-full">
                <Button className="w-full">Login</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
