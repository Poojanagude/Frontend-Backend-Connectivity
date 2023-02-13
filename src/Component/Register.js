import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [fname, setFName] = useState("");

  const [file, setFile] = useState("");
  const history = useNavigate();

  //const history = useNavigate();
  const setdata = (e) => {
    const { value } = e.target;
    setFName(value);
  };
  const setimgfile = (e) => {
    setFile(e.target.files[0]);
  };

  //adduser data
  const addUserData = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("photo", file);
    formData.append("fname", fname);

    const config = {
      Headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post("/register", formData, config);
    if (res.data.status === 401 || !res.data) {
      console.log("error");
    } else {
      history("/");
    }
  };

  return (
    <>
      <div className="container mt-3">
        <h1>Upload Your Img Here</h1>

        <Form className="mt-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="fname"
              onChange={setdata}
              placeholder=""
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select Your Image</Form.Label>
            <Form.Control
              type="file"
              name="photo"
              onChange={setimgfile}
              placeholder=""
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={addUserData}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Register;
