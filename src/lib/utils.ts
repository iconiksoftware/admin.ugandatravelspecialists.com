import { parsePhoneNumberWithError } from 'libphonenumber-js';
import { format } from 'date-fns';

import { User } from './types';
import { UnitOfMeasurement, StaffRole } from './enums';

export const ProductUnitLabels: Record<UnitOfMeasurement, { singular: string; plural: string }> = {
  [UnitOfMeasurement.KG]: { singular: 'kg', plural: 'kgs' },
  [UnitOfMeasurement.G]: { singular: 'g', plural: 'g' },
  [UnitOfMeasurement.LITRE]: { singular: 'litre', plural: 'litres' },
  [UnitOfMeasurement.ML]: { singular: 'ml', plural: 'ml' },
  [UnitOfMeasurement.BAG]: { singular: 'bag', plural: 'bags' },
  [UnitOfMeasurement.SACHET]: { singular: 'sachet', plural: 'sachets' },
  [UnitOfMeasurement.BOTTLE]: { singular: 'bottle', plural: 'bottles' },
  [UnitOfMeasurement.PACKET]: { singular: 'packet', plural: 'packets' },
  [UnitOfMeasurement.TIN]: { singular: 'tin', plural: 'tins' },
  [UnitOfMeasurement.UNIT]: { singular: 'unit', plural: 'units' },
};

export const capitalizeWords = (str: string) => {
  return str
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
};

// Date utils
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const humanizeDate = (date: Date) => format(date, 'LLLL do yyyy');

// Currency
export function formatCurrency(amount: number, currencyCode: string = 'UGX', locale: string = 'en-US'): string {
  return amount?.toLocaleString(locale, {
    style: 'currency',
    currency: currencyCode,
  });
}

export const combineDateAndTime = (date: Date, time: string): string => {
  return `${format(date, 'yyyy-MM-dd')}T${time}`;
};

export const normalizePhoneNumber = (raw: string): string => {
  try {
    // Remove all spaces and non-digit characters except '+' (e.g., "+256 782 346200" => "+256782346200")
    const cleaned = raw.replace(/[^\d+]/g, '');

    const phoneNumber = parsePhoneNumberWithError(cleaned, 'UG');
    if (!phoneNumber.isValid()) {
      throw new Error('Invalid phone number');
    }
    return phoneNumber.number; // Returns in E.164 format, e.g., +256782346200
  } catch (error) {
    throw new Error('Invalid phone number format');
  }
};

/**
 * Check if a user has at least one of the specified roles.
 * @param user - The user object to check.
 * @param rolesToCheck - One or more roles to check against.
 * @returns true if the user has any of the roles, false otherwise.
 */
export function hasRoles(user: User | null, rolesToCheck: StaffRole[]): boolean {
  if (!user) return false;

  return user.roles.some((role) => rolesToCheck.includes(role));
}
