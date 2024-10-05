import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { marked } from "marked";
import "./singlePost.css";
import { Button } from "@mui/material";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(
        "https://blog-backend-zeta.vercel.app/api/posts/" + path
      );
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setPhoto(res.data.photo);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      alert("Are you sure you want to delete this post?");
      await axios.delete(
        `https://blog-backend-zeta.vercel.app/api/posts/${post._id}`,
        {
          data: { username: user.username },
        }
      );
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://blog-backend-zeta.vercel.app/api/posts/${post._id}`,
        {
          username: user.username,
          title,
          desc,
          photo,
        }
      );
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {updateMode ? (
          <input
            type="text"
            value={photo}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setPhoto(e.target.value)}
          />
        ) : (
          photo.length !== 0 && (
            <img src={photo} alt="" className="singlePostImg" />
          )
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username ? post.username.toUpperCase() : ""}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            rows="40"
            cols="50"
            value={desc}
            autoFocus
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <div
            className="singlePostDesc"
            dangerouslySetInnerHTML={{ __html: marked(desc) }}
          />
          // <pre className="singlePostDesc">{desc}</pre>
        )}
        {updateMode && (
          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{
              backgroundColor: "purple",
              "&:hover": {
                backgroundColor: "darkpurple", 
              },
            }}
          >
            Update
          </Button>
        )}
      </div>
    </div>
  );
}
