import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MyBlog() {
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const response = await axios.get("https://hiten-blogforge.onrender.com/api/user/getMyProfile", {
          withCredentials: true,
        });
        setMyBlogs(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMyBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`https://hiten-blogforge.onrender.com/api/blog/delete/${blogId}`, {
        withCredentials: true,
      });
      setMyBlogs(myBlogs.filter((blog) => blog._id !== blogId));
      console.log("Blog deleted successfully.");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-blue-400 mb-4">
        <span className="text-purple-400">My</span> Blogs
      </h1>

      <div className="container text-center sm:pl-96 p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myBlogs && myBlogs.length > 0 ? (
            myBlogs.map((element) => (
              <div
                key={element._id}
                className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
              >
                <Link to={`/blog/${element._id}`}>
                  <img
                    src={element.blogImage.url}
                    className="w-full h-48 object-cover"
                    alt={element.title}
                  />
                </Link>
                <div className="flex-grow p-4 flex flex-col">
                  <h1 className="text-xs font-semibold text-gray-800 mb-2 flex-grow">
                    {element.title}
                  </h1>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={element.adminPhoto}
                      alt={element.adminName}
                      className="w-12 h-12 rounded-full border-2 border-purple-500 shadow-md"
                    />
                    <div>
                      <span className="font-medium text-gray-700">
                        {element.adminName}
                      </span>
                      <p className="text-sm text-gray-500">New</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Link
                      to={`/blog/update/${element._id}`} // Navigate to edit page
                      className="text-blue-400 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      Update
                    </Link>
                    <button
                      className="text-red-400 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                      onClick={() => handleDelete(element._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-700">No blogs available.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBlog;
