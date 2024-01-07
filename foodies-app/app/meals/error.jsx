'use client';

export default function Error({ error }) {
  console.log(error.message);
  return (
    <main className="error">
      <h1>에러가 발생했습니다!</h1>
      <p>{error.message}</p>
    </main>
  );
}
