import 'whatwg-fetch';

function requestFactory(requestOption = {}) {
  return (url, additionOption = {}) => new Promise((resolve, reject) => {
    const options = { ...requestOption, ...additionOption };
    fetch(url, options).then((response) => {
      response.json().then(resolve).catch(reject);
    }).catch((err) => {
      reject(err);
    });
  });
}

const GET = requestFactory({
  method: 'get',
});

export { GET };
