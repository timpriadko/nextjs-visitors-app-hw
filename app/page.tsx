import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <Link href={`/board`}>
        <h2 className="font-medium text-gray-200 group-hover:text-gray-50">
          Go to board
        </h2>
      </Link>
    </div>
  );
}
