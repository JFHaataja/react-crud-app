import 'assets/App.scss';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Search from 'assets/Icon/Search';

export default function SearchBar({ placeHolder, searchValue, onChangeHandler }) {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text className="bg-secondary border-0 rounded-20">
        <Search />
      </InputGroup.Text>
      <Form.Control
        type="search"
        className="me-2 border-0 rounded-20-end"
        aria-label="Search"
        value={searchValue}
        placeholder={placeHolder}
        onChange={onChangeHandler}
      ></Form.Control>
    </InputGroup>
  );
}
