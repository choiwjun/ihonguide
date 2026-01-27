-- Migration: Seed blog categories
-- Description: 블로그 카테고리 초기 데이터

INSERT INTO blog_categories (name, slug, description, sort_order) VALUES
  ('이혼 절차', 'procedure', '이혼 절차에 대한 가이드', 1),
  ('비용 안내', 'cost', '이혼 관련 비용 정보', 2),
  ('양육권/양육비', 'child-custody', '자녀 양육권 및 양육비 관련', 3),
  ('재산분할', 'property-division', '재산분할 관련 정보', 4),
  ('자주 묻는 질문', 'faq', '이혼 관련 FAQ', 5)
ON CONFLICT (slug) DO NOTHING;
