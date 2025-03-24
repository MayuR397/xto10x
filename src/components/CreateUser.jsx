import { useState } from "react";
import Papa from "papaparse";

const CreateUser = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [users, setUsers] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setUsers(results.data);
      },
    });
  };

  const createUser = async (userData) => {
    try {
      const response = await fetch(
        `https://3b80-106-51-72-9.ngrok-free.app/users/create-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userData.userId,
            name: userData.name,
            email: userData.email,
            password: userData.password,
            course: userData.course,
            skills: userData.skills,
            vertical: userData.vertical,
            phoneNumber: userData.phoneNumber,
            code: userData.code,
            track: userData.track,
            isVerified: userData.isVerified, // Convert to boolean
            role: userData.role,
            teamId: userData.teamId,
          }),
        }
      );

      if (response.ok) {
        setSuccessCount((prev) => prev + 1);
      } else {
        setErrorCount((prev) => prev + 1);
      }
    } catch (error) {
      setErrorCount((prev) => prev + 1);
    }
  };

  const handleUpload = async () => {
    if (users.length === 0) {
      alert("No users to upload!");
      return;
    }

    setUploading(true);
    setProgress(0);
    setSuccessCount(0);
    setErrorCount(0);

    for (let i = 0; i < users.length; i++) {
      await createUser(users[i]);
      setProgress(((i + 1) / users.length) * 100);
    }

    setUploading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Upload CSV to Create Users</h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4 block w-full border p-2 rounded-md"
      />

      <button
        onClick={handleUpload}
        disabled={uploading || users.length === 0}
        className={`w-full py-2 rounded-md text-white ${
          uploading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {uploading ? "Uploading..." : "Start Upload"}
      </button>

      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm">
          {progress.toFixed(2)}% completed | ✅ {successCount} Success | ❌{" "}
          {errorCount} Failed
        </p>
      </div>
    </div>
  );
};

export default CreateUser;
