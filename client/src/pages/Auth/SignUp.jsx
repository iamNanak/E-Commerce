import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useSignupMutation } from "../../redux/api/UserApiSlice";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const [signup, { isLoading }] = useSignupMutation();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [redirect, navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password not Matched");
    }
    try {
      const res = await signup({ username, email, password }).unwrap();
      console.log("response from signup: ", res);

      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("User signup successfully");
    } catch (error) {
      console.log("Error in SignUp: ", error);
      toast.error(error.data.message);
    }
  };

  return (
    <section className="pl-[10rem] flex justify-between">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl mr-[] font-semibold mb-4">Sign Up</h1>
        <form className="container w-[40rem]" onSubmit={submitHandler}>
          <div className="my-[2rem]">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-black"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="mt-1 p-2 border rounded w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="mt-1 p-2 border rounded w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-black"
            >
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              id="confirmPassword"
              className="mt-1 p-2 border rounded w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
          {isLoading && <Loader />}
        </form>

        <div className="mt-4">
          <p className="text-black">
            Already have account?{" "}
            <Link to="/login" className="text-pink-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
      <div className="max-h-screen ">
        <img
          src="https://images.pexels.com/photos/593159/pexels-photo-593159.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className=" w-full xl:block md:hidden sm:hidden rounded"
        />
      </div>
    </section>
  );
}

export default SignUp;
