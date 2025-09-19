
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Vitals {
  bmi: number;
  bloodPressure: string;
  heartRate: number;
  lastUpdated: string;
}

interface VitalsDisplayProps {
  vitals: Vitals;
}

const VitalsDisplay: React.FC<VitalsDisplayProps> = ({ vitals }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Vitals</CardTitle>
        <CardDescription>Last updated: {vitals.lastUpdated}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">BMI</p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">{vitals.bmi}</p>
            <p className="text-sm text-green-600">Normal Range</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Blood Pressure</p>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">{vitals.bloodPressure}</p>
            <p className="text-sm text-green-600">Optimal</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Heart Rate</p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">{vitals.heartRate} bpm</p>
            <p className="text-sm text-green-600">Normal</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VitalsDisplay;
