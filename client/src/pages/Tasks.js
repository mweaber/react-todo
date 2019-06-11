import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Tasks extends Component {
    state = {
        tasks: []
    };

    componentDidMount() {
        this.loadTasks();
    }

    loadTasks = () => {
        API.getTask()
            .then(res => this.setState({ tasks: res.data}))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>What Tasks Do I Have To Complete?</h1>
                        </Jumbotron>
                        <form>
                            <TextArea name="descripton" placeholder="Description (required)" />
                            <Input name="completed" placeholder="Completed?" />
                            <Input name="date" placeholder="When Do You Need It Done By?" />
                            <FormBtn>Sumbit Task</FormBtn>
                        </form>
                    </Col>
                    <Col size="md-6 sm-12">
                        <Jumbotron>
                            <h1>Tasks On My List</h1>
                        </Jumbotron>
                        {this.state.tasks.length ? (
                            <List>
                                {this.state.tasks.map(task => (
                                    <ListItem key={task._id}>
                                        <a href={"/task/" + task._id}>
                                            <strong>
                                                {task.description}
                                            </strong>
                                        </a>
                                        <DeleteBtn />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <h3>No Tasks to Display</h3>
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Tasks;