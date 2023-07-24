import React, {  useState } from 'react'

interface HeroTypeProps {
  id: string;
  name: string;
  image: {
    url: string;
  };
  biography: {
    'full-name': string;
  };
}
const Home = () => {

  const [search, setSearch] = useState<string>('')
  const [heroes, setHeroes] = useState<HeroTypeProps[]>([])
  


  const getData = async (name: string) => {
    const response = await fetch(
      `https://www.superheroapi.com/api.php/10224590504484555/search/${name}`
    ).then((response) => response.json());
    return response;
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getData(search).then((data) => {
      setHeroes(data.results)
    })
  }
  return (
    <>
      <form className="d-flex ms-auto" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Search your Hero"
          className="mr-2"
          aria-label="Search"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="searchButton" type="submit">Search</button>
      </form>
      <div>
        {heroes && heroes.map((hero) =>{
          return(
            <div className="card">
              <img src={hero.image.url} alt="hero" />
              <div className="card-body">
                <p>{hero.id}</p>
                <h5 className="card-title">{hero.name}</h5>
                <p className="card-text">{hero.biography['full-name']}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Home
