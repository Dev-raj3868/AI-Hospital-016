
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Heart, Info, AlertTriangle } from 'lucide-react';

interface OverviewStats {
  totalEmployees: number;
  healthyEmployees: number;
  atRiskEmployees: number;
  criticalEmployees: number;
  pendingAMEs: number;
  completedAMEs: number;
  activeAlerts: number;
}

interface DashboardStatsProps {
  stats: OverviewStats;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in">
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600 hover:scale-110 transition-transform duration-200" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200">{stats.totalEmployees.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in">
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-green-600 hover:scale-110 transition-transform duration-200" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Healthy</p>
              <p className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors duration-200">{stats.healthyEmployees.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in">
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Info className="h-8 w-8 text-yellow-600 hover:scale-110 transition-transform duration-200" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">At Risk</p>
              <p className="text-2xl font-bold text-yellow-600 hover:text-yellow-700 transition-colors duration-200">{stats.atRiskEmployees.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in">
        <CardContent className="pt-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600 hover:scale-110 transition-transform duration-200" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-red-600 hover:text-red-700 transition-colors duration-200">{stats.criticalEmployees}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
