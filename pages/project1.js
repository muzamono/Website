import Link from 'next/link';

export default function Project1() {
  return (
    <div style={{ 
      background: 'linear-gradient(225deg, #0e141b 0%, #0e141b 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      {/* Navigation */}
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
            CSV Data Pipeline
          </h2>
          <p className="text-lg leading-relaxed" style={{ opacity: 0.9 }}>
            This project demonstrates a simple data pipeline that reads data from a CSV file, processes it, and loads it into a new, cleaned csv file. The pipeline is built using Python and utilizes libraries such as Pandas for data manipulation.
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
            {['Python', 'Pandas', 'File I/O', 'Basic ETL'].map((tech) => (
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
            <li style={{ opacity: 0.9 }}>• Reads data from a CSV file</li>
            <li style={{ opacity: 0.9 }}>• Processes and cleans the data</li>
            <li style={{ opacity: 0.9 }}>• Loads the processed data into a CSV file</li>
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
{`import pandas as pd
import numpy as np

def clean_csv_data(input_file, output_file):
    """
    Read CSV file, clean the data, and save to new CSV
    """
    # Read the CSV file
    df = pd.read_csv(input_file)
    
    # Data cleaning operations
    df_cleaned = df.dropna()  # Remove null values
    df_cleaned = df_cleaned.drop_duplicates()  # Remove duplicates
    
    # Save cleaned data
    df_cleaned.to_csv(output_file, index=False)
    
    print(f"Data pipeline completed!")
    print(f"Original rows: {len(df)}")
    print(f"Cleaned rows: {len(df_cleaned)}")

# Usage
clean_csv_data('raw_data.csv', 'cleaned_data.csv')`}
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