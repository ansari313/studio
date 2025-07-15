import Database from 'better-sqlite3';
import type { ExperienceItem } from './types';

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
      cvUrl TEXT NOT NULL,
      imageUrl TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS resume_experience (
      id TEXT PRIMARY KEY,
      logoUrl TEXT NOT NULL,
      companyName TEXT NOT NULL,
      position TEXT NOT NULL,
      startDate TEXT NOT NULL,
      endDate TEXT NOT NULL,
      description TEXT NOT NULL,
      sortOrder INTEGER NOT NULL
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

  // Drop old experience column from resume table if it exists
  try {
    const tableInfo = db.pragma('table_info(resume)');
    if (tableInfo.some(col => col.name === 'experience')) {
      console.log('Dropping old experience column from resume table.');
      db.exec('CREATE TABLE resume_backup (id INTEGER PRIMARY KEY CHECK (id = 1), cardTitle TEXT NOT NULL, cardSubtitle TEXT NOT NULL, summary TEXT NOT NULL, skills TEXT NOT NULL, cvUrl TEXT NOT NULL, imageUrl TEXT NOT NULL);');
      db.exec('INSERT INTO resume_backup SELECT id, cardTitle, cardSubtitle, summary, skills, cvUrl, imageUrl FROM resume;');
      db.exec('DROP TABLE resume;');
      db.exec('ALTER TABLE resume_backup RENAME TO resume;');
    }
  } catch(e) {
    console.error("Failed to migrate resume table:", e);
  }
};

const MOCK_EXPERIENCE: Omit<ExperienceItem, 'id'>[] = [
  {
    logoUrl: 'https://placehold.co/50x50.png',
    companyName: 'Coding Pixel',
    position: 'SQA Engineer',
    startDate: '08/2023',
    endDate: '06/2025',
    description: 'Led end-to-end manual testing efforts for Products/Applications, ensuring high quality releases through comprehensive test planning, execution, and defect tracking. Designed and executed detailed test cases, test scenarios based on functional requirements, user stories, and design specifications. Performed functional, regression, integration, UI/UX, and compatibility testing across multiple platforms (Web, Mobile).Conducted regression, functional, and cross-platform testing, increasing test coverage. Managed defect lifecycle in JIRA and Asana, ensuring 95% on-time resolution. Conducted requirement analysis to identify gaps, ambiguities, and potential risks early in the SDLC. Collaborated with Devs, PMs, and BAs, refining acceptance criteria. Created and maintained QA reports.',
  },
  {
    logoUrl: 'https://placehold.co/50x50.png',
    companyName: 'wefixit',
    position: 'QA Engineer',
    startDate: '11/2022',
    endDate: '04/2023',
    description: 'As a QA Engineer at wefixit, I designed test strategies and created detailed test cases based on requirement documents. I conducted manual testing for Android and iOS applications, which included UI testing, functional testing, and smoke and sanity testing. I was responsible for identifying, reporting, and tracking defects, ensuring thorough documentation throughout the bug life cycle. Additionally, I collaborated in the development cycle by verifying bug fixes and maintaining product quality.',
  },
];

const seedData = () => {
    // Seed portfolio items
    const countPortfolio = db.prepare('SELECT COUNT(*) as count FROM portfolio_items').get() as { count: number };
    if (countPortfolio.count === 0) {
        const insert = db.prepare('INSERT INTO portfolio_items (id, title, description, mediaUrl, mediaType, tags, projectUrl) VALUES (?, ?, ?, ?, ?, ?, ?)');
        const mockPortfolioItems = [
          { id: '1', title: 'Project Alpha', description: 'A cutting-edge web application built with Next.js and Tailwind CSS, focusing on a seamless user experience and high performance.', mediaUrl: 'https://placehold.co/600x400.png', mediaType: 'image', tags: ['Web App', 'Next.js', 'React'], projectUrl: ''},
          { id: '2', title: 'Mobile App Concept Video', description: 'A video walkthrough of a mobile application concept aimed at improving daily productivity. Designed in Figma and animated in After Effects.', mediaUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', mediaType: 'video', tags: ['UI/UX', 'Mobile App', 'Video'], projectUrl: '' },
        ];
        const transaction = db.transaction((items) => {
            for (const item of items) insert.run(item.id, item.title, item.description, item.mediaUrl, item.mediaType, JSON.stringify(item.tags), item.projectUrl);
        });
        transaction(mockPortfolioItems);
        console.log('Database seeded with mock portfolio items.');
    }

    // Seed resume data
    const countResume = db.prepare('SELECT COUNT(*) as count FROM resume').get() as { count: number };
    if (countResume.count === 0) {
        const insert = db.prepare('INSERT INTO resume (id, cardTitle, cardSubtitle, summary, skills, cvUrl, imageUrl) VALUES (1, ?, ?, ?, ?, ?, ?)');
        insert.run('Curriculum Vitae', 'Software Engineer & Web Developer', 'Dynamic and innovative software engineer with a knack for creating robust web applications from the ground up. Proficient in modern frameworks and passionate about clean code and user-centric design.', JSON.stringify(['Next.js & React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'GenAI Integration', 'Cloud Deployment']), '/cv.pdf', 'https://placehold.co/100x100.png');
        console.log('Database seeded with mock resume data.');
    }

    // Seed experience data
    const countExperience = db.prepare('SELECT COUNT(*) as count FROM resume_experience').get() as { count: number };
    if(countExperience.count === 0) {
        const insert = db.prepare('INSERT INTO resume_experience (id, logoUrl, companyName, position, startDate, endDate, description, sortOrder) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        const transaction = db.transaction((items) => {
          for (const [index, item] of items.entries()) {
            insert.run(Date.now().toString() + index, item.logoUrl, item.companyName, item.position, item.startDate, item.endDate, item.description, index);
          }
        });
        transaction(MOCK_EXPERIENCE);
        console.log('Database seeded with mock experience data.');
    }
}

createTables();
seedData();

export default db;
