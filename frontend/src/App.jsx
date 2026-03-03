import React, { useState, useEffect } from 'react';
import './index.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [stickers, setStickers] = useState([]);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderForm, setOrderForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_address: '',
    quantity: 1
  });

  useEffect(() => {
    fetch(`${API_URL}/stickers`)
      .then(res => res.json())
      .then(data => {
        setStickers(data);
        setLoading(false);
      })
      .catch(err => console.error('Error loading stickers:', err));
  }, []);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...orderForm,
          sticker_id: selectedSticker.id
        })
      });
      
      if (response.ok) {
        alert('STRIKE! Order Received! 🚀');
        setSelectedSticker(null);
        setOrderForm({ customer_name: '', customer_email: '', customer_address: '', quantity: 1 });
      }
    } catch (error) {
      alert('Error placing order. Try again.');
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">STICKERLAB</div>
        <div style={{ display: 'flex', gap: '2rem', fontWeight: 800 }}>
          <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>NEW RELEASES</span>
          <span style={{ cursor: 'pointer' }}>LIMITED EDITIONS</span>
        </div>
      </nav>

      <section className="hero" style={{ textAlign: 'center', marginBottom: '6rem' }}>
        <h1 style={{ marginBottom: '1rem' }}>STAND OUT FROM THE CROWD.</h1>
        <p style={{ fontSize: '1.4rem', color: '#999', textTransform: 'uppercase', letterSpacing: '4px' }}>
          Exclusive Decals for the Radical Minds
        </p>
      </section>

      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--primary)', fontSize: '2rem' }}>INITIALIZING...</div>
      ) : (
        <div className="sticker-grid">
          {stickers.map((sticker) => (
            <div key={sticker.id} className="sticker-card glass-card">
              <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--primary)', padding: '4px 10px', fontSize: '0.7rem', fontWeight: 900 }}>HOT</div>
              <img src={sticker.image_url} alt={sticker.name} className="sticker-image" />
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', fontWeight: 900, textTransform: 'uppercase' }}>{sticker.name}</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', width: '100%' }}>
                 <span style={{ color: '#666' }}>{sticker.category}</span>
                 <span style={{ color: 'var(--primary)', fontSize: '1.5rem', fontWeight: '900' }}>${sticker.price}</span>
              </div>
              <button className="btn-order" onClick={() => setSelectedSticker(sticker)}>
                GRAB IT NOW
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedSticker && (
        <div className="modal-overlay" onClick={() => setSelectedSticker(null)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000 }}>
          <div className="modal-content glass-card" style={{ width: '100%', maxWidth: '450px', border: '2px solid var(--primary)' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
                <h2 style={{ fontWeight: 900, color: 'var(--primary)' }}>ORDER: {selectedSticker.name}</h2>
                <button className="close-btn" style={{ fontSize: '2rem', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} onClick={() => setSelectedSticker(null)}>&times;</button>
            </div>
            
            <form onSubmit={handleOrderSubmit}>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label>Commanding Officer Name</label>
                <input 
                  style={{ width: '100%', padding: '1rem', border: '1px solid #333', borderRadius: '4px', background: '#000', color: '#fff' }}
                  type="text" required value={orderForm.customer_name}
                  onChange={e => setOrderForm({...orderForm, customer_name: e.target.value})}
                />
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label>Secure Email</label>
                <input 
                  style={{ width: '100%', padding: '1rem', border: '1px solid #333', borderRadius: '4px', background: '#000', color: '#fff' }}
                  type="email" required value={orderForm.customer_email}
                  onChange={e => setOrderForm({...orderForm, customer_email: e.target.value})}
                />
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label>Delivery Coordinates (Address)</label>
                <textarea 
                  style={{ width: '100%', padding: '1rem', border: '1px solid #333', borderRadius: '4px', background: '#000', color: '#fff' }}
                  required rows="3" value={orderForm.customer_address}
                  onChange={e => setOrderForm({...orderForm, customer_address: e.target.value})}
                ></textarea>
              </div>
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label>Units Needed</label>
                <input 
                  style={{ width: '100%', padding: '1rem', border: '1px solid #333', borderRadius: '4px', background: '#000', color: '#fff' }}
                  type="number" min="1" required value={orderForm.quantity}
                  onChange={e => setOrderForm({...orderForm, quantity: parseInt(e.target.value)})}
                />
              </div>
              <button type="submit" className="btn-order">
                EXECUTE ORDER - ${(selectedSticker.price * orderForm.quantity).toFixed(2)}
              </button>
            </form>
          </div>
        </div>
      )}
      
      <footer className="footer-main">
        <div className="footer-content">
          <div className="logo" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>STICKERLAB</div>
          <p style={{ opacity: 0.7, marginBottom: '2rem', fontWeight: 700 }}>CONTACT: +373 69 123 456</p>
          
          <div className="qr-codes-container">
            <div className="qr-item">
              <div className="social-label facebook">Facebook</div>
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.facebook.com/stickerlab.md" 
                alt="Facebook QR" 
                className="qr-image" 
              />
              <a href="https://www.facebook.com/stickerlab.md" target="_blank" rel="noreferrer" className="social-link">@stickerlab.md</a>
            </div>
            
            <div className="qr-item">
              <div className="social-label instagram">Instagram</div>
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.instagram.com/stickerlab.md/" 
                alt="Instagram QR" 
                className="qr-image" 
              />
              <a href="https://www.instagram.com/stickerlab.md/" target="_blank" rel="noreferrer" className="social-link">@stickerlab.md</a>
            </div>
          </div>
          
          <p style={{ marginTop: '3rem', opacity: 0.3, fontSize: '0.8rem', letterSpacing: '2px' }}>
            &copy; {new Date().getFullYear()} STICKERLAB. ALL SYSTEMS OPERATIONAL.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

