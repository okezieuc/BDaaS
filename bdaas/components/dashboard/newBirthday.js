import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function NewBirthday() {
  const [loading, setLoading] = useState(false);
  const [celebrantName, setCelebrantName] = useState(null);
  const [celebrantBirthDay, setCelebrantBirthDay] = useState(null);
  const [celebrantBirthMonth, setCelebrantBirthMonth] = useState(null);

  async function createBirthday(name, day, month) {
    try {
      setLoading(true);
      let { error } = await supabase.from("birthdays").insert([
        {
          user_id: supabase.auth.user().id,
          celebrant_name: name,
          birthday_day: day,
          birthday_month: month,
        },
      ]);
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div>
        <label htmlFor="celebrant-name">Name</label>
        <input
          id="celebrant-name"
          type="text"
          onChange={(e) => setCelebrantName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="birthday-day">Birthday Day of Month</label>
        <input
          id="birthday-day"
          type="number"
          onChange={(e) => setCelebrantBirthDay(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="birthday-month">Birthday Month of Year</label>
        <input
          id="birthday-month"
          type="number"
          onChange={(e) => setCelebrantBirthMonth(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={() =>
            createBirthday(
              celebrantName,
              celebrantBirthDay,
              celebrantBirthMonth
            )
          }
          disabled={loading}
        >
          Create Birthday
        </button>
      </div>
    </div>
  );
}
