-- Migration: Create consultations table
-- Description: 상담 신청 테이블

CREATE TABLE IF NOT EXISTS consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  preferred_time VARCHAR(100),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed')),
  current_situation TEXT,
  interests VARCHAR(255),
  description TEXT,
  diagnosis_id UUID REFERENCES diagnosis_results(id) ON DELETE SET NULL,
  calculator_id UUID REFERENCES calculator_results(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  contacted_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_consultations_user_id ON consultations(user_id);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON consultations(created_at DESC);

-- Comments
COMMENT ON TABLE consultations IS '상담 신청 (FEAT-3)';
COMMENT ON COLUMN consultations.preferred_time IS '희망 연락 시간대';
COMMENT ON COLUMN consultations.status IS '상태: pending(대기)/contacted(연락완료)/completed(완료)';
COMMENT ON COLUMN consultations.interests IS '관심 분야: 재산분할, 양육권, 위자료 등';
