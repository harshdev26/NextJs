import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    const result = await generateText({
      model: google('gemini-1.5-flash'), // Free model
      prompt: prompt,
    });

    return Response.json({ text: result.text });
    
  } catch(error) {
    console.error("an error has occured", error);
    return Response.json({
      success: false,
      message: "internal error occured"
    }, {
      status: 500
    });
  }
}