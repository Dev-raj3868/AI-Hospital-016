import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Shield, 
  FileText, 
  Calendar, 
  Heart, 
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  User
} from 'lucide-react';

type Step = 'search' | 'otp' | 'history';

interface PatientInfo {
  id: string;
  name: string;
  aadhaar: string;
  phone: string;
  email: string;
  age: number;
  gender: string;
  bloodGroup: string;
}

interface MedicalRecord {
  id: string;
  date: string;
  type: string;
  description: string;
  status: 'completed' | 'pending' | 'critical';
  doctor: string;
}

const OtherPatientDetails = () => {
  const [currentStep, setCurrentStep] = useState<Step>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'id' | 'name' | 'aadhaar'>('id');
  const [otp, setOtp] = useState('');
  const [patientData, setPatientData] = useState<PatientInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const mockPatientData: PatientInfo = {
    id: 'EMP12345',
    name: 'Rajesh Kumar',
    aadhaar: '1234-5678-9012',
    phone: '+91-9876543210',
    email: 'rajesh.kumar@example.com',
    age: 34,
    gender: 'Male',
    bloodGroup: 'O+'
  };

  const mockMedicalHistory: MedicalRecord[] = [
    {
      id: '1',
      date: '2024-01-15',
      type: 'Annual Medical Examination',
      description: 'Complete health checkup with all vital parameters normal',
      status: 'completed',
      doctor: 'Dr. Priya Sharma'
    },
    {
      id: '2',
      date: '2024-01-10',
      type: 'Blood Pressure Check',
      description: 'Elevated BP reading - 140/90 mmHg',
      status: 'critical',
      doctor: 'Dr. Amit Singh'
    },
    {
      id: '3',
      date: '2024-01-05',
      type: 'Diabetes Screening',
      description: 'HbA1c levels within normal range',
      status: 'completed',
      doctor: 'Dr. Meera Patel'
    },
    {
      id: '4',
      date: '2023-12-20',
      type: 'Vaccination',
      description: 'Annual flu vaccination administered',
      status: 'completed',
      doctor: 'Nurse Sarah'
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter a search term",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setPatientData(mockPatientData);
      setCurrentStep('otp');
      
      toast({
        title: "Patient Found",
        description: `Found patient: ${mockPatientData.name}. OTP sent to registered mobile number.`,
      });
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Patient not found or system error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    if (otp !== '123456') {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct OTP",
        variant: "destructive"
      });
      return;
    }

    setCurrentStep('history');
    toast({
      title: "Verification Successful",
      description: "Access granted to patient medical records",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'critical':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderSearchStep = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search Patient
        </CardTitle>
        <CardDescription>
          Search for a patient using their ID, Name, or Aadhaar number
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="searchType">Search By</Label>
          <Tabs value={searchType} onValueChange={(value: any) => setSearchType(value)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="id">Patient ID</TabsTrigger>
              <TabsTrigger value="name">Name</TabsTrigger>
              <TabsTrigger value="aadhaar">Aadhaar</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-2">
          <Label htmlFor="search">
            {searchType === 'id' && 'Enter Patient ID'}
            {searchType === 'name' && 'Enter Full Name'}
            {searchType === 'aadhaar' && 'Enter Aadhaar Number'}
          </Label>
          <Input
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              searchType === 'id' ? 'e.g., EMP12345' :
              searchType === 'name' ? 'e.g., Rajesh Kumar' :
              'e.g., 1234-5678-9012'
            }
          />
        </div>

        <Button 
          onClick={handleSearch} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Searching...' : 'Search Patient'}
        </Button>
      </CardContent>
    </Card>
  );

  const renderOtpStep = () => (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Verify OTP
        </CardTitle>
        <CardDescription>
          Enter the OTP sent to the patient's registered mobile number
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {patientData && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Patient:</strong> {patientData.name}<br />
              <strong>Phone:</strong> {patientData.phone}
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="otp">Enter 6-digit OTP</Label>
          <Input
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="123456"
            maxLength={6}
            className="text-center text-lg"
          />
          <p className="text-xs text-gray-500">For demo: use 123456</p>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep('search')}
            className="flex-1"
          >
            Back
          </Button>
          <Button 
            onClick={handleOtpVerification}
            className="flex-1"
          >
            Verify OTP
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderHistoryStep = () => (
    <div className="space-y-6">
      {/* Patient Info Card */}
      {patientData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label className="text-xs text-gray-500">Name</Label>
                <p className="font-medium">{patientData.name}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Patient ID</Label>
                <p className="font-medium">{patientData.id}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Age</Label>
                <p className="font-medium">{patientData.age} years</p>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Blood Group</Label>
                <p className="font-medium">{patientData.bloodGroup}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Gender</Label>
                <p className="font-medium">{patientData.gender}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Phone</Label>
                <p className="font-medium">{patientData.phone}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Email</Label>
                <p className="font-medium">{patientData.email}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Aadhaar</Label>
                <p className="font-medium">{patientData.aadhaar}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Medical History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Medical History
          </CardTitle>
          <CardDescription>Complete medical records and examination history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMedicalHistory.map((record) => (
              <div key={record.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(record.status)}
                    <h4 className="font-medium">{record.type}</h4>
                  </div>
                  <Badge className={getStatusColor(record.status)}>
                    {record.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{record.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(record.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {record.doctor}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={() => {
            setCurrentStep('search');
            setSearchQuery('');
            setOtp('');
            setPatientData(null);
          }}
        >
          Search Another Patient
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Other Patient Details</h1>
        <p className="text-gray-600">Access patient medical records with secure verification</p>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center ${currentStep === 'search' ? 'text-blue-600' : currentStep === 'otp' || currentStep === 'history' ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${currentStep === 'search' ? 'border-blue-600 bg-blue-50' : currentStep === 'otp' || currentStep === 'history' ? 'border-green-600 bg-green-50' : 'border-gray-300'}`}>
              1
            </div>
            <span className="ml-2 text-sm font-medium">Search</span>
          </div>
          <div className={`h-0.5 w-16 ${currentStep === 'otp' || currentStep === 'history' ? 'bg-green-600' : 'bg-gray-300'}`} />
          <div className={`flex items-center ${currentStep === 'otp' ? 'text-blue-600' : currentStep === 'history' ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${currentStep === 'otp' ? 'border-blue-600 bg-blue-50' : currentStep === 'history' ? 'border-green-600 bg-green-50' : 'border-gray-300'}`}>
              2
            </div>
            <span className="ml-2 text-sm font-medium">Verify</span>
          </div>
          <div className={`h-0.5 w-16 ${currentStep === 'history' ? 'bg-green-600' : 'bg-gray-300'}`} />
          <div className={`flex items-center ${currentStep === 'history' ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${currentStep === 'history' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
              3
            </div>
            <span className="ml-2 text-sm font-medium">History</span>
          </div>
        </div>
      </div>

      {/* Step Content */}
      {currentStep === 'search' && renderSearchStep()}
      {currentStep === 'otp' && renderOtpStep()}
      {currentStep === 'history' && renderHistoryStep()}
    </div>
  );
};

export default OtherPatientDetails;