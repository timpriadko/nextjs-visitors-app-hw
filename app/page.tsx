import Link from "next/link";

export default function Page() {
  return (
    <div className='w-full mt-[39vh] flex justify-center items-center'>
      <Link href={`/board`}>
        <h2 className='font-bold text-3xl text-black-500 group-hover:text-gray-50'>
          Go to board
        </h2>
      </Link>
    </div>
  );
}
