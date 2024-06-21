"use client";
import { useState } from "react";
import { firestore, storage } from "../../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { useUser } from "@clerk/clerk-react";

export default function Uploads() {
  const { user } = useUser();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      console.error("No file selected.");
      toast.error("No file selected.");
      return;
    }

    try {
      setUploading(true);

      const fileRef = ref(storage, `uploads/${file.name}`);
      await uploadBytes(fileRef, file);
      const fileURL = await getDownloadURL(fileRef);

      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date());

      const uploadData = {
        name: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
        filename: file.name,
        fileURL,
        modifiedDate: formattedDate,
      };

      console.log("Upload Data:", uploadData);

      const uploadsDocRef = doc(
        firestore,
        "uploads",
        user.primaryEmailAddress.emailAddress
      );

      const docSnap = await getDoc(uploadsDocRef);

      if (docSnap.exists()) {
        await updateDoc(uploadsDocRef, {
          files: arrayUnion(uploadData),
        });
      } else {
        await setDoc(uploadsDocRef, {
          files: [uploadData],
        });
      }

      setFile(null);
      document.getElementById("file_upload").value = "";

      toast.success("Document uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-start height pt-10">
        <form
          className="max-w-md w-full px-8 py-6 bg-white rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="mb-8">
            <label
              htmlFor="file_upload"
              className="block mb-2 text-sm font-medium text-green-600"
            >
              Upload file
            </label>
            <input
              className="input-field"
              aria-describedby="file_upload"
              id="file_upload"
              type="file"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit" className="btn">
            {uploading ? (
              <div className="flex justify-center items-center">
                Uploading document ....
              </div>
            ) : (
              "Upload Document"
            )}
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
