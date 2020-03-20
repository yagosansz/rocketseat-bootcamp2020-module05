import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import { Container, Form, SubmitButton } from './styles';

class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    isLoading: false,
  };

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ isLoading: true });

    const { newRepo, repositories } = this.state;

    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
      isLoading: false,
    });
  };

  render() {
    const { newRepo, isLoading } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositories
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add Repository"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton isLoading={isLoading}>
            {isLoading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
                <FaPlus color="#FFF" size={14} />
              )}
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}

export default Main;
