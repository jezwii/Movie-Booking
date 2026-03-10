import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config";
import { provider } from "@/app/firebase/googleProvider";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export function useAuth() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const signInWithEmail = async (email: string, password: string) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch {
      setError("Sign-in failed. Please check your credentials.");
    }
  };

  const signInWithGoogle = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch {
      setError("Google sign-in failed.");
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch {
      setError("Could not create account. Please try again.");
    }
  };

  const signUpWithGoogle = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch {
      setError("Google sign-up failed.");
    }
  };

  return { error, signInWithEmail, signInWithGoogle, signUpWithEmail, signUpWithGoogle };
}
