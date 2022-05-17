import { useState, useEffect } from "react";
import PositiveNotification from './PositiveNotification';

const FishForm = () => {
  const [species, setSpecies] = useState('');
  const [kilogram, setKilogram] = useState('');
  const [floorPrice, setFloorPrice] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [added, setAdded] = useState(false);
  const [error, setError] = useState();


  const [currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    fetch('http://localhost:8080/auction/getCurrentAuction')
      .then(res => res.json())
      .then(
        (result) => {
          setCurrentDate(result.auctionStart);
        },
        (error) => {
          setError(error);
          console.log(error);
        })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAdded(true);
    const newFish = { species, kilogram, floorPrice, sellerName };

    fetch('http://localhost:8080/auction/addFish', {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fishType: newFish.species,
        fishAmount: newFish.kilogram,
        basePrice: newFish.floorPrice,
        sellerName: newFish.sellerName,
      }),
    }).then((response) => response.json())
      .then((result) => {
        console.log("ekledi");
      })

  }

  return (
    <div className="create">
      <h1>Deniz ürünlerini sıradaki mezata ekle</h1>
      <p style={{ color: '#1b4171', fontWeight: 'bold' }}>Sıradaki mezat tarihi : {currentDate}</p>

      <form onSubmit={handleSubmit}>
        <label>Balık Türü:</label>
        <input
          type="text"
          required
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
        />

        <label>Kilosu:</label>
        <input
          required
          value={kilogram}
          onChange={(e) => setKilogram(e.target.value)}
        />

        <label>Taban Fiyatı:</label>
        <input
          value={floorPrice}
          onChange={(e) => setFloorPrice(e.target.value)}
        />

        <label>Satıcı Adı:</label>
        <input
          value={sellerName}
          onChange={(e) => setSellerName(e.target.value)}
        />

        <button>Balık Ekle</button>
        <PositiveNotification trigger={added} setTrigger={setAdded} message="Yeni Deniz Ürünü Eklendi"></PositiveNotification>

      </form>
    </div>
  );
}

export default FishForm;