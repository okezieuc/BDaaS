import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Container from "../components/container";
import Header from "../components/dashboard/header";
import Birthdays from "../components/dashboard/birthdays";

// TODO: Add icons to buttons

export default function Dashboard() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="bg-gray-800 min-h-screen">
      <Header />
      <Container>
        <div className="mt-8">
          <Birthdays />
        </div>
      </Container>
    </div>
  );
}
