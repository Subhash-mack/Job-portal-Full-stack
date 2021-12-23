
import './App.css';
// import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter,Routes,Route} from "react-router-dom";
import Register from './components/register';
import Login from './components/login';
import ApplyJob from './components/applyJob';
import PostJob from './components/postJob';
import Logout from './components/logout';
import JobDetail from './components/jobDetail';


function App() {
  return (
    <div className="container">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/applyJob" element={<ApplyJob />} />
      <Route path="/postJob" element={<PostJob />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/jobDetails/:id" element={<JobDetail />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
