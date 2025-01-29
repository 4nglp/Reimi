import Nav from "@components/Nav";
import Image from "next/image";
import Link from "next/link";

async function fetchMangaDetails(currentMangaId) {
  const res = await fetch(`https://api.mangadex.org/manga/${currentMangaId}`);
  const data = await res.json();
  return data.data;
}

async function fetchBannerImageFromAniList(title) {
  const query = `
    query ($title: String) {
      Media (search: $title, type: MANGA) {
        bannerImage
      }
    }
  `;

  const variables = { title };

  const url = "https://graphql.anilist.co";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
  };

  const res = await fetch(url, options);
  const data = await res.json();
  return data.data.Media?.bannerImage || null;
}

async function fetchCoverImageUrl(coverArtId, mangaId) {
  const res = await fetch(`https://api.mangadex.org/cover/${coverArtId}`);
  const data = await res.json();
  const fileName = data.data.attributes.fileName;
  return `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`;
}

async function fetchAuthorName(authorId) {
  const res = await fetch(`https://api.mangadex.org/author/${authorId}`);
  const data = await res.json();
  return data.data.attributes.name;
}

async function fetchChapters(mangaId) {
  const res = await fetch(
    `https://api.mangadex.org/manga/${mangaId}/feed?limit=500&translatedLanguage[]=en&order[chapter]=desc`
  );
  const data = await res.json();
  return data.data;
}

export default async function MangaDetailsPage({ params }) {
  const mangaDetails = await fetchMangaDetails(params.details);
  const mangaTitle = mangaDetails.attributes.title?.en || "No title available";
  const bannerImageUrl = await fetchBannerImageFromAniList(mangaTitle);
  const coverRel = mangaDetails.relationships.find(
    (rel) => rel.type === "cover_art"
  );
  const coverImageUrl = coverRel
    ? await fetchCoverImageUrl(coverRel.id, params.details)
    : null;
  const authorRel = mangaDetails.relationships.find(
    (rel) => rel.type === "author"
  );
  const authorName = authorRel
    ? await fetchAuthorName(authorRel.id)
    : "Unknown Author";
  const chapters = await fetchChapters(params.details);
  const mangaAltTitle =
    mangaDetails.attributes.altTitles?.find((alt) => alt.en)?.en ||
    "No alt title available";
  const mangaDescription =
    mangaDetails.attributes.description?.en || "No description available";

  const genres = mangaDetails.attributes.tags || [];
  const genreNames = genres
    .map((tag) => tag.attributes?.name?.en)
    .filter((name) => name !== undefined)
    .join(", ");

  const year = mangaDetails.attributes.year || "Unknown year";
  const status = mangaDetails.attributes.status
    ? mangaDetails.attributes.status.charAt(0).toUpperCase() +
      mangaDetails.attributes.status.slice(1)
    : "Unknown status";

  return (
    <>
      <Nav />
      <div className="relative w-full h-[380px] bg-cover bg-center">
        {bannerImageUrl && (
          <Image
            src={bannerImageUrl}
            alt="Banner Image"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-between p-6 bg-gradient-to-t from-black to-transparent">
          <div className="w-[150px] h-[225px] sm:w-[200px] sm:h-[300px]">
            {coverImageUrl && (
              <Image
                src={coverImageUrl}
                alt={`Cover for ${mangaTitle}`}
                width={150}
                height={225}
                objectFit="cover"
                className="rounded-md sm:w-[200px] sm:h-[300px]"
              />
            )}
          </div>
          <div className="flex-1 ml-4 text-white">
            <h1 className="text-3xl sm:text-5xl font-bold">{mangaTitle}</h1>
            {mangaAltTitle !== "No alt title available" && (
              <h2 className="text-xl italic text-gray-300">{mangaAltTitle}</h2>
            )}
            <p className="text-sm mt-2">{mangaDescription}</p>
            <h3 className="text-lg font-bold mt-4">
              {authorName} | {status} | {year}
            </h3>
            <p className="text-sm text-gray-300">
              {genreNames || "No genres available"}
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Chapters</h2>
          <div>
            {chapters.length > 0 ? (
              <ul>
                {chapters.map((chapter) => (
                  <li key={chapter.id} className="mb-2">
                    <Link
                      href={`/manga/${params.details}/chapter/${chapter.id}`}
                      className="text-white-600 hover:text-blue-600"
                    >
                      Chapter {chapter.attributes.chapter}{" "}
                      {chapter.attributes.title || ""}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No chapters available for this manga.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
