import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function IndexPage() {
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ provider: 'google' });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className=""
          disabled={loading}
        >
          <span>{loading ? "Loading" : "Sign in with Google"}</span>
        </button>
      </div>
    </div>
  );
}
