
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const HealthProgress = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Goals Progress</CardTitle>
        <CardDescription>Track your wellness journey</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Annual Health Checkups</span>
            <span className="text-sm text-gray-600">3/4 completed</span>
          </div>
          <Progress value={75} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Health Data Completeness</span>
            <span className="text-sm text-gray-600">85%</span>
          </div>
          <Progress value={85} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Preventive Care Actions</span>
            <span className="text-sm text-gray-600">6/8 completed</span>
          </div>
          <Progress value={75} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthProgress;
