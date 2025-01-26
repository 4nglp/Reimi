"use client";

import Nav from "@components/Nav";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "@node_modules/next/image";

const RenderSearchParams = () => {
  const searchParams = useSearchParams();
  return searchParams.get("tab") || "Reading";
};

const LibraryPage = () => {
  const [library, setLibrary] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedMangaId, setSelectedMangaId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Reading");

  useEffect(() => {
    const storedLibrary = JSON.parse(localStorage.getItem("library")) || [];
    setLibrary(storedLibrary);
  }, []);

  const removeFromLibrary = (id) => {
    const updatedLibrary = library.filter((manga) => manga.id !== id);
    setLibrary(updatedLibrary);
    localStorage.setItem("library", JSON.stringify(updatedLibrary));
  };

  const handleRightClick = (event, id) => {
    event.preventDefault();
    const { clientX, clientY } = event;
    setMenuPosition({ x: clientX, y: clientY });
    setSelectedMangaId(id);
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setSelectedMangaId(null);
  };

  useEffect(() => {
    const removeMenu = () => {
      if (menuVisible) closeMenu();
    };
    document.addEventListener("click", removeMenu);
    return () => {
      document.removeEventListener("click", removeMenu);
    };
  }, [menuVisible]);

  // Update selected category when params change
  useEffect(() => {
    const storedCategory =
      localStorage.getItem("selectedCategory") || "Reading";
    setSelectedCategory(storedCategory);
  }, []);

  // Filter library based on selected category
  const filteredLibrary = library.filter(
    (manga) => manga.category === selectedCategory
  );

  return (
    <>
      <Nav />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Library</h1>
        <div className="mb-4 flex gap-4">
          <Link href="/library?tab=Reading">Reading</Link>
          <Link href="/library?tab=On Hold" className="ml-4">
            On Hold
          </Link>
          <Link href="/library?tab=Planning" className="ml-4">
            Planning
          </Link>
          <Link href="/library?tab=Completed" className="ml-4">
            Completed
          </Link>
          <Link href="/library?tab=Dropped" className="ml-4">
            Dropped
          </Link>
        </div>

        <Suspense fallback={<p>Loading...</p>}>
          <RenderSearchParams />
        </Suspense>

        {filteredLibrary.length === 0 ? (
          <h2>Your library is empty for this category.</h2>
        ) : (
          <div className="grid grid-cols-5 gap-4">
            {filteredLibrary.map((manga) => (
              <div
                key={manga.id}
                className="relative flex flex-col"
                onContextMenu={(e) => handleRightClick(e, manga.id)}
              >
                <Link href={`/manga/${manga.id}`}>
                  <div className="relative w-48 h-72 bg-gray-200 overflow-hidden">
                    <Image
                      src={manga.coverImageUrl}
                      alt={manga.title}
                      className="object-cover w-full h-full"
                      width={400}
                      height={800}
                    />
                    <div className="absolute bottom-0 w-full bg-black bg-opacity-60 text-white text-center py-2">
                      {manga.title}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Context Menu */}
        {menuVisible && (
          <div
            className="fixed bg-gray-800 text-white border border-gray-600 p-2 rounded shadow-lg"
            style={{
              top: `${menuPosition.y}px`,
              left: `${menuPosition.x}px`,
              zIndex: 1000,
            }}
          >
            <ul>
              <li
                onClick={() => {
                  removeFromLibrary(selectedMangaId);
                  closeMenu();
                }}
                className="cursor-pointer hover:bg-gray-700 p-2"
              >
                Remove from Library
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default LibraryPage;
