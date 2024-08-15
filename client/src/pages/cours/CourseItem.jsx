import { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import "./Cours.css";
import axios from "axios";
import VideoPlayer from "../../components/VideoPlayer";

export default function CoursItem() {
  const [cours, setCours] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const location = useLocation();
  const { isCompleted } = location.state || {};
  const [videoEnded, setVideoEnded] = useState(false);
  const handleVideoEnd = (hasEnded) => {
    setVideoEnded(hasEnded);
  };

  useEffect(() => {
    const fetchCours = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/cours/${params.coursId}`
        );
        console.log(response.data);

        setCours(response.data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCours();
  }, [params.coursId]);

  useEffect(() => {
    const updateProgress = async () => {
      if (cours && videoEnded && !isCompleted) {
        console.log('hello');
        const myForm = {
          cours: cours._id,
        };
        const progressId = localStorage.getItem("progress");
        try {
          const data = await axios.patch(
            `http://localhost:5000/progress/${progressId}`,
            myForm
          );
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    updateProgress();
  }, [videoEnded,cours]);


  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Chargement...</p>}
      {error && <p className="text-center my-7 text-2xl">Problème!</p>}
      {cours && !loading && !error && (
        <div className="video-display">
          <h1>{cours.nom}</h1>
          <p>{cours.description}</p>
          <VideoPlayer
            url={`http://localhost:5000/${cours.video.path}`}
            onVideoEnd={handleVideoEnd}
          />

          <div className="files-list">
            <h2>Files</h2>
            <ul>
              {cours.files.map((file, index) => (
                <li key={index}>
                  <a
                    href={`http://localhost:5000/${file.filename}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {file.originalname}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
