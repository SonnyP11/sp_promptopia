import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  // params is an object containing the route parameters. For example, if the route is /users/64a25bf2e57df3c3036831ec/posts?limit=10, then params will be { id: 64a25bf2e57df3c3036831ec, limit: 10 }

  try {
    await connectToDB()

    const prompts = await Prompt.find({
      creator: params.id
    }).populate('creator')
    // The populate method will replace the creator id with the actual creator object
    return new Response(JSON.stringify(prompts), { status: 200 })

  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 })
  }
} 