'use server';

import { z } from 'zod';
import { signIn } from '@/auth'; // Assuming you are using NextAuth for authentication
import { AuthError } from 'next-auth';

// Define a schema for driver application creation and updates
const DriverApplicationSchema = z.object({
  name: z.string(),
  licenseNumber: z.string(),
  carMake: z.string(),
  carModel: z.string(),
  status: z.enum(['pending', 'approved', 'failed']).optional(),
});

export type State = {
  errors?: {
    name?: string[];
    licenseNumber?: string[];
    carMake?: string[];
    carModel?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function authenticate(state: string | undefined, formData: FormData) {
  try {
    const result = await signIn('credentials', {
      redirect: false, // Prevent automatic redirection
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!result?.ok) {
      return 'Invalid credentials.'; // Return string for error
    }

    return { message: 'Successfully signed in' }; // Return success message as object
  } catch (error) {
    if (error instanceof AuthError) {
      return error.type === 'CredentialsSignin' ? 'Invalid credentials.' : 'Something went wrong.';
    }
    return 'Something went wrong.'; // Default error message
  }
}

// Function to create a new driver application
export async function createDriverApplication(prevState: State, formData: FormData) {
  const validatedFields = DriverApplicationSchema.safeParse({
    name: formData.get('name'),
    licenseNumber: formData.get('licenseNumber'),
    carMake: formData.get('carMake'),
    carModel: formData.get('carModel'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Driver Application.',
    };
  }

  const { name, licenseNumber, carMake, carModel } = validatedFields.data;

  try {
    const response = await fetch('https://banturide-api.onrender.com/admin/create-driver-application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        licenseNumber,
        carMake,
        carModel,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create driver application');
    }

    return { message: 'Driver application created successfully' };
  } catch (error) {
    return { message: 'Failed to create driver application: ' };
  }
}

// Function to update an existing driver application
export async function updateDriverApplication(id: string, prevState: State, formData: FormData) {
  const validatedFields = DriverApplicationSchema.safeParse({
    name: formData.get('name'),
    licenseNumber: formData.get('licenseNumber'),
    carMake: formData.get('carMake'),
    carModel: formData.get('carModel'),
    status: formData.get('status'), // Optional, since we can also update status
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Driver Application.',
    };
  }

  const { name, licenseNumber, carMake, carModel, status } = validatedFields.data;

  try {
    const response = await fetch(`https://banturide-api.onrender.com/admin/update-driver-application/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        licenseNumber,
        carMake,
        carModel,
        status, // Update status if provided
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update driver application');
    }

    return { message: 'Driver application updated successfully' };
  } catch (error) {
    return { message: 'Failed to update driver application: ' };
  }
}

// Function to approve a driver application
export async function approveDriverApplication(id: string) {
  try {
    const response = await fetch(`https://banturide-api.onrender.com/admin/approve-driver-application`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error('Failed to approve driver');
    }

    return { message: 'Driver approved successfully' };
  } catch (error) {
    return { message: 'Failed to approve driver: ' };
  }
}

// Function to deny a driver application
export async function denyDriverApplication(id: string) {
  try {
    const response = await fetch(`https://banturide-api.onrender.com/admin/deny-driver-application`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error('Failed to deny driver');
    }

    return { message: 'Driver denied successfully' };
  } catch (error) {
    return { message: 'Failed to deny driver: ' };
  }
}

// Function to delete a driver application (if necessary)
export async function deleteDriverApplication(id: string) {
  try {
    const response = await fetch(`https://banturide-api.onrender.com/admin/delete-driver-application/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete driver application');
    }

    return { message: 'Driver application deleted successfully' };
  } catch (error) {
    return { message: 'Failed to delete driver application: ' };
  }
}
