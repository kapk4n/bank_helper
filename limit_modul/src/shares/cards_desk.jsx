
import { Button, Card, CardHeader, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { BsFillTrash3Fill } from "react-icons/bs";
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';


function WithHeaderStyledExample(title) {

  const deleteDesk = async (e) => {
  
    e.preventDefault();
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
    try {
      const response = await axios.delete(`http://localhost:8002/api/dashboard/lists/delete/${title['desk_id']}`);
      location.reload()
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  return (
    <div style={{paddingBottom:'5px'}}>
    {/* <Card>
      <Card.Body>
        <Card.Title>{title['title']}</Card.Title>
        <Card.Text>
        {title['description']}
        </Card.Text>
        <Button variant="primary" href={`/desks/${title['desk_id']}`}>Go somewhere</Button>
        <form onSubmit={deleteDesk}><Button variant="danger" type="submit"> <BsFillTrash3Fill /> </Button></form>
      </Card.Body>
    </Card> */}
              <Card style={{ maxWidth: 1150, width: 1150}} >
                <CardHeader
                    action={
                      <div style={{display:'flex', flexDirection:'column', justifyContent:'right', alignItems:'flex-end'}}>
                        <div>
                          <div style={{display:'flex', flexDirection:'row', justifyContent:'right', alignItems:'flex-start'}}>
                              <div style={{fontSize:'13px', color:'black'}}> 
                                  {/* {title['title']} */}
                              </div>
                              <div style={{fontSize:'13px', color:'black'}}> 
                                <Button href={`/desks/${title['desk_id']}`}>Go somewhere</Button>
                                <Button onClick={deleteDesk}><DeleteIcon style={{color:'red'}}/></Button>
                              </div>
                          </div>
                      </div>
                    </div>
                    }
                    // title="123"
                    title={title['title']}
                />
            </Card>              
    </div>
  );
}

export default WithHeaderStyledExample;