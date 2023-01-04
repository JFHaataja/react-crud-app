import 'assets/App.scss';
import Toast from 'react-bootstrap/Toast';

const Message = ({ message, isPositive }) => {
    let tyyli = '';

    if (isPositive === true) {
        tyyli = 'pos';
    } else {
        tyyli = 'neg';
    }

    return (
        <Toast className="position-absolute ms-lg-4 mt-3">
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">NW TRADERS</strong>
                <small>Just now</small>
            </Toast.Header>
            <Toast.Body className={tyyli}>{message}</Toast.Body>
        </Toast>
    );
};

export default Message;
