import React,{Component} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button, Form ,Item,Card, CardGroup,Message} from "semantic-ui-react";


const PostJobForm=({value,handleChange,handleSubmit})=>{
    const {jobTitle,jobDescription,jobLocation,keywords,formSuccess}=value;
    return(<div>
        <h1>Job Name</h1>
        <Form onSubmit={(e)=>handleSubmit(e)} success={formSuccess}>
        <Message
            success
            header="Form completed"
            content="Job has been added"
        />
        <Form.Input label="Job Title" type="text" name="jobTitle" required={true} value={jobTitle}
            onChange={(e)=>handleChange(e)}
        />
        <Form.TextArea label="Job Description" type="textarea" name="jobDescription" required={true} 
        value={jobDescription}  onChange={(e)=>handleChange(e)}/>
        <Form.Input label="Job Location" type="text" required={true} name="jobLocation" value={jobLocation}
             onChange={(e)=>handleChange(e)}
        />
        <Form.Input label="Keywords" type="text" name="keywords" value={keywords}
             onChange={(e)=>handleChange(e)}
        />
        <Button>PostJob</Button>
        </Form>
    </div>)

}

const CandidatesApplied=props=>{
    const {username,email,phone,location}=props.value;
    return (
        <Card link={true}>
          <Card.Content>
            <Card.Header>{username}</Card.Header>
            <Card.Meta>{phone}</Card.Meta>
            <Card.Description>
             {email}
            </Card.Description>
            <Card.Description content={location}  />
          </Card.Content>
        </Card>
    
        )


}

const JobDetails=(props)=>{
    const {jobtitle,jobdescription,location,appliedBy,_id}=props.value;  
   console.log(appliedBy);
    
return( <Item.Group>
    <Item>
      <Item.Content>
        <Item.Header href={`/jobDetails/${_id}`}>{jobtitle}</Item.Header>
        <Item.Meta>
          <span className='stay'>{location}</span>
          <span className='stay'>full time</span>
        </Item.Meta>
        <Item.Description>{jobdescription}</Item.Description>
        Applied By
        <CardGroup>
        {appliedBy.map((candidates,index)=>
            <CandidatesApplied value={candidates} key={index.toString()} />
        )}
        </CardGroup>
      </Item.Content>
    </Item>
    </Item.Group>)
}

export default class PostJob extends Component{
    constructor(props){
        super(props);
        this.state={
            jobTitle:'',
            jobDescription:'',
            jobLocation:'',
            keywords:'',
            postedJobs:[],
            formSuccess:false
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    componentDidMount(){
        this.getJobs();
    }
    async getJobs(){
        let data= await axios.get("http://localhost:3000/postjob",{withCredentials:true})
        .then(res=>{
                return res;   
            
        })
        .catch(err=>console.log(err));

        this.setState({
            postedJobs:data.data.jobs
        });
        console.log(this.state.postedJobs);
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })

    }
    handleSubmit=e=>{
        e.preventDefault();
        const {jobTitle,jobDescription,jobLocation,keywords}=this.state;
        const jobDetails={
            jobTitle,
            jobDescription,
            jobLocation,
            keywords
        }
        console.log(jobDetails);
        axios.post("http://localhost:3000/postjob",jobDetails,{withCredentials:true});
        this.setState({formSuccess:true})
    }

    render()
    {
     console.log("render called");   
        return(
        <div className="container">
        
        <PostJobForm value={this.state} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
      
      {this.state.postedJobs.map((job,index)=>
            <JobDetails value={job} key={index.toString()} />
        )}
        
        <div id="logout"><Link to="/logout">LOGOUT</Link></div>
        </div>
        )
    }
}