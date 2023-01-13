import { useState } from "react";

export default function UploadForm({ onCreate }) {
  let [dishName, setDishName] = useState("");
  let [dishPrice, setDishPrice] = useState("");
  let [dishImage, setDishImage] = useState("");
  return (
    <>
      <div className="container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (dishName !== "" && dishPrice !== "" && dishImage !== "") {
              onCreate({ name: dishName, price: dishPrice, image: dishImage });
              setDishName("");
              setDishPrice("");
              setDishImage("");
            }
          }}
          className="mt-4"
          method="POST"
          encType="multipart/form-data"
        >
          <div className="input-group mb-3">
            <span className="input-group-text" id="dishName">
              Dish name
            </span>
            <input
              type="text"
              value={dishName}
              className="form-control"
              placeholder="Dish name"
              onChange={(e) => setDishName(e.target.value)}
              aria-label="dishname"
              aria-describedby="dishName"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="dishprice">
              Dish price
            </span>
            <input
              type="text"
              value={dishPrice}
              className="form-control"
              onChange={(e) => setDishPrice(e.target.value)}
              placeholder="Dish price"
              aria-label="dishprice"
              aria-describedby="dishprice"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="dishprice">
              Dish image
            </span>
            <input
              type="file"
              value={dishImage}
              className="form-control"
              placeholder="Dish image"
              onChange={(e) => setDishImage(e.target.value)}
              aria-label="dishImage"
              aria-describedby="dishImage"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit dish
          </button>
        </form>
      </div>
    </>
  );
}
