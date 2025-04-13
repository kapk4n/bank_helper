import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function CardProfile(User) {
  return (
    <Card>
      <Card.Header as="h5">{User['login']}</Card.Header>
      <Card.Body>
        <Card.Title>Email: {User['email']}</Card.Title>
        <Card.Text>
          {User['status']}
        </Card.Text>
        {/* <Button variant="primary" href={`task/${User['task_id']}`}>Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
}

export default CardProfile;