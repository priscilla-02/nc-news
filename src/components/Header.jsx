import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { ModalContext } from "../contexts/ModalContext";
import { DarkModeContext } from "../contexts/DarkModeContext";
import LogInModal from "./LoginModal";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import DarkModeToggle from "./DarkModeToggle";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Newspaper from "../icons/newspaper.svg";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const { openModal, setOpenModal } = useContext(ModalContext);
  const { isDarkMode } = useContext(DarkModeContext);
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
    <header className={`bg-mode ${isDarkMode ? "dark" : "light"}`}>
      <div>
        <DarkModeToggle />
      </div>
      {openModal && <LogInModal setOpenModal={setOpenModal} />}
      <div className="absolute top-8 left-5  px-4 py-3 text-right">
        <button
          type="button"
          className="flex items-center justify-center pr-2 bg-sky-600 text-white rounded hover:bg-blue-600 mr-2 mt-3 text-md cursor-pointer"
          onClick={goBackFunc}
        >
          <ArrowLeftRoundedIcon />
          <i> Back</i>
        </button>
      </div>

      <div className="flex justify-center items-center">
        <img
          src={Newspaper}
          alt="Newspaper Icon"
          className="pr-3 mt-12"
          // style={{ stroke: isDarkMode ? "#ffffff" : "#0284C7" }}
        />
        <div className="flex flex-col justify-end items-end">
          <i
            className={`cursor-pointer text-5xl ${
              isDarkMode ? "text-secondary" : "text-primary"
            }`}
            onClick={handleHeaderClick}
          >
            NC NEWS
          </i>
          <div className={`${isDarkMode ? "text-secondary" : "text-primary"}`}>
            <i>Brought to you by Press PC</i>
          </div>
        </div>
      </div>

      <div
        className={`desktop:block hidden absolute top-10 right-10 cursor-pointer `}
      >
        <Button
          variant="outlined"
          onClick={openLoginModal}
          style={{
            borderColor: isDarkMode ? "#ffffff" : "#0284C7",
          }}
        >
          <PersonIcon
            style={{
              color: isDarkMode ? "#ffffff" : "#0284C7",
            }}
          />
          {user ? (
            <>
              <span
                className={`${isDarkMode ? "text-secondary" : "text-primary"}`}
              >
                {user.name}
              </span>
              <img
                className="w-[30px] h-[30px] mix-blend-multiply"
                src={user.image}
              />
              <LogoutIcon
                className="desktop:block hidden"
                style={{
                  color: isDarkMode ? "#ffffff" : "#0284C7",
                }}
              />
            </>
          ) : (
            <LoginIcon
              style={{
                color: isDarkMode ? "#ffffff" : "#0284C7",
              }}
            />
          )}
        </Button>
      </div>
      <div
        className={`desktop:hidden block absolute top-8 right-8 cursor-pointer ${
          isDarkMode
            ? "border-secondary text-secondary"
            : "border-primary text-primary"
        }`}
      >
        <Button
          variant="outlined"
          onClick={openLoginModal}
          style={{
            color: isDarkMode ? "#ffffff" : "#0284C7",
          }}
        >
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
