
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
As a medical AI assistant, analyze the following symptoms and patient information to provide disease prediction, medicine suggestions, and precautions:

Patient Information:
- Age: ${vitals.age || 'Not provided'}
- Gender: ${vitals.gender || 'Not provided'}
- Symptoms: ${lifestyle.symptoms || 'Not provided'}
- Medical History: ${lifestyle.medicalHistory || 'Not provided'}

Based on the symptoms and patient information, please provide:
1. Top 3 most likely diseases/conditions based on symptoms
2. Top 3 medicine suggestions (include both generic and over-the-counter options where appropriate)
3. Top 3 important precautions to take
4. Risk level assessment (Low, Medium, High)

Format your response as JSON with these exact keys:
{
  "possibleDiseases": ["disease1", "disease2", "disease3"],
  "medicines": ["medicine1", "medicine2", "medicine3"],
  "precautions": ["precaution1", "precaution2", "precaution3"],
  "riskLevel": "string"
}

Important: Provide specific medicine names when appropriate, but always emphasize consulting healthcare professionals. Include both prescription and over-the-counter options where relevant.
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
      console.error(`OpenAI API error: ${response.status} - ${response.statusText}`);
      
      // Handle rate limiting with a more informative error
      if (response.status === 429) {
        console.log('Rate limit hit, providing fallback response');
        // Return a fallback response instead of throwing an error
        const fallbackResponse = {
          possibleDiseases: ["Rate limit reached - please try again in a few minutes"],
          medicines: ["Consult healthcare provider for proper medication"],
          precautions: ["Monitor symptoms closely", "Stay hydrated", "Get adequate rest"],
          riskLevel: "Low"
        };
        
        return new Response(JSON.stringify(fallbackResponse), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
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
        possibleDiseases: ["Insufficient data for detailed analysis"],
        medicines: ["Consult healthcare provider for proper medication"],
        precautions: ["Monitor symptoms closely", "Maintain proper hygiene", "Get adequate rest"],
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
