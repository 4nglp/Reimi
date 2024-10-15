"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Fetch chapter pages from MangaDex API
const fetchChapterPages = async (chapterId) => {
  try {
    const res = await fetch(
      `https://api.mangadex.org/at-home/server/${chapterId}`
    );
    return res.json();
  } catch (error) {
    console.error("Error fetching chapter pages:", error);
    return null;
  }
};

const ChapterPage = () => {
  const { id: chapterId } = useParams(); // Retrieve chapterId from the dynamic URL
  const [pages, setPages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (chapterId) {
      const loadChapterPages = async () => {
        const chapterData = await fetchChapterPages(chapterId);
        if (chapterData && chapterData.chapter && chapterData.baseUrl) {
          const imageUrls = chapterData.chapter.data.map(
            (page) =>
              `${chapterData.baseUrl}/data/${chapterData.chapter.hash}/${page}`
          );
          setPages(imageUrls);
        } else {
          setErrorMessage("No pages available for this chapter.");
        }
      };
      loadChapterPages();
    }
  }, [chapterId]);

  if (!chapterId) return <h1>Loading...</h1>;

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-2xl font-bold mb-4">Chapter {chapterId}</h1>
      <div className="chapter-images">
        {pages.length > 0 ? (
          pages.map((pageUrl, index) => (
            <img
              key={index}
              src={pageUrl}
              alt={`Page ${index + 1}`}
              className="mb-4"
            />
          ))
        ) : (
          <p>{errorMessage || "Loading pages..."}</p>
        )}
      </div>
    </div>
  );
};

export default ChapterPage;
