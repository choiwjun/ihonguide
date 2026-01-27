-- Migration: Create admin_settings table
-- Description: 관리자 설정 테이블

CREATE TABLE IF NOT EXISTS admin_settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comments
COMMENT ON TABLE admin_settings IS '관리자 설정 (key-value 형태)';

-- Initial settings
INSERT INTO admin_settings (key, value) VALUES
  ('site_name', '"이혼준비 - ihonguide"'),
  ('contact_email', '"contact@ihonguide.com"'),
  ('consultation_notification_enabled', 'true')
ON CONFLICT (key) DO NOTHING;
