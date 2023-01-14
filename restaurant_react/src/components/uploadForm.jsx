import { useState } from "react";

export default function UploadForm({ onCreate }) {
  const [file, setFile] = useState(null);
  const [dishName, setDishName] = useState("");
  const [dishPrice, setDishPrice] = useState("");
  const [dishDescription, setDishDescription] = useState("");

  const handleChangePrice = (e) => {
    const result = e.target.value.replace(/\D/g, "");
    setDishPrice(result);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!file || !dishName || !dishPrice || !dishDescription) return;
          onCreate({
            image: file.name,
            name: dishName,
            price: parseInt(dishPrice),
            description: dishDescription,
          });
          console.log(file);
          console.log(file.name);
          console.log(dishName);
          console.log(dishPrice);
          console.log(dishDescription);

          setFile(null);
          setDishName("");
          setDishPrice("");
          setDishDescription("");
        }}
      >
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input
          type="text"
          value={dishName}
          placeholder="Dish Name"
          onChange={(e) => setDishName(e.target.value)}
        />
        <input
          type="text"
          value={dishPrice}
          placeholder="Dish Price"
          onChange={handleChangePrice}
        />
        <input
          type="text"
          value={dishDescription}
          placeholder="Dish Description"
          onChange={(e) => setDishDescription(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
