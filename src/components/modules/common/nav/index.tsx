import Image from "next/image";
import Link from "next/link";
import Logout from "./logout";
import { User } from "@supabase/supabase-js";

export default function Nav({ user }: { user: User | null }) {
  return (
    <nav className="flex justify-between items-center p-4 px-6 md:px-10">
      <Link href="/">
        <Image
          src={"/favicon.ico"}
          alt="withupi logo"
          width={50}
          height={50}
          className="rounded-xl"
        />
      </Link>
      {user && <Logout />}
    </nav>
  );
}
