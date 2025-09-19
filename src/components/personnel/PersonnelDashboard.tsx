
import React from 'react';
import HealthStatusCards from './HealthStatusCards';
import VitalsDisplay from './VitalsDisplay';
import QuickActions from './QuickActions';
import HealthProgress from './HealthProgress';
import HealthAlerts from './HealthAlerts';

interface PersonnelDashboardProps {
  onTabChange: (tab: string) => void;
}

const PersonnelDashboard: React.FC<PersonnelDashboardProps> = ({ onTabChange }) => {
  const healthStatus = {
    overall: 'good',
    lastCheckup: '2024-05-15',
    nextAME: '2024-07-15',
    completionRate: 85
  };

  const vitals = {
    bmi: 24.5,
    bloodPressure: '120/80',
    heartRate: 72,
    lastUpdated: '2024-06-10'
  };

  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left">
        <h1 className="text-2xl font-bold text-gray-900">My Health Dashboard</h1>
        <p className="text-gray-600 mt-1">Track your health metrics and stay on top of your wellness</p>
      </div>

      {/* Health Status Overview */}
      <HealthStatusCards healthStatus={healthStatus} />

      {/* Current Vitals */}
      <VitalsDisplay vitals={vitals} />

      {/* Health Progress and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HealthProgress />
        <HealthAlerts />
      </div>

      {/* Quick Actions */}
      <QuickActions onTabChange={onTabChange} />
    </div>
  );
};

export default PersonnelDashboard;
