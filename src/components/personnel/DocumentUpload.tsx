
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import DocumentDetails from './DocumentDetails';

const DocumentUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState([
    {
      id: 1,
      name: 'Blood_Test_Results_2024.pdf',
      type: 'Lab Results',
      status: 'validated',
      extractedData: 'Glucose: 95 mg/dL (Normal: 70-100), Cholesterol: 180 mg/dL (Normal: <200), Hemoglobin: 14.2 g/dL (Normal: 12-16)',
      uploadDate: '2024-06-10',
      nlpEntities: [
        { entity: 'TEST_RESULT', text: 'Glucose 95 mg/dL', confidence: 0.95 },
        { entity: 'TEST_RESULT', text: 'Cholesterol 180 mg/dL', confidence: 0.92 },
        { entity: 'MEDICAL_CONDITION', text: 'Normal glucose levels', confidence: 0.88 }
      ],
      summary: 'Blood test results showing normal glucose and cholesterol levels within healthy ranges.'
    },
    {
      id: 2,
      name: 'Chest_Xray_Report.pdf',
      type: 'Imaging',
      status: 'validated',
      extractedData: 'Chest X-ray shows clear lung fields with no acute abnormalities. Heart size normal. No pleural effusion.',
      uploadDate: '2024-06-12',
      nlpEntities: [
        { entity: 'BODY_PART', text: 'lung fields', confidence: 0.96 },
        { entity: 'MEDICAL_FINDING', text: 'no acute abnormalities', confidence: 0.94 },
        { entity: 'BODY_PART', text: 'heart', confidence: 0.89 }
      ],
      summary: 'Normal chest X-ray with clear lungs and normal heart size.'
    },
    {
      id: 3,
      name: 'Vaccination_Record.pdf',
      type: 'Immunization',
      status: 'validated',
      extractedData: 'COVID-19 vaccine: Pfizer-BioNTech, 2 doses completed. Flu vaccine: 2024 season. Tetanus booster: Due 2025.',
      uploadDate: '2024-06-11',
      nlpEntities: [
        { entity: 'MEDICATION', text: 'COVID-19 vaccine Pfizer-BioNTech', confidence: 0.97 },
        { entity: 'MEDICATION', text: 'Flu vaccine', confidence: 0.92 },
        { entity: 'MEDICAL_PROCEDURE', text: 'Tetanus booster', confidence: 0.90 }
      ],
      summary: 'Vaccination record showing up-to-date COVID-19 and flu vaccines, tetanus booster due next year.'
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
          
          // Add the new document to the list with NLP processing simulation
          const newDoc = {
            id: uploadedDocuments.length + 1,
            name: file.name,
            type: 'Medical Document',
            status: 'pending',
            extractedData: 'Processing with NLP...',
            uploadDate: new Date().toISOString().split('T')[0],
            nlpEntities: [],
            summary: 'Document uploaded successfully, NLP analysis in progress...'
          };
          
          // Simulate NLP processing after a delay
          setTimeout(() => {
            setUploadedDocuments(prev => prev.map(doc => 
              doc.id === newDoc.id ? {
                ...doc,
                status: 'validated',
                extractedData: 'Sample extracted medical data from uploaded document',
                nlpEntities: [
                  { entity: 'DOCUMENT_TYPE', text: file.type, confidence: 0.95 },
                  { entity: 'UPLOAD_DATE', text: newDoc.uploadDate, confidence: 1.0 }
                ],
                summary: `${file.name} has been processed and medical information extracted successfully.`
              } : doc
            ));
          }, 3000);
          
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

  // If a document is selected, show the details view
  if (selectedDocument) {
    return (
      <DocumentDetails 
        document={selectedDocument} 
        onBack={() => setSelectedDocument(null)} 
      />
    );
  }

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
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedDocument(doc)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded p-3 space-y-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Extracted Data:</h4>
                    <p className="text-sm text-gray-600">{doc.extractedData}</p>
                  </div>
                  {(doc as any).nlpEntities && (doc as any).nlpEntities.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">NLP Entities:</h4>
                      <div className="flex flex-wrap gap-1">
                        {(doc as any).nlpEntities.slice(0, 3).map((entity: any, idx: number) => (
                          <span 
                            key={idx}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                          >
                            {entity.entity}: {entity.text}
                          </span>
                        ))}
                        {(doc as any).nlpEntities.length > 3 && (
                          <span className="text-xs text-gray-500">+{(doc as any).nlpEntities.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}
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
