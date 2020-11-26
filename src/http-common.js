import axios from "axios";

/*console.log(
  `${process.env.REACT_APP_HOST_API}${process.env.REACT_APP_URL_API}`
);
console.log(
  `${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}${process.env.REACT_APP_URL_API}`
);*/

//Define a URL base da origem para consumo do servico
export default axios.create({
  baseURL:
    process.env.REACT_APP_PORT_API === ""
      ? `${process.env.REACT_APP_HOST_API}${process.env.REACT_APP_URL_API}`
      : `${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}`,
      //: `${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}${process.env.REACT_APP_URL_API}`,
  headers: {
    "Content-type": "application/json",
  },
});
