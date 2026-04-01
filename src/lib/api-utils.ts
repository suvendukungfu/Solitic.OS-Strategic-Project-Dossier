import { NextResponse } from 'next/server';

export function apiSuccess(data: unknown, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

export function handleApiError(error: unknown) {
  console.error("API Error:", error);
  const message = error instanceof Error ? error.message : "Internal Execution Error";
  return apiError(message, 500);
}
