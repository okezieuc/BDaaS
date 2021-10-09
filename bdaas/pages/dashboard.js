import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Container from "../components/container";
import Header from "../components/dashboard/header";
import NewBirthday from "../components/dashboard/newBirthday";
import Birthdays from "../components/dashboard/birthdays";

// TODO: Add icons to buttons

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const [newBirthdayOpen, setNewBirthdayOpen] = useState(false);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div class="bg-gray-800 min-h-screen">
      <Header />
      <Container>
        <div class="mt-8">
          <div>
            Howdy{" "}
            {session ? session.user.user_metadata.full_name : "not logged in"}
          </div>
          <button
            class="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2"
            onClick={() => setNewBirthdayOpen(!newBirthdayOpen)}
          >
            Add birthday
          </button>
          <NewBirthday
            open={newBirthdayOpen}
            onClose={() => setNewBirthdayOpen(false)}
          />
          <Birthdays />
        </div>
      </Container>
    </div>
  );
}
