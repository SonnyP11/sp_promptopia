import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// This route will handle 3 requests: GET, PATCH, and DELETE

// GET
export const GET = async (request, { params }) => {
  // params is an object containing the route parameters. For example, if the route is /users/64a25bf2e57df3c3036831ec/posts?limit=10, then params will be { id: 64a25bf2e57df3c3036831ec, limit: 10 }
  try {
    await connectToDB()

    const prompt = await Prompt.findById(params.id).populate('creator')
    // The populate method will replace the creator id with the actual creator object
    if (!prompt) return new Response("Prompt not found", { status: 404 })

    return new Response(JSON.stringify(prompt), { status: 200 })

  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 })
  }
}

// PATCH
export const PATCH = async (request, { params }) => {
  // destructure prompt & tag from the request body
  const { prompt, tag } = await request.json()

  try {
    await connectToDB()
    const existingPrompt = await Prompt.findById(params.id)
    if (!existingPrompt) return new Response("Prompt not found", { status: 404 })
    existingPrompt.prompt = prompt
    existingPrompt.tag = tag
    await existingPrompt.save()
    return new Response(JSON.stringify(existingPrompt), { status: 200 })

  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 })
  }
}

// DELETE
export const DELETE = async (request, { params }) => {

  try {
    await connectToDB()
    await Prompt.findByIdAndDelete(params.id)
    return new Response("Prompt deleted successfully", { status: 200 })

  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 })
  }
}