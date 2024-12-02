import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { RainbowButton } from "./ui/rainbow-button";

export function Navbar() {
  return (
    <div className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image 
          src={Logo} 
          alt="Lofo"
          className="size-10"          
        />
        <h3 className="text-3xl font-extrabold">Invoice<span className="text-blue-700">PapDev</span></h3>
      </Link>
      <Link href={"/login"}>
        <RainbowButton>
          Get Started
        </RainbowButton>
      </Link>
    </div>
  )
}