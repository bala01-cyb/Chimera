import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  User,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  signOut: () => Promise<void>;
  isFirebaseEnabled: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isFirebaseEnabled = !!auth;

  useEffect(() => {
    // If Firebase is not configured, just set loading to false
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signUpWithEmail = async (email: string, password: string) => {
    if (!auth) {
      throw new Error("Firebase is not configured. Please add Firebase credentials to enable authentication.");
    }
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (cred.user && !cred.user.emailVerified) {
      try {
        await sendEmailVerification(cred.user);
      } catch (err) {
        console.error("Failed to send verification email", err);
      }
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    if (!auth) {
      throw new Error("Firebase is not configured. Please add Firebase credentials to enable authentication.");
    }
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    if (!auth || !googleProvider) {
      throw new Error("Firebase is not configured. Please add Firebase credentials to enable authentication.");
    }
    await signInWithPopup(auth, googleProvider);
  };

  const sendVerificationEmail = async () => {
    if (!auth) {
      throw new Error("Firebase is not configured. Please add Firebase credentials to enable authentication.");
    }
    if (!auth.currentUser) {
      throw new Error("No authenticated user to verify");
    }
    await sendEmailVerification(auth.currentUser);
  };

  const signOut = async () => {
    if (!auth) {
      throw new Error("Firebase is not configured. Please add Firebase credentials to enable authentication.");
    }
    await firebaseSignOut(auth);
  };

  const value: AuthContextValue = {
    user,
    loading,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    sendVerificationEmail,
    signOut,
    isFirebaseEnabled,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
