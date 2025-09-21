
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Clock, Stethoscope, Activity } from 'lucide-react';

const AppointmentScheduler = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTherapy, setSelectedTherapy] = useState<string>('');
  const [selectedDisease, setSelectedDisease] = useState<string>('');
  const [appointmentTime, setAppointmentTime] = useState<string>('');
  const [symptoms, setSymptoms] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const { toast } = useToast();

  const therapyOptions = [
    'General Consultation',
    'Cardiology',
    'Dermatology',
    'Orthopedics',
    'Neurology',
    'Ophthalmology',
    'ENT (Ear, Nose, Throat)',
    'Psychiatry',
    'Physical Therapy',
    'Occupational Therapy'
  ];

  const diseaseCategories = [
    'Cardiovascular Disorders',
    'Respiratory Conditions',
    'Musculoskeletal Issues',
    'Neurological Disorders',
    'Skin Conditions',
    'Mental Health',
    'Digestive System',
    'Endocrine Disorders',
    'Infectious Diseases',
    'Other/General Health'
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM'
  ];

  const priorityLevels = [
    'Routine',
    'Urgent',
    'Emergency'
  ];

  const handleScheduleAppointment = () => {
    if (!selectedDate) {
      toast({
        title: "Please select a date",
        description: "Choose a date for your appointment",
        variant: "destructive"
      });
      return;
    }

    if (!appointmentTime) {
      toast({
        title: "Please select a time",
        description: "Choose a time slot for your appointment",
        variant: "destructive"
      });
      return;
    }

    if (!selectedTherapy) {
      toast({
        title: "Please select a therapy type",
        description: "Choose the type of therapy or consultation needed",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Appointment Request Submitted",
      description: `Your ${selectedTherapy} appointment for ${format(selectedDate, "PPP")} at ${appointmentTime} has been sent to the medical team for approval.`,
    });

    // Reset form
    setSelectedDate(undefined);
    setSelectedTherapy('');
    setSelectedDisease('');
    setAppointmentTime('');
    setSymptoms('');
    setPriority('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule New Appointment</CardTitle>
        <CardDescription>Request a new medical examination or consultation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date Selection */}
          <div className="w-full">
            <label className="block text-sm font-medium text-foreground mb-2">
              Select Date *
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

          {/* Time Selection */}
          {selectedDate && (
            <div className="w-full animate-fade-in">
              <label className="block text-sm font-medium text-foreground mb-2">
                Select Time *
              </label>
              <Select value={appointmentTime} onValueChange={setAppointmentTime}>
                <SelectTrigger className="w-full">
                  <Clock className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Choose time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Additional Details (shown after date selection) */}
        {selectedDate && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Therapy Type */}
              <div className="w-full">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Therapy Type *
                </label>
                <Select value={selectedTherapy} onValueChange={setSelectedTherapy}>
                  <SelectTrigger className="w-full">
                    <Stethoscope className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select therapy type" />
                  </SelectTrigger>
                  <SelectContent>
                    {therapyOptions.map((therapy) => (
                      <SelectItem key={therapy} value={therapy}>
                        {therapy}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Disease Category */}
              <div className="w-full">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Health Concern Category
                </label>
                <Select value={selectedDisease} onValueChange={setSelectedDisease}>
                  <SelectTrigger className="w-full">
                    <Activity className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {diseaseCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Priority Level */}
            <div className="w-full">
              <label className="block text-sm font-medium text-foreground mb-2">
                Priority Level
              </label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select priority level" />
                </SelectTrigger>
                <SelectContent>
                  {priorityLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Symptoms Description */}
            <div className="w-full">
              <label className="block text-sm font-medium text-foreground mb-2">
                Symptoms / Additional Information
              </label>
              <Textarea
                placeholder="Describe your symptoms, concerns, or any additional information for the medical team..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <Button 
              onClick={handleScheduleAppointment} 
              className="bg-primary hover:bg-primary/90 w-full"
              size="lg"
            >
              Request Appointment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentScheduler;
