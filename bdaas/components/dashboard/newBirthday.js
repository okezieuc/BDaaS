import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { supabase } from "../../utils/supabaseClient";
import { months } from "../../utils/months";

// TODO: Switch to dark themed modal

export default function NewBirthday({ open, onClose }) {
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
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-sm">
              <Dialog.Title
                as="h3"
                className="text-2xl font-medium leading-6 text-gray-900"
              >
                Create new Birthday
              </Dialog.Title>
              <div className="my-2">
                <p className="text-sm text-gray-500">
                  Fill in these details to receive an email to remind you of
                  this person's birthday
                </p>
              </div>

              <div>
                <div>
                  <div>
                    <label htmlFor="celebrant-name">Name</label>
                  </div>
                  <input
                    id="celebrant-name"
                    type="text"
                    class="w-full rounded-lg"
                    placeholder="John Doe"
                    onChange={(e) => setCelebrantName(e.target.value)}
                  />
                </div>
                <div class="flex gap-4 mt-4">
                  <div>
                    <label htmlFor="birthday-month">Birthday Month</label>
                    <select
                      class="form-select w-full rounded-lg"
                      onChange={(e) =>
                        setCelebrantBirthMonth(parseInt(e.target.value))
                      }
                    >
                      {months.map((month, index) => (
                        <option value={index}>{month}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="birthday-day">Day of Month</label>
                    <input
                      id="birthday-day"
                      type="number"
                      class="w-full rounded-lg"
                      onChange={(e) => setCelebrantBirthDay(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-indigo-900 bg-indigo-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  onClick={() =>
                    createBirthday(
                      celebrantName,
                      celebrantBirthDay,
                      celebrantBirthMonth
                    )
                  }
                  disabled={loading}
                >
                  Submit
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
