/**
 * robots.txt 생성
 */

import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ihonguide.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin/*',
          '/api/',
          '/api/*',
          '/mypage/',
          '/mypage/*',
          '/auth/',
          '/auth/*',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
