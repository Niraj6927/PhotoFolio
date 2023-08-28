import React, { useRef } from "react";
import styles from "./albumform.module.css";

import { db } from "../../firebaseInit";
import { collection, addDoc } from "firebase/firestore";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AlbumForm() {
  // for Album name
  const nameRef = useRef();

  // to clear data from inputbox when user click on clear button
  function clearForm(e) {
    e.preventDefault();
    nameRef.current.value = "";
    nameRef.current.focus();
  }

  // add a new album inside the database
  async function handleSubmit(e) {
    e.preventDefault();

    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "album"), {
      Albumname: nameRef.current.value,
      imageList: [],
    });

    // notification for new album
    toast.success("New Album added!.");

    // clear values inside form after submission and focusing on input box
    nameRef.current.value = "";
    nameRef.current.focus();
  }
  return (
    <>
      {/* for notification */}
      <ToastContainer />
      <div className={styles.formBox}>
        <h1>Create an Album</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Album Name"
            ref={nameRef}
            required
            className={styles.input}
          />

          <button
            className={`${styles.formBtn} ${styles.clearBtn}`}
            onClick={clearForm}
          >
            Clear
          </button>
          <button className={`${styles.formBtn} ${styles.createBtn}`}>
            Create
          </button>
        </form>
      </div>
    </>
  );
}
