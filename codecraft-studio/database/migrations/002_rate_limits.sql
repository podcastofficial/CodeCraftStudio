-- Shared rate-limit store (works across Vercel serverless instances).
CREATE TABLE IF NOT EXISTS rate_limits (
  key VARCHAR(120) PRIMARY KEY,
  window_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  count INTEGER NOT NULL DEFAULT 1
);
CREATE INDEX IF NOT EXISTS rate_limits_window_idx ON rate_limits(window_start);
