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
    <div>
      <Header />
      <Container>
        <div class="mt-8">
          <div>
            Howdy{" "}
            {session ? session.user.user_metadata.full_name : "not logged in"}
          </div>
          <button
            class="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2"
            onClick={() => setNewBirthdayOpen(!newBirthdayOpen)}
          >
            Add birthday
          </button>
          {newBirthdayOpen ? <NewBirthday /> : ""}
          <Birthdays />
        </div>
      </Container>
    </div>
  );
}
