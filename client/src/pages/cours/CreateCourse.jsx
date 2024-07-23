import React, { useState } from "react";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import "./CreateCourse.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import * as moment from 'moment';

const CreateCourse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { niveauIndex } = useParams();
  const { formationData } = location.state || {};

  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [files, setFiles] = useState([]);
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const changeVideoHandler = (e) => {
    const video = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(video);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(video);
    };
  };

  const changeFilesHandler = (e) => {
    setFiles(e.target.files);
  };

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();
    let dateCreation = moment(Date.now()).format('DD-MMM-YYYY HH:mm:ss');

    myForm.append("nom", nom);
    myForm.append("description", description);
    myForm.append("files", video);
    myForm.append("dateCreation", dateCreation);

    for (let index = 0; index < files.length; index++) {
      myForm.append("files", files[index]);
    }

    try {
      const { data } = await axios.post('http://localhost:5000/cours', myForm);
      console.log(data)
      if (data) {
        setBtnLoading(false);
        const newCourse = {
          id: data._id,  
          nom,
          description,
          video: data.video, 
          files:data.files,
          dateCreation,
        };
        navigate('/addformation', {
          state: {
            formationData,
            niveauIndex: parseInt(niveauIndex, 10),
            newCourse,
          },
        });
      }
    } catch (error) {
      console.log(error);
      setBtnLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Course</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="text">Nom</label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />

        <label htmlFor="text">Description</label>
        <textarea
          value={description}
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

        <Button disabled={btnLoading} type="submit" className="common-btn">
          {btnLoading ? "Please Wait..." : "Add"}
        </Button>
      </form>
    </div>
  );
};

export default CreateCourse;
