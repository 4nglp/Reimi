"use client";
import Nav from "@components/Nav";
import { useEffect, useState } from "react";
import Link from "next/link";

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

  // Filter library based on selected category
  const filteredLibrary = library.filter(
    (manga) => manga.category === selectedCategory
  );

  return (
    <div>
      <Nav />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">My Library</h1>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 p-2 mb-4"
        >
          <option value="Reading">Reading</option>
          <option value="On Hold">On Hold</option>
          <option value="Planning">Planning</option>
          <option value="Completed">Completed</option>
          <option value="Dropped">Dropped</option>
        </select>
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
                    <img
                      src={manga.coverImageUrl}
                      alt={manga.title}
                      className="object-cover w-full h-full"
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
    </div>
  );
};

export default LibraryPage;
