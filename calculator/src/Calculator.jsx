import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

const Calculator = () => {
  const tableData = [
    {
      Title: "Reduced cost per Lead",
      value: [20, 30, 40, 50, 60, 70, 80],
    },
    {
      Title: "Cost per Lead",
      value: [160, 140, 120, 100, 80, 60, 40],
    },
    {
      Title: "Number of Leads",
      value: [63, 71, 83, 100, 125, 167, 250],
    },
    {
      Title: "Profit",
      value: [612500, 700000, 816667, 980000, 1225000, 1633333, 2450000],
    },
    {
      Title: "Increased profit",
      value: [25, 43, 67, 100, 150, 233, 400],
    },
    {
      Title: "Marketing ROI",
      value: [6125, 7000, 8167, 9800, 12250, 16333, 24500],
    },
  ];
  const formatter = new Intl.NumberFormat('en-US');
  const [budget, setBudget] = useState(10000);
  const [leads, setLeads] = useState(50);
  const [revenue, setRevenue] = useState(10000);
  const [costPerLead, setCostPerLead] = useState(200);
  const [profitPerLead, setProfitPerLead] = useState(9800);
  const [profit, setProfit] = useState(490000);
  const [marketingROI, setMarketingROI] = useState(4900);
  const [reducedCostPerLeadIO, setReducedCostPerLeadIO] = useState(20);
  const [tableDataState, setTableDataState] = useState(tableData);
  const calculatetableValues = (e) => {
    let CPL = Math.round(costPerLead * (1 - e / 100));
    let NOL = Math.round(budget / CPL);
    let prof = Math.round(NOL * profitPerLead);
    let IP = Math.round((prof / profit - 1) * 100);
    let MROI = Math.round((prof / budget) * 100);
    return [e, CPL, NOL, prof, IP, MROI];
  };
  const handleTableData = (reducedCostPerLeadIO) => {
    let reducedCPL = reducedCostPerLeadIO;
    for (let i = 0; i < 7; i++) {
      reducedCPL =
        i === 0 ? reducedCPL : Math.round((reducedCPL / 100 + 0.1) * 100);
      let valuesOP = calculatetableValues(reducedCPL);
      let j = 0;
      tableData.map((t) => {
        t.value[i] = valuesOP[j];
        j++;
        console.log(i);
      });
    }
    setTableDataState(tableData);
  };
  const handleBudgetChange = (event) => {
    const { value } = event.target;
    setBudget(Number(value.replaceAll(',', '')));
  };
  const handleLeadsChange = (event) => {
    const { value } = event.target;
    setLeads(Number(value.replaceAll(',', '')));
  };
  const handleRevenueChange = (event) => {
    const { value } = event.target;
    setRevenue(Number(value.replaceAll(',', '')));
  };
  const handleReducedCostPerLeadChange = (event) => {
    setReducedCostPerLeadIO(event.target.value);
  };
  useEffect(() => {
    setCostPerLead(Math.round(budget / leads));
    setProfitPerLead(revenue - costPerLead);
    setProfit(profitPerLead * leads);
    setMarketingROI(Math.round((profit / budget) * 100));
    handleTableData(reducedCostPerLeadIO);
  }, [
    budget,
    leads,
    revenue,
    costPerLead,
    profitPerLead,
    profit,
    reducedCostPerLeadIO,
  ]);
  return (
    <div className="container">
      <h1>Calculator</h1>
      <hr />
      <h3>INPUT CLIENT</h3>

      <section id="input_client">
        <div>
          <form className="row g-3 sm-2 needs-validation">
            <div className="col-md-4 col-sm-6">
              <label className="form-label">Badget</label>
              <input
                type="text"
                className="form-control"
                name="budget"
                value={formatter.format(budget)}
                onChange={handleBudgetChange}
              />
            </div>
            <div className="col-md-4 col-sm-6">
              <label className="form-label">#Leads</label>
              <input
                type="text"
                className="form-control"
                name="leads"
                value={formatter.format(leads)}
                onChange={handleLeadsChange}
              />
            </div>
            <div className="col-md-4 col-sm-6">
              <label className="form-label">Revenue per lead</label>
              <input
                type="text"
                className="form-control"
                name="revenue"
                value={formatter.format(revenue)}
                onChange={handleRevenueChange}
              />
            </div>
            <div className="col-md-4 col-sm-6">
              <label className="form-label">Cost per lead</label>
              <input
                type="text"
                className="form-control"
                name="costPerLead"
                value={formatter.format(costPerLead)}
                disabled
              />
            </div>
            <div className="col-md-4 col-sm-6">
              <label className="form-label">Profit per lead</label>
              <input
                type="text"
                className="form-control"
                name="profitPerLead"
                value={formatter.format(profitPerLead)}
                disabled
              />
            </div>
            <div className="col-md-4 col-sm-6">
              <label className="form-label">Profit</label>
              <input
                type="text"
                className="form-control"
                name="profit"
                value={formatter.format(profit)}
                disabled
              />
            </div>
            <div className="col-md-4 col-sm-6">
              <label className="form-label">Marketing ROI</label>
              <input
                type="text"
                className="form-control"
                name="marketingROI"
                value={marketingROI + "%"}
                disabled
              />
            </div>
            <div className="col-md-4 col-sm-6">
              <label className="form-label">Reduced cost per lead</label>
              <input
                type="text"
                className="form-control"
                name="reducedCostPerLeadIO"
                value={reducedCostPerLeadIO + "%"}
                onChange={handleReducedCostPerLeadChange}
              />
            </div>
          </form>
        </div>
      </section>
      <div></div>

      <hr />

      <section id="Digger_ImProvement">
        <h3>DIGGER IMPROVEMENT</h3>

        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th className="td">Reduced cost per lead</th>
              {tableDataState[0].value.map((value, index) => {
                return <th className="col"> {value}%</th>;
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Cost per lead</th>
              {tableDataState[1].value.map((value, index) => {
                return <td>{formatter.format(value)}</td>;
              })}
            </tr>
            <tr>
              <th>Number of leads</th>
              {tableDataState[2].value.map((value, index) => {
                return <td>{formatter.format(value)}</td>;
              })}
            </tr>
            <tr>
              <th>Profit</th>
              {tableDataState[3].value.map((value, index) => {
                return <td>{formatter.format(value)}</td>;
              })}
            </tr>
            <tr>
              <th>Increased profit</th>
              {tableDataState[4].value.map((value, index) => {
                return <th className="col">{value}%</th>;
              })}
            </tr>
            <tr>
              <th>Marketing ROI</th>
              {tableDataState[5].value.map((value, index) => {
                return <td>{value}%</td>;
              })}
            </tr>
            <tr>
              <th colSpan={"3"}></th>
              <td className="highlight" style={{ fontWeight: "bold" }}>
                Low-end estimation
              </td>
              <td></td>
              <td className="highlight" style={{ fontWeight: "bold" }}>
                Typical Customer
              </td>
              <td></td>
              <td className="highlight" style={{ fontWeight: "bold" }}>
                Potential High-end
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Calculator;
