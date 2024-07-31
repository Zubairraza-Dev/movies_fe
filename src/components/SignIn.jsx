import { useForm } from "react-hook-form";
import FooterIconComp from "./Footer";
import { useState } from "react";
import httpRequest from "../axios/index";
import { LOGIN } from "../constants/apiEndPoints";
import { useAppDispatch } from "../lib/store/hook";
import { setAuth } from "../lib/store/slice/user/UserSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [Loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await httpRequest.post(`${LOGIN}`, data);
      if (response?.status === 200) {
        const responseData = response.data || {};
        const { user, token } = responseData.data || {};
        if (user && token) {
          dispatch(setAuth(user));
          localStorage.setItem("auth_token", JSON.stringify(token));
          navigate("/movies");
        }
      }
    } catch (error) {
      const errorMessage =
        error.response.data.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-[#093545] w-full h-auto min-h-screen flex flex-col justify-between">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[90%] sm:w-[300px] mx-auto flex flex-col gap-7 justify-center items-center mt-[220px] mb-[120px]"
      >
        <div className="sm:text-[64px] font-custom text-[48px] font-semibold text-white text-center">
          Sign In
        </div>
        <div className="w-full">
          <input
            type="text"
            alt="Email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className={`h-[45px] w-full bg-[#224957] rounded-xl pl-4 text-white font-custom ${
              errors.email ? "border border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-[12px] mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <input
            type="text"
            alt="Password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className={`h-[45px] w-full bg-[#224957] rounded-xl pl-4 text-white font-custom ${
              errors.password ? "border border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-[12px] mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex w-full justify-center items-center gap-4">
          <input
            type="checkbox"
            id="checkbox"
            className="h-[17px] w-[18px]  rounded-none accent-[#224957] font-custom"
            {...register("rememberMe")}
          />
          <label
            for="checkbox"
            className="font-normal text-white text-[14px] font-custom"
          >
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className="w-full h-[54px] rounded-[10px] bg-[#2BD17E] flex justify-center items-center text-white font-semibold text-[16px] font-custom"
          disabled={Loading}
        >
          {Loading ? "Loading..." : "Login"}
        </button>
      </form>

      <FooterIconComp />
    </div>
  );
};

export default SignIn;
