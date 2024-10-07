import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPost = () => {
  const { id } = useParams();
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
    if (Image && Image.size > 5 * 1024 * 1024) { // 5 MB size limit
      toast.error("Image size should be less than 5 MB!");
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
    formData.append("postId", id);

    try {
      await instance.post("/updatePost", formData, config);
      toast.success("Post updated successfully!");
      navigation("/");
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Failed to update post!";
      toast.error(errorMessage);
      console.error(error);
    }
  };

  const handleFetchPost = async () => {
    try {
      const response = await instance.get(`/getPostById?postId=${id}`);
      console.log(response.data);
      setCaption(response.data.result[0].caption);
      setSelectedImage(response.data.result[0].post);
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Failed to fetch post!";
      toast.error(errorMessage);
      console.error(error);
    }
  };

  useEffect(() => {
    handleFetchPost();
  }, []);

  return (
    <div className="text-white flex justify-center p-3 md:items-center w-screen min-h-screen bg-gray-950">
      <main className="flex flex-col gap-3 bg-black p-5 rounded-2xl md:min-w-[500px] items-center">
        <h1 className="text-5xl font-bold text-center py-9">Edit Post</h1>
        {SelectedImage && (
          <img
            src={`http://localhost:4010/${SelectedImage}`}
            alt="Current Post"
            className="md:w-[400px] rounded-2xl"
          />
        )}
        <input
          type="file"
          name="post"
          className="p-3 rounded-2xl bg-gray-950 outline-none hover:scale-105"
          placeholder="Image..."
          onChange={updateImage}
        />
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

export default EditPost;
