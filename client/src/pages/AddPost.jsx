import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const handlePost = async () => {
    const formData = new FormData();
    formData.append("post", Image);
    formData.append("caption", caption);

    try {
      await instance.post("/createPost", formData, config);
      navigation("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" text-white flex justify-center items-center w-screen h-screen bg-gray-950">
      <main className=" flex flex-col gap-3 bg-black p-5 rounded-2xl min-w-[500px] items-center">
        <h1 className=" text-5xl font-bold text-center py-9">Add Post</h1>
        {SelectedImage ? (
          <img src={SelectedImage} alt="" className="aspect-square w-[400px]" />
        ) : (
          <input
            type="file"
            name="post"
            className=" p-3 rounded-2xl bg-gray-950 outline-none hover:scale-105"
            placeholder="Image..."
            onChange={updateImage}
          />
        )}

        <textarea
          type="text"
          className=" p-3 w-full rounded-2xl bg-gray-950 outline-none hover:scale-105"
          placeholder="Caption..."
          name="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button
          className=" p-3 rounded-2xl bg-orange-600 font-bold hover:scale-105 hover:bg-orange-800 w-full"
          onClick={handlePost}
        >
          Submit
        </button>
      </main>
    </div>
  );
};

export default AddPost;
