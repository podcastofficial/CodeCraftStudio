-- Run this once against your Neon PostgreSQL database.
-- Admin credentials are configured through environment variables in this starter.

CREATE TABLE IF NOT EXISTS projects (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(220) UNIQUE NOT NULL,
  category VARCHAR(100),
  description TEXT,
  image_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(220) UNIQUE NOT NULL,
  summary TEXT,
  description TEXT,
  icon VARCHAR(40),
  sort_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inquiries (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  telegram_username VARCHAR(100),
  project_type VARCHAR(100) NOT NULL,
  budget VARCHAR(100),
  message TEXT NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'new'
    CHECK (status IN ('new','contacted','in_progress','completed','rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_settings (
  key VARCHAR(120) PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notification_logs (
  id BIGSERIAL PRIMARY KEY,
  inquiry_id BIGINT REFERENCES inquiries(id) ON DELETE SET NULL,
  channel VARCHAR(40) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('sent','failed')),
  error_message TEXT,
  attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS inquiries_status_created_idx
  ON inquiries(status, created_at DESC);
CREATE INDEX IF NOT EXISTS projects_published_featured_idx
  ON projects(published, featured);
CREATE INDEX IF NOT EXISTS notification_logs_inquiry_idx
  ON notification_logs(inquiry_id, attempted_at DESC);

-- Optional initial services. Public pages currently use src/lib/content.ts.
INSERT INTO services (title, slug, summary, description, icon, sort_order)
VALUES
 ('Website Development','website-development','Modern responsive websites and web platforms.','Business sites, landing pages, e-commerce and dashboards.','⌘',1),
 ('Telegram Mini Apps','telegram-mini-apps','Useful web experiences inside Telegram.','Custom Telegram Web Apps and connected workflows.','▣',2),
 ('Telegram Bot Development','telegram-bot-development','Bots that automate tasks and workflows.','Automation, notifications, tracking and business bots.','◎',3),
 ('Custom Software & APIs','custom-software-apis','Backend systems and integrations.','API integration, database design and automation.','⌘',4)
ON CONFLICT (slug) DO NOTHING;
