CREATE TABLE `labels_table` (
	`id` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tasks_table` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`label_id` text,
	`start_date_selected` integer NOT NULL,
	`start_date` text,
	`start_year` integer,
	`start_month` integer,
	`start_day` integer,
	`start_hour` integer,
	`start_minute` integer,
	`deadline_date_selected` integer NOT NULL,
	`deadline_year` integer,
	`deadline_month` integer,
	`deadline_day` integer,
	`deadline_hour` integer,
	`deadline_minute` integer,
	`reminder` text,
	`repeat` text,
	`high_priority` integer NOT NULL,
	`points` integer NOT NULL,
	`status` text NOT NULL,
	`created_at` text,
	`updated_at` text,
	FOREIGN KEY (`label_id`) REFERENCES `labels_table`(`id`) ON UPDATE no action ON DELETE no action
);
