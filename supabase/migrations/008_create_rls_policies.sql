-- Migration: Create RLS (Row Level Security) policies
-- Description: 테이블별 접근 제어 정책

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnosis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculator_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Diagnosis results policies
CREATE POLICY "Users can view own diagnosis results" ON diagnosis_results
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert diagnosis results" ON diagnosis_results
  FOR INSERT WITH CHECK (true);

-- Calculator results policies
CREATE POLICY "Users can view own calculator results" ON calculator_results
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert calculator results" ON calculator_results
  FOR INSERT WITH CHECK (true);

-- Consultations policies
CREATE POLICY "Users can view own consultations" ON consultations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert consultations" ON consultations
  FOR INSERT WITH CHECK (true);

-- Blog posts policies (public read for published)
CREATE POLICY "Anyone can view published posts" ON blog_posts
  FOR SELECT USING (status = 'published');

-- Blog categories policies (public read)
CREATE POLICY "Anyone can view categories" ON blog_categories
  FOR SELECT USING (true);

-- Saved contents policies
CREATE POLICY "Users can manage own saved contents" ON saved_contents
  FOR ALL USING (auth.uid() = user_id);

-- Admin settings policies (admin only)
CREATE POLICY "Only admins can access settings" ON admin_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Comments
COMMENT ON POLICY "Users can view own profile" ON users IS '사용자는 자신의 프로필만 조회 가능';
COMMENT ON POLICY "Anyone can view published posts" ON blog_posts IS '발행된 글은 누구나 조회 가능';
