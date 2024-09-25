import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Cours.css";
import { Button } from "@chakra-ui/react";
import axios from "axios";

export default function UpdateCourse() {
  const [cours, setCours] = useState(null);
  const [, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [, setLoading] = useState(true);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [video, setvideo] = useState("");
  const [files, setFiles] = useState([]);
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);


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
        setNom(data.nom);
        setDescription(data.description)
        setFiles(data.files)
        setvideo(data.video)
        setVideoPrev(`http://localhost:5000/${data.video.path}`);
        console.log(videoPrev);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCours();
  }, [params.coursId]);


  const changeVideoHandler = (e) => {
    const video = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(video);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setvideo(video);
    };
  };

  const changeFilesHandler = (e) => {
    setFiles(e.target.files);
  };

  const updateHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("nom", nom);
    myForm.append("description", description);
    myForm.append("files", video);

    console.log(files);
    console.log(video);

    for (let index = 0; index < files.length; index++) {
      myForm.append("files", files[index]);
    }

    try {
      const { data } = await axios.patch(
        `http://localhost:5000/cours/${cours._id}`,
        myForm
      );
      if(data){
        setBtnLoading(false);
        setNom("");
        setDescription("");
        setvideo("");
        setVideoPrev("");
        navigate(`/cours`)

      }

    } catch (error) {
      setBtnLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Update Course</h2>
      {cours && (
        <form onSubmit={updateHandler}>
          <label htmlFor="text">Nom</label>
          <input
            type="text"
            defaultValue={cours.nom.toString()}
            onChange={(e) => setNom(e.target.value)}
            required
          />

          <label htmlFor="text">Description</label>
          <textarea
            defaultValue={cours.description.toString()}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="file"
            placeholder="choose video"
            onChange={changeVideoHandler}
          />

          {videoPrev && (
            <video src={videoPrev} alt="" width={300} controls></video>
          )}

          <input
            onChange={changeFilesHandler}
            className="p-3 border border-gray-300 rounded w-full"
            type="file"
            id="files"
            multiple
          />

          <div className="files-list">
            <ul>
              {cours.files.map((file, index) => (
                <li
                  key={index}
                  //  onClick={() => downloadFile(file.filename)}
                >
                  <a
                    href={`http://localhost:5000/uploads/${file.filename}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {file.originalname}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Button disabled={btnLoading} type="submit" className="common-btn">
            {btnLoading ? "Please Wait..." : "Update"}
          </Button>
        </form>
      )}
    </div>
  );
}