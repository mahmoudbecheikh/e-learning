import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Cours.css";

export default function CoursItem() {
  const [cours, setCours] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Chargement...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Probléme!</p>
      )}
      {cours && !loading && !error && (
        <div className="video-display">
          <h1>{cours.nom}</h1>
          <p>{cours.description}</p>
          <video
            controls
            src={`http://localhost:5000/uploads/${cours.video.filename}`}
            width={"100%"}
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            autoPlay
            // onEnded={() => addProgress(lecture._id)}
          ></video>
          <div className="files-list">
            <h2>Files</h2>
            <ul>
              {cours.files.map((file, index) => (
                <li key={index}
                //  onClick={() => downloadFile(file.filename)}
                >
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

// const downloadFile = async (file) => {
//   var body = { filename: file };
//   const data = await axios.post(`http://localhost:5000/download`, body, {
//     responseType: "blob",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   return data;
// };
