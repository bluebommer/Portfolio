import { useEffect, useState } from "react";

function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/portfolio")
      .then(res => res.json())
      .then(data => setPortfolio(data))
      .catch(err => console.error("Error fetching portfolio:", err));
  }, []);

  return (
    <div className="portfolio">
      <h2>My Portfolio</h2>
      <div className="grid">
        {portfolio.map(item => (
          <div key={item.id} className="portfolio-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.image && <img src={`http://localhost:5000${item.image}`} alt={item.title} />}
            {item.link && (
              <a href={item.link} target="_blank" rel="noreferrer">
                View Project
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Portfolio;
