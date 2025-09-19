
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DocumentUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState([
    {
      id: 1,
      name: 'Blood_Test_Results_2024.pdf',
      type: 'Lab Results',
      status: 'validated',
      extractedData: 'Glucose: 95 mg/dL, Cholesterol: 180 mg/dL',
      uploadDate: '2024-06-10'
    },
    {
      id: 2,
      name: 'Chest_Xray_Report.pdf',
      type: 'Imaging',
      status: 'pending',
      extractedData: 'Processing...',
      uploadDate: '2024-06-12'
    },
    {
      id: 3,
      name: 'Vaccination_Record.pdf',
      type: 'Immunization',
      status: 'error',
      extractedData: 'Failed to extract data',
      uploadDate: '2024-06-11'
    }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF, JPG, or PNG files only.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload files smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Add the new document to the list
          const newDoc = {
            id: uploadedDocuments.length + 1,
            name: file.name,
            type: 'Medical Document',
            status: 'pending',
            extractedData: 'Processing...',
            uploadDate: new Date().toISOString().split('T')[0]
          };
          
          setUploadedDocuments(prev => [newDoc, ...prev]);
          
          toast({
            title: "Upload successful",
            description: `${file.name} has been uploaded and is being processed.`,
          });
          
          // Reset file input
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleChooseFiles = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      // Create a fake event object for the existing handler
      const fakeEvent = {
        target: { files }
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleFileUpload(fakeEvent);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'validated': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'validated': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Upload className="h-4 w-4" />;
      case 'error': return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Document Upload</h1>
        <p className="text-gray-600">Upload and validate medical documents with AI extraction</p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Medical Documents</CardTitle>
          <CardDescription>Supported formats: PDF, JPG, PNG. AI will extract and validate medical data.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to upload</h3>
            <p className="text-gray-600 mb-4">Maximum file size: 10MB</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <Button onClick={handleChooseFiles} disabled={isUploading}>
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading and processing...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Uploaded Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Documents</CardTitle>
          <CardDescription>Track the status of your uploaded medical documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {uploadedDocuments.map((doc) => (
              <div key={doc.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-medium">{doc.name}</h3>
                      <p className="text-sm text-gray-600">{doc.type} • {doc.uploadDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(doc.status)}>
                      {getStatusIcon(doc.status)}
                      <span className="ml-1 capitalize">{doc.status}</span>
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Extracted Data:</h4>
                  <p className="text-sm text-gray-600">{doc.extractedData}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Validation Results */}
      <Card>
        <CardHeader>
          <CardTitle>AI Validation Summary</CardTitle>
          <CardDescription>Automated validation results from uploaded documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900">Validated</h3>
              <p className="text-2xl font-bold text-green-600">
                {uploadedDocuments.filter(doc => doc.status === 'validated').length}
              </p>
              <p className="text-sm text-green-700">Documents processed</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold text-yellow-900">Pending</h3>
              <p className="text-2xl font-bold text-yellow-600">
                {uploadedDocuments.filter(doc => doc.status === 'pending').length}
              </p>
              <p className="text-sm text-yellow-700">Being processed</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <h3 className="font-semibold text-red-900">Errors</h3>
              <p className="text-2xl font-bold text-red-600">
                {uploadedDocuments.filter(doc => doc.status === 'error').length}
              </p>
              <p className="text-sm text-red-700">Need attention</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentUpload;
