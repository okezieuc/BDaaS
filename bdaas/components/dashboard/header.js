import { useRouter } from "next/router";
import Container from "../container";
import Link from "next/link";
import { supabase } from "../../utils/supabaseClient";

function HeaderLink({ active, to, title }) {
  return (
    <div
      className={`px-4 py-2 border-indigo-500 hover:bg-gray-700 font-medium ${
        active ? "border-b-4 text-indigo-500" : "text-gray-300"
      }`}
    >
      <Link href={to}>
        <a className="text-lg ">{title}</a>
      </Link>
    </div>
  );
}

export default function Header() {
  const router = useRouter();

  const handleSignout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      router.push("/");
    }
  };

  return (
    <div className="pt-4 bg-gray-700">
      <Container>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl my-4 font-bold text-gray-200">
            <Link href="/">BDaaS</Link>
          </h1>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSignout();
            }}
            className="bg-indigo-600 text-white px-6 py-2 text-lg hover:bg-indigo-500"
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </span>
            </div>
          </button>
        </div>
        <div className="flex mt-8">
          <HeaderLink active={true} to="/dashboard" title="Dashboard" />
        </div>
      </Container>
    </div>
  );
}
