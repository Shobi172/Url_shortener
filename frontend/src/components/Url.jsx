import { useState } from "react";
import instance from "../axios";
import { toast } from "react-toastify";

const Url = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState([]);

  const handleShortenUrl = async () => {
    if (!originalUrl.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }
    try {
      const response = await instance.post(
        "/url/shorten",
        { originalUrl },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { shortId } = response.data;
      const newUrl = { originalUrl, shortId };
      setShortenedUrls([...shortenedUrls, newUrl]);
      setOriginalUrl("");
    } catch (error) {
      console.error("Error shortening URL:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Please login to perform this task.");
      }
    }
  };

  return (
    <div className="container mx-auto p-16">
      <div className="flex justify-center items-center gap-4 mb-6">
        <input
          className="w-96 border border-gray-300 rounded-md py-2 px-4"
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleShortenUrl}
        >
          Shorten
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Original URL</th>
            <th className="border border-gray-300 p-2">Shortened URL</th>
          </tr>
        </thead>
        <tbody>
          {shortenedUrls.map((url, index) => (
            <tr key={index} className="border border-gray-300">
              <td className="p-2 text-center">
                <a
                  href={url.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {url.originalUrl}
                </a>
              </td>
              <td className="p-2 text-center">
                <a
                  href={`http://localhost:3000/url/${url.shortId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {url.shortId}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Url;
