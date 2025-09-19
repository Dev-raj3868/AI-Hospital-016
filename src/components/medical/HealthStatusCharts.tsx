
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface OverviewStats {
  totalEmployees: number;
  healthyEmployees: number;
  atRiskEmployees: number;
  criticalEmployees: number;
  pendingAMEs: number;
  completedAMEs: number;
  activeAlerts: number;
}

interface HealthStatusChartsProps {
  stats: OverviewStats;
}

const HealthStatusCharts: React.FC<HealthStatusChartsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Health Status Distribution</CardTitle>
          <CardDescription>Current health status across all employees</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-green-600">Healthy</span>
              <span className="text-sm text-gray-600">
                {stats.healthyEmployees} ({Math.round((stats.healthyEmployees / stats.totalEmployees) * 100)}%)
              </span>
            </div>
            <Progress value={Math.round((stats.healthyEmployees / stats.totalEmployees) * 100)} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-yellow-600">At Risk</span>
              <span className="text-sm text-gray-600">
                {stats.atRiskEmployees} ({Math.round((stats.atRiskEmployees / stats.totalEmployees) * 100)}%)
              </span>
            </div>
            <Progress value={Math.round((stats.atRiskEmployees / stats.totalEmployees) * 100)} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-red-600">Critical</span>
              <span className="text-sm text-gray-600">
                {stats.criticalEmployees} ({Math.round((stats.criticalEmployees / stats.totalEmployees) * 100)}%)
              </span>
            </div>
            <Progress value={Math.round((stats.criticalEmployees / stats.totalEmployees) * 100)} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AME Completion Status</CardTitle>
          <CardDescription>Annual Medical Examination progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">
              {Math.round((stats.completedAMEs / stats.totalEmployees) * 100)}%
            </p>
            <p className="text-sm text-gray-600">Completion Rate</p>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-green-600">Completed</span>
              <span className="text-sm text-gray-600">{stats.completedAMEs}</span>
            </div>
            <Progress value={Math.round((stats.completedAMEs / stats.totalEmployees) * 100)} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-orange-600">Pending</span>
              <span className="text-sm text-gray-600">{stats.pendingAMEs}</span>
            </div>
            <Progress value={Math.round((stats.pendingAMEs / stats.totalEmployees) * 100)} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthStatusCharts;
