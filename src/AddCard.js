import React from "react";
import { MdAdd } from "react-icons/md";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { faker } from "@faker-js/faker";

function AddCard({ setIsProcessed, isProcessed }) {
  const randomName = faker.name.findName();
  const randomEmail = faker.internet.email();
  const randomJob = faker.name.jobTitle();
  const randomImage = faker.image.image();

  async function handleAdd() {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: String(randomName),
        email: String(randomEmail),
        job: String(randomJob),
        image: String(randomImage),
      });
      setIsProcessed(!isProcessed);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div
      onClick={() => handleAdd()}
      className="w-2/12 h-2/5 border-gray-300 text-gray-300 border rounded-lg flex justify-center items-center flex-col hover:border-gray-600 hover:text-gray-600 hover:cursor-pointer"
    >
      <div className="w-full h-2/3">
        <MdAdd className="h-full w-full " />
      </div>
      <div className="text-3xl">Добавить</div>
    </div>
  );
}

export default AddCard;
