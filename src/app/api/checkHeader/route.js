import { NextResponse } from 'next/server';

export async function GET(req, res) {
  const { link } = req.query;
  try {
    const response = await fetch(link, { next: { revalidate: 3600 } });
    const { status } = response;
    console.log(`Status: ${status}`)
    return new NextResponse(JSON.stringify({ data: status }), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: error.cause.code })
    // res.send(JSON.stringify(error.cause.code));
  }
}
