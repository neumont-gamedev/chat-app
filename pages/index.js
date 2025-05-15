import { useState, useEffect } from 'react';

export default function Home() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  // Load comments from API
  useEffect(() => {
    const fetchComments = () => {
      fetch('/api/chat')
        .then(res => res.json())
        .then(data => setComments(data));
    };
  
    fetchComments(); // initial load
    const interval = setInterval(fetchComments, 3000); // every 3 seconds
  
    return () => clearInterval(interval); // clean up on unmount
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, text }),
    });
    const newComment = await res.json();
    setComments([newComment, ...comments]);
    setName('');
    setText('');
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🗨️ BSGD Chat</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{ marginRight: '1rem' }}
        />
        <input
          placeholder="Comment"
          value={text}
          onChange={e => setText(e.target.value)}
          required
          style={{ marginRight: '1rem' }}
        />
        <button type="submit">Submit</button>
      </form>
      <hr />
      <h2>Comments:</h2>
      <ul>
        {comments.map((c, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>
            <strong>{c.name}</strong>: {c.text}
          </li>
        ))}
      </ul>
    </main>
  );
}
