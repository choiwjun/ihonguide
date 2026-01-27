-- Migration: Create diagnosis_results table
-- Description: 이혼 유형 진단 결과 테이블

CREATE TABLE IF NOT EXISTS diagnosis_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  session_id VARCHAR(100),
  answers JSONB NOT NULL,
  result_type VARCHAR(20) NOT NULL CHECK (result_type IN ('협의', '조정', '소송')),
  score INTEGER NOT NULL,
  result_detail JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_diagnosis_results_user_id ON diagnosis_results(user_id);
CREATE INDEX IF NOT EXISTS idx_diagnosis_results_session_id ON diagnosis_results(session_id);
CREATE INDEX IF NOT EXISTS idx_diagnosis_results_created_at ON diagnosis_results(created_at DESC);

-- Comments
COMMENT ON TABLE diagnosis_results IS '이혼 유형 진단 결과 (FEAT-1)';
COMMENT ON COLUMN diagnosis_results.session_id IS '비로그인 사용자 세션 식별자';
COMMENT ON COLUMN diagnosis_results.answers IS '질문별 응답 데이터 (JSONB)';
COMMENT ON COLUMN diagnosis_results.result_type IS '진단 결과 유형: 협의/조정/소송';
