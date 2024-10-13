import Image from 'next/image';
import { ApproveDriver, DenyDriver } from '@/app/ui/invoices/buttons'; // Buttons for approving/denying drivers
import ApplicationStatus from '@/app/ui/invoices/status'; // For displaying driver application statuses
import { Application } from '@/app/lib/types'; // Importing Application type

// Fetch driver applications directly from the API
async function fetchDriverApplications(): Promise<Application[]> {
  const response = await fetch('https://banturide-api.onrender.com/admin/get-driver-applications', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch driver applications');
  }

  const data = await response.json();
  return data.applications;
}

export default async function ApplicationsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const applications: Application[] = await fetchDriverApplications();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {applications?.map((application) => (
              <div
                key={application.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={application.avatar}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${application.carMake} ${application.carModel}`}
                      />
                      <p>{application.carMake} {application.carModel}</p>
                    </div>
                    <p className="text-sm text-gray-500">License: {application.licenseNumber}</p>
                  </div>
                  <ApplicationStatus status={application.driverVerificationStatus} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">Seats: {application.seats}</p>
                    <p>Created on: {new Date(application.createdAt._seconds * 1000).toLocaleDateString()}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <ApproveDriver id={application.id} />
                    <DenyDriver id={application.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Driver
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  License Number
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Seats
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created At
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {applications?.map((application) => (
                <tr
                  key={application.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={application.avatar}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${application.carMake} ${application.carModel}`}
                      />
                      <p>{application.carMake} {application.carModel}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {application.licenseNumber}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {application.seats}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <ApplicationStatus status={application.driverVerificationStatus} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {new Date(application.createdAt._seconds * 1000).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <ApproveDriver id={application.id} />
                      <DenyDriver id={application.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
