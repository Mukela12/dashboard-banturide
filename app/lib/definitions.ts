// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

type Application = {
  id: string;
  insuranceCertificateImage: string;
  avatar: string;
  seats: string;
  vehicleImage2: string;
  vehicleImage1: string;
  canDriver: boolean;
  canDeliver: boolean;
  carColor: string;
  driverId: string;
  licenseExpiry: string;
  licenseNumber: string;
  vehicleReg: string;
  carMake: string;
  nrc: string;
  carModel: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  reason: string;
  driverVerificationStatus: string;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export interface DriverApplication {
  driverId: string;
  avatar: string;
  canDeliver: boolean;
  canDrive: boolean;
  carMake: string;
  carModel: string;
  carColor: string;
  seats: string;
  vehicleReg: string;
  licenseNumber: string;
  licenseExpiry: string;
  driverVerificationStatus: string;
  reason: string;
  insuranceCertificateImage: string;
  vehicleImage1: string;
  vehicleImage2: string;
  createdAt: Date;
}
