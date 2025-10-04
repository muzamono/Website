import Link from 'next/link';

export default function Project2() {
  return (
    <div style={{ 
      background: 'linear-gradient(225deg, #0e141b 0%, #0e141b 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <header style={{
        background: 'linear-gradient(90deg, #0e141b 0%, #0d1824 100%)',
        backdropFilter: 'blur(10px)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold" style={{ color: '#667eea' }}>
            muzamono
          </Link>
          <ul className="flex space-x-8">
            <li><Link href="/#about" className="text-white hover:text-blue-400 transition-colors">About</Link></li>
            <li><Link href="/projects" className="text-white hover:text-blue-400 transition-colors">Projects</Link></li>
            <li><Link href="/blog" className="text-white hover:text-blue-400 transition-colors">Blog</Link></li>
            <li><Link href="/#photos" className="text-white hover:text-blue-400 transition-colors">Photos</Link></li>
            <li><Link href="/#contact" className="text-white hover:text-blue-400 transition-colors">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4" style={{ marginTop: '80px' }}>
        <section style={{
          background: 'rgba(255, 255, 255, 0.1)',
          margin: '2rem 0',
          padding: '3rem 2rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 className="text-3xl font-bold mb-8" style={{ 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' 
          }}>
            Simple Database Loader
          </h2>
          <p className="text-lg leading-relaxed" style={{ opacity: 0.9 }}>
            Continuation of Project 1. Simple loader where csv files are loaded into a relational database (sqlite). This project demonstrates ETL processes and database operations.
          </p>
        </section>

        <section style={{
          background: 'rgba(255, 255, 255, 0.1)',
          margin: '2rem 0',
          padding: '3rem 2rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 className="text-3xl font-bold mb-8" style={{ 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' 
          }}>
            Technologies Used
          </h2>
          <div className="flex flex-wrap gap-3">
            {['Python', 'Pandas', 'SQL', 'ETL'].map((tech) => (
              <span 
                key={tech}
                className="px-4 py-2 rounded-full text-lg font-medium"
                style={{ background: '#667eea', color: 'white' }}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section style={{
          background: 'rgba(255, 255, 255, 0.1)',
          margin: '2rem 0',
          padding: '3rem 2rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 className="text-3xl font-bold mb-8" style={{ 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' 
          }}>
            Features
          </h2>
          <ul className="space-y-3 text-lg">
            <li style={{ opacity: 0.9 }}>• Setup the table in the SQL database</li>
            <li style={{ opacity: 0.9 }}>• Loads data from CSV file into SQL table through Pandas</li>
            <li style={{ opacity: 0.9 }}>• Queries the data from the SQL table</li>
          </ul>
        </section>

        <section style={{
          background: 'rgba(255, 255, 255, 0.1)',
          margin: '2rem 0',
          padding: '3rem 2rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 className="text-3xl font-bold mb-8" style={{ 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' 
          }}>
            Code Snippet
          </h2>
          <div 
            className="rounded-lg p-6 overflow-x-auto"
            style={{ background: '#030a2e' }}
          >
            <pre>
              <code className="text-green-400">
{`# ============================================
# SCRIPT 1: setup_database.py (RUN ONCE ONLY)
# ============================================

import sqlite3
import pandas as pd
from sqlite3 import Error

def create_connection(db_file):
    connection = None
    try:
        connection = sqlite3.connect(db_file)
        print("Connection to SQLite DB successful")
    except Error as e:
        print(f"The error '{e}' occurred")
    return connection

def execute_query(connection, query):    
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        connection.commit()
        print("Query executed successfully")
    except Error as e:
        print(f"The error '{e}' occurred")

# ONE-TIME SETUP
connection = create_connection("C:\\your_path...\\my_db.sqlite")

# Create table
create_table = """
CREATE TABLE IF NOT EXISTS cars (
                    id INTEGER PRIMARY KEY,
                    year INTEGER NOT NULL,
                    make TEXT NOT NULL,
                    model TEXT NOT NULL,
                    trim TEXT NOT NULL,
                    body TEXT NOT NULL,
                    transmission TEXT NOT NULL,
                    vin TEXT NOT NULL,
                    state TEXT NOT NULL,
                    condition INTEGER NOT NULL,
                    odometer INTEGER NOT NULL,
                    color TEXT NOT NULL,
                    interior TEXT NOT NULL,
                    seller TEXT NOT NULL,
                    mmr INTEGER NOT NULL,
                    sellingprice INTEGER NOT NULL,
                    saledate DATE NOT NULL                    
                );"""

execute_query(connection, create_table)

# Load CSV data into SQLite
csv_file_path = "C:\\your_path...\\output.csv"
df = pd.read_csv(csv_file_path)
df.to_sql('cars', connection, if_exists='append', index=False)
print(f"Loaded {len(df)} records")

connection.close()
print("Database setup complete!")`}
              </code>
            </pre>
          </div>
        </section>

        <section className="text-center py-8">
          <Link 
            href="/projects" 
            className="inline-block px-6 py-3 rounded font-medium transition-all hover:transform hover:-translate-y-1"
            style={{ 
              background: '#4759a9',
              color: 'white'
            }}
          >
            ← Back to Projects
          </Link>
        </section>
      </main>
    </div>
  );
}