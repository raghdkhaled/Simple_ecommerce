import axios from "axios";


// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     console.log(error.response);

//     return error.response;
//   }
// );


const httpService = {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete,
};
export default httpService;
