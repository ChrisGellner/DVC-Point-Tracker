import React, { useState } from 'react';

const ContractForm = ({ addContract }) => {
  const [contract, setContract] = useState({
    contractNumber: '',
    homeResort: '',
    useYear: '',
    currentPoints: 0,
    bankedPoints: 0,
    borrowedPoints: 0,
    holdingPoints: 0,
    holdingExpiry: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addContract(contract);
    setContract({
      contractNumber: '',
      homeResort: '',
      useYear: '',
      currentPoints: 0,
      bankedPoints: 0,
      borrowedPoints: 0,
      holdingPoints: 0,
      holdingExpiry: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Contract</h3>
      <input
        type="text"
        placeholder="Contract Number"
        value={contract.contractNumber}
        onChange={(e) => setContract({ ...contract, contractNumber: e.target.value })}
        required
      />
      <select
        value={contract.homeResort}
        onChange={(e) => setContract({ ...contract, homeResort: e.target.value })}
        required
      >
        <option value="">Select Home Resort</option>
        <option value="Animal Kingdom Lodge">Animal Kingdom Lodge</option>
        <option value="Polynesian Villas">Polynesian Villas</option>
        <option value="Bay Lake Tower">Bay Lake Tower</option>
      </select>
      <input
        type="month"
        placeholder="Use Year (e.g., 2025-02)"
        value={contract.useYear}
        onChange={(e) => setContract({ ...contract, useYear: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Current Points"
        value={contract.currentPoints}
        onChange={(e) => setContract({ ...contract, currentPoints: Number(e.target.value) })}
        required
      />
      <input
        type="number"
        placeholder="Banked Points"
        value={contract.bankedPoints}
        onChange={(e) => setContract({ ...contract, bankedPoints: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Borrowed Points"
        value={contract.borrowedPoints}
        onChange={(e) => setContract({ ...contract, borrowedPoints: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Holding Points"
        value={contract.holdingPoints}
        onChange={(e) => setContract({ ...contract, holdingPoints: Number(e.target.value) })}
      />
      <input
        type="date"
        placeholder="Holding Points Expiry"
        value={contract.holdingExpiry}
        onChange={(e) => setContract({ ...contract, holdingExpiry: e.target.value })}
      />
      <button type="submit">Add Contract</button>
    </form>
  );
};

export default ContractForm;
