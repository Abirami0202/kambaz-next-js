// app/Kambaz/Labs/Lab4/page.tsx
"use client";

import Link from "next/link";
import { Container, Row, Col, Table, ListGroup, ListGroupItem, Form, FormGroup, FormLabel, FormControl, FormSelect, InputGroup, Button, Card, CardImg, CardBody, CardTitle, CardText, Nav, NavItem, NavLink } from "react-bootstrap";
import { FaCalendar, FaEnvelopeOpenText, FaRegClock } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaBookBible } from "react-icons/fa6";
import { VscAccount } from "react-icons/vsc";

export default function Lab4() {
  return (
    <Container id="wd-lab4">
      <h2>Lab 4 - Bootstrap & React Icons</h2>

      {/* React Icons */}
      <div id="wd-react-icons-sampler" className="mb-4">
        <h3>React Icons Sampler</h3>
        <div className="d-flex">
          <VscAccount className="fs-3 text me-2" />
          <AiOutlineDashboard className="fs-3 text me-2" />
          <FaBookBible className="fs-3 text me-2" />
          <FaCalendar className="fs-3 text me-2" />
          <FaEnvelopeOpenText className="fs-3 text me-2" />
          <FaRegClock className="fs-3 text me-2" />
        </div>
      </div>

      {/* Bootstrap Grid System */}
      <div id="wd-bs-grid-system">
        <h2>Grid system</h2>
        <Row>
          <Col className="bg-danger text-white">
            <h3>Left half</h3>
          </Col>
          <Col className="bg-primary text-white">
            <h3>Right half</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={4} className="bg-warning">
            <h3>One third</h3>
          </Col>
          <Col xs={8} className="bg-success text-white">
            <h3>Two thirds</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={2} className="bg-black text-white">
            <h3>Sidebar</h3>
          </Col>
          <Col xs={8} className="bg-secondary text-white">
            <h3>Main content</h3>
          </Col>
          <Col xs={2} className="bg-info">
            <h3>Sidebar</h3>
          </Col>
        </Row>
      </div>

      {/* Responsive Grid System */}
      <div id="wd-bs-responsive-grids" className="mt-4">
        <h2>Responsive grid system</h2>
        <Row>
          <Col xs={12} md={6} xl={3} className="bg-warning">
            <h3>Column A</h3>
          </Col>
          <Col xs={12} md={6} xl={3} className="bg-primary text-white">
            <h3>Column B</h3>
          </Col>
          <Col xs={12} md={6} xl={3} className="bg-danger text-white">
            <h3>Column C</h3>
          </Col>
          <Col xs={12} md={6} xl={3} className="bg-success text-white">
            <h3>Column D</h3>
          </Col>
        </Row>
      </div>

      {/* Responsive Dramatic */}
      <div id="wd-bs-responsive-dramatic" className="mt-4">
        <h2>Responsive grid system - Dramatic</h2>
        <Row>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-warning"><h4>1</h4></Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-primary text-white"><h4>2</h4></Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-danger text-white"><h4>3</h4></Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-success text-white"><h4>4</h4></Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-warning"><h4>5</h4></Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-primary text-white"><h4>6</h4></Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-danger text-white"><h4>7</h4></Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-success text-white"><h4>8</h4></Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-warning"><h4>9</h4></Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-primary text-white"><h4>10</h4></Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-danger text-white"><h4>11</h4></Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-success text-white"><h4>12</h4></Col>
        </Row>
      </div>

      {/* Bootstrap Tables */}
      <div id="wd-css-styling-tables" className="mt-4">
        <h2>Tables</h2>
        <Table>
          <thead>
            <tr className="table-dark">
              <th>Quiz</th>
              <th>Topic</th>
              <th>Date</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-warning">
              <td>Q1</td>
              <td>HTML</td>
              <td>2/3/21</td>
              <td>85</td>
            </tr>
            <tr className="table-danger">
              <td>Q2</td>
              <td>CSS</td>
              <td>2/10/21</td>
              <td>90</td>
            </tr>
            <tr className="table-primary">
              <td>Q3</td>
              <td>JavaScript</td>
              <td>2/17/21</td>
              <td>90</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="table-success">
              <td colSpan={3}>Average</td>
              <td>90</td>
            </tr>
          </tfoot>
        </Table>
      </div>

      {/* Responsive Tables */}
      <div id="wd-css-responsive-tables" className="mt-4">
        <h2>Responsive tables</h2>
        <Table responsive>
          <thead>
            <tr>
              <th>Very</th><th>long</th><th>set</th><th>of</th><th>columns</th>
              <th>Very</th><th>long</th><th>set</th><th>of</th><th>columns</th>
              <th>Very</th><th>long</th><th>set</th><th>of</th><th>columns</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Very</td><td>long</td><td>set</td><td>of</td><td>columns</td>
              <td>Very</td><td>long</td><td>set</td><td>of</td><td>columns</td>
              <td>Very</td><td>long</td><td>set</td><td>of</td><td>columns</td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* Bootstrap Lists */}
      <div id="wd-css-styling-lists" className="mt-4">
        <h2>Favorite movies</h2>
        <ListGroup>
          <ListGroupItem active>Aliens</ListGroupItem>
          <ListGroupItem>Terminator</ListGroupItem>
          <ListGroupItem>Blade Runner</ListGroupItem>
          <ListGroupItem>Lord of the Ring</ListGroupItem>
          <ListGroupItem disabled>Star Wars</ListGroupItem>
        </ListGroup>
      </div>

      {/* Hyperlink Lists */}
      <div id="wd-css-hyperlink-list" className="mt-4">
        <h3>Favorite books</h3>
        <ListGroup>
          <ListGroupItem action active href="https://en.wikipedia.org/wiki/Dune_(novel)">
            Dune
          </ListGroupItem>
          <ListGroupItem action href="https://en.wikipedia.org/wiki/The_Lord_of_the_Rings">
            Lord of the Rings
          </ListGroupItem>
          <ListGroupItem action href="https://en.wikipedia.org/wiki/The_Forever_War">
            The Forever War
          </ListGroupItem>
          <ListGroupItem action href="https://en.wikipedia.org/wiki/2001:_A_Space_Odyssey_(novel)">
            2001 A Space Odyssey
          </ListGroupItem>
          <ListGroupItem action disabled href="https://en.wikipedia.org/wiki/Ender%27s_Game">
            Ender's Game
          </ListGroupItem>
          <ListGroupItem action onClick={() => alert("New book added")}>
            Add another book
          </ListGroupItem>
        </ListGroup>
      </div>

      {/* Bootstrap Forms */}
      <div id="wd-css-styling-forms" className="mt-4">
        <h2>Forms</h2>
        <FormGroup className="mb-3" controlId="wd-email">
          <FormLabel>Email address</FormLabel>
          <FormControl type="email" placeholder="name@example.com" />
        </FormGroup>
        <FormGroup className="mb-3" controlId="wd-textarea">
          <FormLabel>Example textarea</FormLabel>
          <FormControl as="textarea" rows={3} />
        </FormGroup>
      </div>

      {/* Dropdowns */}
<div id="wd-css-styling-dropdowns" className="mt-4">
  <h3>Dropdowns</h3>
  <FormSelect defaultValue="">  {/* ✅ Add defaultValue here */}
    <option value="">Open this select menu</option>  {/* ✅ Remove 'selected', add value */}
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </FormSelect>
</div>

      {/* Switches */}
      <div id="wd-css-styling-switches" className="mt-4">
        <h3>Switches</h3>
        <Form.Check type="switch" checked={false} label="Unchecked switch checkbox input" readOnly />
        <Form.Check type="switch" checked={true} label="Checked switch checkbox input" readOnly />
        <Form.Check type="switch" checked={false} label="Unchecked disabled switch checkbox input" disabled />
        <Form.Check type="switch" checked={true} label="Checked disabled switch checkbox input" disabled />
      </div>

      {/* Range */}
      <div id="wd-css-styling-range-and-sliders" className="mt-4">
        <h3>Range</h3>
        <FormGroup controlId="wd-range1">
          <FormLabel>Example range</FormLabel>
          <Form.Range min="0" max="5" step="0.5" />
        </FormGroup>
      </div>

      {/* Addons */}
      <div id="wd-css-styling-addons" className="mt-4">
        <h3>Addons</h3>
        <InputGroup className="mb-3">
          <InputGroup.Text>$</InputGroup.Text>
          <InputGroup.Text>0.00</InputGroup.Text>
          <FormControl />
        </InputGroup>
        <InputGroup>
          <FormControl />
          <InputGroup.Text>$</InputGroup.Text>
          <InputGroup.Text>0.00</InputGroup.Text>
        </InputGroup>
      </div>

      {/* Responsive Forms */}
      <div id="wd-css-responsive-forms-1" className="mt-4">
        <h3>Responsive forms</h3>
        <Form.Group as={Row} className="mb-3" controlId="email1">
          <Form.Label column sm={2}>Email</Form.Label>
          <Col sm={10}>
            <Form.Control type="email" defaultValue="email@example.com" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="password1">
          <Form.Label column sm={2}>Password</Form.Label>
          <Col sm={10}>
            <Form.Control type="password" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="textarea2">
          <Form.Label column sm={2}>Bio</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" style={{ height: "100px" }} />
          </Col>
        </Form.Group>
      </div>

      {/* Responsive Forms 2 */}
      <div id="wd-css-responsive-forms-2" className="mt-4">
        <h3>Responsive forms 2</h3>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Email</Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="Email" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Password</Form.Label>
            <Col sm={10}>
              <Form.Control type="password" placeholder="Password" />
            </Col>
          </Form.Group>
          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <Form.Label as="legend" column sm={2}>Radios</Form.Label>
              <Col sm={10}>
                <Form.Check type="radio" label="first radio" name="formHorizontalRadios" defaultChecked />
                <Form.Check type="radio" label="second radio" name="formHorizontalRadios" />
                <Form.Check type="radio" label="third radio" name="formHorizontalRadios" />
              </Col>
            </Form.Group>
          </fieldset>
          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check label="Remember me" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col>
              <Button type="submit">Sign in</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>

      {/* Navigation Tabs */}
      <div id="wd-css-navigating-with-tabs" className="mt-4">
        <h2>Tabs</h2>
        <Nav variant="tabs">
          <NavItem>
            <NavLink href="#/Labs/Lab4/Active">Active</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#/Labs/Lab4/Link1">Link 1</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#/Labs/Lab4/Link2">Link 2</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#/Labs/Lab4/Disabled" disabled>
              Disabled
            </NavLink>
          </NavItem>
        </Nav>
      </div>

      {/* Navigation with Cards */}
      <div id="wd-css-navigating-with-cards" className="mt-4">
        <h2>Cards</h2>
        <Card style={{ width: "18rem" }}>
          <CardImg variant="top" src="/images/stacked.jpg" />
          <CardBody>
            <CardTitle>Stacking Starship</CardTitle>
            <CardText>
              Stacking the most powerful rocket in history. Mars or bust!
            </CardText>
            <Button variant="primary">Boldly Go</Button>
          </CardBody>
        </Card>
      </div>

      <div className="mt-4">
        <h4>Labs Navigation</h4>
        <Link href="/Kambaz/Labs/Lab1">Lab 1</Link> |{" "}
        <Link href="/Kambaz/Labs/Lab3">Lab 3</Link> |{" "}
        <Link href="/Kambaz/Labs/Lab4">Lab 4</Link> |{" "}
        <Link href="/">Kambaz Application</Link>
      </div>
    </Container>
  );
}