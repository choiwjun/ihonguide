-- ============================================
-- 이혼준비 플랫폼 - 전체 데이터베이스 초기화
-- 모든 테이블, 인덱스, RLS 정책을 한 번에 생성
-- ============================================

-- ============================================
-- 1. Admins 테이블 (관리자)
-- ============================================
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

CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);

COMMENT ON TABLE admins IS '관리자 계정 정보';

-- ============================================
-- 2. Diagnosis Results 테이블 (진단 결과)
-- ============================================
CREATE TABLE IF NOT EXISTS diagnosis_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(100) NOT NULL,
  answers JSONB NOT NULL,
  result_type VARCHAR(20) NOT NULL CHECK (result_type IN ('협의', '조정', '소송')),
  score INTEGER NOT NULL,
  result_detail JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_diagnosis_results_session_id ON diagnosis_results(session_id);
CREATE INDEX IF NOT EXISTS idx_diagnosis_results_created_at ON diagnosis_results(created_at DESC);

COMMENT ON TABLE diagnosis_results IS '이혼 유형 진단 결과';

-- ============================================
-- 3. Calculator Results 테이블 (계산기 결과)
-- ============================================
CREATE TABLE IF NOT EXISTS calculator_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(100) NOT NULL,
  calculator_type VARCHAR(20) NOT NULL CHECK (calculator_type IN ('양육비', '재산분할')),
  input_data JSONB NOT NULL,
  result_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_calculator_results_session_id ON calculator_results(session_id);
CREATE INDEX IF NOT EXISTS idx_calculator_results_type ON calculator_results(calculator_type);
CREATE INDEX IF NOT EXISTS idx_calculator_results_created_at ON calculator_results(created_at DESC);

COMMENT ON TABLE calculator_results IS '양육비/재산분할 계산기 결과';

-- ============================================
-- 4. Consultations 테이블 (상담 신청)
-- ============================================
CREATE TABLE IF NOT EXISTS consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  consultation_type VARCHAR(50) NOT NULL,
  preferred_time VARCHAR(100),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'in_progress', 'completed', 'cancelled')),
  current_situation TEXT,
  description TEXT,
  admin_notes TEXT,
  diagnosis_id UUID REFERENCES diagnosis_results(id) ON DELETE SET NULL,
  calculator_id UUID REFERENCES calculator_results(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  contacted_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_consultations_ticket_number ON consultations(ticket_number);
CREATE INDEX IF NOT EXISTS idx_consultations_phone ON consultations(phone);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON consultations(created_at DESC);

COMMENT ON TABLE consultations IS '상담 신청';

-- ============================================
-- 5. Blog Categories 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0
);

COMMENT ON TABLE blog_categories IS '블로그 카테고리';

-- ============================================
-- 6. Blog Posts 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image VARCHAR(500),
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  seo_meta JSONB,
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);

COMMENT ON TABLE blog_posts IS '블로그 게시물';

-- ============================================
-- 7. Admin Settings 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS admin_settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE admin_settings IS '관리자 설정 (key-value 형태)';

-- ============================================
-- 8. RLS (Row Level Security) 정책
-- ============================================

-- Enable RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnosis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculator_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제 (재실행 시 충돌 방지)
DROP POLICY IF EXISTS "Service role can manage admins" ON admins;
DROP POLICY IF EXISTS "Anyone can insert diagnosis results" ON diagnosis_results;
DROP POLICY IF EXISTS "Anyone can view diagnosis results" ON diagnosis_results;
DROP POLICY IF EXISTS "Anyone can view diagnosis results by session" ON diagnosis_results;
DROP POLICY IF EXISTS "Anyone can insert calculator results" ON calculator_results;
DROP POLICY IF EXISTS "Anyone can view calculator results" ON calculator_results;
DROP POLICY IF EXISTS "Anyone can view calculator results by session" ON calculator_results;
DROP POLICY IF EXISTS "Anyone can insert consultations" ON consultations;
DROP POLICY IF EXISTS "Anyone can view consultations" ON consultations;
DROP POLICY IF EXISTS "Anyone can view consultations by ticket number" ON consultations;
DROP POLICY IF EXISTS "Anyone can view published posts" ON blog_posts;
DROP POLICY IF EXISTS "Service role can manage posts" ON blog_posts;
DROP POLICY IF EXISTS "Service role can manage all posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can view categories" ON blog_categories;
DROP POLICY IF EXISTS "Service role can manage settings" ON admin_settings;

-- Admins (서비스 역할만)
CREATE POLICY "Service role can manage admins" ON admins
  FOR ALL USING (true);

-- Diagnosis results (공개)
CREATE POLICY "Anyone can insert diagnosis results" ON diagnosis_results
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view diagnosis results" ON diagnosis_results
  FOR SELECT USING (true);

-- Calculator results (공개)
CREATE POLICY "Anyone can insert calculator results" ON calculator_results
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view calculator results" ON calculator_results
  FOR SELECT USING (true);

-- Consultations
CREATE POLICY "Anyone can insert consultations" ON consultations
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view consultations" ON consultations
  FOR SELECT USING (true);

-- Blog posts (발행된 글만 공개)
CREATE POLICY "Anyone can view published posts" ON blog_posts
  FOR SELECT USING (status = 'published');
CREATE POLICY "Service role can manage posts" ON blog_posts
  FOR ALL USING (true);

-- Blog categories (공개)
CREATE POLICY "Anyone can view categories" ON blog_categories
  FOR SELECT USING (true);

-- Admin settings (서비스 역할만)
CREATE POLICY "Service role can manage settings" ON admin_settings
  FOR ALL USING (true);

-- ============================================
-- 9. 초기 데이터
-- ============================================

-- Admin settings
INSERT INTO admin_settings (key, value) VALUES
  ('site_name', '"이혼준비"'),
  ('site_description', '"이혼 절차, 양육비, 재산분할 정보를 한눈에"'),
  ('contact_email', '"contact@ihonguide.com"'),
  ('consultation_notification_enabled', 'true')
ON CONFLICT (key) DO NOTHING;

-- Blog categories
INSERT INTO blog_categories (name, slug, description, sort_order) VALUES
  ('이혼 절차', 'procedure', '이혼 절차에 대한 가이드', 1),
  ('비용 안내', 'cost', '이혼 관련 비용 정보', 2),
  ('양육권/양육비', 'child-custody', '자녀 양육권 및 양육비 관련', 3),
  ('재산분할', 'property-division', '재산분할 관련 정보', 4),
  ('자주 묻는 질문', 'faq', '이혼 관련 FAQ', 5)
ON CONFLICT (slug) DO NOTHING;
