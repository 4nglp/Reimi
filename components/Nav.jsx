"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/search?q=${searchQuery}`);
    }
  };

  return (
    <nav className="flex items-center justify-between w-full mb-4 pt-3">
      <div className="flex gap-4 items-center">
        <Link href="/" className="flex gap-2 items-center">
          <Image
            src="/"
            alt="App Logo"
            width={30}
            height={30}
            className="object-contain"
          />
          <p>Akemi</p>
        </Link>
        <Link href="/library">Library</Link>
        <Link href="/manga">Browse</Link>
      </div>
      <div className="flex items-center">
        <form onSubmit={handleSearch} className="relative flex items-center">
          <input
            type="text"
            placeholder="Search "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-96 h-12 bg-gray-800 text-white dark:bg-gray-900 dark:text-white pl-4 pr-12 rounded-md focus:outline-none focus:ring-2 focus:ring-white-600"
          />
          <FaSearch className="absolute right-3 text-gray-500" />
        </form>
      </div>
    </nav>
  );
};

export default Nav;