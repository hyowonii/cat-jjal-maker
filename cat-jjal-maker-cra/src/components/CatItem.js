function CatItem({ img, deleteFavorite }) {
    return (
        <li>
            <img src={img} style={{ width: "150px" }} />
            <button className="btn" onClick={() => deleteFavorite(img)}>삭제</button>
        </li>
    );
};

export default CatItem;