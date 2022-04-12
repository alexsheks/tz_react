import React from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/userSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [login, setLogin] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSignup(auth, email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        dispatch(
          setUser({
            email: String(user.email),
            token: String(user.accessToken),
            id: String(user.uid),
            photo: String(user.photoURL),
            name: String(user.displayName),
          })
        );
        navigate("/");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  function handleSignin(auth, email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        dispatch(
          setUser({
            email: String(user.email),
            token: String(user.accessToken),
            id: String(user.uid),
            photo: String(user.photoURL),
            name: String(user.displayName),
          })
        );
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <main className="w-screen h-screen flex flex-col justify-start items-center bg-hero-pattern bg-no-repeat bg-cover pt-40">
      <div className=" text-6xl text-[#71BBFB] mb-20">
        ВМЕСТЕ С ДРУЗЬЯМИ ВЕСЕЛЕЕ
      </div>
      <div className="w-1/4 h-1/4 mr-10 rounded-lg flex flex-col justify-center items-center">
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="rounded-lg h-12 w-full border border-[#71BBFB] mb-3 pl-2 text-center"
          placeholder="Введите почту"
        ></input>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="rounded-lg h-12 w-full border border-[#71BBFB] mb-3 pl-2 text-center"
          placeholder="Введите пароль"
        ></input>
        {login ? (
          <button
            onClick={() => handleSignin(auth, email, password)}
            className="cursor-pointer text-white rounded-lg h-12 w-full border bg-[#71BBFB]"
          >
            ВОЙТИ
          </button>
        ) : (
          <button
            onClick={() => handleSignup(auth, email, password)}
            className="cursor-pointer text-white rounded-lg h-12 w-full border bg-[#71BBFB]"
          >
            ЗАРЕГИСТРИРОВАТЬСЯ
          </button>
        )}

        <div className="text-[#71BBFB]">
          {login ? "Нет аккаунта?" : "Есть аккаунт?"}{" "}
          <span
            onClick={() => setLogin(!login)}
            className="text-[#558CBD] hover:cursor-pointer"
          >
            {login ? "Зарегестрироваться" : "Войти"}
          </span>
        </div>
      </div>
    </main>
  );
}

export default Login;
