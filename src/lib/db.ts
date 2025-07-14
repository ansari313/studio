import Database from 'better-sqlite3';
import { mockPortfolioItems, mockResumeData } from './data';

const db = new Database('folioflow.db');
db.pragma('journal_mode = WAL');

const createTables = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS portfolio_items (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      mediaUrl TEXT NOT NULL,
      mediaType TEXT NOT NULL CHECK(mediaType IN ('image', 'video')),
      tags TEXT NOT NULL,
      projectUrl TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS resume (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      cardTitle TEXT NOT NULL,
      cardSubtitle TEXT NOT NULL,
      summary TEXT NOT NULL,
      skills TEXT NOT NULL,
      experience TEXT NOT NULL,
      cvUrl TEXT NOT NULL,
      imageUrl TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS contact_submissions (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      submittedAt TEXT NOT NULL
    );
  `);

  // Add projectUrl column if it doesn't exist (for existing databases)
  try {
    db.exec('ALTER TABLE portfolio_items ADD COLUMN projectUrl TEXT');
  } catch (e: any) {
    if (!e.message.includes('duplicate column name')) {
        console.error("Failed to alter table:", e);
    }
  }
};

const seedData = () => {
    // Seed portfolio items
    const countPortfolio = db.prepare('SELECT COUNT(*) as count FROM portfolio_items').get() as { count: number };
    if (countPortfolio.count === 0) {
        const insert = db.prepare('INSERT INTO portfolio_items (id, title, description, mediaUrl, mediaType, tags, projectUrl) VALUES (?, ?, ?, ?, ?, ?, ?)');
        const transaction = db.transaction((items) => {
            for (const item of items) insert.run(item.id, item.title, item.description, item.mediaUrl, item.mediaType, JSON.stringify(item.tags), item.projectUrl);
        });
        transaction(mockPortfolioItems);
        console.log('Database seeded with mock portfolio items.');
    }

    // Seed resume data
    const countResume = db.prepare('SELECT COUNT(*) as count FROM resume').get() as { count: number };
    if (countResume.count === 0) {
        const { cardTitle, cardSubtitle, summary, skills, experience, cvUrl, imageUrl } = mockResumeData;
        const insert = db.prepare('INSERT INTO resume (id, cardTitle, cardSubtitle, summary, skills, experience, cvUrl, imageUrl) VALUES (1, ?, ?, ?, ?, ?, ?, ?)');
        insert.run(cardTitle, cardSubtitle, summary, JSON.stringify(skills), experience, cvUrl, imageUrl);
        console.log('Database seeded with mock resume data.');
    }
}

createTables();
seedData();

export default db;
