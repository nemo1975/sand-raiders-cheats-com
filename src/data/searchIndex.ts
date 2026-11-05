import { blogPosts } from './blog';
import { forumPosts } from './forum';
import { getAllFaqs } from './faq';
import { blogPostPath, forumPostPath, ROUTES } from '../utils/path';

export interface SearchEntry {
  title: string;
  desc: string;
  href: string;
  type: 'Article' | 'Discussion' | 'FAQ' | 'Page';
}

const pages: SearchEntry[] = [
  { title: 'Home', desc: 'Sand Raiders of Sophie Cheats — Sand Raiders Cheats with aimbot, player ESP, radar, Tramplers, hacks modules, and plans on Windows PC.', href: ROUTES.home, type: 'Page' },
  { title: 'Features', desc: 'Sand Raiders of Sophie hacks and cheat modules: aimbot, player ESP, Trampler ESP, loot ESP, radar, and team check.', href: ROUTES.features, type: 'Page' },
  { title: 'Store', desc: 'Sand Raiders Cheats plans: monthly $35 and lifetime $150 for SAND: Raiders of Sophie on Windows PC.', href: ROUTES.store, type: 'Page' },
  { title: 'Cloud DMA', desc: 'Cloud DMA extra that runs with Sand Raiders Cheats. $50 one-time on Windows PC.', href: ROUTES.dma, type: 'Page' },
  { title: 'HWID Spoofer', desc: 'HWID Spoofer extra that runs with Sand Raiders Cheats. $50 monthly or $150 lifetime.', href: ROUTES.hwid, type: 'Page' },
  {
    title: 'Skin Changer',
    desc: 'SAND skin changer extra for Sand Raiders Cheats. $35 monthly or $99 lifetime on Windows PC.',
    href: ROUTES.skinChanger,
    type: 'Page',
  },
  { title: 'Status', desc: 'Compatibility notes after SAND patches and BattlEye context.', href: ROUTES.status, type: 'Page' },
  { title: 'Preview', desc: 'Overlay screenshots for ESP, radar, and aiming features.', href: ROUTES.preview, type: 'Page' },
  { title: 'Setup', desc: 'Windows PC setup order for SAND: Raiders of Sophie on Steam.', href: ROUTES.setup, type: 'Page' },
  { title: 'Blog', desc: 'Sand Raiders guides: heroes, release notes, ESP, and patch reminders.', href: ROUTES.blog, type: 'Page' },
  { title: 'Forum', desc: 'SAND: Raiders of Sophie community forum: ESP, aimbot, setup, and plan Q&A.', href: ROUTES.forum, type: 'Page' },
  { title: 'FAQ', desc: 'Answers about plans, ESP, compatibility, and checkout.', href: ROUTES.faq, type: 'Page' },
  { title: 'Reviews', desc: 'Evaluation checkpoints before choosing a plan.', href: ROUTES.reviews, type: 'Page' },
  { title: 'Support', desc: 'Purchase, setup, and compatibility help.', href: ROUTES.support, type: 'Page' },
  { title: 'About', desc: 'What Sand Raiders Cheats publishes at sandraiderscheats.com.', href: ROUTES.about, type: 'Page' },
];

export function getSearchIndex(): SearchEntry[] {
  const articles = blogPosts.map((post) => ({
    title: post.title,
    desc: post.desc,
    href: blogPostPath(post.slug),
    type: 'Article' as const,
  }));

  const discussions = forumPosts.map((post) => ({
    title: post.title,
    desc: post.excerpt,
    href: forumPostPath(post.slug),
    type: 'Discussion' as const,
  }));

  const faqs = getAllFaqs().map((item) => ({
    title: item.q,
    desc: item.a.replace(/<[^>]+>/g, ''),
    href: `${ROUTES.faq}#${item.id}`,
    type: 'FAQ' as const,
  }));

  return [...pages, ...articles, ...discussions, ...faqs];
}
