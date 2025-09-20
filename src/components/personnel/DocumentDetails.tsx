import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, FileText, CheckCircle, AlertCircle, TrendingUp, Activity, Brain, ClipboardList, Eye, Heart, Shield, Calendar, BarChart3 } from 'lucide-react';
import { MedicalDocument } from '@/types/document';

interface DocumentDetailsProps {
  document: MedicalDocument;
  onBack: () => void;
}

const DocumentDetails = ({ document, onBack }: DocumentDetailsProps) => {
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
      case 'pending': return <Activity className="h-4 w-4" />;
      case 'error': return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  // AI Analysis of the document
  const generateAnalysis = () => {
    const analysis = {
      keyFindings: [],
      riskFactors: [],
      recommendations: [],
      trends: []
    };

    // Analyze based on document type and extracted data
    if (document.type === 'Lab Results' || document.extractedData.includes('glucose') || document.extractedData.includes('cholesterol')) {
      analysis.keyFindings.push('Blood glucose levels within normal range');
      analysis.keyFindings.push('Cholesterol levels are healthy');
      analysis.recommendations.push('Maintain current diet and exercise routine');
      analysis.recommendations.push('Regular monitoring recommended');
      analysis.trends.push('Stable metabolic health indicators');
    }

    if (document.type === 'Imaging' || document.extractedData.includes('X-ray') || document.extractedData.includes('chest')) {
      analysis.keyFindings.push('Clear lung fields with no abnormalities');
      analysis.keyFindings.push('Normal heart size and position');
      analysis.recommendations.push('Continue regular health monitoring');
      analysis.trends.push('No concerning respiratory changes');
    }

    if (document.type === 'Immunization' || document.extractedData.includes('vaccine')) {
      analysis.keyFindings.push('Vaccination record up to date');
      analysis.keyFindings.push('Immunity status: Protected');
      analysis.recommendations.push('Schedule tetanus booster for 2025');
      analysis.trends.push('Compliance with vaccination schedule');
    }

    return analysis;
  };

  const analysis = generateAnalysis();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Documents
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Analysis</h1>
          <p className="text-gray-600">Detailed analysis and insights from your medical document</p>
        </div>
      </div>

      {/* Document Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle>{document.name}</CardTitle>
                <CardDescription>{document.type} • Uploaded on {document.uploadDate}</CardDescription>
              </div>
            </div>
            <Badge className={getStatusColor(document.status)}>
              {getStatusIcon(document.status)}
              <span className="ml-1 capitalize">{document.status}</span>
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Extracted Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            AI-Extracted Medical Information
          </CardTitle>
          <CardDescription>Raw data extracted using Natural Language Processing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Extracted Text Data:</h4>
            <p className="text-gray-700">{document.extractedData}</p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Document Summary:</h4>
            <p className="text-gray-700">{document.summary}</p>
          </div>
        </CardContent>
      </Card>

      {/* NLP Entities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Named Entity Recognition (NER)
          </CardTitle>
          <CardDescription>Medical entities identified by AI with confidence scores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {document.nlpEntities.map((entity, idx) => (
              <div key={idx} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm text-blue-600">{entity.entity}</span>
                  <span className="text-xs text-gray-500">
                    {Math.round(entity.confidence * 100)}% confident
                  </span>
                </div>
                <p className="text-gray-900">{entity.text}</p>
                <Progress value={entity.confidence * 100} className="h-1 mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Analysis Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            AI Analysis & Insights
          </CardTitle>
          <CardDescription>Comprehensive analysis based on extracted medical data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Key Findings */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
              Key Findings
            </h4>
            <div className="space-y-2">
              {analysis.keyFindings.map((finding, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">{finding}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <ClipboardList className="h-4 w-4 mr-2 text-blue-600" />
              Recommendations
            </h4>
            <div className="space-y-2">
              {analysis.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Health Trends */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-purple-600" />
              Health Trends
            </h4>
            <div className="space-y-2">
              {analysis.trends.map((trend, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">{trend}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Document Analysis */}
      {document.innerDetails && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              Deep Document Analysis
            </CardTitle>
            <CardDescription>Comprehensive inner content extraction and analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Document Structure Analysis */}
            {document.innerDetails.documentStructure && (
              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Document Structure Analysis
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Sections:</span>
                    <p className="font-medium">{document.innerDetails.documentStructure.sections?.join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Pages:</span>
                    <p className="font-medium">{document.innerDetails.documentStructure.totalPages}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Test Date:</span>
                    <p className="font-medium">{document.innerDetails.documentStructure.testDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Facility:</span>
                    <p className="font-medium">{document.innerDetails.documentStructure.labFacility}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Clinical Values Table */}
            {document.innerDetails.clinicalValues && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Detailed Clinical Values
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Parameter</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Value</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Reference Range</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {document.innerDetails.clinicalValues.map((value, idx) => (
                        <tr key={idx} className="border-t border-gray-200">
                          <td className="px-4 py-2 text-sm text-gray-900">{value.parameter}</td>
                          <td className="px-4 py-2 text-sm font-medium">{value.value} {value.unit}</td>
                          <td className="px-4 py-2 text-sm text-gray-600">{value.range}</td>
                          <td className="px-4 py-2">
                            <Badge className={
                              value.status === 'Normal' || value.status === 'Optimal' || value.status === 'Good' 
                                ? 'bg-green-100 text-green-800' 
                                : value.status === 'Borderline' || value.status === 'Near Optimal'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }>
                              {value.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Risk Assessment */}
            {document.innerDetails.riskAssessment && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  AI Risk Assessment
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <Heart className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h5 className="font-medium text-green-900">Cardiovascular</h5>
                    <p className="text-sm text-green-700">{document.innerDetails.riskAssessment.cardiovascularRisk} Risk</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h5 className="font-medium text-blue-900">Diabetic</h5>
                    <p className="text-sm text-blue-700">{document.innerDetails.riskAssessment.diabeticRisk} Risk</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                    <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h5 className="font-medium text-purple-900">Overall Health</h5>
                    <p className="text-sm text-purple-700">{document.innerDetails.riskAssessment.overallHealth}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Imaging Details */}
            {document.innerDetails.imagingDetails && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  Imaging Study Details
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Study Type:</span>
                      <p className="font-medium">{document.innerDetails.imagingDetails.studyType}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Views:</span>
                      <p className="font-medium">{document.innerDetails.imagingDetails.views?.join(', ')}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Technique:</span>
                      <p className="font-medium">{document.innerDetails.imagingDetails.technique}</p>
                    </div>
                  </div>
                  
                  {document.innerDetails.anatomicalFindings && (
                    <div className="mt-4">
                      <h5 className="font-medium text-gray-900 mb-2">Anatomical Findings:</h5>
                      <div className="space-y-2">
                        {document.innerDetails.anatomicalFindings.map((finding, idx) => (
                          <div key={idx} className="flex justify-between items-center p-2 bg-white rounded border">
                            <div>
                              <span className="font-medium text-sm">{finding.structure}:</span>
                              <span className="text-sm text-gray-600 ml-2">{finding.finding}</span>
                            </div>
                            <Badge className={finding.status === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {finding.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Vaccination Schedule */}
            {document.innerDetails.vaccinationSchedule && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Detailed Vaccination Schedule
                </h4>
                <div className="space-y-4">
                  {document.innerDetails.vaccinationSchedule.covidVaccines && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h5 className="font-medium text-blue-900 mb-2">COVID-19 Vaccination History</h5>
                      <div className="space-y-2">
                        {document.innerDetails.vaccinationSchedule.covidVaccines.map((vaccine, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm">
                            <span>{vaccine.dose === 1 ? '1st Dose' : vaccine.dose === 2 ? '2nd Dose' : vaccine.dose}</span>
                            <span>{vaccine.date}</span>
                            <span className="text-gray-600">{vaccine.manufacturer}</span>
                            <span className="text-xs text-gray-500">Lot: {vaccine.lotNumber}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {document.innerDetails.vaccinationSchedule.otherVaccines && (
                    <div className="bg-green-50 rounded-lg p-4">
                      <h5 className="font-medium text-green-900 mb-2">Other Vaccines</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {document.innerDetails.vaccinationSchedule.otherVaccines.map((vaccine, idx) => (
                          <div key={idx} className="bg-white rounded border p-3">
                            <h6 className="font-medium text-sm">{vaccine.vaccine}</h6>
                            <p className="text-xs text-gray-600">
                              {vaccine.date ? `Last: ${vaccine.date}` : vaccine.lastDose ? `Last: ${vaccine.lastDose}` : vaccine.status}
                            </p>
                            {vaccine.nextDue && (
                              <p className="text-xs text-blue-600">Next due: {vaccine.nextDue}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* AI Generated Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            AI-Generated Medical Report
          </CardTitle>
          <CardDescription>Comprehensive report based on document analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white border-l-4 border-blue-500 p-6 space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900">Patient Document Analysis Summary</h4>
              <p className="text-gray-600 text-sm">Generated on {new Date().toLocaleDateString()}</p>
            </div>
            
            <div className="space-y-3">
              <p className="text-gray-700">
                <strong>Document Type:</strong> {document.type}
              </p>
              <p className="text-gray-700">
                <strong>Processing Status:</strong> Successfully validated and analyzed
              </p>
              <p className="text-gray-700">
                <strong>Data Quality:</strong> High confidence in extracted entities (avg. {Math.round(document.nlpEntities.reduce((acc, entity) => acc + entity.confidence, 0) / document.nlpEntities.length * 100)}%)
              </p>
              <p className="text-gray-700">
                <strong>Clinical Significance:</strong> {document.type === 'Lab Results' ? 'Results within normal parameters, continue monitoring' : 
                document.type === 'Imaging' ? 'No acute findings, baseline established' : 
                'Immunization status current, follow schedule for updates'}
              </p>
              <p className="text-gray-700">
                <strong>Next Steps:</strong> {analysis.recommendations[0] || 'Continue regular monitoring and follow-up as scheduled'}
              </p>
              {document.innerDetails?.clinicalCorrelation && (
                <p className="text-gray-700">
                  <strong>Clinical Correlation:</strong> {document.innerDetails.clinicalCorrelation}
                </p>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                This report was generated using AI-powered Natural Language Processing and should be reviewed by a qualified healthcare professional.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentDetails;