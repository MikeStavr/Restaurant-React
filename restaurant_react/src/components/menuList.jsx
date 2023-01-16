import axios from "axios";

export default function MenuList({ dishes, deleteDish }) {
  return dishes.map((dish) => {
    return (
      <div
        key={dish.id}
        className="mt-5 m-3 card align-items-center"
        style={{ width: "18rem" }}
      >
        <div className="ms-auto m-2">
          <button
            className="btn btn-danger"
            onClick={(e) => {
              e.stopPropagation();
              deleteDish(dish.id);
            }}
          >
            X
          </button>
        </div>
        <img
          className="card-img-top"
          src={`http://localhost:8080/${dish.image}`}
          alt="Card image cap"
          style={{ width: "75%" }}
        />
        <div className="card-body">
          <h5 className="card-title">{dish.dishName}</h5>
          <p className="card-text">
            {dish.dishDescription} <br /> Price: €{dish.dishPrice}
          </p>
        </div>
      </div>
    );
  });
}
