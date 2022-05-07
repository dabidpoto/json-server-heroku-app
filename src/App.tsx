import React, { useEffect, useState } from "react";
import axios from "axios";
//import logo from './logo.svg';
import './App.css';

type Employee = {
  name: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  email: String,
  id: Number,
  company: String,
  jobTitle: String,
  phone: String,
  vehicle: {
    vehicle: String,
    color: String,
    fuel: String,
    vin: String,
  },
  account: {
    name: String,
    number: String,
    routing_number: String,
    amount: String,
    cc_issuer: String,
    cc_number: String,
    cc_cvv: String,
    pin: String,
  },
  favorite_animal: String,
};

const App = () => {
  const [query, setQuery] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    loadEmployees(1, 20);
  }, []);

  useEffect(() => {
    loadEmployees(1, 20, query.length > 2 ? query : "");
  }, [query]);

  const loadEmployees = async (page: number, limit: number, query = "") => {
    const url = `/employees?_page=${page}&_limit=${limit}&q=${query}`;
    const _employees = await axios
      .get<Employee[]>(url)
      .then(({ data }) => data);
    setEmployees(_employees);
  };

  return (
    <div className="App">
      <div className="search-form">
        <label className="search_form--label">Search employees</label>
        <input
          className="search_form--input"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        ></input>
      </div>
      <div className="employee_list">
        {employees.map((employee) => {
          return (
            <div className="employee_list--item">
              <div className="employee_list--item-name">Name: {employee.name}</div>
              <div className="employee_list--item-address">Address:&nbsp;
                {employee.address.street}<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{employee.address.city},&nbsp;
                {employee.address.state}&nbsp;
                {employee.address.zipCode}
              </div>
              <div className="employee_list--item-email">Email: {employee.email}</div>
              <div className="employee_list--item-company">Company: {employee.company}</div>
              <div className="employee_list--item-jobTitle">Title: {employee.jobTitle}</div>
              <div className="employee_list--item-phone">Phone: {employee.phone}</div>
              <div className="employee_list--item-vehicle">Vehicle:&nbsp;
                {employee.vehicle.vehicle}<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Color: {employee.vehicle.color}<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fuel Type: {employee.vehicle.fuel}<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VIN: {employee.vehicle.vin}
              </div>
              <div className="employee_list--item-account">Account:&nbsp;
                {employee.account.name}<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Account Number: {employee.account.number}<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Routing Number: {employee.account.routing_number}<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Amount: {employee.account.amount}<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Credit Card Issuer: {employee.account.cc_issuer}<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Credit Card Number: {employee.account.cc_number}<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Credit Card CVV: {employee.account.cc_cvv}<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PIN: {employee.account.pin}<br></br>
              </div>
              <div className="employee_list--item-favorite_animal">Favorite Animal: {employee.favorite_animal}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
