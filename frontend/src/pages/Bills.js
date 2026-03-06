import { useEffect, useState } from "react";
import { getBills } from "../api/api";
import Payments from "../components/Payments";

function Bills() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    const data = await getBills();
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
              <th>Total Amount</th>
              <th>Status</th>
              <th>Payment</th>
            </tr>
          </thead>

          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id}>
                <td>{bill.id}</td>
                <td>₹{bill.total_amount}</td>
                <td>
                  <span className="badge bg-success">{bill.status}</span>
                </td>
                <td>
                  {bill.status !== "Paid" && (
                    <Payments billId={bill.id} refresh={fetchBills} />
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
