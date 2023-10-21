CREATE TABLE `records` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer,
	`weight` real,
	`fat` real,
	`muscle` real,
	`body_water` real,
	`body_age` integer,
	`bmr` integer,
	`bmi` real,
	`visceral_fat` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer,
	`scale` text DEFAULT 'kg',
	`height` real,
	`sex` text DEFAULT 'M',
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_id` ON `settings` (`user_id`);