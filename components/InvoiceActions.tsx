"use client";

import {
  CheckCircle,
  DownloadCloud,
  Mail,
  MoreHorizontal,
  PencilIcon,
  Trash,
} from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Link from 'next/link';
import { toast } from 'sonner';

interface InvoiceActionsProps {
  id: string;
}

export function InvoiceActions({ id }: InvoiceActionsProps) {
  const handleSendReminder = async () => {
    toast.promise(
      fetch(`/api/email/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      {
        loading: 'Sending reminder email...',
        success: 'Reminder email sent successfully',
        error: 'Failed to send reminder email',
      }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'secondary'} size={'icon'}>
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/${id}`}>
            <PencilIcon className="size-4 mr-2 text-blue-800" />
            Edit Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/api/invoice/${id}`} target="_blank">
            <DownloadCloud className="size-4 mr-2 text-blue-400" />
            Download Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSendReminder}>
          <Mail className="size-4 mr-2 text-yellow-600" />
          Reminder Email
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'#'}>
            <CheckCircle className="size-4 mr-2 text-green-600" />
            Mark as Paid
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/${id}/delete`}>
            <Trash className="size-4 mr-2 text-red-500" />
            Delete Invoice
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
