import 'assets/App.scss';
import Button from 'components/elements/Button/PrimaryButton/PrimaryButton';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div>
      <Card>
        <iframe title="404" src="https://embed.lottiefiles.com/animation/84918"></iframe>
        <Card.Body>
          <Card.Title className="fw-bold">Oops!</Card.Title>
          <Card.Text>Sorry, this page does not exist here.</Card.Text>
          <Button
            btnVariant="primary"
            buttonText="Return to previous page"
            clickHandler={() => {
              navigate(-1);
            }}
          />
        </Card.Body>
      </Card>
    </div>
  );
}
