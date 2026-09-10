import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { checkReviewAdminSession } from "@/lib/reviews/admin-guard";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Accedi",
};

export default async function AdminLoginPage() {
  const { isAdmin } = await checkReviewAdminSession();

  if (isAdmin) {
    redirect("/admin/reviews");
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <LoginForm />
    </main>
  );
}
