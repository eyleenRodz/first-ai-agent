'use client'
import { createPost } from "./posts/actions";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const response = await createPost(formData);
    setResult(response);
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        
        <form action={handleSubmit}>
          <input type="text" name="city"  placeholder="city name" />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Get Weather"}
          </button>
        </form>
        {result && <p>{result}</p>}
      </main>
    </div>
  );
}
