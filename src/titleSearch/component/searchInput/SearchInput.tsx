import { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import './SearchInput.css'

type propsType = {
  initialValue: string
  getSearchString: (t: string) => void
}

const SearchInput = ({ initialValue, getSearchString }: propsType) => {
  const [searchText, setSearchText] = useState(initialValue ?? '')

  const submitForm = (evt: any) => {
    evt.preventDefault()
    getSearchString(searchText)
  }

  const onSearchTextChange = (evt: any) => {
    setSearchText(evt.target.value)
  }

  // this is to spread the object attribute if true
  // For reference: const isButtonDisabled = () => ({ disabled: searchText.length === 0 })
  return (
    <Container>
      <Row>
        <Form>
          <Form.Group className="search-container" controlId="formBasicEmail">
            <Col xs={4}>
              <Form.Control
                className="search-input"
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={(evt) => onSearchTextChange(evt)}
              />
            </Col>
            <Col xs={8}>
              <Button
                className="search-button"
                //   {...isButtonDisabled()}
                variant="primary"
                type="submit"
                onClick={(evt) => submitForm(evt)}
              >
                Search
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  )
}

export default SearchInput
