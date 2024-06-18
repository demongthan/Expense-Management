import React from 'react'
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface Props{
    link: string;
  label: string;
  clickCallback?: () => void;
}

const NavbarItem = ({link, label, clickCallback}:Props) => {
    const pathname = usePathname();
    const isActive = pathname === link;
  
    return (
      <div className="relative flex items-center">
        <Link
          href={link}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "w-full justify-start text-lg text-muted-foreground hover:text-foreground",
            isActive && "text-foreground"
          )}
          onClick={() => {
            if (clickCallback) clickCallback();
          }}
        >
          {label}
        </Link>
        {isActive && (
          <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block" />
        )}
      </div>
    );
}

export default NavbarItem