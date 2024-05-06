// MainContainer.jsx
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies);
    if (!movies) return null;
    const mainMovie = movies[0];

    if (!mainMovie) return null;

    const { original_title, overview, id } = mainMovie;

    return (
        <div className="bg-opacity-50 h-full w-full">
            <div className="relative h-full">
                <VideoTitle title={original_title} overview={overview} />
                <VideoBackground movieId={id} />
            </div>
        </div>
    );
};

export default MainContainer;