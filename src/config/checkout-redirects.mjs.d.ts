export declare const ZADEYO_AFFILIATE_CODE: 'AMAN';
export declare const ZADEYO_PRODUCT_SLUGS: {
  readonly sand: string;
  readonly dma: string;
  readonly hwid: string;
  readonly skin: string;
};
export declare function zadeyoAffiliateUrl(productKey: keyof typeof ZADEYO_PRODUCT_SLUGS): string;
export declare const CHECKOUT_URLS: {
  readonly sand: string;
  readonly dma: string;
  readonly hwid: string;
  readonly skin: string;
};

export declare const CHECKOUT_PATH_REDIRECTS: Map<string, string>;

export declare function resolveCheckoutPathRedirect(pathname: string): string | null;
