import { useState, useEffect } from "react";
import NewBirthday from "../../components/dashboard/newBirthday";
import { supabase } from "../../utils/supabaseClient";
import { months } from "../../utils/months";

// TODO: Add a card that says Add Birthday

function Birthday({ data }) {
  return (
    <div className="border border-gray-700 bg-gray-700 shadow-sm hover:shadow-xl rounded-lg p-4">
      <p className="text-xl font-semibold text-gray-300">
        {data.celebrant_name}
      </p>
      <p className="mt-4 text-gray-400">
        {data.birthday_day} {months[data.birthday_month]}
      </p>
    </div>
  );
}

// TODO: Change refresh birthdays to an icon

export default function Birthdays() {
  const [birthdays, setBirthdays] = useState([]);
  const [newBirthdayOpen, setNewBirthdayOpen] = useState(false);

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
      <div className="flex justify-between items-center mb-8">
        <button
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2"
          onClick={() => setNewBirthdayOpen(!newBirthdayOpen)}
        >
          Add birthday
        </button>
        <button
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2"
          onClick={loadBirthdays}
        >
          Refresh Birthdays
        </button>
      </div>
      <NewBirthday
        open={newBirthdayOpen}
        onClose={() => setNewBirthdayOpen(false)}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {birthdays.map((birthday) => (
          <Birthday data={birthday} key={birthday.birthday_id} />
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
