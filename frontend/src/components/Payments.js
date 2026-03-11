import { useState } from "react";
import { makePayment } from "../api/api";

function Payments({ billId, remaining, refresh }) {
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();

    const numAmount = parseFloat(amount);

    // Basic validation
    if (!amount || numAmount <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }

    if (numAmount > remaining) {
      alert(`Amount exceeds the remaining balance of ₹${remaining}`);
      return;
    }

    try {
      setIsSubmitting(true);

      await makePayment(
         billId,
         numAmount
      );

      setAmount("");
      alert("Payment successful!");

      if (refresh) {
        refresh();
      }

    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="d-flex gap-2 align-items-center">
      <input
        type="number"
        className="form-control form-control-sm"
        style={{ width: "120px" }}
        placeholder={`Max ₹${remaining}`}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={isSubmitting}
      />

      <button
        type="button"
        onClick={handlePayment}
        className="btn btn-success btn-sm"
        disabled={isSubmitting || !amount}
      >
        {isSubmitting ? "..." : "Pay"}
      </button>
    </div>
  );
}

export default Payments;
