import { NextResponse } from 'next/server';

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  console.log(`URL: ${url}`);
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    const { status } = response;
    return new NextResponse(JSON.stringify({ data: status }), { status: 200 });
  } catch (error) {
    console.log(`Error: ${error}`)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: error.cause.code })
  }
}
