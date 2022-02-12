import React,{ useState, useEffect, useContext } from "react";
import Axios from 'axios'

//import style
import '../custom.scss';
import { Card, Button, Form, Row, Col, Container, Image, CardGroup } from 'react-bootstrap';
import { GrSearch, GrLocation } from "react-icons/gr";
import { AiOutlineHeart } from "react-icons/ai";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { AuthContext } from "../Auth";

const History = () =>{
    const [historyPost, setHistoryPost] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect (() => {
        Axios.get(`http://localhost:8000/history/${currentUser.uid}`, {
        }).then((response) => {
            setHistoryPost(response.data);
        });
    })

    return (
        <div>
            
        </div>
    );
};

export default History;