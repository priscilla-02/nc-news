import { useState } from "react";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import LogInModal from "./LoginModal";
import { ModalContext } from "../contexts/ModalContext";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import Newspaper from "../icons/newspaper.svg";
const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const { openModal, setOpenModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const state = useLocation();

  const goBackFunc = () => {
    if (state.pathname == "/error") {
      navigate("/", { replace: true });
    } else {
      navigate(-1);
    }
  };

  const openLoginModal = () => {
    if (user) {
      setUser(null);
    } else {
      setOpenModal(true);
    }
  };

  const handleHeaderClick = () => {
    navigate("/");
  };

  return (
    <header className="">
      {openModal && <LogInModal setOpenModal={setOpenModal} />}
      <div className="absolute top-8 left-5  px-4 py-3 text-right">
        <button
          type="button"
          className="flex items-center justify-center pr-2 bg-sky-600 text-white rounded hover:bg-blue-600 mr-2 text-md "
          onClick={goBackFunc}
        >
          <ArrowLeftRoundedIcon />
          <i> Back</i>
        </button>
      </div>

      <div className="flex justify-center items-center">
        <img src={Newspaper} alt="Newspaper Icon" className="pr-3 mt-12" />
        <div className="flex flex-col justify-end items-end">
          <i
            className="text-sky-600 mt-20 text-5xl font-bold text-sky-600 cursor-pointer"
            onClick={handleHeaderClick}
          >
            NC NEWS
          </i>
          <div className="text-sky-600 text-sm mb-5">
            <i>Brought to you by Press PC</i>
          </div>
        </div>
      </div>

      <div className="desktop:block hidden absolute top-10 right-10 cursor-pointer">
        <Button
          variant="outlined"
          onClick={openLoginModal}
          style={{ color: "#0284C7" }}
        >
          <PersonIcon />
          {user ? (
            <>
              {user.name}
              <img
                className="w-[30px] h-[30px] mix-blend-multiply"
                src={user.image}
              />
              <LogoutIcon className="desktop:block hidden" />
            </>
          ) : (
            <LoginIcon />
          )}
        </Button>
      </div>
      <div className="desktop:hidden block absolute top-8 right-8 cursor-pointer">
        <Button variant="outlined" onClick={openLoginModal}>
          {user ? (
            <>
              <img
                className="w-[30px] h-[30px] mix-blend-multiply"
                src={user.image}
              />
              <LogoutIcon />
            </>
          ) : (
            <LoginIcon />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
