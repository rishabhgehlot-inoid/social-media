import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPost = () => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const [SelectedImage, setSelectedImage] = useState(null);
  const [Image, setImage] = useState(null);
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
    const file = event.target.files[0];
    setImage(file);
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const validateInputs = () => {
    if (!Image) {
      toast.error("Please select an image!");
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
    formData.append("post", Image);
    formData.append("caption", caption);

    try {
      await instance.post("/createPost", formData, config);
      toast.success("Post created successfully!");
      navigation("/");
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Failed to create post!";
      toast.error(errorMessage);
      console.error(error);
    }
  };

  return (
    <div className="text-white flex justify-center p-3 md:items-center w-screen min-h-screen bg-gray-900 animate-fadeIn">
      <main className="flex flex-col gap-3 bg-black p-5 rounded-2xl md:min-w-[500px] items-center">
        <h1 className="text-5xl font-bold text-center py-9">Add Post</h1>
        {SelectedImage ? (
          <img src={SelectedImage} alt="" className="md:w-[400px] rounded-2xl" />
        ) : (
          <input
            type="file"
            name="post"
            className="p-3 rounded-2xl bg-gray-950 outline-none hover:scale-105"
            placeholder="Image..."
            onChange={updateImage}
          />
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
