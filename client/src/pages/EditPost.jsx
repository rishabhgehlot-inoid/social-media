import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "../components/EditPostSlider";
import { instance, SERVER_URL } from "../config/instance";

const AddPost = () => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const { id } = useParams();

  const [selectedImages, setSelectedImages] = useState([]); // Handle multiple images
  const [imagePreviews, setImagePreviews] = useState([]); // Previews for multiple images
  const [caption, setCaption] = useState("");
  const navigation = useNavigate();

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
    console.log("selectedImages--------->", selectedImages);

    selectedImages.map((image) => {
      formData.append("post", image);
    });
    formData.append("caption", caption);
    formData.append("postId", id);
    console.log("formData------>", formData);

    try {
      await instance.post("/updatePost", formData, config);
      toast.success("Post Updated successfully!");
      navigation("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Failed to create post!";
      toast.error(errorMessage);
      console.error(error);
    }
  };
  const handleFetchPost = async () => {
    try {
      const response = await instance.get(`/getPostById?postId=${id}`);
      const post = response.data.result[0]; // Extract the post data
      setCaption(post.caption);

      // Parse the `post` field as it's a stringified array of image names
      const imageFilenames = JSON.parse(post.post);
      setSelectedImages(imageFilenames);
      console.log("selectedImages", selectedImages);

      const imageUrls = imageFilenames.map((img) => `${SERVER_URL}/${img}`);

      setImagePreviews(imageUrls); // Set all images for preview
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Failed to fetch post!";
      toast.error(errorMessage);
      console.error(error);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await instance.delete(`/deletePost/${id}`);
      console.log(response);
      navigation("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleFetchPost();
  }, []);

  return (
    <div className="text-white flex justify-center p-3 md:items-center w-screen md:h-screen bg-gray-900 animate-fadeIn ">
      <main className="flex flex-col gap-3 bg-black p-5 rounded-2xl md:min-w-[500px] items-center overflow-y-scroll">
        <h1 className="text-3xl md:text-5xl font-bold text-center md:py-9">
          Update Post
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
          className="p-3 w-full rounded-2xl bg-gray-950 outline-none "
          placeholder="Caption..."
          name="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button
          className="p-3 rounded-2xl bg-orange-600 font-bold w-full"
          onClick={handlePost}
        >
          Submit
        </button>
        <button
          className="p-3 rounded-2xl bg-red-600 font-bold w-full"
          onClick={handleDelete}
        >
          Delete
        </button>
      </main>
      <ToastContainer />
    </div>
  );
};

export default AddPost;
