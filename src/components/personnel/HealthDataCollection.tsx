
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Activity, Zap, User, FileText, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const HealthDataCollection = () => {
  const [vitals, setVitals] = useState({
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    weight: '',
    height: ''
  });

  const [lifestyle, setLifestyle] = useState({
    exercise: '',
    sleep: '',
    stress: '',
    diet: ''
  });

  const [aiPredictions, setAiPredictions] = useState({
    overallHealth: 'Good',
    healthScore: 75,
    riskFactors: ['Mild Hypertension Risk', 'Sleep Quality Concern'],
    recommendations: [
      'Increase cardio exercise to 150 minutes per week',
      'Maintain consistent sleep schedule',
      'Monitor blood pressure weekly'
    ],
    riskLevel: 'Low'
  });

  const [isGeneratingPrediction, setIsGeneratingPrediction] = useState(false);
  const { toast } = useToast();

  const labResults = [
    { test: 'Blood Glucose', value: '95 mg/dL', status: 'normal', range: '70-100 mg/dL' },
    { test: 'Cholesterol', value: '180 mg/dL', status: 'normal', range: '<200 mg/dL' },
    { test: 'Hemoglobin', value: '14.2 g/dL', status: 'normal', range: '12-16 g/dL' }
  ];

  const generateAIPrediction = async () => {
    setIsGeneratingPrediction(true);
    
    try {
      console.log('Generating AI health prediction...');
      
      const { data, error } = await supabase.functions.invoke('ai-health-prediction', {
        body: {
          vitals,
          lifestyle,
          labResults
        }
      });

      if (error) {
        console.error('Error calling AI function:', error);
        throw error;
      }

      console.log('AI prediction response:', data);
      
      if (data && !data.error) {
        setAiPredictions(data);
        toast({
          title: "AI Analysis Complete",
          description: "Your health data has been analyzed successfully.",
        });
      } else {
        throw new Error(data?.error || 'Failed to generate prediction');
      }
    } catch (error) {
      console.error('Error generating AI prediction:', error);
      toast({
        title: "Analysis Failed",
        description: "Unable to generate AI health prediction. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingPrediction(false);
    }
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Health Data Collection</h1>
        <p className="text-gray-600">Comprehensive health monitoring and AI insights</p>
      </div>

      <Tabs defaultValue="ai-prediction" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="ai-prediction">AI Prediction</TabsTrigger>
          <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
          <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
          <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="ai-prediction">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Brain className="h-6 w-6 mr-2 text-purple-600" />
                  AI Health Prediction
                </div>
                <Button 
                  onClick={generateAIPrediction} 
                  disabled={isGeneratingPrediction}
                  size="sm"
                >
                  {isGeneratingPrediction ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Generate New Analysis
                    </>
                  )}
                </Button>
              </CardTitle>
              <CardDescription>Advanced AI analytics based on your health data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Overall Health Assessment</h3>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
                    {aiPredictions.overallHealth}
                  </Badge>
                  <Progress value={aiPredictions.healthScore} className="flex-1 h-3" />
                  <span className="text-sm text-gray-600">{aiPredictions.healthScore}% Health Score</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Risk Level</h3>
                <Badge className={`text-lg px-4 py-2 ${getRiskLevelColor(aiPredictions.riskLevel)}`}>
                  {aiPredictions.riskLevel} Risk
                </Badge>
              </div>

              {aiPredictions.riskFactors?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Risk Factors</h3>
                  <div className="space-y-2">
                    {aiPredictions.riskFactors.map((risk, index) => (
                      <div key={index} className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <Zap className="h-5 w-5 text-yellow-600 mr-3" />
                        <span className="text-yellow-800">{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {aiPredictions.recommendations?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">AI Recommendations</h3>
                  <div className="space-y-3">
                    {aiPredictions.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <Activity className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                        <span className="text-blue-800">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals">
          <Card>
            <CardHeader>
              <CardTitle>Vital Signs Entry</CardTitle>
              <CardDescription>Record your current vital measurements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
                  <Input
                    id="bloodPressure"
                    placeholder="120/80"
                    value={vitals.bloodPressure}
                    onChange={(e) => setVitals({...vitals, bloodPressure: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                  <Input
                    id="heartRate"
                    placeholder="72"
                    value={vitals.heartRate}
                    onChange={(e) => setVitals({...vitals, heartRate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="temperature">Temperature (°F)</Label>
                  <Input
                    id="temperature"
                    placeholder="98.6"
                    value={vitals.temperature}
                    onChange={(e) => setVitals({...vitals, temperature: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input
                    id="weight"
                    placeholder="150"
                    value={vitals.weight}
                    onChange={(e) => setVitals({...vitals, weight: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (inches)</Label>
                  <Input
                    id="height"
                    placeholder="68"
                    value={vitals.height}
                    onChange={(e) => setVitals({...vitals, height: e.target.value})}
                  />
                </div>
              </div>
              <Button className="w-full">Save Vital Signs</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lab-results">
          <Card>
            <CardHeader>
              <CardTitle>Recent Lab Results</CardTitle>
              <CardDescription>Latest laboratory test results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {labResults.map((result, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{result.test}</h3>
                      <p className="text-sm text-gray-600">Range: {result.range}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{result.value}</p>
                      <Badge className={result.status === 'normal' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {result.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lifestyle">
          <Card>
            <CardHeader>
              <CardTitle>Lifestyle Assessment</CardTitle>
              <CardDescription>Track your daily habits and lifestyle factors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="exercise">Exercise (minutes/day)</Label>
                  <Input
                    id="exercise"
                    placeholder="30"
                    value={lifestyle.exercise}
                    onChange={(e) => setLifestyle({...lifestyle, exercise: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="sleep">Sleep (hours/night)</Label>
                  <Input
                    id="sleep"
                    placeholder="8"
                    value={lifestyle.sleep}
                    onChange={(e) => setLifestyle({...lifestyle, sleep: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="stress">Stress Level (1-10)</Label>
                  <Input
                    id="stress"
                    placeholder="5"
                    value={lifestyle.stress}
                    onChange={(e) => setLifestyle({...lifestyle, stress: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="diet">Diet Quality (1-10)</Label>
                  <Input
                    id="diet"
                    placeholder="7"
                    value={lifestyle.diet}
                    onChange={(e) => setLifestyle({...lifestyle, diet: e.target.value})}
                  />
                </div>
              </div>
              <Button className="w-full">Save Lifestyle Data</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Health Summary</CardTitle>
              <CardDescription>Comprehensive overview of your health status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900">Health Score</h3>
                    <p className="text-3xl font-bold text-blue-600">{aiPredictions.healthScore}/100</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-900">Risk Level</h3>
                    <p className="text-3xl font-bold text-green-600">{aiPredictions.riskLevel}</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-900">Overall Health</h3>
                    <p className="text-3xl font-bold text-purple-600">{aiPredictions.overallHealth}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Next Steps</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Schedule annual medical examination</li>
                    <li>Update vaccination records</li>
                    <li>Complete lifestyle assessment</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthDataCollection;
