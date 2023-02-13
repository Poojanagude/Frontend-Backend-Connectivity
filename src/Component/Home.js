import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Alert from 'react-bootstrap/Alert';

const Home = () => {
  const [shows, setShows] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
//console.log(data)
  const getUserData = async () => {
    const res = await axios.get("/getdata", {
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (res.data.status === 401 || !res.data) {
      console.log("error");
    } else {
      setData(res.data.getUser)
    }
  }
 

const dltUser = async(id)=>{
  const res = await axios.delete(`/${id}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (res.data.status === 401 || !res.data) {
    console.log("error")
  } else {
 console.log("User Deleted");

  }

}


  useEffect(()=>{
    getUserData()
  },[dltUser])

  return (
    <>

    {
   show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
   User Delete
 </Alert>:""

    }
      <div className="container mt-2">
        <h1 className="text-center mt-2">Images Uploads</h1>
    
      <div className="text-end">
        <Button variant="primary">
          <NavLink to="/register" className="text-decoration-none text-light">
            Add User
          </NavLink>
        </Button>
      </div>

      <div className="row d-flex  align-items-center mt-5  m-3">
        {
          data.length > 0 ? data.map((el,i)=>{
            return(
              <>
              
        <Card style={{ width: "22rem", height: "21rem" }} className="mb-3">
          <Card.Img
            variant="top"
            style={{ width: "100px", textAlign: "center", margin: "auto" }}
            src={`/uploads/${el.imgpath}`}
            className="mt-2"
          />
          <Card.Body className="text-center">
            <Card.Title>Product Name:{el.fname}</Card.Title>
            <Card.Text>
            Date Added:{moment(el.date).format('L')}
            </Card.Text>
            <Button variant="primary"  onClick={handleShow}>Enquiry</Button>
            <Button variant="danger" className="m-2" onClick={()=> dltUser(el._id)}>
              Delete
            </Button>
          </Card.Body>
        </Card>


        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <div className="col-md-6">
         
          </div>
            <div className="col-md-6">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>product</Form.Label>
              <Form.Control
                type=""
                placeholder="name"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type=""
                placeholder="name"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={2} />
            </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="primary" onClick={handleClose}>
          Submit
          </Button>
        </Modal.Footer>
      </Modal>

              </>
            )
          }):""
        }

        </div>
      </div>
    </>
  );
};

export default Home;
