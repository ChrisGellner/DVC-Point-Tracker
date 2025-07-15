import React, { useState } from 'react';
import { differenceInDays, parseISO } from 'date-fns';

const ReservationForm = ({ addReservation, contracts }) => {
  const [reservation, setReservation] = useState({
    contractId: '',
    resort: '',
    checkIn: '',
    checkOut: '',
    roomType: '',
    viewType: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkInDate = parseISO(reservation.checkIn);
    const today = new Date();
    if (differenceInDays(checkInDate, today) > 60 && contracts.find(c => c.id === reservation.contractId).holdingPoints > 0) {
      alert('Holding points can only be used for reservations within 60 days.');
      return;
    }
    addReservation(reservation);
    setReservation({
      contractId: '',
      resort: '',
      checkIn: '',
      checkOut: '',
      roomType: '',
      viewType: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Reservation</h3>
      <select
        value={reservation.contractId}
        onChange={(e) => setReservation({ ...reservation, contractId: e.target.value })}
        required
      >
        <option value="">Select Contract</option>
        {contracts.map(c => (
          <option key={c.id} value={c.id}>Contract #{c.contractNumber}</option>
        ))}
      </select>
      <select
        value={reservation.resort}
        onChange={(e) => setReservation({ ...reservation, resort: e.target.value })}
        required
      >
        <option value="">Select Resort</option>
        <option value="Animal Kingdom Lodge">Animal Kingdom Lodge</option>
        <option value="Polynesian Villas">Polynesian Villas</option>
        <option value="Bay Lake Tower">Bay Lake Tower</option>
      </select>
      <input
        type="date"
        placeholder="Check-In Date"
        value={reservation.checkIn}
        onChange={(e) => setReservation({ ...reservation, checkIn: e.target.value })}
        required
      />
      <input
        type="date"
        placeholder="Check-Out Date"
        value={reservation.checkOut}
        onChange={(e) => setReservation({ ...reservation, checkOut: e.target.value })}
        required
      />
      <select
        value={reservation.roomType}
        onChange={(e) => setReservation({ ...reservation, roomType: e.target.value })}
        required
      >
        <option value="">Select Room Type</option>
        <option value="Studio">Studio</option>
        <option value="1-Bedroom">1-Bedroom</option>
      </select>
      <select
        value={reservation.viewType}
        onChange={(e) => setReservation({ ...reservation, viewType: e.target.value })}
        required
      >
        <option value="">Select View Type</option>
        <option value="Standard">Standard</option>
        <option value="Savanna">Savanna</option>
        <option value="Theme Park">Theme Park</option>
      </select>
      <button type="submit">Add Reservation</button>
    </form>
  );
};

export default ReservationForm;
