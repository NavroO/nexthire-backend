CREATE DATABASE IF NOT EXISTS `jobs` (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  location VARCHAR(255) NOT NULL,
)

CREATE INDEX idx_job_title ON jobs(title);
