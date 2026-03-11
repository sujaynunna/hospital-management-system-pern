import { useEffect, useState } from "react";
import { getBills } from "../api/api";
import Payments from "../components/Payments";

function Bills() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    const userId = localStorage.getItem("userId");
    const data = await getBills(userId);
    setBills(data);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Bills</h3>

      <div className="card p-4">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Bill ID</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Remaining</th>
              <th>Status</th>
              <th>Payment</th>
            </tr>
          </thead>

          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id}>
                <td>{bill.id}</td>
                <td>₹{bill.total_amount}</td>
                <td>₹{bill.amount_paid}</td>
                <td>₹{bill.amount_left}</td>

                <td>
                  <span
                    className={`badge ${
                      bill.status === "Paid"
                        ? "bg-success"
                        : bill.status === "Partial"
                        ? "bg-warning"
                        : "bg-danger"
                    }`}
                  >
                    {bill.status}
                  </span>
                </td>

                <td>
                  {bill.amount_left > 0 && (
                    <Payments
                      billId={bill.id}
                      remaining={bill.amount_left}
                      refresh={fetchBills}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bills;
