
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

const UpcomingAppointments = () => {
  const upcomingAppointments: Appointment[] = [
    {
      id: '1',
      date: '2024-07-15',
      time: '09:00 AM',
      type: 'Annual Medical Examination',
      location: 'Medical Center - Room 101',
      status: 'scheduled'
    },
    {
      id: '2',
      date: '2024-08-20',
      time: '02:00 PM',
      type: 'Follow-up Consultation',
      location: 'Medical Center - Room 205',
      status: 'scheduled'
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
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>Your scheduled medical examinations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200 gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{appointment.type}</h3>
                <p className="text-sm text-gray-600">
                  {appointment.date} at {appointment.time}
                </p>
                <p className="text-sm text-gray-500">{appointment.location}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                {getStatusBadge(appointment.status)}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  <Button variant="destructive" size="sm">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointments;
