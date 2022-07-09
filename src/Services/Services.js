// import { Component } from 'react';
import axios from 'axios';

// export class Services extends Component {
//   page = 1;

//   state = {
//     photos: null,
//   };
//   async fetchPayload() {
//     const API_KEY = '27561705-01d67e91a566568adc5cfd7f5';
//     const BASE_URL = 'https://pixabay.com/api/';
//     const searchParams = new URLSearchParams({
//       key: API_KEY,
//       q: this.searchQuery,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       page: this.page,
//       per_page: 12,
//     });

//     const payload = await axios(`${BASE_URL}?${searchParams}`);

//     this.page += 1;
//     return payload.data;
//   }
//   componentDidUpdate = (prevProps, prevState) => {
//     const API_KEY = '27561705-01d67e91a566568adc5cfd7f5';
//     const BASE_URL = 'https://pixabay.com/api/';
//     const searchParams = new URLSearchParams({
//       key: API_KEY,
//       q: this.props.query,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: false,
//       page: this.page,
//       per_page: 12,
//     });

//     if (prevProps.query !== this.props.query) {
//       const response = axios(`${BASE_URL}?${searchParams}`);
//       response.then(data => this.setState({ photos: data.data.hits }));
//     }
//   };

//   render() {
//     return (
//       <>
//         {this.state.photos && (
//           <ul>
//             {this.state.photos.map(item => {
//               return (
//                 <li key={item.id}>
//                   <img src={item.webformatURL} alt="collection" />{' '}
//                 </li>
//               );
//             })}
//           </ul>
//         )}
//       </>
//     );

//     //   <p>{this.props.query}</p>;
//   }
// }

export const fetchQuery = async (query, page) => {
  const API_KEY = '27561705-01d67e91a566568adc5cfd7f5';
  const BASE_URL = 'https://pixabay.com/api/';
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 12,
  });

  const response = await axios(`${BASE_URL}?${searchParams}`).then(
    data => data.data.hits
  );

  return response;
};
