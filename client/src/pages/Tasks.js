import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Tasks extends Component {
  // Setting our component's initial state
  state = {
    tasks: [],
    description: "",
    completed: "",
    date: ""
  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadTasks();
  }

  // Loads all books  and sets them to this.state.books
  loadTasks = () => {
    API.getTasks()
      .then(res =>
        this.setState({ tasks: res.data, description: "", completed: "", date: "" })
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteTask = id => {
    API.deleteTask(id)
      .then(res => this.loadTasks())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.description && this.state.completed) {
      API.saveTask({
        description: this.state.description,
        completed: this.state.completed,
        date: this.state.date
      })
        .then(res => this.loadTasks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Tasks Do I Need To Complete?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Description (required)"
              />
              <Input
                value={this.state.completed}
                onChange={this.handleInputChange}
                name="completed"
                placeholder="Complete?"
              />
              <TextArea
                value={this.state.date}
                onChange={this.handleInputChange}
                name="date"
                placeholder="Date?"
              />
              <FormBtn
                disabled={!(this.state.completed && this.state.description)}
                onClick={this.handleFormSubmit}
              >
                Submit Task
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Tasks On My List</h1>
            </Jumbotron>
            {this.state.tasks.length ? (
              <List>
                {this.state.tasks.map(task => {
                  return (
                    <ListItem key={task._id}>
                      <a href={"/books/" + task._id}>
                        <strong>
                          {task.description} by {task.completed}
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteTask(book._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Tasks;