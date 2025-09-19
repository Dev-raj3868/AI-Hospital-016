
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Heart, AlertTriangle } from 'lucide-react';

const HealthAlerts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Alerts & Recommendations</CardTitle>
        <CardDescription>Stay informed about your health</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-800">AME Due Soon</p>
            <p className="text-sm text-yellow-700">Your annual medical examination is due in 30 days</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <Heart className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800">Health Tip</p>
            <p className="text-sm text-blue-700">Consider increasing your daily water intake to 8-10 glasses</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
          <Info className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-green-800">Wellness Update</p>
            <p className="text-sm text-green-700">Your recent health metrics show improvement in cardiovascular health</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthAlerts;
