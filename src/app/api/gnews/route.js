export const dynamic = 'force-static';
import { NextResponse } from 'next/server';
import { rateLimiter } from '@/utils/limiter';
import { getUserIP } from '@/utils/ip';

export async function GET() {
  const userIP = await getUserIP();
  try {
    await rateLimiter.consume(userIP);
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
  } catch {
    return NextResponse.json(
      { message: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }
}
