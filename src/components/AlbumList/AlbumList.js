import React, { useEffect, useState } from "react";
import styles from "./albumlist.module.css";

import Album from "../Album/Album";
import AlbumForm from "../AlbumForm/AlbumForm";
import ImageList from "../ImageList/ImageList";

import { db } from "../../firebaseInit";
import { collection, onSnapshot } from "firebase/firestore";

export default function AlbumList() {
  // variables to store data
  // to store name of all the album
  const [albumlist, setAlbumList] = useState([]);

  // whether show albumForm or not (by default false)
  const [showAlbumForm, setShowAlbumForm] = useState(false);

  // to open any album with some AlbumId (by default false)
  const [openAlbum, setOpenAlbum] = useState({ albumId: "", open: false });

  // get data from Database when the app gets render
  useEffect(() => {
    // getting realtime updates from database
    const unsub = onSnapshot(collection(db, "album"), (snapShot) => {
      const card = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log(card);
      // storing all the albums within local state variable
      setAlbumList(card);
    });
  }, []);

  return (
    <>
      <div className={styles.mainContainer}>
        {!openAlbum.open ? (
          <>
            <div className={styles.albumForm}>
              {showAlbumForm && <AlbumForm />}
            </div>
            <div className={styles.header}>
              <span>Your Albums</span>
              {/* button to show or hide album form  */}
              <button
                className={`${styles.btn} ${showAlbumForm ? styles.cancel : ''}`}
                onClick={() => setShowAlbumForm(!showAlbumForm)}
              >
                
                {!showAlbumForm ? "Create Album" : "Cancel"}
              </button>
            </div>
            <div className={styles.albumContainer}>
              {/* looping over all the albums in array and showing them one by one */}
              {albumlist.map((card, i) => (
                <Album key={i} info={card} setOpenAlbum={setOpenAlbum} />
              ))}
            </div>
          </>
        ) : (
          <ImageList openAlbum={openAlbum} setOpenAlbum={setOpenAlbum} />
        )}
      </div>
    </>
  );
}
