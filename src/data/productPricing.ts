import { checkoutForSlug, checkoutPath } from '../config/checkout';

export type ProductPlanId = 'monthly' | 'lifetime';

export interface ProductPlan {
  id: ProductPlanId;
  label: string;
  priceUsd: number;
  priceNote: string;
  duration: string;
}

const standardPlans: ProductPlan[] = [
  { id: 'monthly', label: 'Monthly', priceUsd: 35, priceNote: 'USD / month', duration: 'P30D' },
  { id: 'lifetime', label: 'Lifetime', priceUsd: 150, priceNote: 'USD · one-time', duration: 'P99Y' },
];

const dmaPlans: ProductPlan[] = [
  { id: 'lifetime', label: 'Lifetime', priceUsd: 50, priceNote: 'USD · one-time', duration: 'P99Y' },
];

const hwidPlans: ProductPlan[] = [
  { id: 'monthly', label: 'Monthly', priceUsd: 50, priceNote: 'USD / month', duration: 'P31D' },
  { id: 'lifetime', label: 'Lifetime', priceUsd: 150, priceNote: 'USD · one-time', duration: 'P99Y' },
];

const skinChangerPlans: ProductPlan[] = [
  { id: 'monthly', label: 'Monthly', priceUsd: 35, priceNote: 'USD / month', duration: 'P30D' },
  { id: 'lifetime', label: 'Lifetime', priceUsd: 99, priceNote: 'USD · one-time', duration: 'P99Y' },
];

export function getProductPlans(productSlug: string): ProductPlan[] {
  if (productSlug === 'dma') return dmaPlans;
  if (productSlug === 'hwid') return hwidPlans;
  if (productSlug === 'skin-changer') return skinChangerPlans;
  return standardPlans;
}

export function formatPlanPrice(usd: number): string {
  return `$${usd}`;
}

export function checkoutUrlWithPlan(baseUrl: string, _planId?: ProductPlanId): string {
  if (baseUrl.startsWith('http')) return baseUrl;
  if (baseUrl.includes('dma')) return checkoutPath('dma');
  if (baseUrl.includes('hwid')) return checkoutPath('hwid');
  if (baseUrl.includes('skin-changer')) return checkoutPath('skin');
  return checkoutForSlug(baseUrl);
}
