import { useState, useEffect } from "react";
import { Popover } from "@headlessui/react";

import NewBirthday from "../../components/dashboard/newBirthday";
import { supabase } from "../../utils/supabaseClient";
import { months } from "../../utils/months";

// TODO: Add a card that says Add Birthday

function Birthday({ data }) {
  async function deleteBirthday() {
    try {
      let { error } = await supabase
        .from("birthdays")
        .delete()
        .match({ birthday_id: data.birthday_id });
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="border border-gray-700 bg-gray-700 shadow-sm hover:shadow-xl rounded-lg p-4">
      <div className="flex justify-between">
        <p className="text-xl font-semibold text-gray-300">
          {data.celebrant_name}
        </p>
        <div>
          <Popover className="relative">
            <Popover.Button>
              <div className="bg-gray-500 rounded-md text-gray-800">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </div>
            </Popover.Button>

            <Popover.Panel className="absolute z-10 transform -translate-x-3/4 bg-gray-600 rounded-lg p-4">
              <div className="grid text-gray-400">
                <button
                  className="hover:text-red-400"
                  onClick={() => deleteBirthday()}
                >
                  <div className="flex gap-2">
                    <span>
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </span>
                    <span>Delete</span>
                  </div>
                </button>
              </div>
            </Popover.Panel>
          </Popover>
        </div>
      </div>
      <div className="flex justify-between items-center gap-2 mt-4 text-gray-400">
        <div className="text-indigo-400">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
            />
          </svg>
        </div>
        <div>
          {data.birthday_day} {months[data.birthday_month]}
        </div>
      </div>
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
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg"
          onClick={() => setNewBirthdayOpen(!newBirthdayOpen)}
        >
          <div className="flex items-center gap-2">
            <span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </span>
            <span>Add birthday</span>
          </div>
        </button>
        <button
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg"
          onClick={loadBirthdays}
        >
          <div className="flex gap-2">
            <span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </span>
            <span>Refresh</span>
          </div>
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
