ALTER TABLE users ADD `email` text;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `first_name`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `last_name`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `age`;