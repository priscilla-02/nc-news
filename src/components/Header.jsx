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
import NewspaperLight from "../icons/newspaper-light.svg";
import NewspaperDark from "../icons/newspaper-dark.svg";

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

      <div className="desktop:block hidden absolute top-8 left-4 px-4 py-3 text-right">
        <button
          type="button"
          className="flex items-center justify-center pr-2 bg-sky-600 text-white rounded hover:bg-blue-600 mr-2 mt-3 text-md cursor-pointer w-[80px] h-[30px]"
          onClick={goBackFunc}
        >
          <ArrowLeftRoundedIcon />
          <i> Back</i>
        </button>
      </div>
      <div className="desktop:hidden block absolute top-1 left-1">
        <button
          type="button"
          className="flex items-center justify-center bg-sky-600 text-white rounded hover:bg-blue-600 mr-2 mt-3 text-md cursor-pointer"
          onClick={goBackFunc}
        >
          <ArrowLeftRoundedIcon />
        </button>
      </div>

      <div className="flex justify-center items-center">
        <img
          src={isDarkMode ? NewspaperDark : NewspaperLight}
          alt="Newspaper Icon"
          className="pr-3 ml-5"
        />

        <div className="flex flex-col justify-end items-end mt-5 mr-5">
          <div
            className={`cursor-pointer text-5xl ${
              isDarkMode ? "text-secondary" : "text-primary"
            }`}
            onClick={handleHeaderClick}
            style={{
              fontFamily: "Diplomata SC Regular",
            }}
          >
            NC NEWS
          </div>
          <div
            className={`${
              isDarkMode ? "text-secondary" : "text-primary"
            } text-xs`}
          >
            <i
              style={{
                fontFamily: "Diplomata SC Regular, curisve",
                fontSize: "10px",
              }}
            >
              Brought to you by Press PC
            </i>
          </div>
        </div>
      </div>

      <div
        className={`desktop:block hidden absolute top-10 right-10 cursor-pointer ${
          isDarkMode
            ? "border-secondary text-secondary"
            : "border-primary text-primary"
        }`}
      >
        <Button
          variant="outlined"
          onClick={openLoginModal}
          style={{
            borderColor: isDarkMode ? "#fff" : "#0284C7",
          }}
        >
          <PersonIcon
            style={{
              color: isDarkMode ? "#fff" : "#0284C7",
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
                  color: isDarkMode ? "#fff" : "#0284C7",
                }}
              />
            </>
          ) : (
            <LoginIcon
              style={{
                color: isDarkMode ? "#fff" : "#0284C7",
              }}
            />
          )}
        </Button>
      </div>
      <div
        className={`desktop:hidden block absolute top-2 right-4 cursor-pointer ${
          isDarkMode
            ? "border-secondary text-secondary"
            : "border-primary text-primary"
        }`}
      >
        <Button
          variant="outlined"
          onClick={openLoginModal}
          style={{
            borderColor: isDarkMode ? "#fff" : "#0284C7",
            color: isDarkMode ? "#fff" : "#0284C7",
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
