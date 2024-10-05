import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();
  const [searchPost, setSearchPost] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState("");
  const searchRef = useRef(null);
  const searchItemsRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState("");
  const fetchPosts = async (searchQuery) => {
    try {
      const res = await axios.get(
        `https://blog-backend-zeta.vercel.app/api/posts/search/${searchQuery}`
      );
      setSearchPost(res.data);
      setError("");
    } catch (error) {
      setError("Failed to fetch posts. Please try again later.");
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  useEffect(() => {
    if (debouncedSearchInput) {
      fetchPosts(debouncedSearchInput);
    }
  }, [debouncedSearchInput]);

  return (
    <div>
      <div
        className="home__content__search"
        style={{
          borderBottomLeftRadius: isFocused ? "0px" : "1em",
          borderBottomRightRadius: isFocused ? "0px" : "1em",
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          if (
            !searchRef.current.contains(e.relatedTarget) &&
            !searchItemsRef.current.contains(e.relatedTarget)
          ) {
            setIsFocused(false);
          }
        }}
      >
        <input
          className="home__content__search__input"
          placeholder="Search blogs..."
          type="text"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          value={searchInput}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            if (
              !searchRef.current.contains(e.relatedTarget) &&
              !searchItemsRef.current.contains(e.relatedTarget)
            ) {
              setIsFocused(false);
            }
          }}
        />
        <Link to={`/?user=${searchInput}`} className="link">
          <i
            className={`topSearchIcon fa-solid fa-magnifying-glass ${
              searchInput.length > 0 ? "active" : ""
            } ${searchInput.length > 0 ? "shake" : ""}`}
          ></i>
        </Link>
      </div>
      {isFocused && (
        <div className="home__content__searchItems" ref={searchItemsRef}>
          {searchInput.length !== 0 && searchPost.length !== 0 ? (
            <>
              {searchPost.map((post) => (
                <li
                  onClick={() => {
                    navigate(`post/${post._id}`);
                  }}
                  key={post._id}
                >
                  {post.title}
                </li>
              ))}
              <div>Top Search results: {searchPost.length}</div>
            </>
          ) : searchInput.length !== 0 ? (
            <div>No blog post found</div>
          ) : (
            <div>
              <div>Find your favourite blog post</div>
            </div>
          )}
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
