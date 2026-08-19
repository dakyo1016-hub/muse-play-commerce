import {sql} from "drizzle-orm";
import {integer,sqliteTable,text,uniqueIndex} from "drizzle-orm/sqlite-core";

export const tryOnUsage=sqliteTable("try_on_usage",{
 id:integer("id").primaryKey({autoIncrement:true}),
 visitorHash:text("visitor_hash").notNull(),
 usageDay:text("usage_day").notNull(),
 count:integer("count").notNull().default(0),
 updatedAt:text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
},table=>[uniqueIndex("idx_try_on_usage_visitor_day").on(table.visitorHash,table.usageDay)]);
