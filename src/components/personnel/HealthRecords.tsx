
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const HealthRecords = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const labResults = [
    {
      date: '2024-05-15',
      testType: 'Complete Blood Count',
      results: [
        { parameter: 'Hemoglobin', value: 14.2, unit: 'g/dL', normalRange: '12.0-16.0', status: 'normal' },
        { parameter: 'White Blood Cells', value: 6.8, unit: '×10³/μL', normalRange: '4.5-11.0', status: 'normal' },
        { parameter: 'Platelets', value: 245, unit: '×10³/μL', normalRange: '150-450', status: 'normal' }
      ]
    },
    {
      date: '2024-05-15',
      testType: 'Lipid Profile',
      results: [
        { parameter: 'Total Cholesterol', value: 195, unit: 'mg/dL', normalRange: '<200', status: 'normal' },
        { parameter: 'LDL Cholesterol', value: 125, unit: 'mg/dL', normalRange: '<130', status: 'normal' },
        { parameter: 'HDL Cholesterol', value: 42, unit: 'mg/dL', normalRange: '>40', status: 'normal' },
        { parameter: 'Triglycerides', value: 140, unit: 'mg/dL', normalRange: '<150', status: 'normal' }
      ]
    }
  ];

  const vitalsHistory = [
    { date: '2024-06-10', height: 175, weight: 75, bmi: 24.5, bp: '120/80', heartRate: 72 },
    { date: '2024-05-15', height: 175, weight: 76, bmi: 24.8, bp: '118/78', heartRate: 70 },
    { date: '2024-03-10', height: 175, weight: 77, bmi: 25.1, bp: '122/82', heartRate: 74 }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive"
      });
      return;
    }

    // Simulate file processing
    toast({
      title: "Document uploaded successfully",
      description: "Your medical document is being processed for data extraction.",
    });

    // Reset file selection
    setSelectedFile(null);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal':
        return <Badge className="bg-green-100 text-green-800">Normal</Badge>;
      case 'abnormal':
        return <Badge className="bg-yellow-100 text-yellow-800">Abnormal</Badge>;
      case 'critical':
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Health Records</h1>
        <p className="text-gray-600">View and manage your medical records and test results</p>
      </div>

      <Tabs defaultValue="lab-results" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
          <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="lifestyle">Lifestyle Data</TabsTrigger>
        </TabsList>

        <TabsContent value="lab-results" className="space-y-4">
          {labResults.map((test, testIndex) => (
            <Card key={testIndex}>
              <CardHeader>
                <CardTitle>{test.testType}</CardTitle>
                <CardDescription>Test Date: {test.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2">Parameter</th>
                        <th className="text-left py-2">Value</th>
                        <th className="text-left py-2">Unit</th>
                        <th className="text-left py-2">Normal Range</th>
                        <th className="text-left py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {test.results.map((result, resultIndex) => (
                        <tr key={resultIndex} className="border-b border-gray-100">
                          <td className="py-2 font-medium">{result.parameter}</td>
                          <td className="py-2">{result.value}</td>
                          <td className="py-2">{result.unit}</td>
                          <td className="py-2">{result.normalRange}</td>
                          <td className="py-2">{getStatusBadge(result.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="vitals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vital Signs History</CardTitle>
              <CardDescription>Track your vital signs over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2">Date</th>
                      <th className="text-left py-2">Height (cm)</th>
                      <th className="text-left py-2">Weight (kg)</th>
                      <th className="text-left py-2">BMI</th>
                      <th className="text-left py-2">Blood Pressure</th>
                      <th className="text-left py-2">Heart Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vitalsHistory.map((vital, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 font-medium">{vital.date}</td>
                        <td className="py-2">{vital.height}</td>
                        <td className="py-2">{vital.weight}</td>
                        <td className="py-2">{vital.bmi}</td>
                        <td className="py-2">{vital.bp}</td>
                        <td className="py-2">{vital.heartRate} bpm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Medical Documents</CardTitle>
              <CardDescription>Upload PDF or JPEG files for automated data extraction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="file-upload">Select File</Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="mt-2"
                />
                {selectedFile && (
                  <p className="text-sm text-gray-600 mt-2">
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
              <Button onClick={handleUpload} className="bg-blue-600 hover:bg-blue-700">
                Upload Document
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Uploaded Documents</CardTitle>
              <CardDescription>Your medical documents and extracted data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">AME Report - May 2024</p>
                    <p className="text-sm text-gray-600">Uploaded: 2024-05-16 • Status: Processed</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Lab Results - March 2024</p>
                    <p className="text-sm text-gray-600">Uploaded: 2024-03-11 • Status: Processed</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lifestyle" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lifestyle Data Entry</CardTitle>
              <CardDescription>Track your daily activities and habits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="exercise">Exercise (minutes/day)</Label>
                  <Input id="exercise" type="number" placeholder="30" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="sleep">Sleep (hours/night)</Label>
                  <Input id="sleep" type="number" placeholder="8" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="smoking">Smoking Status</Label>
                  <select className="w-full mt-2 p-2 border border-gray-300 rounded-md">
                    <option value="never">Never smoked</option>
                    <option value="former">Former smoker</option>
                    <option value="current">Current smoker</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="alcohol">Alcohol Consumption</Label>
                  <select className="w-full mt-2 p-2 border border-gray-300 rounded-md">
                    <option value="none">None</option>
                    <option value="occasional">Occasional</option>
                    <option value="moderate">Moderate</option>
                    <option value="heavy">Heavy</option>
                  </select>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">Save Lifestyle Data</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthRecords;
