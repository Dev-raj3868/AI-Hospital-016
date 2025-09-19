
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, Heart, User, Upload, Settings, Bell } from 'lucide-react';

interface QuickActionsProps {
  onTabChange: (tab: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onTabChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Manage your health data efficiently</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Button 
            className="h-16 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700"
            onClick={() => onTabChange('ame')}
          >
            <Calendar className="h-6 w-6 mb-1" />
            <span className="text-xs sm:text-sm">Schedule AME</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex flex-col items-center justify-center"
            onClick={() => onTabChange('upload')}
          >
            <Upload className="h-6 w-6 mb-1" />
            <span className="text-xs sm:text-sm">Upload Docs</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex flex-col items-center justify-center"
            onClick={() => onTabChange('health-data')}
          >
            <Heart className="h-6 w-6 mb-1" />
            <span className="text-xs sm:text-sm">Health Data</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex flex-col items-center justify-center"
            onClick={() => onTabChange('settings')}
          >
            <Settings className="h-6 w-6 mb-1" />
            <span className="text-xs sm:text-sm">Settings</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
