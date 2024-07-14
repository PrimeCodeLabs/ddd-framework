export class EmailService {
  sendPaymentConfirmation(orderId: string, email: string): void {
    console.log(
      `Sending payment confirmation for order ${orderId} to ${email}`
    );
  }
}
