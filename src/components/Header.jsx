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
import { useNavigate } from "react-router-dom";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const { openModal, setOpenModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const goBackFunc = () => {
    navigate(-1);
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
    <header className="bg-gray-400">
      {openModal && <LogInModal setOpenModal={setOpenModal} />}
      <div className="absolute top-10 left-10  px-4 py-3 text-right">
        <button
          type="button"
          className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
          onClick={goBackFunc}
        >
          <i className="fas fa-times">
            <ArrowLeftRoundedIcon />
            Back
          </i>
        </button>
      </div>
      <h1
        className="text-3xl font-bold underline text-blue-500 desktop:text-black cursor-pointer"
        onClick={handleHeaderClick}
      >
        <NewspaperIcon /> News Project
      </h1>
      <div className="desktop:block hidden absolute top-2 right-2 cursor-pointer">
        <Button variant="outlined" onClick={openLoginModal}>
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
      <div className="desktop:hidden block absolute top-2 right-2 cursor-pointer">
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
