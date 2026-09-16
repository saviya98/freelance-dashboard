import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./App.css";
import { useEffect, useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import api from "./api/axios";

function App() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const platforms = ["YouTube", "Facebook", "TickTok", "Fiverr"];

  const [record, setRecord] = useState({
    platform: "YouTube",
    income: 0,
    deductions: 0,
    month: "January",
  });

  const [history, setHistory] = useState([]);

  const getTableData = async() => {
    return await api
      .get("/income-records")
      .then((response) => {
        console.log("response", response);
        setHistory(response.data.data);
      })
      .catch((error) => console.error("Axios Error: ", error));
  }

  useEffect(() => {
    getTableData();
  }, []);

  const getDeductions = (a, b) => a - b;

  const submit = () => {
    const payload = {
      ...record,
      recordTotal: getDeductions(record.income, record.deductions),
    };

    api
      .post("/income-records", payload)
      .then((response) => {
        console.log("response", response);
        setRecord({
          platform: "YouTube",
          income: 0,
          deductions: 0,
          month: "January",
        });
        getTableData();
      })
      .catch((error) => console.error("Axios Error: ", error));
  };

  return (
    <>
      <section id="center">
        <div className="w-100 p-3">
          <h2>Income Form</h2>
          <Form>
            <Form.Group className="mb-3 d-flex" controlId="formBasicEmail">
              <Form.Label className="me-2 mt-2">Select Month</Form.Label>
              <Form.Select
                className="mb-2 w-25"
                aria-label="Select Month"
                value={record.month}
                onChange={(e) =>
                  setRecord({ ...record, month: e.target.value })
                }
              >
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 d-flex" controlId="formBasicEmail">
              <Form.Label className="me-2 mt-2">Select Platform</Form.Label>
              <Form.Select
                className="mb-2 w-25 me-2"
                aria-label="Select Platform"
                value={record.platform}
                onChange={(e) =>
                  setRecord({ ...record, platform: e.target.value })
                }
              >
                {platforms.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 d-flex" controlId="formBasicEmail">
              <Form.Label className="me-2 mt-2">Record Data</Form.Label>
              <Form.Control
                className="me-2"
                type="number"
                placeholder="Enter Income"
                value={record.income}
                onChange={(e) =>
                  setRecord({ ...record, income: e.target.value })
                }
              />
              <Form.Control
                className="me-2"
                type="number"
                placeholder="Enter Deduction"
                value={record.deductions}
                onChange={(e) =>
                  setRecord({ ...record, deductions: e.target.value })
                }
              />
              <Form.Control
                type="number"
                disabled
                value={getDeductions(record.income, record.deductions)}
              />
            </Form.Group>

            <Button variant="primary" onClick={() => submit()}>
              Save
            </Button>
          </Form>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div className="w-100 p-3">
          <h2>Income History</h2>
          <Table>
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Month</th>
                <th>Platform</th>
                <th>Income</th>
                <th>Deductions</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {history?.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.month}</td>
                  <td>{r.platform}</td>
                  <td>{r.income}</td>
                  <td>{r.deductions}</td>
                  <td>{r.record_total}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
