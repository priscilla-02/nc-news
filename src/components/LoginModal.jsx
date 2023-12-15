import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { fetchUsers } from "../api";
import { ModalContext } from "../contexts/ModalContext";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";

const LogInModal = () => {
  const { setUser } = useContext(UserContext);
  const { openModal, setOpenModal } = useContext(ModalContext);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchUsers().then((users) => {
      setUserList(users);
    });
  }, []);

  const handleLogIn = (user) => {
    setUser({
      name: user.name,
      image: user.avatar_url,
      username: user.username,
    });
    setOpenModal(false);
  };

  return (
    <div className={openModal ? "block" : "hidden"}>
      <div
        className="fixed z-10 overflow-y-auto top-0 w-full left-0"
        id="modal"
      >
        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-900 opacity-75" />
          </div>
          <div
            className="w-[300px] inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="flex flex-wrap justify-center">
              {userList.map((user) => {
                return (
                  <div
                    key={user.username}
                    className="py-3 px-5 cursor-pointer"
                    onClick={() => handleLogIn(user)}
                  >
                    <p className="py-5">{user.name}</p>
                    <img className="w-[75px] h-[75px]" src={user.avatar_url} />
                  </div>
                );
              })}
            </div>
            <div className="bg-gray-200 px-4 py-3 text-right">
              <button
                type="button"
                className="py-2 px-4 bg-sky-600 text-white rounded hover:bg-gray-700 mr-2"
                onClick={() => setOpenModal(false)}
              >
                <i>
                  {" "}
                  <ArrowLeftRoundedIcon />
                  Go Back
                </i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInModal;
