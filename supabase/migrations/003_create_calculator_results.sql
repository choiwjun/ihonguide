-- Migration: Create calculator_results table
-- Description: 양육비 계산기 결과 테이블

CREATE TABLE IF NOT EXISTS calculator_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  session_id VARCHAR(100),
  calculator_type VARCHAR(20) NOT NULL CHECK (calculator_type IN ('양육비', '재산분할')),
  input_data JSONB NOT NULL,
  result_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_calculator_results_user_id ON calculator_results(user_id);
CREATE INDEX IF NOT EXISTS idx_calculator_results_session_id ON calculator_results(session_id);
CREATE INDEX IF NOT EXISTS idx_calculator_results_type ON calculator_results(calculator_type);

-- Comments
COMMENT ON TABLE calculator_results IS '계산기 결과 (FEAT-2)';
COMMENT ON COLUMN calculator_results.calculator_type IS '계산기 유형: 양육비/재산분할';
COMMENT ON COLUMN calculator_results.input_data IS '입력 데이터 (소득, 자녀 정보 등)';
COMMENT ON COLUMN calculator_results.result_data IS '계산 결과 데이터';
