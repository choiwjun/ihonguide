-- Migration: Create calculator_results table
-- Description: 양육비 계산기 결과 테이블 (비로그인 사용자 전용)

CREATE TABLE IF NOT EXISTS calculator_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(100) NOT NULL,
  calculator_type VARCHAR(20) NOT NULL CHECK (calculator_type IN ('양육비', '재산분할')),
  input_data JSONB NOT NULL,
  result_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_calculator_results_session_id ON calculator_results(session_id);
CREATE INDEX IF NOT EXISTS idx_calculator_results_type ON calculator_results(calculator_type);
CREATE INDEX IF NOT EXISTS idx_calculator_results_created_at ON calculator_results(created_at DESC);

-- Comments
COMMENT ON TABLE calculator_results IS '계산기 결과 (FEAT-2)';
COMMENT ON COLUMN calculator_results.session_id IS '브라우저 세션 식별자';
COMMENT ON COLUMN calculator_results.calculator_type IS '계산기 유형: 양육비/재산분할';
COMMENT ON COLUMN calculator_results.input_data IS '입력 데이터 (소득, 자녀 정보 등)';
COMMENT ON COLUMN calculator_results.result_data IS '계산 결과 데이터';
