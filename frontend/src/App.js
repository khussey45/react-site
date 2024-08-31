import React, { useEffect, useState } from 'react';

function App() {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/portfolio')
      .then((response) => response.json())
      .then((data) => setPortfolio(data.portfolio))
      .catch((error) => console.error('Error fetching portfolio:', error));
  }, []);

  return (
    <div>
      <h1>Kieren Hussey</h1>
      <ul>
        {portfolio.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <img src={item.image} alt={item.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
