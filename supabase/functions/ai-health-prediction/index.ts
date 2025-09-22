
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
As an expert medical AI assistant, analyze the following patient information to provide precise disease predictions and specific medicine recommendations:

Patient Information:
- Age: ${vitals.age || 'Not provided'}
- Gender: ${vitals.gender || 'Not provided'}
- Primary Symptoms: ${lifestyle.symptoms || 'Not provided'}
- Medical History: ${lifestyle.medicalHistory || 'Not provided'}

Provide a comprehensive medical analysis with:

1. SPECIFIC DISEASE NAMES: Identify the 3 most likely medical conditions with proper medical terminology (e.g., "Viral Upper Respiratory Tract Infection", "Migraine with Aura", "Gastroesophageal Reflux Disease")

2. SPECIFIC MEDICINE NAMES: Recommend 3 specific medications with exact names and dosages where appropriate:
   - Include generic names (e.g., "Ibuprofen 400mg", "Acetaminophen 500mg")
   - Include brand names when relevant (e.g., "Tylenol", "Advil")
   - Specify OTC vs prescription requirements

3. CLINICAL PRECAUTIONS: Provide 3 specific medical precautions and monitoring recommendations

4. RISK ASSESSMENT: Evaluate as Low, Medium, or High based on symptom severity and potential complications

Response Format (JSON):
{
  "possibleDiseases": ["Specific Disease Name 1", "Specific Disease Name 2", "Specific Disease Name 3"],
  "medicines": ["Specific Medicine Name with dosage 1", "Specific Medicine Name with dosage 2", "Specific Medicine Name with dosage 3"],
  "precautions": ["Specific clinical precaution 1", "Specific clinical precaution 2", "Specific clinical precaution 3"],
  "riskLevel": "Low/Medium/High"
}

Important: Provide actual pharmaceutical names and medical terminology. Always include disclaimer about consulting healthcare professionals.
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
