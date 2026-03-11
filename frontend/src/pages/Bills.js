import { useEffect, useState, useCallback } from "react";
import { getBills } from "../api/api";
import Payments from "../components/Payments";

function Bills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define the function BEFORE the useEffect
  const fetchBills = useCallback(async () => {
    const userId = sessionStorage.getItem("userId");
    
    if (!userId) {
      console.warn("No userId found in sessionStorage");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getBills(userId);
      setBills(data || []);
    } catch (err) {
      console.error("Error fetching bills:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]); // fetchBills is now a stable dependency

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Patient Billing</h3>

      <div className="card shadow-sm p-0 overflow-hidden">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>Bill ID</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Remaining</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="text-center p-4">Loading bills...</td></tr>
            ) : bills.length > 0 ? (
              bills.map((bill) => (
                <tr key={bill.id}>
                  <td>{bill.id}</td>
                  <td>₹{bill.total_amount}</td>
                  <td>₹{bill.amount_paid}</td>
                  <td className="text-danger fw-bold">₹{bill.amount_left}</td>
                  <td>
                    <span className={`badge ${
                      bill.status === "paid" ? "bg-success" : 
                      bill.status === "partial" ? "bg-warning text-dark" : "bg-danger"
                    }`}>
                      {bill.status}
                    </span>
                  </td>
                  <td style={{ minWidth: "220px" }}>
                    {bill.amount_left > 0 ? (
                      <Payments
                        billId={bill.id}
                        remaining={bill.amount_left}
                        refresh={fetchBills}
                      />
                    ) : (
                      <span className="text-success small fw-bold">no Balance</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="text-center p-4">No billing records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bills;