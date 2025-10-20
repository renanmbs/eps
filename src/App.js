import './App.css';
import { useState, useEffect } from 'react';
import logo from "./image/Monarch Metal White Transparent.png";

const CARD_DATA = [
  { range: "1 to 50", min: 1, max: 2 },
  { range: "51 to 300", min: 2, max: 4 },
  { range: "301 to 500", min: 4, max: 7 },
  { range: "More than 500", special: true }
];

function addDays(days) {
  const newDate = new Date();
  newDate.setDate(newDate.getDate() + days);
  return newDate.toLocaleDateString();
}

function App() {
  const [qty, setQty] = useState("");
  const [particles, setParticles] = useState([]);

  // Initialize particles only once
  useEffect(() => {
    setParticles(
      Array.from({ length: 25 }).map(() => ({
        left: Math.random() * 100,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 5,
        size: 2 + Math.random() * 4
      }))
    );
  }, []);

  const getLeadTime = (qty) => {
    if (!qty || qty <= 0) return null;
    if (qty <= 50) return CARD_DATA[0];
    if (qty <= 300) return CARD_DATA[1];
    if (qty <= 500) return CARD_DATA[2];
    return CARD_DATA[3];
  };

  const lead = getLeadTime(Number(qty));

  return (
    <>
      {/* Particle Background */}
      <div className="particles">
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${p.left}vw`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>

      <div className="App">
        <h1>EPS Lead Times</h1>
        <p className="today-date">Today: {new Date().toLocaleDateString()}</p>

        <label className="input-label">
          Quick Quantity Search:
          <input
            type="number"
            placeholder="Enter quantity..."
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="qty-input"
          />
        </label>

        {/* Search Result */}
        {qty === "" ? (
          <p className="hint">Enter a quantity to see estimated lead time.</p>
        ) : lead ? (
          <div className="search-result">
            {!lead.special ? (
              <>
                <p className="result-title">Estimated Lead Time</p>
                <p><strong>{lead.min}-{lead.max} days</strong></p>
                <p>Earliest: <strong>{addDays(lead.min)}</strong></p>
                <p>Latest: <strong>{addDays(lead.max)}</strong></p>
              </>
            ) : (
              <>
                <p><strong>More than 500 pieces — Contact the shop.</strong></p>
              </>
            )}
          </div>
        ) : (
          <p className="hint error">Please enter a valid quantity.</p>
        )}

        {/* Lead Time Cards */}
        <div className="card-container">
          {CARD_DATA.map((card, idx) => (
            <div
              key={idx}
              className={`card ${lead?.range === card.range ? "active" : ""}`}
            >
              <h3>{card.range}</h3>
              {!card.special ? (
                <>
                  <p>{card.min}-{card.max} days</p>
                  <p>Earliest: <strong>{addDays(card.min)}</strong></p>
                  <p>Latest: <strong>{addDays(card.max)}</strong></p>
                </>
              ) : (
                <p>Please contact the shop</p>
              )}
            </div>
          ))}
        </div>
        {logo && <img src={logo} alt="Company Logo" style={{ marginTop: '2rem', width: '25rem' }} />}
      </div>
    </>
  );
}

export default App;
