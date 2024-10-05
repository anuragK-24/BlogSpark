import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState(
    "https://revenuearchitects.com/wp-content/uploads/2017/02/Blog_pic-450x255.png"
  );
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      photo,
    };
    try {
      const res = await axios.post(
        "https://blog-backend-zeta.vercel.app/api/posts",
        newPost
      );
      window.location.replace("/post/" + res.data._id);
      // above line is used to redirect the URL
    } catch (err) {}
  };

  return (
    <div className="write">
      {photo && photo.length === 0 && (
        <img className="writeImg" src={photo} alt="" />
      )}
      <form action="POST" className="writeForm" onSubmit={handleSubmit}>
        <div className="writeSubmit">
          <Button
            variant="contained"
            type="submit"
            color="success"
            sx={{ width: "auto" }}
          >
            Publish
          </Button>
        </div>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Image URL"
            className="writeInput Url"
            onChange={(e) => setPhoto(e.target.value)}
          />
        </div>

        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="note">
          Note :- Before writing this blog check out the markdown page, it'll help in writing
          blog beautifully.
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
      </form>
    </div>
  );
}
