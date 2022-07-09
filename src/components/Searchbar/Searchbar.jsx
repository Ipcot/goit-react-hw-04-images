import { Formik, Form, Field } from 'formik';
import { Component } from 'react';
import { toast } from 'react-toastify';

const INITIAL_VALUES = {
  query: '',
};

export class Searchbar extends Component {
  handleSubmit = ({ query }, { resetForm }) => {
    if (query.trim() === '') {
      return toast.error('Enter Query', {
        theme: 'colored',
      });
    }
    this.props.onSubmit(query);
    resetForm();
  };

  render() {
    return (
      <header>
        <Formik initialValues={INITIAL_VALUES} onSubmit={this.handleSubmit}>
          <Form autoComplete="off">
            <button type="submit">
              <span>Search</span>
            </button>

            <Field
              type="text"
              name="query"
              autoFocus
              placeholder="Search images and photos"
            />
          </Form>
        </Formik>
      </header>
    );
  }
}
