import { CHECKOUT_URLS } from './checkout-redirects.mjs';

/**
 * Zadeyo affiliate checkout URLs (AMAN). Use these on every Buy / checkout CTA.
 */
export const CHECKOUT = CHECKOUT_URLS;

export type CheckoutProduct = keyof typeof CHECKOUT;

/** URL slug for /go/[slug]/ hop pages (legacy bookmarks). */
export const CHECKOUT_SLUGS: Record<CheckoutProduct, string> = {
  sand: 'go',
  dma: 'dma',
  hwid: 'hwid',
  skin: 'skin-changer',
};

export const CHECKOUT_SLUG_TO_PRODUCT = Object.fromEntries(
  Object.entries(CHECKOUT_SLUGS).map(([product, slug]) => [slug, product as CheckoutProduct]),
) as Record<string, CheckoutProduct>;

export function affiliateCheckoutUrl(product: CheckoutProduct = 'sand'): string {
  return CHECKOUT[product];
}

/** Internal /go/* path (redirect layer — prefer affiliateCheckoutUrl on buttons). */
export function checkoutHopPath(product: CheckoutProduct = 'sand'): string {
  if (product === 'dma') return '/go/dma/';
  if (product === 'hwid') return '/go/hwid/';
  if (product === 'skin') return '/go/skin-changer/';
  return '/go/';
}

/** @alias affiliateCheckoutUrl */
export function checkoutPath(product: CheckoutProduct = 'sand'): string {
  return affiliateCheckoutUrl(product);
}

export const PRIMARY_CHECKOUT_PATH = affiliateCheckoutUrl('sand');

export function checkoutForSlug(slug: string): string {
  if (slug === 'dma') return affiliateCheckoutUrl('dma');
  if (slug === 'hwid') return affiliateCheckoutUrl('hwid');
  if (slug === 'skin-changer') return affiliateCheckoutUrl('skin');
  return affiliateCheckoutUrl('sand');
}

function hopPathToAffiliate(pathname: string): string | null {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if (path === '/go/' || path === '/monthly/' || path === '/lifetime/') return affiliateCheckoutUrl('sand');
  if (path.startsWith('/go/dma')) return affiliateCheckoutUrl('dma');
  if (path.startsWith('/go/hwid')) return affiliateCheckoutUrl('hwid');
  if (path.startsWith('/go/skin-changer')) return affiliateCheckoutUrl('skin');
  if (path === '/store/') return affiliateCheckoutUrl('sand');
  return null;
}

/** Resolve blog CTA or legacy href values to affiliate checkout URLs. */
export function resolveCheckoutHref(href: string): string {
  if (!href.startsWith('http')) {
    const normalized = href.startsWith('/') ? href : `/${href}`;
    const fromHop = hopPathToAffiliate(normalized);
    if (fromHop) return fromHop;
    return normalized;
  }

  for (const [product, url] of Object.entries(CHECKOUT) as [CheckoutProduct, string][]) {
    if (href === url || href.startsWith(`${url}?`) || href.startsWith(`${url}/`)) {
      return affiliateCheckoutUrl(product);
    }
  }

  if (
    href.includes('%2Fproducts%2Fsand-raiders-of-sophie') ||
    href.includes('/products/sand-raiders-of-sophie') ||
    href.includes('%2Fproducts%2Fsand-raiders-2') ||
    href.includes('/products/sand-raiders-2') ||
    href.includes('%2Fproducts%2Fsand-raiders-cheats') ||
    href.includes('/products/sand-raiders-cheats') ||
    href.includes('%2Fproducts%2Fsand-raiders') ||
    href.includes('/products/sand-raiders')
  ) {
    return affiliateCheckoutUrl('sand');
  }
  if (href.includes('%2Fproducts%2Fcloud-dma') || href.includes('/products/cloud-dma')) {
    return affiliateCheckoutUrl('dma');
  }
  if (href.includes('%2Fproducts%2Fhwid-spoofer') || href.includes('/products/hwid-spoofer')) {
    return affiliateCheckoutUrl('hwid');
  }
  if (href.includes('%2Fproducts%2Fskin-changer') || href.includes('/products/skin-changer')) {
    return affiliateCheckoutUrl('skin');
  }
  if (
    href.includes('%2Fproducts%2Faion-2') ||
    href.includes('/products/aion-2') ||
    href.includes('%2Fproducts%2Fthe-isle') ||
    href.includes('/products/the-isle')
  ) {
    return affiliateCheckoutUrl('sand');
  }

  return href;
}
