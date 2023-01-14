export default function MenuList({ dishes }) {
  return dishes.map((dish) => {
    return (
      <div
        key={dish.id}
        className="card m-1"
        style={{ background: "rgba(255, 255, 255, 0.5)" }}
      >
        <div className="card-body p-2">
          <div className="d-flex justify-content-between align-content-center">
            <p> {dish.image} </p>
            <h5 className="card-title">{dish.dishName}</h5>
            <p className="card-text">{dish.dishDescription}</p>
            <p className="card-text">{dish.dishPrice}</p>
          </div>
        </div>
      </div>
    );
  });
}
