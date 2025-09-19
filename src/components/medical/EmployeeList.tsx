
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, MapPin, Phone, Mail, Shield, Heart } from 'lucide-react';

interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  department: string;
  position: string;
  phone: string;
  healthStatus: 'excellent' | 'good' | 'warning' | 'critical';
  lastCheckup: string;
  nextAME: string;
  bloodGroup: string;
  medicalClearance: string;
  securityClearance: string;
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    name: 'John Doe',
    email: 'john.doe@dockyard.gov',
    department: 'Marine Infrastructure',
    position: 'Senior Marine Engineer',
    phone: '+91 98765 43210',
    healthStatus: 'good',
    lastCheckup: '2024-05-15',
    nextAME: '2024-07-15',
    bloodGroup: 'O+',
    medicalClearance: 'Valid',
    securityClearance: 'Level 2'
  },
  {
    id: '2',
    employeeId: 'EMP002',
    name: 'Jane Smith',
    email: 'jane.smith@dockyard.gov',
    department: 'Naval Architecture',
    position: 'Naval Architect',
    phone: '+91 98765 43211',
    healthStatus: 'excellent',
    lastCheckup: '2024-04-20',
    nextAME: '2024-08-20',
    bloodGroup: 'A+',
    medicalClearance: 'Valid',
    securityClearance: 'Level 3'
  },
  {
    id: '3',
    employeeId: 'EMP003',
    name: 'Mike Johnson',
    email: 'mike.johnson@dockyard.gov',
    department: 'Electrical Systems',
    position: 'Electrical Engineer',
    phone: '+91 98765 43212',
    healthStatus: 'warning',
    lastCheckup: '2024-03-10',
    nextAME: '2024-06-10',
    bloodGroup: 'B+',
    medicalClearance: 'Conditional',
    securityClearance: 'Level 2'
  },
  {
    id: '4',
    employeeId: 'EMP004',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@dockyard.gov',
    department: 'Quality Assurance',
    position: 'QA Inspector',
    phone: '+91 98765 43213',
    healthStatus: 'critical',
    lastCheckup: '2024-06-01',
    nextAME: '2024-06-15',
    bloodGroup: 'AB+',
    medicalClearance: 'Under Review',
    securityClearance: 'Level 1'
  },
  {
    id: '5',
    employeeId: 'EMP005',
    name: 'Robert Brown',
    email: 'robert.brown@dockyard.gov',
    department: 'Mechanical Systems',
    position: 'Mechanical Engineer',
    phone: '+91 98765 43214',
    healthStatus: 'good',
    lastCheckup: '2024-05-25',
    nextAME: '2024-09-25',
    bloodGroup: 'O-',
    medicalClearance: 'Valid',
    securityClearance: 'Level 2'
  }
];

const EmployeeList: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'excellent': return 'bg-blue-100 text-blue-800';
      case 'good': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="space-y-4">
      {mockEmployees.map((employee) => (
        <Card key={employee.id} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="h-12 w-12 hover:scale-110 transition-transform duration-200">
                <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                  {getInitials(employee.name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                      {employee.name} ({employee.employeeId})
                    </h3>
                    <p className="text-sm text-gray-600">{employee.position}</p>
                    <p className="text-sm text-gray-500">{employee.department}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-gray-400" />
                    <Badge className={`${getStatusColor(employee.healthStatus)} hover:scale-105 transition-transform duration-200`}>
                      {employee.healthStatus.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Contact Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200">
                        <Mail className="h-3 w-3 mr-2" />
                        {employee.email}
                      </div>
                      <div className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200">
                        <Phone className="h-3 w-3 mr-2" />
                        {employee.phone}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 flex items-center">
                      <Heart className="h-4 w-4 mr-2" />
                      Health Status
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Last Checkup:</span>
                        <span className="ml-2 font-medium">{employee.lastCheckup}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Next AME:</span>
                        <span className="ml-2 font-medium">{employee.nextAME}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Blood Group:</span>
                        <span className="ml-2 font-medium">{employee.bloodGroup}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Clearances
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-gray-600">Medical:</span>
                        <Badge className="ml-2 bg-green-100 text-green-800 hover:scale-105 transition-transform duration-200">
                          {employee.medicalClearance}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Security:</span>
                        <Badge className="ml-2 bg-blue-100 text-blue-800 hover:scale-105 transition-transform duration-200">
                          {employee.securityClearance}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EmployeeList;
