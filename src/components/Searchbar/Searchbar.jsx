import PropTypes from 'prop-types';
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

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = ({ query }) => {
    if (query.trim() === '') {
      return toast.error('Enter Query', {
        theme: 'colored',
      });
    }
    onSubmit(query);
  };

  return (
    <SearchHeader>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
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
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
