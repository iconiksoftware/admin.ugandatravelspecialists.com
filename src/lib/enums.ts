export enum ProductSaleMode {
  SINGLE_UNIT = 'single_unit', // Whole jar, bag, box, etc.
  OPEN_UNIT = 'open_unit', // Partial sale from a previously opened unit
  MIXED_UNIT = 'mixed_unit', // Both full and partial sales allowed
}

export enum StaffRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  CASHIER = 'cashier',
}

export enum OrderStatus {
  COMPLETED = 'completed',
  PENDING = 'pending',
  CANCELED = 'canceled',
  REFUNDED = 'refunded',
}

export enum PaymentMethod {
  CASH = 'cash',
  AIRTEL_MOBILE_MONEY = 'airtel_mobile_money',
  MTN_MOBILE_MONEY = 'mtn_mobile_money',
  CARD = 'card',
}

export enum OpenUnitStatus {
  OPEN = 'open',
  CLOSED = 'closed',
}

export enum UnitOfMeasurement {
  KG = 'kg',
  G = 'g',
  LITRE = 'litre',
  ML = 'ml',
  BAG = 'bag',
  SACHET = 'sachet',
  BOTTLE = 'bottle',
  PACKET = 'packet',
  TIN = 'tin',
  UNIT = 'unit',
}

export enum StockEntrySource {
  PURCHASE = 'purchase',
  ADJUSTMENT = 'adjustment',
  RETURN = 'return',
}

export enum SalePaymentType {
  INITIAL = 'initial',
  DEBT = 'debt',
}

export enum SalePaymentStatus {
  PENDING = 'pending',
  REJECTED = 'rejected',
  CONFIRMED = 'confirmed',
}
