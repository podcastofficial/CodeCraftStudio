-- Run this migration once in the existing Neon PostgreSQL database.
-- It adds attribution and verified Telegram identity fields to inquiries.
ALTER TABLE inquiries
  ADD COLUMN IF NOT EXISTS source VARCHAR(30) NOT NULL DEFAULT 'website',
  ADD COLUMN IF NOT EXISTS telegram_user_id BIGINT,
  ADD COLUMN IF NOT EXISTS telegram_first_name VARCHAR(150);

CREATE INDEX IF NOT EXISTS inquiries_source_created_idx
  ON inquiries(source, created_at DESC);
