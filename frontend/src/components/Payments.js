import { makePayment } from "../api/api";

function Payments({ billId, refresh }) {
  const handlePayment = async () => {
    await makePayment({ billId });
    refresh();
  };

  return (
    <button onClick={handlePayment} className="btn btn-success">
      Pay Now
    </button>
  );
}

export default Payments;
