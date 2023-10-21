DROP INDEX IF EXISTS `users_email_unique`;--> statement-breakpoint
DROP INDEX IF EXISTS `users_username_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `email` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `username` ON `users` (`username`);