
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import DashboardStats from './DashboardStats';
import HealthStatusCharts from './HealthStatusCharts';
import HealthTrends from './HealthTrends';
import RecentActivities from './RecentActivities';

const MedicalOfficerDashboard = () => {
  const [isSchedulingBulkAME, setIsSchedulingBulkAME] = useState(false);
  const { toast } = useToast();

  const overviewStats = {
    totalEmployees: 8500,
    healthyEmployees: 7200,
    atRiskEmployees: 1100,
    criticalEmployees: 200,
    pendingAMEs: 450,
    completedAMEs: 7800,
    activeAlerts: 23
  };

  const recentActivities = [
    {
      type: 'critical',
      employee: 'John Doe (EMP001)',
      activity: 'Blood pressure reading critically high',
      time: '10 minutes ago'
    },
    {
      type: 'scheduled',
      employee: 'Jane Smith (EMP002)',
      activity: 'AME appointment scheduled for tomorrow',
      time: '1 hour ago'
    },
    {
      type: 'completed',
      employee: 'Mike Johnson (EMP003)',
      activity: 'Annual medical examination completed',
      time: '2 hours ago'
    }
  ];

  const healthTrends = {
    hypertension: { current: 15, trend: 'up', change: 2 },
    diabetes: { current: 8, trend: 'stable', change: 0 },
    obesity: { current: 22, trend: 'down', change: -3 },
    cardiovascular: { current: 12, trend: 'up', change: 1 }
  };

  const handleScheduleBulkAME = async () => {
    setIsSchedulingBulkAME(true);
    try {
      // Simulate API call with actual scheduling logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock scheduling 450 pending AMEs
      const scheduledCount = overviewStats.pendingAMEs;
      
      toast({
        title: "Bulk AME Scheduling Completed",
        description: `Successfully scheduled ${scheduledCount} AME appointments. Personnel will be notified via email.`,
      });
      
      console.log(`Bulk AME scheduling completed for ${scheduledCount} employees`);
    } catch (error) {
      console.error('Bulk AME scheduling failed:', error);
      toast({
        title: "Scheduling Failed",
        description: "Failed to schedule bulk AMEs. Please check system connectivity and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSchedulingBulkAME(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medical Officer Dashboard</h1>
          <p className="text-gray-600">Monitor employee health across the dockyard facility</p>
        </div>
        <Button 
          onClick={handleScheduleBulkAME}
          disabled={isSchedulingBulkAME}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          <Calendar className="h-4 w-4 mr-2" />
          {isSchedulingBulkAME ? 'Scheduling...' : 'Schedule Bulk AMEs'}
        </Button>
      </div>

      {/* Key Metrics */}
      <DashboardStats stats={overviewStats} />

      {/* Health Status Distribution */}
      <HealthStatusCharts stats={overviewStats} />

      {/* Health Trends */}
      <HealthTrends trends={healthTrends} />

      {/* Recent Activities */}
      <RecentActivities activities={recentActivities} />
    </div>
  );
};

export default MedicalOfficerDashboard;
