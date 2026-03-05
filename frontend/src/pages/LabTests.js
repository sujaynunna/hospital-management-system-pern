import { useEffect, useState } from "react";
import { getLabTests } from "../api/api";

function LabTests() {
const [tests, setTests] = useState([]);

useEffect(() => {
fetchTests();
}, []);

const fetchTests = async () => {
const data = await getLabTests();
setTests(data);
};

return (
<div className="container mt-4">

  <h3 className="mb-4">Lab Tests</h3>

  <div className="card p-4">

    <table className="table table-striped table-bordered">

      <thead>
        <tr>
          <th>ID</th>
          <th>Test Name</th>
          <th>Status</th>
          <th>Report</th>
        </tr>
      </thead>

      <tbody>
        {tests.map((test) => (
          <tr key={test.id}>
            <td>{test.id}</td>
            <td>{test.test_name}</td>
            <td>
              <span className="badge bg-info">
                {test.status}
              </span>
            </td>
            <td>{test.report_url}</td>
          </tr>
        ))}
      </tbody>

    </table>

  </div>

</div>

);
}

export default LabTests;