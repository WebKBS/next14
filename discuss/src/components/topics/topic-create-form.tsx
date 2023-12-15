'use client';
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@nextui-org/react';

import * as actions from '@/actions';
import { useFormState } from 'react-dom';
import FormButton from '../common/form-button';

export default function TopicCreateForm() {
  const [formState, action] = useFormState(actions.createTopic, {
    errors: {},
  });

  console.log(formState);

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!formState.errors.name} // Input UI 컴포넌트의 isInvalid prop에 에러가 있으면 true
              errorMessage={formState.errors.name?.join(', ')}
            />

            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Descripbe your topic"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(', ')}
            />

            {formState.errors._form ? (
              <div className="p-2 bg-red-200 border border-red-400 rounded">
                {formState.errors._form?.join(', ')}
              </div>
            ) : null}

            <FormButton>save</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
