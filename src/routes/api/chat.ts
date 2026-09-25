import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayRunIdFetch, getLovableAiGatewayRunId, withLovableAiGatewayRunIdHeader } from "@/lib/gateway-run-id.server";
export const Route=createFileRoute("/api/chat")({server:{handlers:{POST:async({request})=>{
  const apiKey=process.env['LOVABLE_API_KEY'];if(!apiKey)return Response.json({error:"Chat is unavailable right now."},{status:503});
  let body: {messages?:UIMessage[];conversationId?:string};try{body=await request.json()}catch{return Response.json({error:"Invalid request."},{status:400})}
  if(!Array.isArray(body.messages)||body.messages.length>100||!body.conversationId||typeof body.conversationId!=="string")return Response.json({error:"Invalid conversation."},{status:400});
  const run=createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));const provider=createOpenAI({baseURL:"https://ai.gateway.lovable.dev/v1",apiKey,headers:{"Lovable-API-Key":apiKey,"X-Lovable-AIG-SDK":"vercel-ai-sdk"},fetch:run.fetch});
  const messages=await convertToModelMessages(body.messages);
  const result=streamText({model:provider.responses("openai/gpt-6-astra"),system:"You are a friendly, concise companion on Clayton Aylor's portfolio. Clayton builds web apps, tinkers with ideas, and shares things he thinks are cool. Be warm and conversational. Never invent personal history, employment, education, project accomplishments, links, or contact details. The portfolio currently contains sample projects called Signalboard and Little Atlas, and sample lab ideas; clearly label them as examples, not confirmed real work. Encourage visitors to explore the project pages or contact Clayton for specifics. Keep answers brief, usually 2–4 sentences.",messages,abortSignal:request.signal,providerOptions:{openai:{forceReasoning:true,reasoningEffort:"medium",reasoningSummary:"auto",store:false,include:["reasoning.encrypted_content"]}}});
  return withLovableAiGatewayRunIdHeader(result.toUIMessageStreamResponse({originalMessages:body.messages,sendReasoning:true,onFinish:()=>{}}),run);
}}}});
