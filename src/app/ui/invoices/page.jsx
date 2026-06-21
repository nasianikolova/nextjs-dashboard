import Pagination from './pagination';
import Search from '../search';
import Table from './table';
import { CreateInvoice } from './buttons';
import { lusitana } from '../fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '../skeletons';
import { fetchInvoicesPages, fetchCustomers, fetchInvoiceById } from '../../lib/data'; // Added fetchInvoiceById here
import Form from './create-form'; 
import EditInvoiceForm from './edit-form'; // Import your edit form function directly

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  // Read URL modifiers 
  const showForm = searchParams?.showForm === 'true';
  const editForm = searchParams?.editForm === 'true';
  const targetId = searchParams?.id || '';

  // View 1: Handle Create Invoice requests
  if (showForm) {
    const customers = await fetchCustomers(); 
    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between mb-4">
          <h1 className={`${lusitana.className} text-2xl`}>Create Invoice</h1>
        </div>
        <Form customers={customers} />
      </div>
    );
  }

  // View 2: Handle Edit Invoice requests
  if (editForm && targetId) {
    // Parallel data load for customer array and targets details record
    const [invoice, customers] = await Promise.all([
      fetchInvoiceById(targetId),
      fetchCustomers(),
    ]);

    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between mb-4">
          <h1 className={`${lusitana.className} text-2xl`}>Edit Invoice</h1>
        </div>
        {/* Runs your Edit form function directly on the screen */}
        <EditInvoiceForm invoice={invoice} customers={customers} />
      </div>
    );
  }

  // Baseline view layout
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
