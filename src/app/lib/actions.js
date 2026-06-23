'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '../../../auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'late', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  // Purge the cache to show the newly added line entry immediately
  revalidatePath('/ui/invoices');
  // Cleanly close the form by redirecting back to the raw URL route 
  redirect('/ui/invoices');
}

// Add this function at the bottom of your src/app/lib/actions.js file:

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id, formData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  // Run the SQL command to overwrite old info based on the exact ID
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;

  // Wipe the dashboard cache clean for your real running folder segment
  revalidatePath('/ui/invoices');
  // Clear the parameter stack out of the URL bar and show the list table
  redirect('/ui/invoices');
}

// Add this function at the very bottom of your src/app/lib/actions.js file:

export async function deleteInvoice(id) {
  // Remove record by matching unique ID
  await sql`DELETE FROM invoices WHERE id = ${id}`;

  // Flash refresh the active folder segment code cache
  revalidatePath('/ui/invoices');
}

export async function authenticate(
  prevState,
  formData,
) {
  try {
    await signIn('credentials', {
      redirect: true,
      redirectTo: '/ui/dashboard',
      email: formData.get('email'),
      password: formData.get('password'),
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}