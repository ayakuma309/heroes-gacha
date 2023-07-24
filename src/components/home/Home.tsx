import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import HerosData from "../../json/hero.json";

interface HeroDataProps {
  id: number;
  name: string;
  image: string;
  fullname: string;
}
const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const heroesData = [...HerosData];
  const [randomHeroes, setRandomHeroes] = useState<HeroDataProps[] | null>(null);

  useEffect(() => {
    if (heroesData.length > 0) {
      const shuffledHeroesData = heroesData;
      for (let i = shuffledHeroesData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledHeroesData[i], shuffledHeroesData[j]] = [
          shuffledHeroesData[j],
          shuffledHeroesData[i],
        ];
      }
      setRandomHeroes(shuffledHeroesData.slice(0, 6));
      setLoading(false);
    }
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <div className={styles.container}>
          {randomHeroes && randomHeroes.map((hero) => {
            return (
              <div className={styles.card} key={hero.id}>
                <div className={styles.card_img}>
                  <img src={hero.image} alt="hero" />
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    {hero.name}<br/>
                    <small className="card-text">{hero.fullname}</small>
                  </h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
