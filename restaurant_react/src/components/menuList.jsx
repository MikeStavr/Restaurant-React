export default function MenuList({ dishes }) {
  return dishes.map((dish) => {
    return (
      <div
        key={dish.id}
        className="mt-5 m-3 card align-items-center"
        style={{ width: "18rem" }}
      >
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
