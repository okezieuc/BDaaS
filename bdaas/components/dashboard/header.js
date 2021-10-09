import Container from "../container";
import Link from "next/link";

// TODO: Make active to depend on the current page location

function HeaderLink({ active, to }) {
  return (
    <div
      class={`px-4 py-2 border-gray-800 hover:bg-gray-50 ${
        active ? "border-b-4 bg-gray-100" : ""
      }`}
    >
      <Link href={to}>
        <a class="text-lg ">Dashboard</a>
      </Link>
    </div>
  );
}

// TODO: Make the Sign out button to sign out of the account

export default function Header() {
  return (
    <div class="pt-4 border-b">
      <Container>
        <div class="flex items-center justify-between">
          <h1 class="text-3xl my-4 font-bold">BDaaS</h1>
          <button class="bg-gray-900 text-white px-6 py-2 text-lg hover:bg-gray-800">
            Sign out
          </button>
        </div>
        <div class="flex mt-8">
          <HeaderLink active={true} to="/dashboard" title="Dashboard" />
          <HeaderLink active={false} to="/" title="About us" />
        </div>
      </Container>
    </div>
  );
}
