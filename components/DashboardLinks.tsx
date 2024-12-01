"use client";

import { cn } from "@/lib/utils"
import { HomeIcon, Users2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"


export const dashboardLinks = [
  {
    id: 0,
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon
  },
  {
    id: 1,
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: Users2
  },
]


export function DashboardLinks() {
  const pathname = usePathname()
  return (
    <>
      {dashboardLinks.map((link) => (
        <Link href={link.href} key={link.id} className={cn(
          pathname === link.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground", "flex items-center gap-4 rounded-lg px-3 py-3 transition-all hover:text-primary font-bold"
        )}>
          <link.icon className="size-5 text-blue-600" />
          {link.name}
        </Link>
      ))}
    </>
  )
}