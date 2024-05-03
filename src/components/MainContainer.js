import {useSelector} from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies);
    if (!movies) return null; // or handle the empty case as per your requirement
    const mainMovie = movies[0];
    // console.log(mainMovie);

    if (!mainMovie) return null; // or handle the undefined case

    const {
        original_title,
        overview,
        id
    } = mainMovie;

    return (
        <div className='bg-opacity-50'>
            <VideoTitle title={original_title} overview={overview}/>
            <VideoBackground movieId={id}/>
        </div>
    );
};

export default MainContainer;