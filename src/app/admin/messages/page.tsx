import { prisma } from "@/lib/prisma";
import { ManageMessagesUI, ContactMessage } from "@/components/admin/ManageMessagesUI";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function ManageMessagesPage() {
  const messages = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Transform and serialize
  const serializedMessages: ContactMessage[] = messages.map(msg => ({
    id: msg.id,
    name: msg.name,
    email: msg.email,
    phone: msg.phone,
    company: msg.company,
    subject: msg.subject,
    message: msg.message,
    createdAt: msg.createdAt.toISOString(),
  }));

  return (
    <div className="container mx-auto py-10 px-4 md:px-8">
      <ManageMessagesUI initialMessages={serializedMessages} />
    </div>
  );
}
