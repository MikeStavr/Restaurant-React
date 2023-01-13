export default function MenuList({ dishes }) {
  return dishes.map((dish) => {
    return (
      <div
        key={dish.id}
        className="m-1 card"
        style={{ background: "lightgray" }}
      >
        <div className="card-body p-2">
          <div className="d-flex justify-content-between align-content-center">
            <span>{dish.dishName}</span>
            <span>{dish.dishPrice}</span>
            <span>{dish.image}</span>
          </div>
        </div>
      </div>
    );
  });
}
