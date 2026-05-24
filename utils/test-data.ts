export interface CustomerData {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  ssn: string;
  username: string;
  password: string;
}

export function generateCustomerData(): CustomerData {
  const timestamp = Date.now();
  return {
    firstName: 'John',
    lastName: 'Doe',
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipCode: '90210',
    phone: '555-123-4567',
    ssn: `${100 + (timestamp % 899)}-${10 + (timestamp % 89)}-${1000 + (timestamp % 8999)}`,
    username: `user_${timestamp}`,
    password: 'Pass123!',
  };
}
