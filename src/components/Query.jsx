import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import { Link, useNavigate } from "react-router-dom";
const Query = () => {
    const [world, setWorld] = useState({
        name : "",
        url : ""
    });
    const [obj, setObj] = useState([]);
    const { attr, id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`https://swapi.dev/api/${attr}/${id}`)
            .then(response => setObj(response.data))
            .catch(error => navigate("/*"))
    }, [attr, id, navigate]);

    const getHomeWorld = ((link) => {
        axios.get(link).then(response => setWorld({
            name: response.data.name,
            url: response.data.url
        }))
    })
    return (
        <div>
            {
                obj.name ?
                <h1>{obj.name}</h1> : 
                <h1>{obj.title}</h1>
            }
            {
                Object.keys(obj).map((attr, i) => {
                    return (
                        <div key={i}>
                            {
                                attr === "homeworld" ?
                                getHomeWorld(obj[attr]) : <></>
                            }
                            {
                                (attr === 'name' || attr ==='title' || attr === "model") ?
                                <></> : attr === 'homeworld' ?
                                <p><span style={{fontWeight:"bold", textTransform: "capitalize"}}>{attr.replace('_', " ")}:</span> <Link to={world.url.slice(world.url.indexOf("/planets"), -1)}>{world.name}</Link></p> : 
                                <p><span style={{fontWeight:"bold", textTransform: "capitalize"}}>{attr.replace('_', " ")}:</span> {obj[attr]}</p>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Query