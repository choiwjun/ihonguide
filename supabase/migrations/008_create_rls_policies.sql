-- Migration: Create RLS (Row Level Security) policies
-- Description: 테이블별 접근 제어 정책 (비로그인 구조에 맞게 단순화)

-- Enable RLS on all tables
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnosis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculator_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Admins policies (서비스 역할만 접근)
-- ============================================
CREATE POLICY "Service role can manage admins" ON admins
  FOR ALL USING (true);

-- ============================================
-- Diagnosis results policies (공개)
-- ============================================
CREATE POLICY "Anyone can insert diagnosis results" ON diagnosis_results
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view diagnosis results by session" ON diagnosis_results
  FOR SELECT USING (true);

-- ============================================
-- Calculator results policies (공개)
-- ============================================
CREATE POLICY "Anyone can insert calculator results" ON calculator_results
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view calculator results by session" ON calculator_results
  FOR SELECT USING (true);

-- ============================================
-- Consultations policies
-- ============================================
CREATE POLICY "Anyone can insert consultations" ON consultations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view consultations by ticket number" ON consultations
  FOR SELECT USING (true);

-- ============================================
-- Blog posts policies (발행된 글은 공개)
-- ============================================
CREATE POLICY "Anyone can view published posts" ON blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Service role can manage all posts" ON blog_posts
  FOR ALL USING (true);

-- ============================================
-- Blog categories policies (공개)
-- ============================================
CREATE POLICY "Anyone can view categories" ON blog_categories
  FOR SELECT USING (true);

-- ============================================
-- Admin settings policies (서비스 역할만)
-- ============================================
CREATE POLICY "Service role can manage settings" ON admin_settings
  FOR ALL USING (true);

-- ============================================
-- Comments
-- ============================================
COMMENT ON POLICY "Anyone can view published posts" ON blog_posts IS '발행된 블로그 글은 누구나 조회 가능';
COMMENT ON POLICY "Anyone can view categories" ON blog_categories IS '카테고리는 누구나 조회 가능';
