"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/app/store/slices/authSlice";
import { AppDispatch } from "@/app/store/store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          }),
        );
      } else {
        dispatch(clearUser());
      }
    });
    //clean up subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}
