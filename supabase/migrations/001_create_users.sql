-- Migration: Create users table
-- Description: 사용자 테이블 생성

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  phone VARCHAR(20),
  provider VARCHAR(20) CHECK (provider IN ('kakao', 'naver')),
  provider_id VARCHAR(255),
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider, provider_id);

-- Comments
COMMENT ON TABLE users IS '사용자 정보';
COMMENT ON COLUMN users.provider IS '소셜 로그인 제공자 (kakao, naver)';
COMMENT ON COLUMN users.role IS '사용자 역할 (user, admin)';
COMMENT ON COLUMN users.deleted_at IS '소프트 삭제 일시';
