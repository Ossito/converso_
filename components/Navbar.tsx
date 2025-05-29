import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import { SignedOut, SignInButton, SignUpButton, SignedIn, UserButton } from "@clerk/nextjs";


const Navbar = () => {
  return (
    <nav className="navbar">

      {/* Nav Brand (LOGO) */}
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image src="/images/logo.svg" alt="logo" width={46} height={46} />
        </div>
      </Link>

      {/* Nav items */}
      <div className="flex items-center gap-8">
        <NavItems/>
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton>
                <button className="btn-sign-in">Connexion</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;