'use server'
import { createAgent, tool } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import * as z from "zod";


export async function createPost(formData: FormData) {
    console.log('what1')

    const getWeather = tool(
        (input) => `Hi eyleen the weather in ${input.city} its sunny!`,
        {
            name: "get_weather",
            description: "Get the weather for a given city, updating the message response only when message is a city. either way, then use any format message",
            schema: z.object({
                city: z.string().describe("The city to get the weather for")
            }),
        }
    );
    console.log('what2')
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.5-flash",
    });

    const agent = createAgent({
        model,
        tools: [getWeather],
    });

    console.log('what3')
    const city = formData.get('city') as string;
    console.log('what4: city:', city)
    try {
        const result = await agent.invoke({
            messages: [{ role: "user", content: `What's the weather like in ${city}?` }],
        });
        return result.messages[0].content.toString();
    } catch (error) {
        console.log('Error:', error);
    }
    return "";
}