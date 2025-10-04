import Link from 'next/link';

export default function Project3() {
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
            ETL Pipeline
          </h2>
          <p className="text-lg leading-relaxed" style={{ opacity: 0.9 }}>
          To demonstrate proficiency of creating and maintaining basic data pipeline. Daily stocks data from Alpha Vintage (www.alphavantage.co) is acquired through API using Python. 
          Data is then stored into SQL database through Pandas. The task is repeated periodically using scheduler package in Python (for production/local scheduling) and cron task in AWS S3 (for live updates).
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
            {['Python', 'SQL', 'API', 'AWS S3'].map((tech) => (
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
            <li style={{ opacity: 0.9 }}>• Get live data using API and transform into Pandas table</li>
            <li style={{ opacity: 0.9 }}>• Load Pandas table into SQL database</li>
            <li style={{ opacity: 0.9 }}>• Run the task periodically using scheduler (local) or cron in virtual machine (live updates)</li>
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
import sqlite3
import requests
from datetime import datetime

API_KEY = "your_api_key_here"

def get_stock_data(symbol):
    print(f"Getting stock data for {symbol}...")
    url = f"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={symbol}&apikey={API_KEY}&outputsize=compact"
    
    response = requests.get(url)
    data = response.json()
    
    if "Time Series (Daily)" not in data:
        print("Couldn't get stock data. Check your API key!")
        return None
    
    stock_records = []
    for date, prices in data["Time Series (Daily)"].items():
        stock_records.append({
            "Date": date,
            "Open": float(prices["1. open"]),
            "High": float(prices["2. high"]),
            "Low": float(prices["3. low"]),
            "Close": float(prices["4. close"]),
            "Volume": int(prices["5. volume"])
        })
    
    df = pd.DataFrame(stock_records)
    df = df.sort_values("Date")
    print(f"Got {len(df)} days of stock data!")
    return df

def save_to_database(df, symbol):
    if df is None:
        return
    
    print(f"Saving {symbol} data to database...")
    with sqlite3.connect("/home/ec2-user/stock_scheduler/my_stocks.db") as conn: # Full path in ec2
        df['Symbol'] = symbol
        df.to_sql("stock_prices", conn, if_exists="append", index=False)
        print("Data saved successfully!")

# Main execution
symbols = ["AAPL", "AMZN", "GOOGL", "META", "NVDA"]
for symbol in symbols:
    stock_data = get_stock_data(symbol)
    save_to_database(stock_data, symbol)

# For live updates: require setup using the system's background scheduler eg cron. For linux/unix, crontab -e to open crontab file editor and run this:
# For exapmle, running every day at 6 pm (1800 hrs): 0 18 * * * cd /home/ec2-user/stock_scheduler && /usr/bin/python3 stock_schedule> `}
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