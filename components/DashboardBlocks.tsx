import { ActivityIcon, CreditCard, DollarSign, UsersIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import prisma from '@/app/utils/db';
import { requireUser } from '@/app/utils/hooks';
import { formatCurrency } from '@/app/utils/formatCurrency';

async function getData(userId: string) {
  const [data, openInvoices, paidInvoices] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        userId: userId,
      },
      select: {
        total: true,
      },
    }),
    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: 'PENDING',
      },
      select: {
        id: true,
      },
    }),
    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: 'PAID',
      },
      select: {
        id: true,
      },
    }),
  ]);

  return {
    data,
    openInvoices,
    paidInvoices,
  };
}

export async function DashboardBlocks() {
  const session = await requireUser();
  const { data, openInvoices, paidInvoices } = await getData(
    session.user?.id as string
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
      <Card className="bg-blue-100 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-md font-semibold">Total Revenue</CardTitle>
          <DollarSign className="size-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">
            {formatCurrency({ amount: data.reduce((acc, invoice) => acc + invoice.total, 0), currency: 'USD' })}
          </h2>
          <p className="text-sm text-muted-foreground">
            Based on totla revenue from invoices
          </p>
        </CardContent>
      </Card>
      <Card className="bg-blue-100 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-md font-semibold">
            Total Invoices Issued
          </CardTitle>
          <UsersIcon className="size-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{data.length}</h2>
          <p className="text-sm text-muted-foreground">
            Total invoices issued in the last 30 days
          </p>
        </CardContent>
      </Card>
      <Card className="bg-blue-100 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-md font-semibold">Paid Invoices</CardTitle>
          <CreditCard className="size-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{paidInvoices.length}</h2>
          <p className="text-sm text-muted-foreground">
            Total invoices that have been paid
          </p>
        </CardContent>
      </Card>
      <Card className="bg-blue-100 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-md font-semibold">Pending Invoices</CardTitle>
          <ActivityIcon className="size-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{openInvoices.length}</h2>
          <p className="text-sm text-muted-foreground">
            Total invoices that are still pending
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
