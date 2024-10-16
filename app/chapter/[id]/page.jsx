"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

// Function to fetch chapter pages
const fetchChapterPages = async (chapterId) => {
  try {
    const res = await fetch(
      `https://api.mangadex.org/at-home/server/${chapterId}`
    );
    const data = await res.json();
    return data.chapter.data.map(
      (page) => `${data.baseUrl}/data/${data.chapter.hash}/${page}`
    );
  } catch (error) {
    console.error("Failed to fetch chapter pages:", error);
    return [];
  }
};

// Function to fetch chapter metadata (number, title)
const fetchChapterMetadata = async (chapterId) => {
  try {
    const res = await fetch(`https://api.mangadex.org/chapter/${chapterId}`);
    const data = await res.json();
    return data.data; // Correctly access the metadata
  } catch (error) {
    console.error("Failed to fetch chapter metadata:", error);
    return null;
  }
};

const ChapterPage = () => {
  const { id: chapterId } = useParams();
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [readingMode, setReadingMode] = useState("ltr");
  const [chapterData, setChapterData] = useState(null); // For chapter number and title

  useEffect(() => {
    const loadPages = async () => {
      const chapterPages = await fetchChapterPages(chapterId);
      setPages(chapterPages);

      // Fetch chapter metadata (number, title, etc.)
      const metadata = await fetchChapterMetadata(chapterId);
      console.log("Chapter Metadata:", metadata); // Log to check if data exists
      setChapterData(metadata);
    };
    loadPages();
  }, [chapterId]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!pages || pages.length === 0) return;

      if (readingMode === "ltr") {
        if (e.key === "ArrowRight" || e.key === " ") {
          if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
        } else if (e.key === "ArrowLeft") {
          if (currentPage > 0) setCurrentPage(currentPage - 1);
        }
      } else if (readingMode === "rtl") {
        if (e.key === "ArrowLeft" || e.key === " ") {
          if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
        } else if (e.key === "ArrowRight") {
          if (currentPage > 0) setCurrentPage(currentPage - 1);
        }
      } else if (readingMode === "ttb") {
        if (e.key === "ArrowRight" || e.key === " ") {
          if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
        } else if (e.key === "ArrowLeft") {
          if (currentPage > 0) setCurrentPage(currentPage - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPage, pages, readingMode]);

  if (!pages || pages.length === 0) {
    return <div>Loading pages...</div>;
  }

  return (
    <div className="relative">
      {/* Reading Mode Selector */}
      <div className="flex justify-between items-center mb-4">
        <h1>Reading mode</h1>
        <select
          value={readingMode}
          onChange={(e) => setReadingMode(e.target.value)}
          className="p-2 border"
        >
          <option value="ltr">Left to Right</option>
          <option value="rtl">Right to Left</option>
          <option value="ttb">Top to Bottom</option>
        </select>
      </div>

      {/* Chapter Info */}
      <div className="mb-4 text-center">
        {chapterData ? (
          <>
            <div className="text-2xl font-bold">
              Chapter {chapterData.attributes.chapter}
            </div>
            <div className="text-lg mt-2">
              {chapterData.attributes.title || "Untitled"}
            </div>
          </>
        ) : (
          <p>Loading chapter info...</p>
        )}
      </div>

      {/* Page and Navigation */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-left">Part One</div>
        <div className="text-center">
          {pages.length > 0 && `${currentPage + 1} / ${pages.length}`}
        </div>
        <div className="text-right">
          <button className="p-2 bg-blue-500 text-white">Menu</button>
        </div>
      </div>

      {/* Display Current Page */}
      <div>
        {pages.length > 0 && (
          <div className={`page-container ${readingMode}`}>
            <Image
              src={pages[currentPage]}
              alt={`Page ${currentPage + 1}`}
              width={600}
              height={800}
              layout="intrinsic"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterPage;
