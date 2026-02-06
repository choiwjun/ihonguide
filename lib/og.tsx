import { ImageResponse } from 'next/og';

const FONT_BOLD_URL =
  'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-kr@latest/korean-700-normal.woff';
const FONT_REGULAR_URL =
  'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-kr@latest/korean-400-normal.woff';

export const OG_SIZE = { width: 1200, height: 630 };

async function loadFonts() {
  const [bold, regular] = await Promise.all([
    fetch(FONT_BOLD_URL, { cache: 'force-cache' }).then((res) => res.arrayBuffer()),
    fetch(FONT_REGULAR_URL, { cache: 'force-cache' }).then((res) => res.arrayBuffer()),
  ]);
  return { bold, regular };
}

export async function createOgImage(
  title: string,
  subtitle?: string,
  options?: { badge?: string }
) {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(145deg, #0f766e 0%, #0a5f58 60%, #074a45 100%)',
          padding: '60px 80px',
          fontFamily: '"Noto Sans KR"',
          position: 'relative',
        }}
      >
        {/* Decorative top accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, transparent 0%, #ffffff 50%, transparent 100%)',
            display: 'flex',
          }}
        />

        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -60,
            left: -60,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
            display: 'flex',
          }}
        />

        {/* Badge */}
        {options?.badge && (
          <div
            style={{
              fontSize: 20,
              color: '#ffffff',
              background: 'rgba(255,255,255,0.15)',
              padding: '8px 24px',
              borderRadius: 100,
              marginBottom: 28,
              letterSpacing: '0.05em',
              display: 'flex',
            }}
          >
            {options.badge}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 20 ? 52 : 64,
            fontWeight: 700,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.35,
            letterSpacing: '-0.02em',
            display: 'flex',
          }}
        >
          {title}
        </div>

        {/* Divider */}
        <div
          style={{
            width: 64,
            height: 3,
            background: 'rgba(255,255,255,0.4)',
            borderRadius: 2,
            marginTop: 28,
            marginBottom: 24,
            display: 'flex',
          }}
        />

        {/* Subtitle */}
        {subtitle && (
          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.8)',
              textAlign: 'center',
              lineHeight: 1.6,
              maxWidth: '85%',
              display: 'flex',
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Bottom branding */}
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.03em',
              display: 'flex',
            }}
          >
            ihonjunbi.com
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        {
          name: 'Noto Sans KR',
          data: fonts.bold,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Noto Sans KR',
          data: fonts.regular,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  );
}
