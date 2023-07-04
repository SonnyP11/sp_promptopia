// This file define a POST api route
// The route is /api/prompt/new
import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"


export const POST = async (request) => {
  // Retrieve userId, prompt, tag from the POST request object
  const { userId, prompt, tag } = await request.json();
  // The req.json() method returns a the body of the HTTP request

  try {
    // Connect to MongoDB
    await connectToDB()

    // Create a new Prompt instance passing data from the request
    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    // Save the new prompt to the database
    await newPrompt.save()

    // Return the new prompt as a response in JSON with res status
    return new Response(JSON.stringify(newPrompt), { status: 201 })

  } catch (error) {
    return new Response('Failed to create new prompt', { status: 500 })
  }
}