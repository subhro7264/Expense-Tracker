import React,{useContext} from 'react'
import AuthContext from '../store/auth-context'
import { Card,Button,} from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Home = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <Card >
     <h2 className=''>Welcome to the Expense Tracker</h2> 
    {isLoggedIn && (
              <Button className='ms-auto md-5' variant="outline-success" >
                
                 <Link to="profile" >
                 Complete profile
              </Link>
              </Button>
            )}
    </Card>
  )
}

export default Home
