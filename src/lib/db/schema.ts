import {integer, pgEnum, pgTable, serial, text, timestamp, varchar} from 'drizzle-orm/pg-core'

export const userSystemEnum = pgEnum('user_system_enum', ['system', 'user'])

export const chats = pgTable('chats', {
    id: serial('id').primaryKey(),
    subject: text('subject').notNull(),
    pdfName: text('pdf_name').notNull(),
    pdfUrl: text('pdf_url').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
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

// new table for subject or keep as a separate field?