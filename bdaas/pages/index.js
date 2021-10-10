import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../utils/supabaseClient";

// TODO: Add SD Card logo
// TODO: Check for an active session and display link to dashboard instead if there is

export default function IndexPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn(
        { provider: "google" },
        { redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard` }
      );
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:text-center pt-16">
        <p className="text-2xl md:text-3xl md:mb-16 text-indigo-600 text-semibold font-mono">
          BDaaS
        </p>
        <h1 className="text-6xl text-gray-200 font-bold">
          BIRTHDAY AS A <span className="text-indigo-600">SERVICE</span>
        </h1>
        <h2 className="text-2xl text-gray-300 py-8">
          Sign up today to receive email notifications on people's birthdays.
        </h2>
        <div className="w-max md:mx-auto">
          {session ? (
            <Link href="/dashboard">
              <a className="bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500 mx-auto">
                Go to My Dashboard
              </a>
            </Link>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500 mx-auto"
              disabled={loading}
            >
              <span>{loading ? "Loading" : "Sign in with Google"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
