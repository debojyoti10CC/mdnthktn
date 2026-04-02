import { NextResponse } from 'next/server';
import { zkSession } from './zkSession';
/**
 * Next.js Edge Middleware for protecting routes with MidnightZap bounds
 */
export function zkMiddleware(options) {
    return async (req) => {
        // 1. Extract session token from cookies
        const sessionToken = req.cookies.get('midnight_zap_session')?.value;
        if (!sessionToken) {
            if (options.redirect) {
                const url = req.nextUrl.clone();
                url.pathname = options.redirect;
                return NextResponse.redirect(url);
            }
            return new NextResponse('Unauthorized: No ZK session token', { status: 401 });
        }
        // 2. Verify session securely with Midnight Network
        const sessionInfo = await zkSession.verify(sessionToken);
        if (!sessionInfo.valid) {
            if (options.redirect) {
                const url = req.nextUrl.clone();
                url.pathname = options.redirect;
                return NextResponse.redirect(url);
            }
            return new NextResponse('Unauthorized: Invalid or expired ZK session', { status: 401 });
        }
        // 3. (Optional) Check specific claims from options.required if the RPC returns them
        // In strict privacy model, session valid boolean is enough if the session mapped to the specific claim request
        return NextResponse.next();
    };
}
