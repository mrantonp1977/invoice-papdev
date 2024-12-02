import { Ban, PlusCircle, PlusIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";


interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
};

export function EmptyState({ title, description, buttonText, href }: EmptyStateProps) {
  return (
    <div className="bg-gray-100 flex flex-col flex-1 h-full items-center justify-center rounded-md border-2 border-dashed p-8 text-center animate-in fade-in-50">
      <div className="flex items-center justify-center size-20 rounded-full">
        <Ban className="size-16 text-blue-500" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">
        {title}
      </h2>
      <p className="mb-8 mt-2 text-lg text-muted-foreground max-w-sm mx-auto text-center">
        {description}
      </p>
      <Link href={href} className={buttonVariants()}>
        <PlusIcon className="size-5 mr-2" />
        {buttonText}
      </Link>
    </div>
  )
}