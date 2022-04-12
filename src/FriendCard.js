import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

function FriendCard({
  name,
  email,
  job,
  image,
  id,
  isDelete,
  isClicked,
  setIsClicked,
  setUserId,
  isProcessed,
  setIsProcessed,
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  async function handleDelete() {
    try {
      const docRef = await deleteDoc(doc(db, "users", id));
      setIsProcessed(!isProcessed);
      console.log("Document deleted: ", docRef.id);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }

  function handleEdit() {
    setUserId(id);
    setIsClicked(!isClicked);
  }

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(!isHovered);
      }}
      onMouseLeave={() => {
        setIsHovered(!isHovered);
      }}
      onClick={() => (isDelete ? handleDelete() : handleEdit())}
      className={
        !isHovered
          ? "w-2/12 h-2/5 border-[#71BBFB] border rounded-lg flex flex-col justify-center items-center hover:cursor-pointer"
          : isDelete
          ? "w-2/12 h-2/5 border-red-400 border rounded-lg flex flex-col justify-center items-center hover:cursor-pointer"
          : "w-2/12 h-2/5 border-yellow-400 border rounded-lg flex flex-col justify-center items-center hover:cursor-pointer"
      }
    >
      {isHovered &&
        (isDelete ? (
          <RiDeleteBin6Line className="h-24 w-24 z-10 absolute text-red-400"></RiDeleteBin6Line>
        ) : (
          <FiEdit className="h-24 w-24 z-10 absolute text-yellow-400"></FiEdit>
        ))}
      <img
        src={image}
        className={
          !isHovered ? "w-3/5 rounded-lg" : "w-3/5 rounded-lg opacity-30"
        }
      ></img>
      <div
        className={
          !isHovered
            ? "flex flex-col justify-center items-center text-[#71BBFB]"
            : "flex flex-col justify-center items-center text-[#71BBFB] opacity-30"
        }
      >
        <span className="text-2xl">{name}</span>
        <span className="text-gray-500 text-lg">{job}</span>
        <span className="text-gray-500 mt-5 opacity-80">{email}</span>
      </div>
    </div>
  );
}

export default FriendCard;
