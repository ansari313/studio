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
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS resume (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      sectionTitle TEXT NOT NULL,
      sectionDescription TEXT NOT NULL,
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
};

const seedData = () => {
    // Seed portfolio items
    const countPortfolio = db.prepare('SELECT COUNT(*) as count FROM portfolio_items').get() as { count: number };
    if (countPortfolio.count === 0) {
        const insert = db.prepare('INSERT INTO portfolio_items (id, title, description, mediaUrl, mediaType, tags) VALUES (?, ?, ?, ?, ?, ?)');
        const transaction = db.transaction((items) => {
            for (const item of items) insert.run(item.id, item.title, item.description, item.mediaUrl, item.mediaType, JSON.stringify(item.tags));
        });
        transaction(mockPortfolioItems);
        console.log('Database seeded with mock portfolio items.');
    }

    // Seed resume data
    const countResume = db.prepare('SELECT COUNT(*) as count FROM resume').get() as { count: number };
    if (countResume.count === 0) {
        const { sectionTitle, sectionDescription, cardTitle, cardSubtitle, summary, skills, experience, cvUrl, imageUrl } = mockResumeData;
        const insert = db.prepare('INSERT INTO resume (id, sectionTitle, sectionDescription, cardTitle, cardSubtitle, summary, skills, experience, cvUrl, imageUrl) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        insert.run(sectionTitle, sectionDescription, cardTitle, cardSubtitle, summary, JSON.stringify(skills), experience, cvUrl, imageUrl);
        console.log('Database seeded with mock resume data.');
    }
}

createTables();
seedData();

export default db;
