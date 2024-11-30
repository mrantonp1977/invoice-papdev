
interface FormatCurrencyProps {
  amount: number;
  currency: "USD" | "EUR";
}


export function formatCurrency({ amount, currency }: FormatCurrencyProps) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount)
}