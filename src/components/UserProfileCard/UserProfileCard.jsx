import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function UserProfileCard({ user }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
        <div className="d-flex align-items-center justify-content-around">
          <Link to={`/user/${user.userId}`}>View Profile</Link>
          <Button variant="danger">Delete User</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default UserProfileCard;
