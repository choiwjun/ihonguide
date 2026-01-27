'use client';

/**
 * 로그인 페이지
 */

import { Container } from '@/components/layout';
import { Card } from '@/components/ui';
import { LoginContent } from '@/components/auth/LoginContent';

export default function LoginPage() {
  return (
    <Container size="sm" className="py-8">
      <Card className="p-8">
        <LoginContent />
      </Card>
    </Container>
  );
}
