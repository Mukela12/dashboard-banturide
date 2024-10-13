import { CheckIcon, XMarkIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function ApplicationStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'approved',
          'bg-red-500 text-white': status === 'failed',
        },
      )}
    >
      {status === 'pending' ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'approved' ? (
        <>
          Approved
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'failed' ? (
        <>
          Failed
          <XMarkIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
