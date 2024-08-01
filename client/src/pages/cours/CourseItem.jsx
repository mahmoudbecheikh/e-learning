import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player';
import "./Cours.css";

export default function CoursItem() {
  const [cours, setCours] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const playerRef = useRef(null); // Référence pour ReactPlayer
  const params = useParams();

  useEffect(() => {
    const fetchCours = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5000/cours/${params.coursId}`
        );

        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setCours(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCours();
  }, [params.coursId]);

  const handleProgress = (progress) => {
    setPlayedSeconds(progress.playedSeconds);
  };

  const handleDuration = (duration) => {
    setVideoDuration(duration);
  };

  const handleSeek = (newTime) => {
    // Réinitialiser la position si l'utilisateur tente d'avancer
    if (newTime > playedSeconds) {
      playerRef.current.seekTo(playedSeconds, 'seconds');
    }
  };

  const isVideoComplete = playedSeconds >= videoDuration;

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Chargement...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Problème!</p>
      )}
      {cours && !loading && !error && (
        <div className="video-display">
          <h1>{cours.nom}</h1>
          <p>{cours.description}</p>
          <ReactPlayer
            ref={playerRef}
            url={`http://localhost:5000/uploads/${cours.video.filename}`}
            width="100%"
            controls
            autoPlay
            config={{ file: { attributes: { controlsList: 'nodownload noremoteplayback' } } }}
            onProgress={handleProgress}
            onDuration={handleDuration}
            onSeek={handleSeek}
            progressInterval={1000}
            playIcon={<button>Play</button>}
            light
          />
          <div className="video-status">
            <p>Temps visionné: {Math.floor(playedSeconds)} secondes</p>
            <p>Temps total: {Math.floor(videoDuration)} secondes</p>
            <p>
              {isVideoComplete ? "Vidéo terminée" : "Vidéo en cours"}
            </p>
          </div>
          <div className="files-list">
            <h2>Files</h2>
            <ul>
              {cours.files.map((file, index) => (
                <li key={index}>
                  <a
                    href={`http://localhost:5000/uploads/${file.filename}`}
                    target="_blank" rel="noreferrer"
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
