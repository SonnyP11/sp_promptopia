import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB()

    const prompts = await Prompt.find({}).populate('creator')
    // The populate method will replace the creator id with the actual creator object
    return new Response(JSON.stringify(prompts), { status: 200 })

  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 })
  }
} 