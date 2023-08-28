import React, { useEffect, useRef } from "react";
import styles from "./imageform.module.css";

import { db } from "../../firebaseInit";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ImageForm(props) {
  const { albumId, updateImage, setUpdateImage, setShowImageForm } = props;

  const imageNameRef = useRef();
  const imageUrlRef = useRef();

  useEffect(() => {
    if (updateImage) {
      imageNameRef.current.value = updateImage.name;
      imageUrlRef.current.value = updateImage.link;
    }
  }, [updateImage]);

  function clearForm() {
    imageNameRef.current.value = null;
    imageUrlRef.current.value = null;
    imageNameRef.current.focus();
  }

  // to update any image within the imagelist
  async function handleUpdateSubmit(e) {
    e.preventDefault();

    // old data of image inside the database
    const oldData = {
      name: updateImage.name,
      link: updateImage.link,
    };

    // new updated data entered by the user
    const newData = {
      name: imageNameRef.current.value,
      link: imageUrlRef.current.value,
    };

    // adding new Image
    const albumRef = doc(db, "album", albumId);
    updateDoc(albumRef, {
      imageList: arrayUnion(newData),
    });

    // removing old image
    updateDoc(albumRef, {
      imageList: arrayRemove(oldData),
    });

    toast.success(" Image Updated !");

    // setting update to false
    setUpdateImage(null);

    // hide the ImageForm
    setShowImageForm(false);

    // clear data within the ImageForm
    clearForm();
  }

  // add a new Image in Image list
  async function handleSubmit(e) {
    e.preventDefault();

    // data of the Image
    const data = {
      name: imageNameRef.current.value,
      link: imageUrlRef.current.value,
    };

    // adding new image inside the array of image in database
    const albumRef = doc(db, "album", albumId);
    await updateDoc(albumRef, {
      imageList: arrayUnion(data),
    });

    // success notification
    toast.success("New Image Added to your Album!");

    // clear form's data
    clearForm();
  }

  return (
    <>
      <ToastContainer />

      <div className={styles.formBox}>
        {/* showing heading of the form with condition */}
        <h1>{!updateImage ? "Add an Image" : "Update Image"}</h1>
        <form onSubmit={updateImage ? handleUpdateSubmit : handleSubmit}>
          <input
            type="text"
            className={styles.inputBox}
            placeholder="Title"
            ref={imageNameRef}
            required
          />
          <br />

          <input
            type="text"
            className={styles.inputBox}
            placeholder="Image URL"
            ref={imageUrlRef}
            required
          />
          <br />

          <button className={`${styles.btn} ${styles.add}`}>
            {!updateImage ? "Add" : "Update"}
          </button>
          <button
            className={`${styles.btn} ${styles.clear}`}
            onClick={clearForm}
          >
            Clear
          </button>
        </form>
      </div>
    </>
  );
}
