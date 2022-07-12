import PropTypes from 'prop-types';
import { Component } from 'react';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { MdSearch } from 'react-icons/md';
import {
  SearchHeader,
  FormStyled,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

const INITIAL_VALUES = {
  query: '',
};

export class Searchbar extends Component {
  
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = ({ query }) => {
    const { onSubmit } = this.props;
    if (query.trim() === '') {
      return toast.error('Enter Query', {
        theme: 'colored',
      });
    }
    onSubmit(query);
  };

  render() {
    return (
      <SearchHeader>
        <Formik initialValues={INITIAL_VALUES} onSubmit={this.handleSubmit}>
          <FormStyled autoComplete="off">
            <SearchFormButton type="submit">
              <MdSearch />
            </SearchFormButton>

            <SearchFormInput
              type="text"
              name="query"
              autoFocus
              placeholder="Search images and photo"
            />
          </FormStyled>
        </Formik>
      </SearchHeader>
    );
  }
}
