import { PlusIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { approveDriverApplication, denyDriverApplication } from '@/app/lib/actions'; // Assuming actions for API calls

// Approve driver button
export function ApproveDriver({ id }: { id: string }) {
  const approveDriver = async () => {
    await approveDriverApplication(id); // Calls the approve API
  };

  return (
    <form action={approveDriver}>
      <button
        type="submit"
        className="rounded-md border p-2 hover:bg-green-100 text-green-600"
      >
        <CheckIcon className="w-5" />
        <span className="ml-2">Approve</span>
      </button>
    </form>
  );
}

// Deny driver button
export function DenyDriver({ id }: { id: string }) {
  const denyDriver = async () => {
    await denyDriverApplication(id); // Calls the deny API
  };

  return (
    <form action={denyDriver}>
      <button
        type="submit"
        className="rounded-md border p-2 hover:bg-red-100 text-red-600"
      >
        <XMarkIcon className="w-5" />
        <span className="ml-2">Deny</span>
      </button>
    </form>
  );
}

// Create new driver (just for demonstration, can be removed or updated for your use case)
export function CreateDriver() {
  return (
    <button
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500"
    >
      <span className="hidden md:block">Create Driver</span> 
      <PlusIcon className="h-5 ml-2" />
    </button>
  );
}
