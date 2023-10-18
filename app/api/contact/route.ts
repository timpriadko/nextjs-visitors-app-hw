import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const res = await req.json();

  if (res.username === 'error') {
    return NextResponse.json({ errorName: 'userName error' }, { status: 404 });
  }

  return NextResponse.json(
    { res, contactFormStatus: 'submitted' },
    { status: 200 }
  );
}
