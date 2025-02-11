"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthForms() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div>
      {isSignUp ? (
        <RegisterForm onToggle={() => setIsSignUp(false)} />
      ) : (
        <LoginForm onToggle={() => setIsSignUp(true)} />
      )}
    </div>
  );
}
