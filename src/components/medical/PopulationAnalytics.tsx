
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const PopulationAnalytics = () => {
  const ageDistribution = [
    { ageGroup: '20-30', count: 1500, percentage: 17.6 },
    { ageGroup: '31-40', count: 2800, percentage: 32.9 },
    { ageGroup: '41-50', count: 2500, percentage: 29.4 },
    { ageGroup: '51-60', count: 1700, percentage: 20.0 }
  ];

  const departmentHealth = [
    { department: 'Engineering', healthy: 85, atRisk: 12, critical: 3 },
    { department: 'Manufacturing', healthy: 78, atRisk: 18, critical: 4 },
    { department: 'Logistics', healthy: 82, atRisk: 15, critical: 3 },
    { department: 'Administration', healthy: 88, atRisk: 10, critical: 2 },
    { department: 'Maintenance', healthy: 75, atRisk: 20, critical: 5 }
  ];

  const healthTrends = [
    { month: 'Jan', healthy: 83, atRisk: 14, critical: 3 },
    { month: 'Feb', healthy: 82, atRisk: 15, critical: 3 },
    { month: 'Mar', healthy: 84, atRisk: 13, critical: 3 },
    { month: 'Apr', healthy: 85, atRisk: 12, critical: 3 },
    { month: 'May', healthy: 84, atRisk: 13, critical: 3 },
    { month: 'Jun', healthy: 85, atRisk: 13, critical: 2 }
  ];

  const commonConditions = [
    { name: 'Hypertension', value: 15, color: '#ef4444' },
    { name: 'Diabetes', value: 8, color: '#f97316' },
    { name: 'Obesity', value: 22, color: '#eab308' },
    { name: 'Cardiovascular', value: 12, color: '#3b82f6' },
    { name: 'Respiratory', value: 6, color: '#8b5cf6' },
    { name: 'Other', value: 37, color: '#6b7280' }
  ];

  const riskFactors = [
    { factor: 'Smoking', prevalence: 18, trend: 'down' },
    { factor: 'Physical Inactivity', prevalence: 35, trend: 'stable' },
    { factor: 'Poor Diet', prevalence: 28, trend: 'down' },
    { factor: 'Excessive Alcohol', prevalence: 12, trend: 'stable' },
    { factor: 'Stress', prevalence: 42, trend: 'up' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Population Analytics</h1>
        <p className="text-gray-600">Comprehensive health analytics across the dockyard workforce</p>
      </div>

      {/* Age Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Age Distribution</CardTitle>
            <CardDescription>Employee distribution by age groups</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageGroup" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Health Conditions</CardTitle>
            <CardDescription>Prevalence of health conditions in workforce</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={commonConditions}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {commonConditions.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Health Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Health Status by Department</CardTitle>
          <CardDescription>Comparative health status across different departments</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={departmentHealth} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="healthy" stackId="a" fill="#10b981" name="Healthy" />
              <Bar dataKey="atRisk" stackId="a" fill="#f59e0b" name="At Risk" />
              <Bar dataKey="critical" stackId="a" fill="#ef4444" name="Critical" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Health Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Health Trends Over Time</CardTitle>
          <CardDescription>Monthly trends in employee health status</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={healthTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="healthy" stroke="#10b981" strokeWidth={3} name="Healthy %" />
              <Line type="monotone" dataKey="atRisk" stroke="#f59e0b" strokeWidth={3} name="At Risk %" />
              <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={3} name="Critical %" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Factors Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Factors Analysis</CardTitle>
          <CardDescription>Prevalence of key health risk factors in the workforce</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskFactors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{factor.factor}</h3>
                  <div className="flex items-center mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${factor.prevalence}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 min-w-[3rem]">
                      {factor.prevalence}%
                    </span>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className={`flex items-center ${
                    factor.trend === 'up' ? 'text-red-600' :
                    factor.trend === 'down' ? 'text-green-600' :
                    'text-gray-600'
                  }`}>
                    <span className="mr-1">
                      {factor.trend === 'up' ? '↗️' : factor.trend === 'down' ? '↘️' : '➡️'}
                    </span>
                    <span className="text-sm font-medium capitalize">{factor.trend}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">92%</p>
              <p className="text-sm text-gray-600">AME Completion Rate</p>
              <p className="text-xs text-green-600 mt-1">+3% vs last year</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">85%</p>
              <p className="text-sm text-gray-600">Overall Health Score</p>
              <p className="text-xs text-green-600 mt-1">+1% vs last quarter</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">23</p>
              <p className="text-sm text-gray-600">Active Health Alerts</p>
              <p className="text-xs text-red-600 mt-1">+5 vs last week</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PopulationAnalytics;
