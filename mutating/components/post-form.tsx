'use client';
import { useFormState } from 'react-dom';
import FormSubmit from './form-submit';

interface FormState {
  errors?: string[];
}

const PostForm = ({ action }: { action: any }) => {
  const [state, formAction] = useFormState<FormState>(action, {});

  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </div>
        <div className="form-control">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </div>
        <div className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows={5} />
        </div>
        <div className="form-actions">
          <FormSubmit />
        </div>
        {state.errors && (
          <div className="form-errors">
            <ul>
              {state.errors.map((error: string, index: number) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </>
  );
};

export default PostForm;
