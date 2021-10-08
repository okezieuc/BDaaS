import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Header from "../components/dashboard/header";
import NewBirthday from "../components/dashboard/newBirthday";
import Birthdays from "../components/dashboard/birthdays";

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
      <div>
        Howdy {session ? session.user.user_metadata.full_name : "not logged in"}
      </div>
      <button onClick={() => setNewBirthdayOpen(!newBirthdayOpen)}>
        Add birthday
      </button>
      {newBirthdayOpen ? <NewBirthday /> : ""}
      <Birthdays />
    </div>
  );
}
