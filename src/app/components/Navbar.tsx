import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { useCartStore } from "@/store";
import CartButton from "./CartBtn";

export default function Navbar() {
  // const useStore = useCartStore();

  return (
    <nav className="fixed top-0 w-full flex item-center py-2 px-8 justify-between z-30 bg-slate-800 text-gray-300">
      <Link
        href="/"
        className="uppercase font-bold text-base h-12 flex items-center"
      >
        Single Store
      </Link>
      <div className="flex items-center gap-8 ">
        <CartButton />
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="uppercase font-bold text-base h-12 px-3 py-2 rounded-md">
              Fazer Login
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}
