import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";

// TODO: Add a card that says Add Birthday

function Birthday({ data }) {
  return (
    <div class="border shadow-sm rounded-lg p-4">
      <p class="text-xl font-semibold">{data.celebrant_name}</p>
      <p class="mt-4">
        {data.birthday_day} {data.birthday_month}
      </p>
    </div>
  );
}

export default function Birthdays() {
  const [birthdays, setBirthdays] = useState([]);

  async function loadBirthdays() {
    const { data, error } = await supabase.from("birthdays").select();
    if (!error) {
      setBirthdays(data);
    }
    return data;
  }

  useEffect(() => {
    loadBirthdays();
  }, []);

  return (
    <div>
      <button onClick={loadBirthdays}>Refresh Birthdays</button>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {birthdays.map((birthday) => (
          <Birthday data={birthday} />
        ))}
      </div>
    </div>
  );
}

Birthday.defaultProps = {
  data: {
    celebrant_name: "John Doe",
    birthday_day: 4,
    birthday_month: 3,
  },
};
