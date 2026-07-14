"use client";

import { FormEvent, type ReactNode, useEffect, useState } from "react";
import { LockKeyhole, ShieldCheck } from "lucide-react";

const betaPassword = "constellax-beta-2026";
const storageKey = "constellax-beta-access";

export function BetaGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setUnlocked(window.localStorage.getItem(storageKey) === "granted");
    setReady(true);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password.trim() !== betaPassword) {
      setError("That password is not correct.");
      return;
    }

    window.localStorage.setItem(storageKey, "granted");
    setUnlocked(true);
  }

  if (!ready) {
    return <main className="betaGate loading" aria-label="Loading private beta" />;
  }

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <main className="betaGate">
      <section className="betaGatePanel">
        <div className="betaGateMark">CX</div>
        <p className="appleEyebrow">Private beta</p>
        <h1>ConstellaX is protected.</h1>
        <p>
          Enter the beta password to view the live product demo. This keeps the early version calm,
          private, and ready for selected investors and beta users.
        </p>

        <form className="betaGateForm" onSubmit={handleSubmit}>
          <label>
            <span>Password</span>
            <div>
              <LockKeyhole size={18} />
              <input
                autoFocus
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                placeholder="Enter beta password"
              />
            </div>
          </label>

          {error ? <p className="betaGateError">{error}</p> : null}

          <button type="submit">
            <ShieldCheck size={18} />
            Enter Constellax
          </button>
        </form>

        <small>Access is mock-only for beta preview. Real account security comes with Supabase Auth next.</small>
      </section>
    </main>
  );
}
