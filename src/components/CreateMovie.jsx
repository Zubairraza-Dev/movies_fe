import React, { useRef, useState } from "react";
import downloadIcon from "../assets/svg/download.svg";
import FooterIconComp from "./Footer";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import httpRequest from "../axios/index";
import { MOVIES } from "../constants/apiEndPoints";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateMovie = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    register,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      publishingYear: "",
      image: "",
    },
  });

  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // const handleClick = () => {
  //   document.getElementById("fileInput").click();
  //   // if (fileInputRef.current) {
  //   //   fileInputRef.current.click();
  //   // }
  // };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setValue("image", file);
      clearErrors("image");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", data.image[0]);
    formData.append("upload_preset", "fzu5ffjp");
    let imageURL;
    try {
      if (data.image) {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dpyxsusph/image/upload",
          formData
        );
        imageURL = response?.data?.secure_url;
      }
      if (imageURL) {
        data.poster = imageURL;
      }
      delete data.image;
      const response = await httpRequest.post(`${MOVIES}`, data);
      if (response.status === 200 || 201) {
        toast.success("Movie created successfully");
        navigate("/movies");
      }
    } catch (error) {
      console.error("Error uploading image", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#093545] w-full h-auto flex flex-col gap-24">
      <div className="w-[94%] sm:w-[75%] mx-auto flex flex-col mt-[80px] sm:mt-[120px]">
        <div className="text-[32px] sm:text-[48px] sm:w-auto w-[380px] mx-auto sm:mx-0 font-semibold text-white text-start sm:mb-[120px] mb-[80px] font-Montserrat">
          Create a new movie
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-between w-full flex-wrap sm:gap-20 "
        >
          {/* mobile inputs  */}
          <div className=" sm:hidden w-[380px] mx-auto flex flex-col gap-7 mb-7">
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <div>
                  <input
                    type="text"
                    placeholder="Title"
                    className="h-[45px] w-[362px] bg-[#224957] rounded-[10px] pl-4"
                    {...field}
                  />
                  {/* Error message for title */}
                  {errors.title && (
                    <p className="text-red-500">{errors.title.message}</p>
                  )}
                </div>
              )}
            />
            <Controller
              name="publishingYear"
              control={control}
              rules={{
                required: "Publishing year is required",
                min: { value: 1900, message: "Year must be greater than 1900" },
                max: {
                  value: new Date().getFullYear(),
                  message: `Year must be less than or equal to ${new Date().getFullYear()}`,
                },
              }}
              render={({ field }) => (
                <div>
                  <input
                    type="number"
                    placeholder="Publishing year"
                    className="h-[45px] w-[216px] bg-[#224957] rounded-[10px] pl-4 font-Montserrat"
                    {...field}
                  />
                  {errors.publishingYear && (
                    <p className="text-red-500">
                      {errors.publishingYear.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Left side  */}
          <div className="sm:w-[473px] w-[380px] sm:h-[504px] h-[372px] mx-auto ">
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              className="hidden"
              onChange={handleImageChange}
              {...register("image", { required: "image is required" })}
            />

            <label
              className="border-2 border-dotted border-white rounded-[10px] sm:w-[473px] w-[380px] sm:h-[504px] h-[372px] bg-[#224957] flex flex-col justify-center items-center gap-3"
              htmlFor="fileInput"
            >
              <img src={downloadIcon} alt="" />
              <div className="text-white text-[14px] font-Montserrat">
                Drop an image here
              </div>
            </label>
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
          </div>

          {/* Right side  */}
          <div className="w-[380px] sm:w-[473px] h-auto  flex flex-col gap-7 mx-auto">
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <div>
                  <input
                    type="text"
                    placeholder="Title"
                    className="h-[45px] w-[362px] bg-[#224957] rounded-[10px] pl-4 font-Montserrat"
                    {...field}
                  />
                  {/* Error message for title */}
                  {errors.title && (
                    <p className="text-red-500">{errors.title.message}</p>
                  )}
                </div>
              )}
            />
            <Controller
              name="publishingYear"
              control={control}
              rules={{
                required: "Publishing year is required",
                min: { value: 1900, message: "Year must be greater than 1900" },
                max: {
                  value: new Date().getFullYear(),
                  message: `Year must be less than or equal to ${new Date().getFullYear()}`,
                },
              }}
              render={({ field }) => (
                <div>
                  <input
                    type="number"
                    placeholder="Publishing year"
                    className="h-[45px] w-[216px] bg-[#224957] rounded-[10px] pl-4 font-Montserrat"
                    {...field}
                  />
                  {errors.publishingYear && (
                    <p className="text-red-500">
                      {errors.publishingYear.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="flex gap-4 mt-9">
              <button className="w-[167px] h-[56px] rounded-[10px]  flex justify-center items-center text-white font-semibold text-[16px] border-[1px] font-Montserrat">
                Cancel
              </button>
              <button
                type="submit"
                disabled={Loading}
                className="w-[167px] h-[56px] rounded-[10px] bg-[#2BD17E] flex justify-center items-center text-white font-semibold text-[16px] font-Montserrat"
              >
                {Loading ? "Loading..." : "submit"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <FooterIconComp />
    </div>
  );
};

export default CreateMovie;
