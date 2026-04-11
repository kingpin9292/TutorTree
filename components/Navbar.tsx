import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href={"/"}>
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image src={"/images/logo.svg"} alt="logo" width={46} height={46} />
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <NavItems />
        <Show when="signed-out">
          <SignInButton>
            <Button className="btn-signin">Sign In </Button>
          </SignInButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </nav>
  );
};

export default Navbar;
