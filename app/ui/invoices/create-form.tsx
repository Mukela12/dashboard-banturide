'use client';

import { Application } from '@/app/lib/types';
import { createDriverApplication, State } from '@/app/lib/actions'; // Assuming action to create driver applications
import { useActionState } from 'react';
import { Button } from '@/app/ui/button';

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createDriverApplication, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Driver Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Driver Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter driver name"
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
          />
        </div>

        {/* License Number */}
        <div className="mb-4">
          <label htmlFor="licenseNumber" className="mb-2 block text-sm font-medium">
            License Number
          </label>
          <input
            id="licenseNumber"
            name="licenseNumber"
            type="text"
            placeholder="Enter license number"
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
          />
        </div>

        {/* Car Make and Model */}
        <div className="mb-4">
          <label htmlFor="carMake" className="mb-2 block text-sm font-medium">
            Car Make
          </label>
          <input
            id="carMake"
            name="carMake"
            type="text"
            placeholder="Enter car make"
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="carModel" className="mb-2 block text-sm font-medium">
            Car Model
          </label>
          <input
            id="carModel"
            name="carModel"
            type="text"
            placeholder="Enter car model"
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
          />
        </div>

        {/* Error messages */}
        <div id="form-errors" aria-live="polite" aria-atomic="true">
          {state.errors && Object.values(state.errors).map((error) => (
            <p key={error as unknown as string} className="text-red-500 text-sm mt-2">
              {error as unknown as string}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button type="submit">Create Application</Button>
      </div>
    </form>
  );
}
