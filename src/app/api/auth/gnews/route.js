export const dynamic = 'force-static';

export async function GET() {
  const res = await fetch(
    `https://gnews.io/api/v4/top-headlines?category=general&lang=en&apikey=${process.env.GNEWS_API_KEY}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();

  return Response.json({ data });
}
