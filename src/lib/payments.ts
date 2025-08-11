import api, { handleApiError } from './api';

export interface CreateCheckoutRequest {
  // For your backend shape (Stripe):
  priceId?: string;
  quantity?: number;
  mode?: 'subscription' | 'payment';
  customerEmail?: string;
  userId?: string;
  successUrl: string;
  cancelUrl: string;
  // Also include planId for future-proofing if backend maps server-side
  planId?: string;
}

export interface CreateCheckoutResponse {
  checkoutUrl?: string;
  sessionId?: string;
  // Also support backend variants
  url?: string;
  id?: string;
  message?: string;
}

/**
 * Starts a checkout session by calling the backend and redirecting the user.
 * The backend should create a session with the payment provider and
 * return a redirect URL (preferred) or a provider session id.
 */
const PLAN_TO_ENV_PRICE_KEY: Record<string, string> = {
  'thought-learner': 'VITE_STRIPE_PRICE_THOUGHT_LEARNER',
  'truth-seeker': 'VITE_STRIPE_PRICE_TRUTH_SEEKER',
  'ultra-thinker': 'VITE_STRIPE_PRICE_ULTRA_THINKER',
};

const resolvePriceIdForPlan = (planId: string): string | undefined => {
  const envKey = PLAN_TO_ENV_PRICE_KEY[planId];
  if (!envKey) return undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value = (import.meta as any).env?.[envKey];
  return value;
};

export const startCheckout = async (planId: string): Promise<void> => {
  const origin = window.location.origin;
  const priceId = resolvePriceIdForPlan(planId);

  if (!priceId) {
    throw new Error(
      `Missing Stripe price ID env for plan '${planId}'. Please set ${PLAN_TO_ENV_PRICE_KEY[planId] || 'the correct env var'} in your environment.`
    );
  }

  let userId: string | undefined;
  let customerEmail: string | undefined;
  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      userId = parsed?.id?.toString();
      customerEmail = parsed?.email;
    }
  } catch {
    // ignore parsing errors
  }

  const payload: CreateCheckoutRequest = {
    priceId,
    quantity: 1,
    mode: 'subscription',
    customerEmail,
    userId,
    planId,
    successUrl: `${origin}/checkout/success`,
    cancelUrl: `${origin}/checkout/cancel`,
  };

  try {
    // Align with your backend route
    const { data } = await api.post<CreateCheckoutResponse>('/payments/create-checkout-session', payload);

    const redirectUrl = data.checkoutUrl || data.url;
    if (redirectUrl) {
      window.location.href = redirectUrl;
      return;
    }

    const sessionId = data.sessionId || data.id;
    if (sessionId) {
      // If only sessionId is returned, backend should provide a hosted page.
      window.location.href = `${origin}/checkout/${encodeURIComponent(sessionId)}`;
      return;
    }

    const message = data.message || 'Unable to start checkout.';
    throw new Error(message);
  } catch (error) {
    const message = handleApiError(error) || 'Checkout failed.';
    throw new Error(message);
  }
};