import { useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { useAuthContext } from "../hooks/useAuthContext";

const AppForm = () => {
  const { dispatch } = useAppContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const typesList = ["Web App", "Java App", "Python App", "Others"];

  // const [image, setImage] = useState(null);
  // const [ImageError, setImageError] = useState(null);


  // const handleFileChange = (e) => {
  //   setImage(null);
  //   let selected = e.target.files[0];
  //   console.log(selected);

  //   if (!selected) {
  //     setImageError("Please select a file");
  //     return;
  //   }
  //   if (!selected.type.includes("image")) {
  //     setImageError("Selected file must be an image");
  //     return;
  //   }
  //   if (selected.size > 100000) {
  //     setImageError("Image file size must be less than 100kb");
  //     return;
  //   }

  //   setImageError(null);
  //   setImage(selected);
  //   console.log("Image updated");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("type", type); // Change from languages to type
    // formData.append("desc", desc);
    // formData.append("image", image); // Append the image file to the form data

    const data = {title, type, desc}

    console.log(data)
    const response = await fetch('/api/challenges', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json();
    console.log(json)
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setTitle("");
      setType(""); // Reset type
      setDesc("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_DOC", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Challenge</h3>

      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Type:</label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className={emptyFields.includes("type") ? "error" : ""}
      >
        <option value="">Select a type</option>
        {typesList.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>

      <label>Description:</label>
      <textarea
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
        className={emptyFields.includes("desc") ? "error" : ""}
      ></textarea>

      {/* <label>Image:</label>
      <input
        type="file"
        onChange={handleFileChange}
        className={emptyFields.includes("image") ? "error" : ""}
      /> */}

      <button>Add Challenge</button>
      {/* {ImageError && <div className="error">{ImageError}</div>} */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AppForm;
