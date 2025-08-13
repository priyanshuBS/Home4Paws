import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import toast from "react-hot-toast";

const initialState = {
  name: "",
  species: "",
  breed: "",
  age: "",
  gender: "",
  description: "",
  vaccinated: false,
  neutered: false,
  location: "",
  images: [],
};

const AddPet = () => {
  const [formData, setFormData] = useState(initialState);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "file") return;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (formData.images.length + files.length > 5) {
      toast.error("You can upload a maximum of 5 images.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();

    for (const [key, value] of Object.entries(formData)) {
      if (key === "images") {
        value.forEach((img) => data.append("images", img));
      } else {
        data.append(key, value);
      }
    }

    try {
      await api.post("/pets/add-pet", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Pet added successfully!");
      navigate("/pets");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add pet.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-10 rounded-3xl shadow-2xl space-y-8"
        encType="multipart/form-data"
      >
        <h2 className="text-4xl font-bold text-gray-800 text-center">
          🐾 Add a New Pet
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Pet Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 px-4 py-2 rounded-lg w-full text-base focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="text"
            name="species"
            placeholder="Species"
            value={formData.species}
            onChange={handleChange}
            required
            className="border border-gray-300 px-4 py-2 rounded-lg w-full text-base focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="text"
            name="breed"
            placeholder="Breed"
            value={formData.breed}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-lg w-full text-base focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="border border-gray-300 px-4 py-2 rounded-lg w-full text-base focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="border border-gray-300 px-4 py-2 rounded-lg w-full text-base focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="border border-gray-300 px-4 py-2 rounded-lg w-full text-base focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <textarea
          name="description"
          placeholder="Describe your pet..."
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="border border-gray-300 px-4 py-2 rounded-lg w-full text-base resize-none focus:outline-none focus:ring-2 focus:ring-gray-500"
        ></textarea>

        <div className="flex flex-wrap gap-6 text-gray-800">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="vaccinated"
              checked={formData.vaccinated}
              onChange={handleChange}
              className="accent-gray-700"
            />
            Vaccinated
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="neutered"
              checked={formData.neutered}
              onChange={handleChange}
              className="accent-gray-700"
            />
            Neutered
          </label>
        </div>

        <div>
          <label className="block mb-2 text-base font-medium text-gray-700">
            Upload Images (Max 5)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="border border-gray-300 p-2 rounded-lg w-full text-base text-gray-600 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-600 hover:file:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {imagePreviews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Preview ${idx}`}
                className="h-32 w-full object-cover rounded-xl border border-gray-300 shadow-sm"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 cursor-pointer"
        >
          {submitting ? "Submitting..." : "Add Pet"}
        </button>
      </form>
    </div>
  );
};

export default AddPet;
