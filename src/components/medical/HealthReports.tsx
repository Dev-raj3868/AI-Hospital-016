
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Download, 
  Filter, 
  Calendar, 
  Users, 
  TrendingUp, 
  Activity,
  BarChart3,
  PieChart
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HealthReports = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedReport, setSelectedReport] = useState<string>('');
  const { toast } = useToast();

  const availableReports = [
    {
      id: 'population-health',
      title: 'Population Health Overview',
      description: 'Comprehensive health status across all employees',
      type: 'overview',
      icon: Users,
      estimatedTime: '2-3 minutes'
    },
    {
      id: 'ame-compliance',
      title: 'AME Compliance Report',
      description: 'Annual Medical Examination completion rates',
      type: 'compliance',
      icon: Calendar,
      estimatedTime: '1-2 minutes'
    },
    {
      id: 'health-trends',
      title: 'Health Trends Analysis',
      description: 'Monthly and quarterly health condition trends',
      type: 'analytics',
      icon: TrendingUp,
      estimatedTime: '3-5 minutes'
    },
    {
      id: 'risk-assessment',
      title: 'Risk Assessment Summary',
      description: 'Employees categorized by health risk levels',
      type: 'risk',
      icon: Activity,
      estimatedTime: '2-3 minutes'
    }
  ];

  const generatedReports = [
    {
      id: 1,
      title: 'Monthly Health Report - December 2024',
      type: 'Population Health',
      generatedDate: '2024-12-01',
      status: 'completed',
      downloadCount: 45,
      size: '2.3 MB'
    },
    {
      id: 2,
      title: 'AME Compliance Report - Q4 2024',
      type: 'Compliance',
      generatedDate: '2024-11-28',
      status: 'completed',
      downloadCount: 23,
      size: '1.8 MB'
    },
    {
      id: 3,
      title: 'Health Trends Analysis - Q3 2024',
      type: 'Analytics',
      generatedDate: '2024-11-15',
      status: 'completed',
      downloadCount: 67,
      size: '3.1 MB'
    }
  ];

  const handleGenerateReport = async (reportId: string) => {
    setSelectedReport(reportId);
    setIsGenerating(true);

    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Report Generated Successfully",
        description: "Your health report is ready for download.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
      setSelectedReport('');
    }
  };

  const handleDownloadReport = (reportId: number) => {
    toast({
      title: "Download Started",
      description: "Your report is being downloaded.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'generating':
        return <Badge className="bg-yellow-100 text-yellow-800">Generating</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'overview':
        return <Users className="h-5 w-5" />;
      case 'compliance':
        return <Calendar className="h-5 w-5" />;
      case 'analytics':
        return <TrendingUp className="h-5 w-5" />;
      case 'risk':
        return <Activity className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Health Reports</h1>
          <p className="text-gray-600">Generate comprehensive health reports and analytics</p>
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter Reports
        </Button>
      </div>

      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <CardDescription>Create comprehensive health reports for analysis and compliance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {availableReports.map((report) => {
              const IconComponent = report.icon;
              return (
                <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{report.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                      <p className="text-xs text-gray-500 mb-3">Est. time: {report.estimatedTime}</p>
                      <Button 
                        size="sm" 
                        onClick={() => handleGenerateReport(report.id)}
                        disabled={isGenerating}
                        className="w-full"
                      >
                        {isGenerating && selectedReport === report.id ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Generating...
                          </>
                        ) : (
                          <>
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Generate Report
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {isGenerating && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <div className="flex-1">
                  <p className="font-medium text-blue-900">Generating Report...</p>
                  <p className="text-sm text-blue-700">Please wait while we compile your health data</p>
                </div>
              </div>
              <Progress value={66} className="mt-3" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generated Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Download and manage previously generated health reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {generatedReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FileText className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{report.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{report.type}</span>
                      <span>•</span>
                      <span>Generated: {report.generatedDate}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                      <span>•</span>
                      <span>{report.downloadCount} downloads</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(report.status)}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownloadReport(report.id)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <PieChart className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">47</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Download className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Downloads</p>
                <p className="text-2xl font-bold text-green-600">342</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-purple-600">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthReports;
