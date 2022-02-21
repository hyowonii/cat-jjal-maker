function CatItem({ img, deleteFavorite }) {
  return (
    <li className="favcat">
      <img src={img} style={{ width: "150px" }} />
      <button className="btn" onClick={() => deleteFavorite(img)}>X</button>
    </li >
  );
};

export default CatItem;