
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, Heart, Calendar, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HealthAlerts = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      type: 'critical',
      title: 'Critical Blood Pressure Reading',
      employee: 'John Doe (EMP001)',
      department: 'Engineering',
      message: 'Blood pressure reading of 180/120 recorded. Immediate medical attention required.',
      timestamp: '2024-06-12 10:30 AM',
      resolved: false,
      assignedTo: 'Dr. Sarah Johnson'
    },
    {
      id: '2',
      type: 'warning',
      title: 'BMI Above Normal Range',
      employee: 'Mike Wilson (EMP003)',
      department: 'Logistics',
      message: 'BMI of 32.5 indicates obesity. Lifestyle counseling recommended.',
      timestamp: '2024-06-12 09:15 AM',
      resolved: false,
      assignedTo: 'Dr. Sarah Johnson'
    },
    {
      id: '3',
      type: 'info',
      title: 'AME Due Reminder',
      employee: 'Lisa Davis (EMP005)',
      department: 'Administration',
      message: 'Annual Medical Examination due in 15 days. Please schedule appointment.',
      timestamp: '2024-06-12 08:00 AM',
      resolved: false,
      assignedTo: 'Medical Team'
    },
    {
      id: '4',
      type: 'critical',
      title: 'Abnormal Lab Results',
      employee: 'David Brown (EMP004)',
      department: 'Maintenance',
      message: 'Elevated liver enzymes detected. Follow-up testing required immediately.',
      timestamp: '2024-06-11 04:30 PM',
      resolved: true,
      assignedTo: 'Dr. Sarah Johnson',
      resolvedBy: 'Dr. Sarah Johnson',
      resolvedAt: '2024-06-12 09:00 AM'
    }
  ]);

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { 
              ...alert, 
              resolved: true, 
              resolvedBy: 'Dr. Sarah Johnson',
              resolvedAt: new Date().toLocaleString()
            }
          : alert
      )
    );
    
    toast({
      title: "Alert Resolved",
      description: "The health alert has been marked as resolved.",
    });
  };

  const handleAssignAlert = (alertId: string, assignTo: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, assignedTo: assignTo }
          : alert
      )
    );
    
    toast({
      title: "Alert Assigned",
      description: `Alert has been assigned to ${assignTo}.`,
    });
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800 border-red-300">Critical</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Warning</Badge>;
      case 'info':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Info</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-300">Unknown</Badge>;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <Heart className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <Info className="h-5 w-5 text-yellow-600" />;
      case 'info':
        return <Calendar className="h-5 w-5 text-blue-600" />;
      default:
        return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  const activeAlerts = alerts.filter(alert => !alert.resolved);
  const resolvedAlerts = alerts.filter(alert => alert.resolved);
  const criticalAlerts = alerts.filter(alert => alert.type === 'critical' && !alert.resolved);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Health Alerts</h1>
        <p className="text-gray-600">Monitor and manage health alerts across the workforce</p>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Info className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Active</p>
                <p className="text-2xl font-bold text-blue-600">{activeAlerts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Critical</p>
                <p className="text-2xl font-bold text-red-600">{criticalAlerts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resolved Today</p>
                <p className="text-2xl font-bold text-green-600">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-purple-600">2.5h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Alerts ({activeAlerts.length})</TabsTrigger>
          <TabsTrigger value="critical">Critical ({criticalAlerts.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({resolvedAlerts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Health Alerts</CardTitle>
              <CardDescription>Health alerts requiring attention or action</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`p-4 rounded-lg border-l-4 ${
                      alert.type === 'critical' ? 'bg-red-50 border-red-500' :
                      alert.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                      'bg-blue-50 border-blue-500'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                            {getAlertBadge(alert.type)}
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                            <p><strong>Employee:</strong> {alert.employee}</p>
                            <p><strong>Department:</strong> {alert.department}</p>
                            <p><strong>Time:</strong> {alert.timestamp}</p>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            <strong>Assigned to:</strong> {alert.assignedTo}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAssignAlert(alert.id, 'Dr. Michael Brown')}
                        >
                          Reassign
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleResolveAlert(alert.id)}
                        >
                          Resolve
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="critical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Critical Health Alerts</CardTitle>
              <CardDescription>Urgent health alerts requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criticalAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Heart className="h-5 w-5 text-red-600" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                            <Badge className="bg-red-100 text-red-800 border-red-300">URGENT</Badge>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                            <p><strong>Employee:</strong> {alert.employee}</p>
                            <p><strong>Department:</strong> {alert.department}</p>
                            <p><strong>Time:</strong> {alert.timestamp}</p>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            <strong>Assigned to:</strong> {alert.assignedTo}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button size="sm" variant="outline">
                          Call Employee
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleResolveAlert(alert.id)}
                        >
                          Resolve
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resolved Health Alerts</CardTitle>
              <CardDescription>Previously active alerts that have been resolved</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resolvedAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-700">{alert.title}</h3>
                            <Badge className="bg-green-100 text-green-800 border-green-300">Resolved</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-500">
                            <p><strong>Employee:</strong> {alert.employee}</p>
                            <p><strong>Department:</strong> {alert.department}</p>
                            <p><strong>Created:</strong> {alert.timestamp}</p>
                          </div>
                          {alert.resolvedBy && (
                            <p className="text-sm text-green-600 mt-2">
                              <strong>Resolved by:</strong> {alert.resolvedBy} at {alert.resolvedAt}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthAlerts;
