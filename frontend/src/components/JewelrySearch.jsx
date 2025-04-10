import React, { useState } from "react";

const JewelrySearch = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setResults([]);
  };

  const handleSearch = async () => {
    if (!selectedFile) return alert("Please select an image first!");

    setSearching(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/api/search/search", {
        method: "POST",
        body: formData,
      });      

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error during search:", error);
      alert("Something went wrong. Check the console.");
    }

    setSearching(false);
  };

  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center p-4 sm:p-8" style={{ backgroundImage: 'url(https://tse4.mm.bing.net/th?id=OIP.Z-AR7RmkNtWtbTs9wltlxQHaEK&pid=Api&P=0&h=220)' }}>
      <div className="max-w-5xl mx-auto bg-white bg-opacity-90 p-6 rounded-3xl shadow-xl border border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-pink-600 mb-6">
          Jewelry Visual Search
        </h1>

        <div className="flex flex-col items-center gap-4 mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file:px-4 file:py-2 file:bg-pink-600 file:text-white file:rounded-full file:border-none cursor-pointer hover:file:bg-pink-700 transition duration-200"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-2xl shadow-md border-2 border-pink-300 transition-transform hover:scale-105"
            />
          )}

          <button
            onClick={handleSearch}
            disabled={searching}
            className={`mt-2 px-6 py-3 rounded-full text-white font-semibold transition duration-300 transform hover:scale-105 ${
              searching
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-700"
            }`}
          >
            {searching ? "Searching..." : "Search Similar Jewelry"}
          </button>
        </div>

        {results.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
              Top Matches
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {results.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-3 rounded-xl shadow hover:shadow-lg transition-transform transform hover:scale-105 border"
                >
                  <img
                    src={`http://localhost:5000/${item.path}`}
                    alt={`Match ${index + 1}`}
                    className="w-full h-36 sm:h-40 object-cover rounded-lg"
                  />
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    Similarity:{" "}
                    <span className="font-medium text-pink-500">
                      {item.similarity.toFixed(4)}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JewelrySearch;
