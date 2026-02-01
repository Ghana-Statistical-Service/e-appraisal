"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === "12345") {
      setError("");
      router.push("/dashboard");
      return;
    }
    setError("Invalid credentials. Use password 12345.");
  };

  return (
    <div className="min-h-screen bg-[#0b1020] text-white">
      <div className="min-h-screen grid lg:grid-cols-2">
        <div className="relative hidden lg:flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b1020] via-[#121c3b] to-[#0b1020]" />
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#17B8A6]/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#382873]/30 blur-3xl" />
          <div className="relative z-10 max-w-md">
            <img src="/gsslogo.png" alt="GSS logo" className="h-70 w-70 mb-6 items-center mx-auto" />
            <h1 className="text-4xl font-semibold leading-tight text-center">
              E-APPRAISAL SYSTEM
            </h1>
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg mt-16">
              <p className="text-sm text-blue-400">
                Staff Performance Planning, Review and Appraisal form.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-12 bg-gradient-to-br from-white via-[#f5f7fb] to-[#eef2ff]">
          <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-white/60 p-8 text-[#0f1117]">
            <div className="flex items-center gap-3 mb-6">
              <img src="/gsslogo.png" alt="GSS logo" className="h-10 w-10" />
              <div>
                <p className="text-sm text-slate-500">Ghana Statistical Service</p>
                <h2 className="text-xl font-semibold">Login</h2>
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-600">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="bg-white border border-slate-300 focus:border-slate-500 focus:ring-0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-600">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="bg-white border border-slate-300 focus:border-slate-500 focus:ring-0"
                  required
                />
              </div>

              {error ? (
                <p className="text-sm text-red-500">{error}</p>
              ) : null}

              <Button type="submit" className="w-full bg-[#382873] hover:bg-[#2b1f5c]">
                Login
              </Button>
            </form>

            <p className="mt-8 text-center text-xs text-slate-500">
              Designed &amp; Maintained by Ghana Statistical Service DST Directorate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
