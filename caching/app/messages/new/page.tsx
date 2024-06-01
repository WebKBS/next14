import { redirect } from 'next/navigation';

import { revalidateTag } from 'next/cache';

export default function NewMessagePage() {
  async function createMessage(formData: FormData) {
    'use server';

    const message = formData.get('message');
    // addMessage(message);
    // revalidatePath('/', 'layout'); // 모든 페이지의 캐시를 무효화함
    revalidateTag('messages'); // messages 태그를 가진 모든 페이지의 캐시를 무효화함
    redirect('/messages');
  }

  return (
    <>
      <h2>New Message</h2>
      <form action={createMessage}>
        <p className="form-control">
          <label htmlFor="message">Your Message</label>
          <textarea id="message" name="message" required rows={5} />
        </p>

        <p className="form-actions">
          <button type="submit">Send</button>
        </p>
      </form>
    </>
  );
}
