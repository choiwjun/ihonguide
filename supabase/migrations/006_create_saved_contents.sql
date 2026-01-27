-- Migration: Create saved_contents table
-- Description: 사용자 저장 콘텐츠 테이블

CREATE TABLE IF NOT EXISTS saved_contents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_saved_contents_user_id ON saved_contents(user_id);

-- Comments
COMMENT ON TABLE saved_contents IS '사용자가 저장한 블로그 콘텐츠';
