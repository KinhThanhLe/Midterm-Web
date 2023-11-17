import { Input } from "@material-tailwind/react";
import FormData from 'form-data'
import { useAuth } from "../../AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const EventSource = {
  IMAGE_CHANGE: "image-change",
  PROFILE_CHANGE: "profile-change",
};

function ProfilePage() {
  const navigate = useNavigate();
  const { token, login, logout } = useAuth();
  const [edit, setEdit] = useState(false);
  const [changingImage, setChanginImage] = useState(false);
  const [image, setImage] = useState("");

  const handleUpdateUser = async () => {
    try {
      const response = await axios.patch(
        "https://be-midterm-web.vercel.app/user/profile",
        {
          username: userData.username,
          password: userData.password,
          full_name: userData.full_name,
          birthday: userData.birthday,
          address: userData.address,
          email: userData.email,
          phone_number: userData.phone_number,
          image: {
            url: userData.image.url,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token.data}`, // Assuming you have a token variable
          },
        }
      );

      // Handle success, e.g., navigate to a different page
      console.log("User updated successfully:", response?.data);
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error updating user:", error.message);
    }
  };

  function onSaveProfileClick() {
    // get the new profile and send it to server
    // save the new user to
    handleUpdateUser();
    setEdit(false);
  }

  function onEditProfileClick() {
    setEdit(true);
  }

  function onCancelClick(source) {
    console.log(source);
    switch (source) {
      case "image-change":
        setChanginImage(false);
        setImage(userData?.image?.url);
        // reload user image here
        break;

      case "profile-change":
        // reload user profile here
        setEdit(false);
        break;
      default:
        break;
    }
  }

  function handleUploadImage(event) {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
    setChanginImage(true);
  }

  function handleSaveImage() {
    // send update image request to server
    let data = new FormData();
    data.append('image', image, image.name);

    // axios.post("https://be-midterm-web.vercel.app/upload/image", imageData, {
    //   headers: {
    //     Authorization: `Bearer ${token.data}`,
    //   },
    // })

    axios
      .post("https://be-midterm-web.vercel.app/upload/image", data, {
        headers: {
          Authorization: `Bearer ${token.data}`,
          accept: "application/json",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      })
      .then((response) => {
        console.log("Image updated successfully: ", response);
      })
      .catch((error) => {
        console.error("Error updating image:", error.message);
      });
    setChanginImage(false);
  }

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    console.log(storedToken);
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "https://be-midterm-web.vercel.app/user/profile",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        setUserData(response?.data?.data);
      } catch (error) {


        // Xử lý các lỗi khác theo ý của bạn
        console.error("Error fetching user profile:", error?.message);
      }
    };

    // Gọi hàm fetchUserProfile khi component được tạo
    fetchUserProfile();
  }, [token, logout, navigate]);

  const [fullName, setFullName] = useState(userData?.full_name || "");
  const [birthday, setBirthday] = useState(userData?.birthday || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(userData?.phone_number || "");
  const [address, setAddress] = useState(userData?.address || "");

  // Update the userData state when the input fields change
  const handleInputChange = (name, value) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="bg-gray-100 pb-20">
        <div
          className="h-[400px] bg-cover bg-center"
          style={{ backgroundImage: "url('/profile-page-cover.png')" }}
        >
          <div className="w-9/12 h-full mx-auto flex items-center">
            <div className="w-5/12">
              <h1 className="text-4xl text-gray-50 font-semibold">
                Hello {userData?.full_name}
              </h1>
              <p className="mt-4 text-gray-400">
                This is your profile page. You can see the information
                registered here, and you can also modify it!
              </p>
            </div>
          </div>
        </div>
        <div className="-mt-[180px] w-9/12 mx-auto">
          <div className="w-10/12 mx-auto  z-10  flex justify-end">
            <div>
              <img
                alt=""
                className="w-56 h-56 rounded-full object-cover"
                src={image ? URL.createObjectURL(image) : userData?.image.url}
              ></img>
              {/* https://i.pinimg.com/736x/2e/e4/f3/2ee4f3c2d6cf3a87427e309177c6149b.jpg */}
              <div className="-mt-56 w-56 h-56 flex gap-2 justify-center items-center">
                {!changingImage && (
                  <label className="flex gap-2 rounded px-2 py-1 items-center font-semibold bg-blue-gray-100 opacity-20 hover:opacity-70">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.2rem"
                      viewBox="0 0 512 512"
                    >
                      <path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
                    </svg>
                    <h6>Change</h6>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      
                      onChange={(event) => handleUploadImage(event)}
                    ></input>
                  </label>
                )}
                {changingImage && (
                  <>
                    <button
                      type="submit"
                      onClick={handleSaveImage}
                      className="flex gap-2 rounded px-2 py-1 items-center font-semibold bg-green-300 opacity-50 hover:opacity-70"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                      >
                        <path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z" />
                      </svg>
                      <h6>Save</h6>
                    </button>
                    <button
                      onClick={() => onCancelClick(EventSource.IMAGE_CHANGE)}
                      className="flex gap-2 rounded px-2 py-1 items-center font-semibold bg-red-200 opacity-50 hover:opacity-70"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                      >
                        <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                      </svg>
                      <small>Cancel</small>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="-mt-[150px] bg-white rounded-xl shadow-lg p-10">
            <div className="w-8/12">
              <div className="flex justify-between items-center">
                <h1 className="text-blue-gray-800 text-lg font-bold mb-8">
                  User information
                </h1>
                {!edit && (
                  <button
                    onClick={() => onEditProfileClick()}
                    className="flex items-center gap-2 text-blue-gray-300 hover:text-blue-gray-500 fill-blue-gray-300 font-semibold hover:fill-blue-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                      className="fill-inherit"
                    >
                      <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                    </svg>
                    <small>Edit</small>
                  </button>
                )}

                {edit && (
                  <div className="flex gap-4">
                    <button
                      onClick={onSaveProfileClick}
                      className="flex items-center gap-1 text-green-200 hover:text-green-500 fill-green-200 font-semibold hover:fill-green-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                      >
                        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                      </svg>
                      <small>Save</small>
                    </button>
                    <button
                      onClick={() => onCancelClick(EventSource.PROFILE_CHANGE)}
                      className="flex items-center gap-1 text-blue-gray-300 hover:text-blue-gray-500 fill-blue-gray-300 font-semibold hover:fill-blue-gray-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 384 512"
                      >
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                      </svg>
                      <small>Cancel</small>
                    </button>
                  </div>
                )}
              </div>
              <form>
                <div className="grid grid-cols-2 gap-8">
                  <Input
                    name="full_name"
                    variant="standard"
                    label="Full name"
                    onChange={(e) => {
                      handleInputChange("full_name", e.target.value);
                    }}
                    defaultValue={userData?.full_name}
                    readOnly={!edit}
                    size="lg"
                  />
                  <Input
                    name="birthday"
                    type="date"
                    variant="standard"
                    label="Birthday"
                    onChange={(e) => {
                      handleInputChange("birthday", e.target.value);
                    }}
                    defaultValue={userData?.birthday}
                    readOnly={!edit}
                    size="lg"
                  />
                  <Input
                    name="email"
                    variant="standard"
                    label="Email"
                    onChange={(e) => {
                      handleInputChange("email", e.target.value);
                    }}
                    defaultValue={userData?.email}
                    readOnly={!edit}
                    size="lg"
                  />
                  <Input
                    name="phone_number"
                    variant="standard"
                    label="phone_number"
                    onChange={(e) => {
                      handleInputChange("phone_number", e.target.value);
                    }}
                    defaultValue={userData?.phone_number}
                    readOnly={!edit}
                    size="lg"
                  />
                  <div className="col-span-2">
                    <Input
                      name="address"
                      variant="standard"
                      label="Address"
                      onChange={(e) => {
                        handleInputChange("address", e.target.value);
                      }}
                      defaultValue={userData?.address}
                      readOnly={!edit}
                      size="lg"
                    />
                  </div>
                </div>
              </form>
              <h1 className="text-blue-gray-800 text-lg font-bold mb-8 mt-10">
                Account
              </h1>
              <form>
                <div className="grid grid-cols-2 gap-8 mb-10">
                  <Input
                    name="Username"
                    variant="standard"
                    label="Username"
                    value={userData?.username}
                    readOnly={true}
                    size="lg"
                  />
                  <Input
                    name="pasword"
                    type="password"
                    variant="standard"
                    label="Password"
                    value="***********"
                    readOnly={true}
                    size="lg"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
