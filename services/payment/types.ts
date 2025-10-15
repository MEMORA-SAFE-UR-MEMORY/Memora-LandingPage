export type PaymentLinkData = {
  bin: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  description: string;
  orderCode: number;
  paymentLinkId: string;
  status: string; 
  checkoutUrl: string;
  qrCode: string;
};

export type PaymentCreateLinkResponse = {
  code: string; 
  desc: string;
  data: PaymentLinkData;
  signature: string;
};
