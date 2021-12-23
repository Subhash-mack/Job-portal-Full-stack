import React,{Component} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import {Card} from 'semantic-ui-react'

const Joblist=(jobs)=>{

    const {user, jobtitle, jobdescription, location,_id}=jobs.value;

    return (
        <Card link={true} href={`/jobDetails/${_id}`}>
          <Card.Content>
            <Card.Header>{jobtitle}</Card.Header>
            <Card.Meta>{user}</Card.Meta>
            <Card.Description>
             {jobdescription}
            </Card.Description>
            <Card.Description content={location}  />
          </Card.Content>
        </Card>
    
        )

}

export default class ApplyJob extends Component{
    constructor(props){
        super(props);
        this.state={
            jobList:[]
        }

    }

    componentDidMount(){
    axios.get("http://localhost:3000/applyJob",{withCredentials:true})
    .then(res=>{
        this.setState({
            jobList:res.data
        });
        // this.state.jobList.map(job=> console.log(job))
    })
    .catch(err=>console.log(err,"error"))

    }
    
    render()
    {
        return(
        <div>
        <h1>Apply Job</h1>
        <Card.Group>
           {this.state.jobList.map((job,index)=>
               <Joblist key={index.toString()} value={job} />
           )}
           </Card.Group>
                <div id="logout"><Link to="/logout">LOGOUT</Link></div>
                </div>
                )
    }
}