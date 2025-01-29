"use client";
import { useState } from "react";
import Link from "next/link";
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
    <nav className="flex items-center justify-between w-full py-3 mb-4">
      <div className="flex gap-4 items-center px-3">
        <Link href="/" className="flex gap-2 items-center">
          <p>Reimi</p>
        </Link>
        <Link href="/library">Library</Link>
        <Link href="/manga">Browse</Link>
      </div>
      <div className="flex items-center w-3/5">
        <form
          onSubmit={handleSearch}
          className="relative flex items-center w-full"
        >
          <input
            type="text"
            placeholder="Search "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 bg-gray-800 text-white dark:bg-gray-900 dark:text-white pl-4 pr-12 rounded-md focus:outline-none focus:ring-2 focus:ring-white-600"
          />
          <FaSearch className="absolute right-3 text-gray-500" />
        </form>
      </div>
    </nav>
  );
};

export default Nav;
