"use client";
import { useSignUp } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import Link from "next/link";

const signUpSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpCustomForm() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  async function handleGoogleSignUp() {
    if (!isLoaded || !signUp) return;
    setError(null);
    setLoading(true);
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Erro ao cadastrar com Google");
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(data: SignUpFormData) {
    if (!isLoaded) return;
    setError(null);
    setLoading(true);
    try {
      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        window.location.href = "/";
      } else {
        setError("Verifique seu e-mail para confirmação.");
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Erro ao cadastrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-sm mx-auto p-4 bg-white rounded shadow"
      autoComplete="off"
    >
      <h1 className="text-2xl font-bold text-center mb-2">Cadastro</h1>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded px-3 py-2 font-bold bg-white text-black hover:bg-gray-100 transition disabled:opacity-60"
        onClick={handleGoogleSignUp}
        disabled={loading}
        aria-label="Cadastrar com Google"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><g><path fill="#4285F4" d="M21.805 10.023h-9.765v3.977h5.613c-.243 1.309-1.464 3.844-5.613 3.844-3.377 0-6.132-2.794-6.132-6.209s2.755-6.209 6.132-6.209c1.924 0 3.217.819 3.958 1.523l2.707-2.633C17.064 2.834 14.942 2 12.04 2 6.477 2 2 6.477 2 12s4.477 10 10.04 10c5.783 0 9.6-4.059 9.6-9.777 0-.657-.07-1.158-.164-1.637z"/><path fill="#34A853" d="M3.153 7.345l3.273 2.403c.819-1.55 2.353-2.625 4.074-2.625 1.161 0 2.197.398 3.018 1.178l2.708-2.633C14.942 2.834 12.82 2 9.918 2 6.477 2 2 6.477 2 12c0 1.67.438 3.237 1.153 4.655z"/><path fill="#FBBC05" d="M12.04 22c2.902 0 5.024-.963 6.573-2.619l-3.054-2.498c-.819.553-1.862.885-3.519.885-2.8 0-5.162-1.887-6.022-4.425l-3.025 2.34C4.477 19.523 8.954 22 12.04 22z"/><path fill="#EA4335" d="M21.805 10.023h-9.765v3.977h5.613c-.243 1.309-1.464 3.844-5.613 3.844-3.377 0-6.132-2.794-6.132-6.209s2.755-6.209 6.132-6.209c1.924 0 3.217.819 3.958 1.523l2.707-2.633C17.064 2.834 14.942 2 12.04 2 6.477 2 2 6.477 2 12s4.477 10 10.04 10c5.783 0 9.6-4.059 9.6-9.777 0-.657-.07-1.158-.164-1.637z" opacity=".1"/></g></svg>
        Cadastrar com Google
      </button>

      <div>
        <label htmlFor="email" className="block font-medium mb-1">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="password" className="block font-medium mb-1">
          Senha
        </label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          {...register("password")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password.message}</span>
        )}
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <label className="flex items-center gap-2 text-sm mb-2">
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(v => !v)}
        />
        Mostrar senha
      </label>
      <div id="clerk-captcha" className="mb-2" />
      <button
        type="submit"
        className="bg-black text-white rounded px-4 py-2 font-bold mt-2 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>

      <div className="flex flex-col gap-2 mt-2 text-center text-sm">
        <span>
          Já tem conta?{' '}
          <Link href="/sign-in" className="text-blue-600 hover:underline font-medium">Entrar</Link>
        </span>
      </div>
    </form>
  );
}
