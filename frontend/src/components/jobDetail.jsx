import React,{useState,useEffect} from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import {Button, Card} from 'semantic-ui-react'

const JobDetail=(props)=>{

    const params=useParams();
    const [jobs,setJobs]=useState([])
    const [currentUser,setCurrentUser]=useState([]);
    console.log(jobs,currentUser);

    useEffect(()=>{
        
        axios.get(`http://localhost:3000/jobDetails/${params.id}`,{withCredentials:true})
        .then(res=>{
            setJobs(res.data.job);
            setCurrentUser(res.data.user);
        })
        .catch(err=>console.log(err,"error"))
    
        },[])
        const {user, jobtitle, jobdescription, location,_id}=jobs;
        const handleClick=(e)=>{
            e.preventDefault();

            axios.post(`http://localhost:3000/applyjob/${params.id}/company/${user}`,currentUser,{withCredentials:true});

        }

      
        
        return(
            <div>
            <h1>Hello peter</h1>
            <Card link={true} href={`/jobDetails/${_id}`}>
              <Card.Content>
                <Card.Header>{jobtitle}</Card.Header>
                <Card.Meta>{user}</Card.Meta>
                <Card.Description>
                 {jobdescription}
                </Card.Description>
                <Card.Description content={location}  />
              </Card.Content>
              <Button onClick={handleClick}>Apply</Button>
            </Card>
            </div>
        )
    }

    export default JobDetail;