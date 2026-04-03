import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signing In… | StackSift',
};

/**
 * OIDC callback page stub.
 *
 * Final implementation (BE-03): This page will receive the `?code=` and
 * `?state=` query parameters from Keycloak after the user authenticates.
 * It will exchange the code for tokens via the backend BFF, store the
 * session, and redirect to the dashboard.
 *
 * For now this is a static scaffold — the spinner gives visual feedback
 * that something is happening even before the auth logic is wired up.
 */
export default function CallbackPage() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl text-center">
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-700 border-t-blue-500"
        role="status"
        aria-label="Completing sign-in"
      />
      <h1 className="text-lg font-medium">Completing sign-in…</h1>
      <p className="text-sm text-zinc-400">
        You will be redirected automatically.
      </p>
    </div>
  );
}
