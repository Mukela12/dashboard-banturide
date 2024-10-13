'use client';

import { Application } from '@/app/lib/types';
import { updateDriverApplication, State } from '@/app/lib/actions'; // Assuming action for updating driver applications
import { useActionState } from 'react';
import { Button } from '@/app/ui/button';

export default function EditDriverForm({ application }: { application: Application }) {
  const initialState: State = { message: null, errors: {} };
  const updateApplicationWithId = updateDriverApplication.bind(null, application.id);
  const [state, formAction] = useActionState(updateApplicationWithId, initialState);

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
            defaultValue={application.carMake + ' ' + application.carModel}
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
            defaultValue={application.licenseNumber}
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
            defaultValue={application.carMake}
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
            defaultValue={application.carModel}
            type="text"
            placeholder="Enter car model"
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
          />
        </div>

        {/* Application Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the application status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked={application.driverVerificationStatus === 'pending'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="approved"
                  name="status"
                  type="radio"
                  value="approved"
                  defaultChecked={application.driverVerificationStatus === 'approved'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="approved"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Approved
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="failed"
                  name="status"
                  type="radio"
                  value="failed"
                  defaultChecked={application.driverVerificationStatus === 'failed'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="failed"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Failed
                </label>
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status && state.errors.status.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </fieldset>

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="my-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button type="submit">Edit Application</Button>
      </div>
    </form>
  );
}
