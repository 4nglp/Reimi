"use client";
import { useState, useEffect } from "react";

const AniListData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = `
        query ($id: Int) {
          Media(id: $id, type: ANIME) {
            id
            title {
              romaji
              english
              native
            }
            coverImage {
              large
              medium
            }
            bannerImage
          }
        }
      `;

      const variables = {
        id: 15125, // Replace with a valid anime ID
      };

      const url = "https://graphql.anilist.co";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: query,
          variables: variables,
        }),
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.errors
              ? result.errors[0].message
              : "An unknown error occurred"
          );
        }

        setData(result.data.Media);
      } catch (error) {
        setError("Error: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{data.title.romaji}</h1>
      <p>
        <strong>English Title:</strong> {data.title.english}
      </p>
      <p>
        <strong>Native Title:</strong> {data.title.native}
      </p>

      {/* Display the poster image (cover) */}
      {data.coverImage && (
        <div>
          <h3>Poster (Cover Image):</h3>
          <img
            src={data.coverImage.large}
            alt="Poster"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}

      {/* Display the banner image */}
      {data.bannerImage && (
        <div>
          <h3>Banner Image:</h3>
          <img
            src={data.bannerImage}
            alt="Banner"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};

export default AniListData;
