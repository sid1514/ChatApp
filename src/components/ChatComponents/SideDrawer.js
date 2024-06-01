import { useRef, useState } from "react";
import { Button, Dropdown, Icon, Menu, MenuItem } from "semantic-ui-react";
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";
const Sidedrawer = () => {
  const [search, setSearch] = useState();
  const [searchResult, setSearchresult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const nav = useNavigate();
  const selectRef = useRef(null);
  const [showSearch, setShowSearch] = useState(false);
  const { user, setselectedChat, chat, setChats } = ChatState();
  const [Click, setClick] = useState(false);
  const logout = () => {
    localStorage.removeItem("userInfo");
    nav("/");
  };

  const HandleSearch = async () => {
    if (!search) {
      alert("enter a search user");
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/user?search=${search}`,
        config
      );
      setLoading(false);
      setSearchresult(data);
      console.log(data);
    } catch (error) {
      alert("enter a correct search");
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/chat",
        { userId },
        config
      );
      if (!chat.find((c) => c._id === data._id)) {
        setChats([data, ...chat]);
      }
      setselectedChat(data);
      setLoadingChat(false);
      setShowSearch(false);
    } catch (error) {
      alert("chat cannot accesible");
    }
  };
  return (
    <>
      <div className="">
        <div className="m-2 flex flex-col ">
          <div onClick={() => setClick(!Click)}>
            <img
              src={user.pic}
              alt="user"
              width={90}
              height={90}
              className="rounded-full"
              style={{ cursor: "pointer" }}
              onClick={() => setClick(!Click)}
            />
          </div>

          <div className="font-bold fixed top-52 content-center flex flex-col w-48 rounded-2xl">
            <button
              className={`border border-black bg-neutral-600/75 text-white p-2 transition-opacity duration-300 ${
                Click ? "opacity-100" : "opacity-0"
              }`}
            >
              <ProfileModal user={user} />
            </button>
            <button
              className={`border border-black bg-neutral-600/75 text-white  p-2 transition-opacity duration-300 ${
                Click ? "opacity-100" : "opacity-0"
              }`}
            >
              Setting
            </button>
            <button
              className={`border border-black bg-neutral-600/75 text-white p-2 transition-opacity duration-800 ${
                Click ? "opacity-100" : "opacity-0"
              }`}
              onClick={logout}
            >
              Log out
            </button>
          </div>
        </div>

        <div className=" w-3/2 m-1" onClick={() => setShowSearch(true)}>
          <input
            type="search"
            placeholder="search user"
            className="border rounded p-2 w-10/12 mr-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Icon name="search" size="large" onClick={HandleSearch} />
          <Icon name="bell" size="large" />
        </div>
        <div className="h-full">
          {showSearch ? (
            loading ? (
              <div className=" w-full ">
                <ChatLoading />
              </div>
            ) : (
              <div>
                {searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))}
              </div>
            )
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidedrawer;
