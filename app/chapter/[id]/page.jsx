"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const MangaReader = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [readingMode, setReadingMode] = useState("right-to-left");
  const { id: chapterId } = useParams();

  useEffect(() => {
    if (!chapterId) return;
    const fetchPages = async () => {
      try {
        const response = await fetch(
          `https://api.mangadex.org/at-home/server/${chapterId}`
        );
        const data = await response.json();
        if (data.chapter && data.chapter.data) {
          const pageUrls = data.chapter.data.map(
            (file) => `${data.baseUrl}/data/${data.chapter.hash}/${file}`
          );
          setPages(pageUrls);
        }
      } catch (error) {
        console.error("Failed to load pages", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPages();
  }, [chapterId]);

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (e) => {
    const clickX = e.clientX;
    const windowWidth = window.innerWidth;

    if (clickX <= windowWidth * 0.5) {
      handlePreviousPage();
    } else {
      handleNextPage();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="manga-reader-container relative h-screen w-screen overflow-hidden"
      onClick={handlePageClick}
    >
      <img
        src={pages[currentPage]}
        alt={`Page ${currentPage + 1}`}
        className="object-contain h-full w-full transition-transform duration-500 ease-in-out"
      />

      {/* Invisible 50/50 split for navigation */}
      <div className="absolute top-0 left-0 h-full" style={{ width: "50%" }} />
      <div className="absolute top-0 right-0 h-full" style={{ width: "50%" }} />
    </div>
  );
};

export default MangaReader;
