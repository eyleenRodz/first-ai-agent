'use server'
import { createAgent, tool } from "langchain";
import * as z from "zod";
import { ChatDeepSeek } from "@langchain/deepseek";
// import { ChatOpenAI } from "@langchain/openai";


export async function createPost(formData: FormData) {
    console.log('what1')
    const getWeather = tool(
    (input) => `It's always sunny in ${input.city}!`,
    {
        name: "get_weather",
        description: "Get the weather for a given city",
        schema: z.object({
        city: z.string().describe("The city to get the weather for"),
        }),
    }
    );
    console.log('what2')
    const model =new ChatDeepSeek({
        model: "deepseek-reasoner",
        temperature: 0,
        // other params...
    })
    console.log('what2.1')

    const agent = createAgent({
        model,
        tools: [getWeather],
    });
 
    console.log('what3')
    const city = formData.get('city') as string;
    console.log('what4: city:', city)
    try {
        const result = await agent.invoke({
                messages: [{ role: "user", content: `What's the weather in ${city}?` }],
        });
        console.log(result);
        return { success: true, result };
    } catch (error) {
        console.log('Error:', error);
    }
    return "";
}