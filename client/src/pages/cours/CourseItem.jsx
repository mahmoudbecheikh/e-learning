import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button } from '@chakra-ui/react';
import "./Cours.css";
import EvaluationsList from "../evaluation/EvaluationsList";
import EvaluationForm from "../evaluation/EvaluationForm";

export default function CoursItem() {
  const [cours, setCours] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showEvaluations, setShowEvaluations] = useState(false);
  const [showAddEvaluationForm, setShowAddEvaluationForm] = useState(false); // New state
  const params = useParams();

  useEffect(() => {
    const fetchCours = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/cours/${params.coursId}`);
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
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
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
          ></video>
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

          
          {/* <Button onClick={() => setShowEvaluations(!showEvaluations)} mt="4" colorScheme="teal">
            {showEvaluations ? 'Masquer les Questions' : 'Afficher les Questions'}
          </Button>
          
          {showEvaluations && (
            <Box mt="4">
              <EvaluationsList courseId={params.coursId} />
            </Box>
          )} */}


        </div>
      )}
    </main>
  );
}
