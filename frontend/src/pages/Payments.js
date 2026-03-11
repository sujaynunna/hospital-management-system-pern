
 import { useState } from "react";
import { makePayment } from "../api/api";

function Payments({ billId, remaining, refresh }) {
  const [amount, setAmount] = useState("");

  const handlePayment = async () => {
    if (!amount) return alert("Enter amount");

    await makePayment({
      billId,
      amount
    });

    setAmount("");
    refresh();
  };

  return (
    <div className="d-flex gap-2">
      <input
        type="number"
        className="form-control"
        placeholder={`Max ₹${remaining}`}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handlePayment} className="btn btn-success">
        Pay
      </button>
    </div>
  );
}

export default Payments;