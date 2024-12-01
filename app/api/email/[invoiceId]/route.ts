import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: Promise<{ invoiceId: string; }> }) {
  try {
    const session = await requireUser();
    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: session.user?.id,
    },    
  });

  if (!invoiceData) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

    const sender = {
      email: "hello@demomailtrap.com",
      name: "Papaioannou Dev",
    };

    const recipients = [
    {
      email: "papaioannoudev@gmail.com",
    }
  ];

  emailClient.send({
    from: sender,
    to: recipients,
    template_uuid: "0f226840-5bf2-494d-aaa6-11ee7dc052dc",
    template_variables: {
      first_name: invoiceData.clientName,
      company_info_name: "Papaioannou Dev",
      company_info_address: "Agia 16 str",
      company_info_city: "Agia Larissa",
      company_info_zip_code: "41222",
      company_info_country: "Greece"
    }

  });

   return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}