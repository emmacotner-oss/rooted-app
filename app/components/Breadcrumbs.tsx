'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items?: BreadcrumbItem[] }) {
  const pathname = usePathname();

  // Auto-generate breadcrumbs from pathname if not provided
  const breadcrumbs = items || generateBreadcrumbs(pathname);

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6 no-print">
      <ol className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 && (
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

  let currentPath = '';
  for (const path of paths) {
    currentPath += `/${path}`;
    const label = formatPathLabel(path);
    breadcrumbs.push({ label, href: currentPath });
  }

  return breadcrumbs;
}

function formatPathLabel(path: string): string {
  // Handle special cases
  const labels: Record<string, string> = {
    'daily-insight': 'Daily Insight',
    'categories': 'Categories',
    'articles': 'All Articles',
    'resources': 'Resources',
    'scripture-library': 'Scripture Library',
    'submit-story': 'Submit a Story',
    'community-guidelines': 'Community Guidelines',
    'weekly-digest': 'Weekly Digest',
    'trending': 'Trending',
    'bookmarks': 'My Bookmarks',
  };

  if (labels[path]) return labels[path];

  // Default: capitalize and replace hyphens
  return path
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
