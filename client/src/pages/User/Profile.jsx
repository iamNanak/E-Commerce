import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader.jsx";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/UserApiSlice.js";
import { setCredentials } from "../../redux/features/auth/authSlice.js";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username);
      setEmail(userInfo.email);
    }
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();
  // dispatch(setCredentials({}));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Password do not match");
    }

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        username,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-items md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-black mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter your Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input p-4 rounded-sm w-full border-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-black mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input p-4 rounded-sm w-full border-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-black mb-2">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input p-4 rounded-sm w-full border-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-black mb-2">Confirm Password</label>
              <input
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input p-4 rounded-sm w-full border-2"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-700"
              >
                Update
              </button>

              <Link
                to={"/user-orders"}
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-700"
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>
        {isLoading && <Loader />}
      </div>
    </div>
  );
}

export default Profile;
