import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import History from "./history";
import Logout from "./logout";
import ThemeToggle from "./theme-toggle";

export default function Nav({ user }: { user: User | null }) {
  return (
    <nav className="flex justify-between items-center p-4 px-6 md:px-10 z-50 relative">
      <Link href="/">
        <Image
          src={"/favicon.ico"}
          alt="withupi logo"
          width={50}
          height={50}
          className="rounded-xl"
        />
      </Link>
      <div className="flex items-center gap-2">
        {user && <History />}
        <ThemeToggle />
        {user && <Logout />}
      </div>
    </nav>
  );
}
