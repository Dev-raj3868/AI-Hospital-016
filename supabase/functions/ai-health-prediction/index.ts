
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { vitals, lifestyle, labResults } = await req.json();

    console.log('Received health data for AI analysis:', { vitals, lifestyle, labResults });

    const healthDataPrompt = `
As a medical AI assistant, analyze the following health data and provide insights:

Vital Signs:
- Blood Pressure: ${vitals.bloodPressure || 'Not provided'}
- Heart Rate: ${vitals.heartRate || 'Not provided'} bpm
- Temperature: ${vitals.temperature || 'Not provided'}°F
- Weight: ${vitals.weight || 'Not provided'} lbs
- Height: ${vitals.height || 'Not provided'}

Lifestyle Factors:
- Exercise: ${lifestyle.exercise || 'Not provided'} minutes/day
- Sleep: ${lifestyle.sleep || 'Not provided'} hours/night
- Stress Level: ${lifestyle.stress || 'Not provided'}/10
- Diet Quality: ${lifestyle.diet || 'Not provided'}/10

Lab Results: ${labResults ? JSON.stringify(labResults) : 'Not provided'}

Please provide:
1. Overall health assessment (Excellent, Good, Fair, Poor)
2. Health score (0-100)
3. Top 3 risk factors (if any)
4. Top 3 specific, actionable recommendations
5. Risk level (Low, Medium, High)

Format your response as JSON with these exact keys:
{
  "overallHealth": "string",
  "healthScore": number,
  "riskFactors": ["string1", "string2", "string3"],
  "recommendations": ["string1", "string2", "string3"],
  "riskLevel": "string"
}
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a medical AI assistant. Provide health insights based on the data provided. Always respond with valid JSON format. Be professional and provide actionable advice.' 
          },
          { role: 'user', content: healthDataPrompt }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI Response:', aiResponse);

    // Try to parse the JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      // Fallback response
      parsedResponse = {
        overallHealth: "Good",
        healthScore: 75,
        riskFactors: ["Insufficient data for detailed analysis"],
        recommendations: ["Maintain regular health checkups", "Continue healthy lifestyle habits", "Monitor key health metrics regularly"],
        riskLevel: "Low"
      };
    }

    return new Response(JSON.stringify(parsedResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-health-prediction function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate health prediction',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
