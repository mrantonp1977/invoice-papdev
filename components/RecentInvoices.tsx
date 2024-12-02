import prisma from '@/app/utils/db';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { requireUser } from '@/app/utils/hooks';
import { formatCurrency } from '@/app/utils/formatCurrency';

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientName: true,
      clientEmail: true,
      total: true,
      currency: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 7,
  });

  return data;
}

export async function RecentInvoices() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <Card className="bg-gray-100">
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {data.map((item) => (
          <div className="flex items-center gap-4" key={item.id}>
            <Avatar className="hidden sm:flex size-9">
              <AvatarFallback className="bg-violet-300">{item.clientName.slice(0,2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium leading-none">{item.clientName}</p>
              <p className="text-sm text-muted-foreground">{item.clientEmail}</p>
            </div>
            <div className="ml-auto font-semibold">{formatCurrency({
              amount: item.total,
              currency: item.currency as any,
            })}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
