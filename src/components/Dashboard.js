import React from 'react';
import { Pie } from 'react-chartjs-2';
import { format, differenceInDays, addMonths, parseISO } from 'date-fns';

const Dashboard = ({ contracts, reservations, exportToCalendar }) => {
  const totalPoints = contracts.reduce((sum, c) => sum + (c.currentPoints || 0) + (c.bankedPoints || 0) + (c.holdingPoints || 0), 0);
  const usedPoints = reservations.reduce((sum, r) => sum + r.points, 0);

  const chartData = {
    labels: ['Used Points', 'Remaining Points'],
    datasets: [{
      data: [usedPoints, totalPoints - usedPoints],
      backgroundColor: ['#b22222', '#4682b4'],
    }],
  };

  const today = new Date();
  return (
    <div>
      <h2 className="mickey-icon">Dashboard</h2>
      <div className="chart-container">
        <Pie data={chartData} />
      </div>
      <h3>Contracts</h3>
      {contracts.map(c => {
        const bankingDeadline = addMonths(parseISO(`${c.useYear}-01-01`), 8);
        const daysToBank = differenceInDays(bankingDeadline, today);
        const holdingExpiry = c.holdingPoints > 0 ? parseISO(c.holdingExpiry) : null;
        const daysToHoldingExpiry = holdingExpiry ? differenceInDays(holdingExpiry, today) : null;
        const booking11Month = addMonths(today, 11);
        const booking7Month = addMonths(today, 7);

        return (
          <div key={c.id}>
            <p><strong>Contract #{c.contractNumber}</strong> ({c.homeResort}, Use Year: {c.useYear})</p>
            <p>Current: {c.currentPoints} | Banked: {c.bankedPoints} | Borrowed: {c.borrowedPoints} | Holding: {c.holdingPoints} (Expires: {c.holdingExpiry || 'N/A'})</p>
            <p>Banking Deadline: {format(bankingDeadline, 'MMM dd, yyyy')} ({daysToBank} days)</p>
            {daysToBank <= 30 && <button onClick={() => alert('Banking deadline approaching!')}>Reminder: Bank Points</button>}
            {daysToHoldingExpiry && daysToHoldingExpiry <= 30 && <button onClick={() => alert('Holding points expiring soon!')}>Reminder: Use Holding Points</button>}
            <button onClick={() => exportToCalendar({ start: booking11Month, title: `11-Month Booking for ${c.homeResort}` })}>
              Export 11-Month Booking Reminder
            </button>
            <button onClick={() => exportToCalendar({ start: booking7Month, title: `7-Month Booking for Other Resorts` })}>
              Export 7-Month Booking Reminder
            </button>
          </div>
        );
      })}

      <h3>Reservations</h3>
      {reservations.map(r => {
        const checkIn = parseISO(r.checkIn);
        const daysToTrip = differenceInDays(checkIn, today);
        return (
          <div key={r.id}>
            <p>{r.resort} ({r.roomType}, {r.viewType}) | {format(checkIn, 'MMM dd, yyyy')} - {format(parseISO(r.checkOut), 'MMM dd, yyyy')} | {r.points} Points</p>
            <p>Trip Countdown: {daysToTrip} days</p>
            <button onClick={() => exportToCalendar({ start: checkIn, title: `${r.resort} Trip` })}>Export Trip to Calendar</button>
            {daysToTrip <= 30 && <button onClick={() => alert(`Your ${r.resort} trip is ${daysToTrip} days away!`)}>Trip Reminder</button>}
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
