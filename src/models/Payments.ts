// models/Payments.ts

// Define an enum for supported currencies
export enum Currency {
    SOL = 'SOL',       // Solana
    USDC = 'USDC',     // USD Coin (USDC)
    EURC = 'EURC',     // Euro Coin (EURC)
    STRM = 'STRM',     // Stream Token (STRM)
    BTC = 'BTC',       // Bitcoin (BTC)
    ETH = 'ETH',       // Ethereum (ETH)
    USD = 'USD',       // United States Dollar (USD)
    EUR = 'EUR',       // Euro (EUR)
  }
  
  // Define an interface for market rates
  export interface MarketRates {
    [Currency.USD]: number; // Conversion rate to USD
    [Currency.EUR]: number; // Conversion rate to EUR
    [Currency.USDC]: number; // Conversion rate to USD Coin (USDC)
    [Currency.SOL]: number; // Conversion rate to Solana (SOL
    [Currency.EURC]: number; // Conversion rate to EUR Coin (EURC)
    [Currency.STRM]: number; // Conversion rate to Stream Token (STRM)
    [Currency.BTC]: number; // Conversion rate to Bitcoin (BTC)
    [Currency.ETH]: number; // Conversion rate to Ethereum (ETH)
  }
  
  export interface Payment {
    id: string;
    amount: number;
    currency: Currency;
    description: string;
    sender: string;
    recipient: string;
    status: PaymentStatus;
    createdAt: Date;
    fee: number; // Fee associated with the payment
  }
  
  export enum PaymentStatus {
    Pending = 'Pending',
    Completed = 'Completed',
    Failed = 'Failed',
    Refunded = 'Refunded',
  }
  
  export interface PaymentRequest {
    amount: number;
    currency: Currency;
    description: string;
    recipient: string;
    fee: number; // Fee to be paid for the transaction
  }
  
  // Add methods or additional properties to Payments model as needed.
  