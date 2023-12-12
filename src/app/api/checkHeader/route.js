import { NextResponse } from 'next/server';

//Opt out of caching - need because some hit 2mb limit
export const dynamic = 'force-dynamic'

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  console.log(`URL: ${url}`);
  try {
    const response = await fetch(url, {
      cache: 'no-store',
    });
    const { status } = response;
    console.log(`status: ${status}`);
    return new NextResponse(JSON.stringify({ data: status }), {
      status: 200,
      cache: 'no-store',
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: error.cause.code }
    );
  }
}
