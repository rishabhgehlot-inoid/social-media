import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "../components/EditPostSlider";

const AddPost = () => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const [selectedImages, setSelectedImages] = useState([]); // Handle multiple images
  const [imagePreviews, setImagePreviews] = useState([]); // Previews for multiple images
  const [caption, setCaption] = useState("");
  const navigation = useNavigate();
  const instance = axios.create({
    baseURL: "http://localhost:4010/",
    headers: {
      "content-type": "multipart/form-data",
      token: localStorage.getItem("token"),
    },
  });

  const updateImage = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to array
    setSelectedImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const validateInputs = () => {
    if (selectedImages.length === 0) {
      toast.error("Please select at least one image!");
      return false;
    }
    if (!caption.trim()) {
      toast.error("Caption cannot be empty!");
      return false;
    }
    return true;
  };

  const handlePost = async () => {
    if (!validateInputs()) return; // Validate inputs before proceeding

    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append("post", image); // Append each image to formData
    });
    formData.append("caption", caption);

    try {
      await instance.post("/createPost", formData, config);
      toast.success("Post created successfully!");
      navigation("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Failed to create post!";
      toast.error(errorMessage);
      console.error(error);
    }
  };

  return (
    <div className="text-white flex justify-center p-3 md:items-center w-screen md:min-h-screen bg-gray-900 animate-fadeIn">
      <main className="flex flex-col gap-3 bg-black p-5 rounded-2xl md:min-w-[500px] items-center">
        <h1 className="text-3xl md:text-5xl font-bold text-center md:py-9">
          Add Post
        </h1>
        {imagePreviews.length > 0 ? (
          <div className="grid grid-cols-1">
            {imagePreviews.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {imagePreviews.length > 0 ? (
                  <div className="w-full">
                    <Slider
                      images={imagePreviews}
                      setImagePreviews={setImagePreviews}
                      setSelectedImages={setSelectedImages}
                      imagePreviews={imagePreviews}
                    />
                  </div>
                ) : (
                  <div className="parent">
                    <div className="file-upload">
                      <h3>Click box to upload</h3>
                      <p>Maximun file size 10mb</p>
                      <input
                        type="file"
                        name="post"
                        onChange={updateImage}
                        multiple
                        accept="image/*"
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="parent">
                <div className="file-upload">
                  <h3>Click box to upload</h3>
                  <p>Maximun file size 10mb</p>
                  <input
                    type="file"
                    name="post"
                    onChange={updateImage}
                    multiple
                    accept="image/*"
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="parent">
            <div className="file-upload">
              <h3>Click box to upload</h3>
              <p>Maximun file size 10mb</p>
              <input
                type="file"
                name="post"
                onChange={updateImage}
                multiple
                accept="image/*"
              />
            </div>
          </div>
        )}

        <textarea
          type="text"
          className="p-3 w-full rounded-2xl bg-gray-950 outline-none hover:scale-105"
          placeholder="Caption..."
          name="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button
          className="p-3 rounded-2xl bg-orange-600 font-bold hover:scale-105 hover:bg-orange-800 w-full"
          onClick={handlePost}
        >
          Submit
        </button>
      </main>
      <ToastContainer />
    </div>
  );
};

export default AddPost;
