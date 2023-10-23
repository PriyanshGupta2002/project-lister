import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { OpenAI } from "langchain/llms/openai";
import { NextResponse } from "next/server";
export const POST = async (req: Request) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }
    const llm = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.9,
    });
    const { text } = await req.json();
    const llmResult = await llm.predict(text);

    return NextResponse.json({ message: llmResult });
  } catch (error) {
    return NextResponse.error();
  }
};
