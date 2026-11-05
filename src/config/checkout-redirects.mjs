/** Zadeyo affiliate code — every product checkout must use this link prefix. */
export const ZADEYO_AFFILIATE_CODE = 'AMAN';

/** Vendor product slugs (path segment after /products/). */
export const ZADEYO_PRODUCT_SLUGS = {
  sand: 'sand-raiders-of-sophie',
  dma: 'cloud-dma',
  hwid: 'hwid-spoofer',
  skin: 'skin-changer',
};

/** Full Zadeyo affiliate URL for a checkout product id. */
export function zadeyoAffiliateUrl(productKey) {
  const slug = ZADEYO_PRODUCT_SLUGS[productKey];
  if (!slug) {
    throw new Error(`Unknown checkout product: ${productKey}`);
  }
  const to = encodeURIComponent(`/products/${slug}`);
  return `https://zadeyo.com/go/${ZADEYO_AFFILIATE_CODE}?to=${to}`;
}

/** Checkout destinations keyed by internal product id. */
export const CHECKOUT_URLS = {
  sand: zadeyoAffiliateUrl('sand'),
  dma: zadeyoAffiliateUrl('dma'),
  hwid: zadeyoAffiliateUrl('hwid'),
  skin: zadeyoAffiliateUrl('skin'),
};

function slashPairs(path, url) {
  const base = path.endsWith('/') ? path.slice(0, -1) : path;
  return [
    [base, url],
    [`${base}/`, url],
  ];
}

/** Checkout paths → external product URLs (used by Node serve + Astro middleware + edge worker). */
export const CHECKOUT_PATH_REDIRECTS = new Map([
  ...slashPairs('/go', CHECKOUT_URLS.sand),
  ...slashPairs('/monthly', CHECKOUT_URLS.sand),
  ...slashPairs('/lifetime', CHECKOUT_URLS.sand),
  ...slashPairs('/go/sand', CHECKOUT_URLS.sand),
  ...slashPairs('/go/sand/monthly', CHECKOUT_URLS.sand),
  ...slashPairs('/go/sand/lifetime', CHECKOUT_URLS.sand),
  ...slashPairs('/go/monthly', CHECKOUT_URLS.sand),
  ...slashPairs('/go/lifetime', CHECKOUT_URLS.sand),
  ...slashPairs('/go/dma', CHECKOUT_URLS.dma),
  ...slashPairs('/go/hwid', CHECKOUT_URLS.hwid),
  ...slashPairs('/go/skin-changer', CHECKOUT_URLS.skin),
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}
