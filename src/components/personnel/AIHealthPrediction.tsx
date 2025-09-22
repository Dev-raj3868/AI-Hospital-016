import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Brain, Loader2, AlertCircle, Heart, Pill, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface HealthPrediction {
  possibleDiseases: string[];
  medicines: string[];
  precautions: string[];
  riskLevel: string;
}

const AIHealthPrediction = () => {
  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<HealthPrediction | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      toast({
        title: "Missing Information",
        description: "Please describe your symptoms",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-health-prediction', {
        body: {
          vitals: {
            age: age || 'Not provided',
            gender: gender || 'Not provided'
          },
          lifestyle: {
            symptoms: symptoms,
            medicalHistory: medicalHistory || 'None provided'
          },
          labResults: null
        }
      });

      if (error) throw error;

      setPrediction(data);
      toast({
        title: "Prediction Complete",
        description: "AI health analysis has been generated successfully"
      });
    } catch (error) {
      console.error('Error getting health prediction:', error);
      toast({
        title: "Error",
        description: "Failed to generate health prediction. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Disease Prediction</h1>
        <p className="text-gray-600">Get AI-powered disease prediction, medicine suggestions, and precautions based on your symptoms</p>
      </div>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            Disease Prediction Assessment
          </CardTitle>
          <CardDescription>
            Provide your symptoms and basic information for AI disease prediction and medicine suggestions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Age</label>
                <Input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Symptoms *</label>
              <Textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Describe your symptoms in detail (e.g., headache, fever, fatigue, etc.)"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Medical History</label>
              <Textarea
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                placeholder="Any relevant medical history, allergies, or current medications"
                rows={3}
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Get AI Disease Prediction
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Prediction Results */}
      {prediction && (
        <div className="space-y-6">
          {/* Risk Level Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">Risk Level</h3>
                <Badge className={getRiskLevelColor(prediction.riskLevel)}>
                  {prediction.riskLevel}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Possible Diseases */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Possible Diseases/Conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {prediction.possibleDiseases.map((disease, index) => (
                  <div key={index} className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                    <p className="text-orange-800 font-medium">{disease}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Medicine Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pill className="h-5 w-5 mr-2" />
                Medicine Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
                <p className="text-yellow-800 text-sm font-medium">
                  ⚠️ Disclaimer: These are AI-generated suggestions. Always consult with a healthcare professional before taking any medication.
                </p>
              </div>
              <div className="space-y-2">
                {prediction.medicines.map((medicine, index) => (
                  <div key={index} className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                    <p className="text-purple-800 font-medium">{medicine}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Precautions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Precautions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {prediction.precautions.map((precaution, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <p className="text-blue-800 font-medium">{precaution}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Important Notice</h4>
                  <p className="text-yellow-700 text-sm mt-1">
                    This AI prediction is for informational purposes only and should not replace professional medical advice. 
                    Please consult with a qualified healthcare provider for proper diagnosis and treatment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AIHealthPrediction;