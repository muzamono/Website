import { getAllPosts } from '../../lib/posts';
import Link from 'next/link';

export default function Blog({ posts }) {
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

      <div className="max-w-6xl mx-auto px-4" style={{ marginTop: '80px' }}>
        <section style={{
          background: 'rgba(255, 255, 255, 0.1)',
          margin: '2rem 0',
          padding: '3rem 2rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 className="text-4xl font-bold mb-8" style={{ 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' 
          }}>
            Blog
          </h1>
          <div className="space-y-6">
            {posts.map((post) => (
              <article 
                key={post.slug}
                className="p-6 rounded-2xl transition-all hover:transform hover:translate-x-2"
                style={{
                  background: '#050e43',
                  borderLeft: '4px solid #764ba2'
                }}
              >
                <div className="text-sm mb-2" style={{ color: '#878787' }}>
                  {post.date}
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-bold mb-3 hover:text-blue-400 cursor-pointer transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="mb-3" style={{ opacity: 0.8 }}>{post.excerpt}</p>
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="font-medium transition-colors hover:text-blue-400"
                  style={{ color: '#764ba2' }}
                >
                  Read More →
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
}