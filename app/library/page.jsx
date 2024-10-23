"use client";
import Nav from "@components/Nav";
import { useEffect, useState } from "react";
import Link from "next/link";
const LibraryPage = () => {
  const [library, setLibrary] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedMangaId, setSelectedMangaId] = useState(null);

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

    setMenuPosition({
      x: clientX,
      y: clientY,
    });

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

  return (
    <div>
      {" "}
      <Nav />
      <div className="container mx-auto p-4 pt-20">
        <h1 className="text-2xl font-bold mb-6">My Library</h1>
        {library.length === 0 ? (
          <h2>Your library is empty.</h2>
        ) : (
          <div className="grid grid-cols-5 gap-4">
            {library.map((manga) => (
              <div
                key={manga.id}
                className="mb-4 relative flex flex-col"
                onContextMenu={(e) => handleRightClick(e, manga.id)}
              >
                <Link href={`/manga/${manga.id}`}>
                  <div className="relative h-64 w-48 bg-gray-200 overflow-hidden">
                    <img
                      src={manga.coverImageUrl}
                      alt={manga.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-0 bg-black bg-opacity-60 w-full text-white text-center py-2">
                      {manga.title}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Dark Mode Context Menu */}
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
