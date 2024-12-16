"use client";

import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/lib/supabase/client";
import { authTheme } from "@/lib/supabase/auth-theme";

export function AuthForm() {
  return (
    <div className="w-full max-w-md mx-auto p-6">
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: authTheme,
          style: {
            button: {
              borderRadius: '6px',
              height: '40px',
              fontSize: '14px',
            },
            input: {
              borderRadius: '6px',
              height: '40px',
              fontSize: '16px',
              color: 'white',
              backgroundColor: 'transparent',
            },
            label: {
              fontSize: '14px',
              marginBottom: '4px',
              color: 'rgb(156 163 175)',
            },
            message: {
              fontSize: '14px',
              marginTop: '4px',
              color: 'rgb(156 163 175)',
            },
            anchor: {
              color: 'hsl(var(--primary))',
              textDecoration: 'none',
            },
          },
          className: {
            input: "bg-transparent text-white border-gray-600 placeholder:text-gray-400 focus:border-primary focus:ring-primary",
            label: "text-gray-400",
            message: "text-gray-400",
            button: "bg-primary text-primary-foreground hover:bg-primary/90",
            container: "space-y-4",
            divider: "bg-gray-800",
            anchor: "text-primary hover:text-primary/90",
          },
        }}
        providers={["google", "github"]}
        redirectTo={`${window.location.origin}/auth/callback`}
        theme="dark"
      />
    </div>
  );
}