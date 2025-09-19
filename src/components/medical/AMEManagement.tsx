
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, Info } from 'lucide-react';

const AMEManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const scheduledAMEs = [
    {
      id: '1',
      employeeName: 'John Smith',
      employeeId: 'EMP001',
      department: 'Engineering',
      scheduledDate: '2024-06-15',
      time: '09:00 AM',
      type: 'Annual',
      status: 'scheduled'
    },
    {
      id: '2',
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP002',
      department: 'Manufacturing',
      scheduledDate: '2024-06-16',
      time: '10:30 AM',
      type: 'Follow-up',
      status: 'scheduled'
    },
    {
      id: '3',
      employeeName: 'Mike Wilson',
      employeeId: 'EMP003',
      department: 'Logistics',
      scheduledDate: '2024-06-17',
      time: '02:00 PM',
      type: 'Annual',
      status: 'scheduled'
    }
  ];

  const overdue = [
    {
      id: '4',
      employeeName: 'David Brown',
      employeeId: 'EMP004',
      department: 'Maintenance',
      lastAME: '2023-05-15',
      daysPastDue: 45,
      status: 'overdue'
    },
    {
      id: '5',
      employeeName: 'Lisa Davis',
      employeeId: 'EMP005',
      department: 'Administration',
      lastAME: '2023-04-20',
      daysPastDue: 70,
      status: 'overdue'
    }
  ];

  const completed = [
    {
      id: '6',
      employeeName: 'Robert Taylor',
      employeeId: 'EMP006',
      department: 'Engineering',
      completedDate: '2024-06-10',
      type: 'Annual',
      findings: 'Normal',
      status: 'completed'
    },
    {
      id: '7',
      employeeName: 'Jennifer White',
      employeeId: 'EMP007',
      department: 'Manufacturing',
      completedDate: '2024-06-09',
      type: 'Follow-up',
      findings: 'Hypertension - monitoring required',
      status: 'completed'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      case 'cancelled':
        return <Badge className="bg-gray-100 text-gray-800">Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const filteredScheduled = scheduledAMEs.filter(ame =>
    ame.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ame.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ame.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AME Management</h1>
          <p className="text-gray-600">Manage Annual Medical Examinations for all employees</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Bulk AMEs
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">{scheduledAMEs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Info className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{overdue.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed This Month</p>
                <p className="text-2xl font-bold text-green-600">245</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-purple-600">92%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Search and Filter</CardTitle>
          <CardDescription>Find specific employees or filter by criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search by Name, ID, or Department</Label>
              <Input
                id="search"
                placeholder="Enter search term..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-2"
              />
            </div>
            <div className="flex items-end space-x-2">
              <Button variant="outline">Filter by Department</Button>
              <Button variant="outline">Filter by Status</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AME Tabs */}
      <Tabs defaultValue="scheduled" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled AMEs</CardTitle>
              <CardDescription>Upcoming medical examinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredScheduled.map((ame) => (
                  <div key={ame.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2">
                      <div>
                        <p className="font-semibold text-gray-900">{ame.employeeName}</p>
                        <p className="text-sm text-gray-600">{ame.employeeId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Department</p>
                        <p className="font-medium">{ame.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Date & Time</p>
                        <p className="font-medium">{ame.scheduledDate} at {ame.time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Type</p>
                        <p className="font-medium">{ame.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 ml-4">
                      {getStatusBadge(ame.status)}
                      <Button variant="outline" size="sm">Reschedule</Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">Mark Complete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Overdue AMEs</CardTitle>
              <CardDescription>Employees with overdue medical examinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {overdue.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2">
                      <div>
                        <p className="font-semibold text-gray-900">{employee.employeeName}</p>
                        <p className="text-sm text-gray-600">{employee.employeeId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Department</p>
                        <p className="font-medium">{employee.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Last AME</p>
                        <p className="font-medium">{employee.lastAME}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Days Overdue</p>
                        <p className="font-medium text-red-600">{employee.daysPastDue} days</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 ml-4">
                      {getStatusBadge(employee.status)}
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Schedule Now</Button>
                      <Button variant="outline" size="sm">Send Reminder</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed AMEs</CardTitle>
              <CardDescription>Recently completed medical examinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completed.map((ame) => (
                  <div key={ame.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2">
                      <div>
                        <p className="font-semibold text-gray-900">{ame.employeeName}</p>
                        <p className="text-sm text-gray-600">{ame.employeeId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Department</p>
                        <p className="font-medium">{ame.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Completed Date</p>
                        <p className="font-medium">{ame.completedDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Findings</p>
                        <p className="font-medium">{ame.findings}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 ml-4">
                      {getStatusBadge(ame.status)}
                      <Button variant="outline" size="sm">View Report</Button>
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

export default AMEManagement;
