import 'assets/App.scss';
import Card from 'react-bootstrap/Card';
import Button from 'components/elements/Button/PrimaryButton/PrimaryButton';

export default function Post({ postImg, cardTitle, cardText, postKey, clickHandler }) {
  return (
    <Card className="h-100 shadow border-0 rounded-5" key={postKey}>
      <Card.Img variant="top" src={postImg} />
      <Card.Body className="bg-lpurple text-light">
        <Card.Title className="fw-bolder text-truncate text-capitalize text-secondary">
          {cardTitle}
        </Card.Title>
        <Card.Text className="fs-6">{cardText}</Card.Text>
        <Button btnVariant={'primary'} buttonText={'Read More'} clickHandler={clickHandler} />
      </Card.Body>
    </Card>
  );
}
