import { useState } from "react";

export default function UploadForm({ onCreate }) {
  const [file, setFile] = useState(null);
  const [dishName, setDishName] = useState("");
  const [dishPrice, setDishPrice] = useState("");
  const [dishDescription, setDishDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const handleChangePrice = (e) => {
    const result = e.target.value.replace(/\D/g, "");
    setDishPrice(result);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!file || !dishName || !dishPrice || !dishDescription) {
            alert("Please fill in all fields");
            return;
          }
          onCreate({
            image: file,
            name: dishName,
            price: parseInt(dishPrice),
            description: dishDescription,
          });
          setFile(null);
          setDishName("");
          setFileName("");
          setDishPrice("");
          setDishDescription("");
        }}
      >
        <div className="card mx-auto mt-3" style={{ width: "50rem" }}>
          <div className="input-group mb-3">
            <span className="input-group-text">Dish name</span>
            <input
              type="text"
              value={dishName}
              onChange={(e) => {
                setDishName(e.target.value);
              }}
              className="form-control"
              aria-label="dish name"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Dish price</span>
            <input
              type="text"
              value={dishPrice}
              onChange={handleChangePrice}
              className="form-control"
              aria-label="dish price"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Dish description</span>
            <textarea
              rows={2}
              value={dishDescription}
              onChange={(e) => {
                setDishDescription(e.target.value);
              }}
              className="form-control"
              aria-label="dish name"
            />
          </div>{" "}
          <div className="input-group mb-3">
            <input
              type="file"
              value={fileName}
              onChange={(e) => {
                setFileName(e.target.value);
                setFile(e.target.files[0]);
              }}
              className="form-control"
              aria-label="dish name"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mx-auto"
            style={{ width: "50%" }}
          >
            Add dish
          </button>
        </div>
      </form>
    </>
  );
}
