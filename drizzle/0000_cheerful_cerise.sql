CREATE TABLE `try_on_usage` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`visitor_hash` text NOT NULL,
	`usage_day` text NOT NULL,
	`count` integer DEFAULT 0 NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_try_on_usage_visitor_day` ON `try_on_usage` (`visitor_hash`,`usage_day`);