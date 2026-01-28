-- Migration: Create admins table
-- Description: 관리자 테이블 생성 (로그인 기능 제거로 인해 users → admins로 변경)

CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE,
  last_login_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);

-- Comments
COMMENT ON TABLE admins IS '관리자 계정 정보';
COMMENT ON COLUMN admins.role IS '관리자 역할 (admin, super_admin)';
COMMENT ON COLUMN admins.password_hash IS '비밀번호 해시 (bcrypt)';
