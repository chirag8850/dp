"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DocumentsPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/documents/dashboard");
  }, [router]);

  return null;
}
