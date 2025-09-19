
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Calendar, Phone, Mail, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import EmployeeList from '@/components/medical/EmployeeList';

const PersonnelDetails = () => {
  const { user } = useAuth();

  // If user is medical officer, show all employees list
  if (user?.role === 'medical_officer') {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Personnel Details</h1>
          <p className="text-gray-600">Employee health status and contact information</p>
        </div>
        <EmployeeList />
      </div>
    );
  }

  // Original personnel details for individual users
  const personnelInfo = {
    employeeId: user?.employeeId || 'EMP001',
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@dockyard.gov',
    department: 'Marine Infrastructure',
    position: 'Senior Marine Engineer',
    joinDate: '2019-03-15',
    phone: '+91 98765 43210',
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+91 98765 43211'
    },
    address: '123 Harbor View, Kochi, Kerala 682001',
    medicalClearance: 'Valid',
    securityClearance: 'Level 2'
  };

  const healthStatus = {
    overall: 'good',
    lastCheckup: '2024-05-15',
    nextAME: '2024-07-15',
    bloodGroup: 'O+',
    allergies: ['Penicillin'],
    chronicConditions: [],
    fitnessLevel: 'Fit for Duty'
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'excellent': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Personnel Details</h1>
        <p className="text-gray-600">Your personal and health information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Personal Information
            </CardTitle>
            <CardDescription>Your basic details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Employee ID</label>
                <p className="text-sm text-gray-900">{personnelInfo.employeeId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Full Name</label>
                <p className="text-sm text-gray-900">{personnelInfo.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Department</label>
                <p className="text-sm text-gray-900">{personnelInfo.department}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Position</label>
                <p className="text-sm text-gray-900">{personnelInfo.position}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Join Date</label>
                <p className="text-sm text-gray-900">{personnelInfo.joinDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Phone</label>
                <p className="text-sm text-gray-900">{personnelInfo.phone}</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <p className="text-sm text-gray-900">{personnelInfo.email}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Address</label>
              <p className="text-sm text-gray-900">{personnelInfo.address}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Emergency Contact</label>
              <div className="text-sm text-gray-900">
                <p>{personnelInfo.emergencyContact.name} ({personnelInfo.emergencyContact.relationship})</p>
                <p>{personnelInfo.emergencyContact.phone}</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Medical Clearance</label>
                <div>
                  <Badge className="bg-green-100 text-green-800 mt-1 hover:scale-105 transition-transform duration-200">
                    {personnelInfo.medicalClearance}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Security Clearance</label>
                <div>
                  <Badge className="bg-blue-100 text-blue-800 mt-1 hover:scale-105 transition-transform duration-200">
                    <Shield className="h-3 w-3 mr-1" />
                    {personnelInfo.securityClearance}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Status */}
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Healthcare Status
            </CardTitle>
            <CardDescription>Your current health and medical information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Overall Health Status</label>
              <div className="mt-1">
                <Badge className={`${getStatusColor(healthStatus.overall)} hover:scale-105 transition-transform duration-200`}>
                  {healthStatus.overall.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Last Checkup</label>
                <p className="text-sm text-gray-900">{healthStatus.lastCheckup}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Next AME</label>
                <p className="text-sm text-gray-900">{healthStatus.nextAME}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Blood Group</label>
                <p className="text-sm text-gray-900">{healthStatus.bloodGroup}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Fitness Level</label>
                <p className="text-sm text-gray-900">{healthStatus.fitnessLevel}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Known Allergies</label>
              <div className="mt-1 space-x-2">
                {healthStatus.allergies.length > 0 ? (
                  healthStatus.allergies.map((allergy, index) => (
                    <Badge key={index} className="bg-red-100 text-red-800 hover:scale-105 transition-transform duration-200">
                      {allergy}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No known allergies</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Chronic Conditions</label>
              <div className="mt-1">
                {healthStatus.chronicConditions.length > 0 ? (
                  healthStatus.chronicConditions.map((condition, index) => (
                    <Badge key={index} className="bg-yellow-100 text-yellow-800 mr-2 hover:scale-105 transition-transform duration-200">
                      {condition}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No chronic conditions</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonnelDetails;
