import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { CheckIcon, ClockIcon, ExclamationCircleIcon, FlagIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function InvoiceStatus({ status }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
          'bg-red-500 text-white': status === 'late',
          'bg-orange-500 text-white': status === 'overdue',
          'bg-yellow-500 text-white': status === 'disputed'
        },
      )}
    >
      {status === 'pending' ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'paid' ? (
        <>
          Paid
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'late' ? (
        <>
          Late
          <ExclamationTriangleIcon className='ml-1 w-4 text-white' />
        </>

      ) : null}

      {status === 'overdue' ? (
        <>
          Overdue
          <ExclamationCircleIcon className='ml-1 w-4 text-white' />
        </>

      ) : null}

      {status === 'disputed' ? (
        <>
          Disputed
          <FlagIcon className='ml-1 w-4 text-white' />
        </>

      ) : null}
    </span>
  );
}
