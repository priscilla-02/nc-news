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

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const { openModal, setOpenModal } = useContext(ModalContext);

  const openLoginModal = () => {
    if (user) {
      setUser(null);
    } else {
      setOpenModal(true);
    }
  };

  return (
    <header className="bg-gray-400">
      {openModal && <LogInModal setOpenModal={setOpenModal} />}

      <h1 className="text-3xl font-bold underline text-blue-500 desktop:text-black">
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
      <p>Topic Description</p>
    </header>
  );
};

export default Header;
