import { AuthForm } from "@/components/auth/auth-form";
import { AuthHeader } from "@/components/auth/auth-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AuthPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] py-8">
      <Card className="w-full max-w-md bg-gray-900/95 border-gray-800 shadow-xl">
        <CardHeader className="space-y-1">
          <AuthHeader />
        </CardHeader>
        <CardContent>
          <AuthForm />
        </CardContent>
      </Card>
    </div>
  );
}