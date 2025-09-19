
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon } from 'lucide-react';

const AppointmentScheduler = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { toast } = useToast();

  const handleScheduleAppointment = () => {
    if (!selectedDate) {
      toast({
        title: "Please select a date",
        description: "Choose a date for your appointment",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Appointment Request Submitted",
      description: `Your appointment request for ${format(selectedDate, "PPP")} has been sent to the medical team for approval.`,
    });

    setSelectedDate(undefined);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule New Appointment</CardTitle>
        <CardDescription>Request a new medical examination or consultation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50" align="start" side="bottom">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button 
            onClick={handleScheduleAppointment} 
            className="bg-blue-600 hover:bg-blue-700 w-full"
          >
            Request Appointment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentScheduler;
