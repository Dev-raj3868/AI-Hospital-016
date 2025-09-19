
import React from 'react';
import AppointmentScheduler from './schedule/AppointmentScheduler';
import UpcomingAppointments from './schedule/UpcomingAppointments';
import AppointmentHistory from './schedule/AppointmentHistory';
import AMEReminders from './schedule/AMEReminders';

const AMESchedule = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AME Schedule</h1>
        <p className="text-gray-600">Manage your Annual Medical Examinations and health appointments</p>
      </div>

      <AppointmentScheduler />
      <UpcomingAppointments />
      <AppointmentHistory />
      <AMEReminders />
    </div>
  );
};

export default AMESchedule;
