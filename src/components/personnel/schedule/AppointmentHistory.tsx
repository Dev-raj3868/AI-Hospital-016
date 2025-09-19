
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Appointment {
  id: string;
  date: string;
  time: string;
  type: string;
  location: string;
  status: string;
}

const AppointmentHistory = () => {
  const pastAppointments: Appointment[] = [
    {
      id: '3',
      date: '2024-05-15',
      time: '10:30 AM',
      type: 'Annual Medical Examination',
      location: 'Medical Center - Room 101',
      status: 'completed'
    },
    {
      id: '4',
      date: '2024-03-10',
      time: '11:00 AM',
      type: 'Routine Checkup',
      location: 'Medical Center - Room 102',
      status: 'completed'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointment History</CardTitle>
        <CardDescription>Your previous medical examinations and consultations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pastAppointments.map((appointment) => (
            <div key={appointment.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{appointment.type}</h3>
                <p className="text-sm text-gray-600">
                  {appointment.date} at {appointment.time}
                </p>
                <p className="text-sm text-gray-500">{appointment.location}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                {getStatusBadge(appointment.status)}
                <Button variant="outline" size="sm">
                  View Report
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentHistory;
