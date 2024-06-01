import { getMessages } from '@/lib/messages';

export default async function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // unstable_noStore();
  // const response = await fetch('http://localhost:8080/messages', {});
  // const messages = await response.json();

  const messages = await getMessages();
  const totalMessages = messages.length;

  return (
    <>
      <h1>Important Messages</h1>
      <p>{totalMessages} messages found</p>
      <hr />
      {children}
    </>
  );
}
