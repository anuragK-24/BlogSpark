import React from "react";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Posts from "../../components/posts/Posts";
import "./home.scss";
import axios from "axios";
import { Link} from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import SearchBar from "../../components/SearchBar/SearchBar";


export default function Home() {
  const { user } = useContext(Context);
  
 
  return (
    <>

      <div className="home">
        <div className="home__content">
          {user ? (
            <h2 className="greeting">
              Welcome{" "}
              <b>
                {" "}
                <i>{user.username.toUpperCase()}</i>{" "}
              </b>{" "}
            </h2>
          ) : (
            ""
          )}
          <SearchBar/>
          <div className="home__content__posts">
            <Posts />
          </div>
        </div>
      </div>
    </>
  );
}
