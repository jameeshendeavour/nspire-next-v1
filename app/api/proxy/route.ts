import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    // Your logic for handling the GET request
    const AUTH_SERVER_URL = "https://dev-auth-server.nspireinsights.com/auth/token";
    try {
        const response = await fetch(AUTH_SERVER_URL, {
            method: "POST",
            headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: request.body,
      // @ts-expect-error duplex is not supported in node.js
      duplex: 'half',
        });
        const data = await response.json();
        return NextResponse.json({ message: 'GET request successful', data: data });
    } catch (error) {
        return NextResponse.json({ message: 'GET request failed', error: error });
    }
}
