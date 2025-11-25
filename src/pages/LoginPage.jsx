import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ---------------------- REUSABLE INPUTS ----------------------- */

function TextField({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-200"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full rounded-xl border bg-slate-900/70 px-3.5 py-2.5 text-sm 
        text-slate-50 placeholder:text-slate-500 outline-none transition
        border-slate-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/80
        ${error ? "border-rose-500 focus:ring-rose-500/80" : ""}`}
      />
      {error && <p className="text-xs text-rose-400">{error}</p>}
    </div>
  );
}

function PasswordField({ id, label, value, onChange, error, autoComplete }) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-200"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className={`w-full rounded-xl border bg-slate-900/70 px-3.5 py-2.5 pr-10 text-sm 
          text-slate-50 placeholder:text-slate-500 outline-none transition
          border-slate-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/80
          ${error ? "border-rose-500 focus:ring-rose-500/80" : ""}`}
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute inset-y-0 right-2 flex items-center px-2 
          text-slate-400 hover:text-slate-100 
          focus-visible:ring-2 focus-visible:ring-violet-500"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? (
            <svg className="h-4 w-4" fill="none" stroke="currentColor">
              <path d="M3 3l18 18" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="3" strokeWidth="2" />
              <path
                d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                strokeWidth="2"
              />
            </svg>
          )}
        </button>
      </div>

      {error && <p className="text-xs text-rose-400">{error}</p>}
    </div>
  );
}

function CheckboxField({ id, checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded bg-slate-900/80 text-violet-500"
      />
      <span>{label}</span>
    </label>
  );
}

function SocialButton({ variant, label, children }) {
  const base =
    "inline-flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

  const variants = {
    google:
      "border border-slate-600 bg-slate-900/40 text-slate-100 hover:bg-slate-800",
    apple:
      "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100",
  };

  const className = base + " " + (variants[variant] || "");

  return (
    <button type="button" className={className}>
      {children}
      <span>{label}</span>
    </button>
  );
}

/* ---------------------- LOGIN FORM ----------------------- */

function LoginForm({ onForgotPassword, onSignupLink }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next = {};
    if (!email.trim()) next.email = "Email is required.";
    if (!password.trim()) next.password = "Password is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Login successful!");
    }, 1200);
  };

  return (
    <form onSubmit={submit} className="space-y-6 flex-1">
      <TextField
        id="login-email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        autoComplete="email"
      />

      <PasswordField
        id="login-password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        autoComplete="current-password"
      />

      <div className="flex justify-between items-center">
        <CheckboxField
          id="remember"
          checked={remember}
          onChange={setRemember}
          label="Remember me"
        />
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-xs text-violet-300 hover:underline"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2.5
        font-semibold text-white shadow-lg hover:from-violet-400 hover:to-fuchsia-400 disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>

      {/* Separator */}
      <div className="flex items-center gap-3 text-xs text-slate-400">
        <div className="flex-1 h-px bg-slate-700" />
        <span>Or continue with</span>
        <div className="flex-1 h-px bg-slate-700" />
      </div>

      {/* Social logins */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SocialButton variant="google" label="Google">
          <span className="bg-white text-slate-900 px-2 py-1 rounded-full text-xs font-bold">
            G
          </span>
        </SocialButton>
        <SocialButton variant="apple" label="Apple">
          <svg className="h-4 w-4" fill="currentColor">
            <path d="M17 20c-.8.8-1.7 1-2.2 1s-1-.3-1.7-.3c-.7 0-1.3.3-2 .3-1 0-2-.9-2.8-1.9C6.4 17.2 6 16 6 14.8c0-1.6.7-2.4 1.9-3 .8-.4 1.6-.6 2.5-.6.6 0 1.2.2 1.8.2.5 0 1-.2 1.8-.4.3 0 .7-.1 1-.1.8 0 1.6.3 2.1.8-.6.4-1.1 1.1-1.1 2 0 1.1.6 1.9 1.3 2.3-.4.8-.9 1.5-1.3 1.9z" />
          </svg>
        </SocialButton>
      </div>

      <p className="text-center text-xs text-slate-400 pt-3">
        New to our store?{" "}
        <button
          type="button"
          onClick={onSignupLink}
          className="font-medium text-violet-300 hover:underline"
        >
          Create account
        </button>
      </p>
    </form>
  );
}

/* ---------------------- RESET PASSWORD (EMAIL + OTP) ----------------------- */

function ResetPasswordForm({ onBack }) {
  const [step, setStep] = useState("email"); // 'email' | 'otp'
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      alert("Enter your email.");
      return;
    }
    alert("OTP sent (simulated).");
    setStep("otp");
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (!otp.trim() || !newPass.trim()) {
      alert("Enter OTP and new password.");
      return;
    }
    alert("Password reset successful!");
    onBack();
  };

  if (step === "email") {
    return (
      <form onSubmit={handleSendCode} className="space-y-6 flex-1">
        <TextField
          id="reset-email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2.5
          font-semibold text-white shadow-lg hover:from-violet-400 hover:to-fuchsia-400"
        >
          Send OTP
        </button>

        <button
          type="button"
          onClick={onBack}
          className="text-xs text-slate-400 hover:underline"
        >
          Back to login
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleReset} className="space-y-6 flex-1">
      <TextField
        id="reset-otp"
        label="One-time code"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter the code"
      />

      <PasswordField
        id="reset-new-pass"
        label="New password"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
      />

      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2.5
        font-semibold text-white shadow-lg hover:from-violet-400 hover:to-fuchsia-400"
      >
        Reset password
      </button>

      <button
        type="button"
        onClick={onBack}
        className="text-xs text-slate-400 hover:underline"
      >
        Back to login
      </button>
    </form>
  );
}

/* ---------------------- MAIN PAGE ----------------------- */

export default function LoginPage() {
  const [view, setView] = useState("login"); // 'login' | 'reset'
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-3xl overflow-hidden bg-slate-950/80 border border-white/5 shadow-xl backdrop-blur-xl">
        {/* Right panel: form */}
        <div className="md:w-[55%] p-8 sm:p-12">
          <h1 className="text-3xl font-semibold mb-2">
            {view === "login" ? "Welcome back" : "Reset password"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mb-6">
            {view === "login"
              ? "Sign in to track your orders, manage your wishlist, and check out faster."
              : "Enter your email to receive a one-time code, then set a new password."}
          </p>

          {view === "login" ? (
            <LoginForm
              onForgotPassword={() => setView("reset")}
              onSignupLink={() => navigate("/signup")}
            />
          ) : (
            <ResetPasswordForm onBack={() => setView("login")} />
          )}
        </div>

        {/* Left panel: branding */}
        <div className="md:w-[45%] relative bg-cover bg-center bg-[url('https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg')]">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-purple-900/60"></div>

          <div className="absolute top-5 left-6 text-lg font-semibold tracking-[0.25em]">
            AMU
          </div>

          <div className="absolute top-5 right-6">
            <button className="rounded-full bg-white/10 px-4 py-1.5 text-xs border border-white/20 text-slate-50">
              ← Back to website
            </button>
          </div>

          <div className="absolute bottom-12 left-6 text-white">
            <p className="text-xl font-semibold">Welcome back,</p>
            <p className="text-xl font-semibold">we missed you.</p>
          </div>

          <div className="absolute bottom-6 w-full flex justify-center">
            <div className="flex items-center gap-2">
              <span className="h-2 w-5 rounded-full bg-white/90" />
              <span className="h-2 w-2 rounded-full bg-white/40" />
              <span className="h-2 w-2 rounded-full bg-white/40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}