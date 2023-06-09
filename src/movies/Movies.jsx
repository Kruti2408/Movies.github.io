import React , { useEffect , useState} from 'react'
import axios from "axios";
import './Movies.Module.css';

const Movies = () => {

  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(()=> {
    const fetchMovies = async()=> {
      const response = await axios.get('https://www.omdbapi.com/?apikey=45f0782a&s=war')

      setMovies(response.data.Search);
      setSearchedMovies(response.data.Search);
      console.log(response.data.Search);
    }
  fetchMovies();

  }, [])

  const searchHandler = (text) => {
    let temp = movies;
    temp = temp.filter((item,i)=> item.Title.toLowerCase().includes(text.toLowerCase()));

    console.log(temp);
    setSearchedMovies(temp);
    setSearch(text);
    if (text='')setSearchedMovies(movies);
  }

  const MovieCard = ({item})=> {
    return (
      <div className='flex flex-col gap-2 bg-white rounded-xl p-2 text-black cursor-pointer movie_card'>
        <img src={`${item.Poster}`} alt="" />
        <p className=' test-[10px] text-center'> <i class="fa-solid fa-video fa-fade"></i>  {item.Year} </p>
        <p className='text-xl font-bold text-center title'> {item.Title} </p>
        
      </div>
    )
  }


  return (
    <div className='bg-[#1e2931] p-4'>
      <div className='flex justify-center'>
        <input onChange={(e) => searchHandler(e.target.value)} placeholder='Search Your Movie Here' type="text" className='bg-white p-1 m-auto w-[60%] text-xs' />
      </div>

      <div className='p-10 grid grid-cols-4 gap-2'>
        {searchedMovies.map((item,i) => 
        <MovieCard key={i} item={item}/>
        )}
      </div>
      
      {searchedMovies.length === 0 && <h4 className='text-center text-white'>NO MOVIES FOUND</h4>}
    </div>
  )
}

export default Movies
