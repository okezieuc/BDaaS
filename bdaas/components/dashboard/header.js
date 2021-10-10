import Container from "../container";
import Link from "next/link";

// TODO: Make active to depend on the current page location

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

// TODO: Make the Sign out button to sign out of the account

export default function Header() {
  return (
    <div className="pt-4 bg-gray-700">
      <Container>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl my-4 font-bold text-gray-200">BDaaS</h1>
          <button className="bg-indigo-600 text-white px-6 py-2 text-lg hover:bg-indigo-500">
            Sign out
          </button>
        </div>
        <div className="flex mt-8">
          <HeaderLink active={true} to="/dashboard" title="Dashboard" />
          <HeaderLink active={false} to="/" title="About us" />
        </div>
      </Container>
    </div>
  );
}
