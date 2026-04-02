import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
interface MiddlewareOptions {
    required: string[];
    redirect?: string;
    appId?: string;
}
/**
 * Next.js Edge Middleware for protecting routes with MidnightZap bounds
 */
export declare function zkMiddleware(options: MiddlewareOptions): (req: NextRequest) => Promise<NextResponse<unknown>>;
export {};
