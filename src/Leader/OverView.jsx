import React, { useState } from 'react';
import InputField from '../Ui/InputField';

const Overview = () => {
  const [number, setNumber] = useState(0);

  const handleNumberChange = (e) => {
    const value = e.target.value;
    setNumber(value === "" ? 0 : Number(value));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100 gap-4">
      <h1 className="text-3xl font-bold">Welcome Home!</h1>

      <InputField
        placeholder="Enter number"
        value={number.toString()}
        onChange={handleNumberChange}
        name="numberInput"
        type="number"
      />

      <p className="text-lg">Current value: {number}</p>
    </div>
  );
};

export default Overview;
