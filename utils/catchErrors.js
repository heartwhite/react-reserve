function catchErrors(error, setError) {
  let errMsg;
  if (error.response) {
    // the request was made and server responded with a statusCode that is not in the range of 2XX
    errMsg = error.response.data;
    console.error('Error Response', errMsg);

    //for cloudinary errors
    if (error.response.data.error) {
      errMsg = error.response.data.error.message;
    }
  } else if (error.request) {
    // the request was made but no response were received
    errMsg = error.request;
    console.error('Error Request', errMsg);
  } else {
    //sth else happened in making the request that triggered an error
    errMsg = error.message;
    console.error('!!! Error Message:', errMsg);
  }
  setError(errMsg);
}

export default catchErrors;
