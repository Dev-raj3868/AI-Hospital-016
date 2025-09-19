
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AMEReminders = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Important Reminders</CardTitle>
        <CardDescription>Stay on track with your health requirements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-yellow-800">Annual AME Due</p>
              <p className="text-sm text-yellow-700">
                Your next annual medical examination is due in 30 days. Please schedule at your earliest convenience.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-blue-800">Pre-AME Preparation</p>
              <p className="text-sm text-blue-700">
                Remember to fast for 12 hours before your blood tests. Bring a list of current medications.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AMEReminders;
