import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

// TODO: Add SD Card logo
// TODO: Check for an active session and display link to dashboard instead if there is

export default function IndexPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ provider: "google" });
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
        </div>
      </div>
    </div>
  );
}
