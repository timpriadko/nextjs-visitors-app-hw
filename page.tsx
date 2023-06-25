import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource 111</p>
      <p>
        View <Link href="/blog">all posts</Link>
      </p>
    </div>
  );
}
