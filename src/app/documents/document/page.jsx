"use client";
import { useState, useEffect } from "react";
import { firestore } from "../../../firebase/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import Navbar from "./navbar";
import Loader from "./loader";
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";

export default function Document() {
  const { user } = useUser();
  const [uploads, setUploads] = useState([]);
  const [filteredUploads, setFilteredUploads] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.primaryEmailAddress) {
        setLoading(false);
        setError("User not authenticated or email not available.");
        return;
      }

      try {
        const docRef = doc(
          firestore,
          "uploads",
          user.primaryEmailAddress.emailAddress
        );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data().files || [];
          setUploads(data);
          setFilteredUploads(data);
        } else {
          console.error("No such document!");
          setUploads([]);
          setFilteredUploads([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const filtered = uploads.filter((upload) =>
      Object.values(upload).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredUploads(filtered);
  };

  const handleDelete = async (filename) => {
    try {
      const docRef = doc(
        firestore,
        "uploads",
        user.primaryEmailAddress.emailAddress
      );
      const updatedFiles = uploads.filter(
        (upload) => upload.filename !== filename
      );
      await updateDoc(docRef, {
        files: updatedFiles,
      });
      setUploads(updatedFiles);
      setFilteredUploads(updatedFiles);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const stripExtension = (filename) => {
    if (!filename) return "";
    return filename.split(".").slice(0, -1).join(".");
  };

  const getFileIcon = (filename) => {
    if (!filename) return "/document.svg";
    const extension = filename.split(".").pop().toLowerCase();
    switch (extension) {
      case "pdf":
        return "/pdf.png";
      case "jpg":
      case "jpeg":
      case "png":
        return "/jpg.png";
      case "xls":
      case "xlsx":
        return "/xls.png";
      case "txt":
        return "/txt.png";
      case "doc":
      case "docx":
        return "/google-docs.png";
      default:
        return "/document.svg";
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Navbar onSearchChange={handleSearchChange} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-2 p-5">
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-500">Error fetching data: {error}</p>
        ) : filteredUploads.length === 0 ? (
          <p>No documents found.</p>
        ) : (
          <div className="overflow-hidden rounded-lg">
            <table className="w-full text-sm text-left text-green-600 bg-white">
              <thead className="text-xs text-black uppercase bg-slate-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Filename
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Owner
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Modified
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Preview
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUploads.map((upload, index) => (
                  <tr
                    key={index}
                    className="bg-slate-100 border-b border-gray-200"
                  >
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                      <span className="flex">
                        <Image
                          src={getFileIcon(upload.filename)}
                          alt="Document Icon"
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        {stripExtension(upload.filename)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-black font-medium">
                      {upload.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-black font-medium">
                      {upload.modifiedDate || "Unknown"}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={upload.fileURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-18 h-12 rounded-md bg-gray-200 hover:bg-gray-300 text-green-600 hover:text-green-700"
                      >
                        <Image
                          src="/document.svg"
                          alt="Document Icon"
                          width={24}
                          height={24}
                        />
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-green-600 hover:underline"
                        onClick={() => handleDelete(upload.filename)}
                      >
                        <Image
                          src="/delete.png"
                          alt="Delete"
                          width={24}
                          height={24}
                        />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
