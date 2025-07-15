import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import ContractForm from './components/ContractForm';
import ReservationForm from './components/ReservationForm';
import { calculatePoints } from './data/pointCharts';
import { format, differenceInDays, addMonths, parseISO } from 'date-fns';
import { createEvent } from 'ics';

const App = () => {
  const [contracts, setContracts] = useState(JSON.parse(localStorage.getItem('contracts')) || []);
  const [reservations, setReservations] = useState(JSON.parse(localStorage.getItem('reservations')) || []);

  useEffect(() => {
    localStorage.setItem('contracts', JSON.stringify(contracts));
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [contracts, reservations]);

  const addContract = (contract) => {
    setContracts([...contracts, { ...contract, id: Date.now() }]);
  };

  const addReservation = (reservation) => {
    const points = calculatePoints(reservation);
    setReservations([...reservations, { ...reservation, id: Date.now(), points }]);
    updatePoints(reservation.contractId, points);
  };

  const updatePoints = (contractId, pointsUsed) => {
    setContracts(contracts.map(c => 
      c.id === contractId ? { ...c, currentPoints: c.currentPoints - pointsUsed } : c
    ));
  };

  const exportToCalendar = (eventDetails) => {
    const { start, title } = eventDetails;
    const event = {
      start: [start.getFullYear(), start.getMonth() + 1, start.getDate()],
      duration: { days: 1 },
      title,
      description: title,
      status: 'CONFIRMED',
    };
    createEvent(event, (error, value) => {
      if (!error) {
        const blob = new Blob([value], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title}.ics`;
        link.click();
      }
    });
  };

  return (
    <div className="app">
      <h1>DVC Points Pal</h1>
      <ContractForm addContract={addContract} />
      <ReservationForm addReservation={addReservation} contracts={contracts} />
      <Dashboard 
        contracts={contracts} 
        reservations={reservations} 
        exportToCalendar={exportToCalendar} 
      />
    </div>
  );
};

export default App;
