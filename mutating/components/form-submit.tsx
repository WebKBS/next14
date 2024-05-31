'use client';

import { useFormStatus } from 'react-dom';

const FormSubmit = () => {
  const status = useFormStatus();

  if (status.pending) {
    return <button disabled>Creating Post...</button>;
  }

  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
};

export default FormSubmit;
