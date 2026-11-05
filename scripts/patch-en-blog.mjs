import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const postsSrc = fs.readFileSync(path.join(root, 'src/data/blog/posts.ts'), 'utf8');
const enPath = path.join(root, 'src/i18n/en.ts');
let en = fs.readFileSync(enPath, 'utf8');

const postRe =
  /tag: "([^"]+)",\s*\n\s*title: "([^"]+)",\s*\n\s*slug: "([^"]+)",\s*\n\s*image: "([^"]+)",\s*\n\s*desc: "([^"]+)",\s*\n\s*date: "([^"]+)",\s*\n\s*readTime: "([^"]+)"/g;

const items = [];
let m;
while ((m = postRe.exec(postsSrc))) {
  items.push({
    tag: m[1],
    title: m[2],
    slug: m[3],
    image: m[4],
    desc: m[5],
    date: m[6],
    readTime: m[7],
  });
}

const itemsBlock = items
  .map(
    (item) => `      {
        tag: '${item.tag}',
        title: ${JSON.stringify(item.title)},
        slug: '${item.slug}',
        image: '${item.image}',
        desc: ${JSON.stringify(item.desc)},
        date: '${item.date}',
        readTime: '${item.readTime}',
      }`,
  )
  .join(',\n');

const replaced = en.replace(
  /blog: \{[\s\S]*?items: \[[\s\S]*?\n    \],\n  \},\n\n  toolkit:/,
  `blog: {
    eyebrow: 'Guides',
    title: 'Guides and updates',
    subtitle: 'Sand Raiders cheat codes, trainer searches, hacks vs ESP, Tramplers, Storm Dive, and BattlEye notes for SAND on Windows PC.',
    latestTitle: 'Latest articles',
    latestSubtitle: 'Filter by topic to find ESP explainers, compatibility notes, and plan comparisons.',
    filterAll: 'All articles',
    sortLabel: 'Sort by',
    sortNewest: 'Newest first',
    sortOldest: 'Oldest first',
    sortShortRead: 'Shortest read',
    sortLongRead: 'Longest read',
    emptyFilter: 'No articles match this filter.',
    viewAll: 'View all articles',
    read: 'Read',
    items: [
${itemsBlock}
    ],
  },

  toolkit:`,
);

if (replaced === en) {
  console.error('Failed to patch blog.items in en.ts');
  process.exit(1);
}

fs.writeFileSync(enPath, replaced, 'utf8');
console.log(`Synced ${items.length} blog items in en.ts`);
