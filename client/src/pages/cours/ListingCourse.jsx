import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Listing.css";
// import { server } from "../../main";
import Loading from "../../utils/loading";
import toast from "react-hot-toast";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

const Cours = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  async function fetchCourses() {
    try {
      const { data } = await axios.get(`http://localhost:5000/cours`);
      setCourses(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:5000/cours/${id}`, {
        // headers: {
        //   token: localStorage.getItem("token"),
        // },
      });

      toast.success(data.message);
      fetchCourses();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Button
            className="common-btn"
            onClick={() => navigate(`/cours/addCours`)}
          >
            Ajouter Cours
          </Button>
          <div className="courses-table">
            {courses && courses.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nom</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr key={course._id}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={`/cours/${course._id}`}>{course.nom}</Link>
                      </td>
                      <td>{format(course.dateCreation,'dd/MM/yyyy HH:mm')}</td>
                      <td>
                        <FontAwesomeIcon
                          className="action-button"
                          onClick={() => deleteHandler(course._id)}
                          icon={faTrash}
                          style={{ color: "red" }}
                        />
                        <FontAwesomeIcon
                          className="action-button"
                          onClick={() =>
                            navigate(`/cours/update/${course._id}`)
                          }
                          icon={faEdit}
                          style={{ color: "green" }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No Course Yet!</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cours;
