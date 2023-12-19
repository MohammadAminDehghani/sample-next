"use client"

import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import React, { useState } from "react";
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';

const Home = () => {
  const [selectedCities, setSelectedCities] = useState(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  return (
    <>
      <div>
        Hello World!
        <Button>test</Button>
      </div>
      <div className="container">
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedCities}
            onChange={(e) => setSelectedCities(e.value)}
            options={cities}
            optionLabel="name"
            filter
            placeholder="Select Cities"
            maxSelectedLabels={3}
            className="w-full md:w-20rem"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
