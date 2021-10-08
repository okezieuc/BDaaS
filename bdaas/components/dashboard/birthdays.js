import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";

function Birthday({ data }) {
  return (
    <div>
      <p>{data.celebrant_name}</p>
      <p>
        {data.birthday_day} {data.birthday_month}
      </p>
    </div>
  );
}

export default function Birthdays() {
  const [birthdays, setBirthdays] = useState([]);

  async function loadBirthdays() {
    const { data, error } = await supabase.from("birthdays").select();
    setBirthdays(data);
    return data;
  }

  useEffect(() => {
    loadBirthdays();
  }, []);

  return (
    <div>
      <button onClick={loadBirthdays}>Refresh Birthdays</button>
      {birthdays.map((birthday) => (
        <Birthday data={birthday} />
      ))}
    </div>
  );
}
