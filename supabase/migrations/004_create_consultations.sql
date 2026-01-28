-- Migration: Create consultations table
-- Description: 상담 신청 테이블 (비로그인 - 이름/연락처로 식별)

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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_consultations_ticket_number ON consultations(ticket_number);
CREATE INDEX IF NOT EXISTS idx_consultations_phone ON consultations(phone);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON consultations(created_at DESC);

-- Comments
COMMENT ON TABLE consultations IS '상담 신청 (FEAT-3)';
COMMENT ON COLUMN consultations.ticket_number IS '접수번호 (CST-YYYYMMDD-NNNN 형식)';
COMMENT ON COLUMN consultations.consultation_type IS '상담 유형: 이혼상담, 양육비상담, 재산분할상담 등';
COMMENT ON COLUMN consultations.preferred_time IS '희망 연락 시간대';
COMMENT ON COLUMN consultations.status IS '상태: pending/contacted/in_progress/completed/cancelled';
COMMENT ON COLUMN consultations.admin_notes IS '관리자 메모 (내부용)';
