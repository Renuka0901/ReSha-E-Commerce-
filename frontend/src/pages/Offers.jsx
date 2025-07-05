// src/pages/Offers.jsx
import React, { useState } from 'react';
import './Offers.css';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [newOffer, setNewOffer] = useState({
    title: '',
    description: '',
    discount: '',
    image: '',
  });
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewOffer({ ...newOffer, image: reader.result });
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddOffer = () => {
    if (!newOffer.title || !newOffer.description || !newOffer.discount) return;
    setOffers([...offers, { ...newOffer, id: Date.now() }]);
    setNewOffer({ title: '', description: '', discount: '', image: '' });
    setPreview(null);
  };

  const handleDelete = (id) => {
    setOffers(offers.filter((offer) => offer.id !== id));
  };

  return (
    <div className="offers-container">
      <h1 className="offers-title">🎁 Manage Offers</h1>

      <div className="offer-form">
        <input
          type="text"
          placeholder="Offer Title"
          value={newOffer.title}
          onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
        />
        <textarea
          placeholder="Offer Description"
          value={newOffer.description}
          onChange={(e) =>
            setNewOffer({ ...newOffer, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Discount (e.g. 20% Off)"
          value={newOffer.discount}
          onChange={(e) =>
            setNewOffer({ ...newOffer, discount: e.target.value })
          }
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && (
          <img src={preview} alt="Preview" className="offer-preview" />
        )}
        <button className="add-offer-btn" onClick={handleAddOffer}>
          ➕ Add Offer
        </button>
      </div>

      <div className="offers-list">
        {offers.length === 0 ? (
          <p className="no-offers">No offers added yet.</p>
        ) : (
          offers.map((offer) => (
            <div key={offer.id} className="offer-card">
              <img src={offer.image} alt={offer.title} className="offer-img" />
              <div className="offer-details">
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
                <span className="discount-tag">{offer.discount}</span>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(offer.id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Offers;
