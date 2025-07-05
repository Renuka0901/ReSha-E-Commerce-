import React from 'react';
import './Beauty.css';

const beautyProducts = [
  { id: 1, name: 'Lipstick Set', price: '₹499', image: 'https://assets.myntassets.com/f_webp,q_90,w_240,c_limit,fl_progressive/assets/images/12333498/2022/1/10/4a448f35-fd1a-4ad5-b26f-948f39c24fdb1641813178662MaybellineNewYorkColorSensationalCreamyMatteLipstick-3.9g.jpg' },
  { id: 2, name: 'Face Wash', price: '₹299', image: 'https://assets.myntassets.com/f_webp,q_90,w_240,c_limit,fl_progressive/assets/images/23250596/2023/5/16/7b839a0d-4765-4df3-b38d-e79d01fe5c0c1684234008928MCaffeineCappuccinoCoffeeFoamingFaceWash75ml1.jpg' },
  { id: 3, name: 'Compact Powder', price: '₹399', image: 'https://assets.myntassets.com/f_webp,q_90,w_240,c_limit,fl_progressive/assets/images/14278036/2021/5/27/399c2bb5-f0c9-4dd1-8098-816be992bb671622114734638-LOreal-Paris-True-Match-Pressed-Powder-99-Natural-Rose-6g-1.jpg' }
];

const Beauty = () => {
  return (
    <div className="men-page">
      <h1 className="title">Beauty & Skincare</h1>
      <div className="product-grid">
        {beautyProducts.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Beauty;
