import {integer, pgEnum, pgTable, serial, text, timestamp, varchar} from 'drizzle-orm/pg-core'

export const userSystemEnum = pgEnum('user_system_enum', ['system', 'user'])

export const subjects = pgTable('subjects', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
})

export const chats = pgTable('chats', {
    id: serial('id').primaryKey(),
    pdfName: text('pdf_name').notNull(),
    pdfUrl: text('pdf_url').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    subjectId: integer('subject_id').references(()=>subjects.id).notNull(),
    userID: varchar('user_id', {length:256}).notNull(),
    fileKey: text('file_key').notNull(),
})

export const messages = pgTable("messages", {
    id: serial('id').primaryKey(),
    chatId: integer('chat_id').references(()=>chats.id).notNull(),
    content: text('context').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    role: userSystemEnum('role').notNull()
})

// npx drizzle-kit push:pg to push changes to db
// npx drizzle-kit studio --host 127.0.0.1 to visualize db in browser