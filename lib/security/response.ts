import { NextResponse } from "next/server";

export function apiError(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ ok: false, error: { message, details }, requestId: crypto.randomUUID() }, { status });
}

export function apiSuccess<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data }, init);
}

