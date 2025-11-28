import { integer, pgTable, json, varchar, text, uuid, bigint, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull().unique(),
    credits: integer()
})

export const properties = pgTable("properties", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    price: integer("price").notNull(),
    discounted_price: integer("discounted_price"),
    telephone: text("telephone"),
    rent_or_buy: text("rent_or_buy").notNull(),
    city: text("city").notNull(),
    thumbnail: text("thumbnail"),          
    gallery: text("gallery").array(),     
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow()
});

