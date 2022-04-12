import React, { useEffect } from "react";
import AddCard from "./AddCard";
import FriendCard from "./FriendCard";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { removeUser, selectUserName } from "./store/slices/userSlice";
import { auth } from "./firebase";

function Home() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [job, setJob] = React.useState("");
  const [image, setImage] = React.useState("");
  const [isProcessed, setIsProcessed] = React.useState(false);
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    setLoading(false);
    console.log(users);
  }, [userName, isProcessed]);

  async function fetchData() {
    setUsers([]);
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      let user = Object.assign({}, doc.data(), { id: doc.id });
      setUsers((users) => [...users, user]);
    });
  }

  async function handleLogout() {
    signOut(auth).then(() => {
      dispatch(removeUser());
      navigate("/login");
    });
  }

  async function handleEdit() {
    try {
      const docRef = await updateDoc(doc(db, "users", userId), {
        email: String(email),
        name: String(name),
        image: String(image),
        job: String(job),
      });
      setIsClicked(!isClicked);
      setEmail("");
      setName("");
      setImage("");
      setJob("");
      setIsProcessed(!isProcessed);
      console.log("Document edited: ", docRef.id);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <section className="w-full h-full">
        <div className="w-full h-1/6 p-5 flex justify-center items-center bg-contacts-pattern bg-no-repeat bg-cover text-6xl text-[#71BBFB]">
          КОНТАКТЫ
        </div>
        {!isClicked ? (
          <div className="w-full h-4/6 flex flex-row flex-wrap justify-center items-center gap-7">
            {users?.map((user) => {
              return (
                <FriendCard
                  key={user.id}
                  name={user.name}
                  email={user.email}
                  job={user.job}
                  image={user.image}
                  id={user.id}
                  isDelete={isDelete}
                  isClicked={isClicked}
                  setIsClicked={setIsClicked}
                  setUserId={setUserId}
                  isProcessed={isProcessed}
                  setIsProcessed={setIsProcessed}
                />
              );
            })}
            <AddCard
              isProcessed={isProcessed}
              setIsProcessed={setIsProcessed}
            />
          </div>
        ) : (
          <div className="w-full h-4/6 flex flex-col flex-wrap justify-center items-center gap-7">
            <label className="-mb-5 ">Введите имя</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="rounded-lg h-12 w-1/4 border border-[#71BBFB] text-center"
              placeholder="Dr. Bridget Skiles"
            ></input>
            <label className="-mb-5">Введите работу</label>
            <input
              onChange={(e) => setJob(e.target.value)}
              value={job}
              className="rounded-lg h-12 w-1/4 border border-[#71BBFB] text-center"
              placeholder="Internal Optimization Planner"
            ></input>
            <label className="-mb-5">Введите email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-lg h-12 w-1/4 border border-[#71BBFB] text-center"
              placeholder="Gunnar64@hotmail.com"
            ></input>
            <label className="-mb-5">Введите картинку</label>
            <input
              onChange={(e) => setImage(e.target.value)}
              value={image}
              className="rounded-lg h-12 w-1/4 border border-[#71BBFB] text-center"
              placeholder="http://loremflickr.com/640/480/food"
            ></input>
          </div>
        )}
        {!isClicked ? (
          <div className="w-full h-1/6 flex justify-center items-center bg-contacts-pattern bg-no-repeat bg-cover text-3xl text-[#71BBFB]">
            <button
              onClick={() => handleLogout()}
              className="cursor-pointer text-white rounded-lg h-12 w-2/12 border bg-[#71BBFB] mr-5"
            >
              ВЫЙТИ
            </button>
            {!isDelete ? (
              <button
                onClick={() => setIsDelete(!isDelete)}
                className="cursor-pointer text-white rounded-lg h-12 w-2/12 border bg-red-400"
              >
                УДАЛИТЬ
              </button>
            ) : (
              <button
                onClick={() => setIsDelete(!isDelete)}
                className="cursor-pointer text-white rounded-lg h-12 w-2/12 border bg-yellow-400"
              >
                РЕДАКТИРОВАТЬ
              </button>
            )}
          </div>
        ) : (
          <div className="w-full h-1/6 flex justify-center items-center bg-contacts-pattern bg-no-repeat bg-cover text-3xl text-[#71BBFB]">
            <button
              onClick={() => handleEdit()}
              className="cursor-pointer text-white rounded-lg h-12 w-2/12 border bg-green-400 mr-5"
            >
              ПОДТВЕРДИТЬ
            </button>
            <button
              onClick={() => setIsClicked(!isClicked)}
              className="cursor-pointer text-white rounded-lg h-12 w-2/12 border bg-[#71BBFB]"
            >
              ОТМЕНИТЬ
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
