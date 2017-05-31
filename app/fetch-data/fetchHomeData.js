import { apiEndpoint } from '../../config/app';
import createRestApiClient from 'utils/createRestApiClient';

function fetchProposals() {
  const client = createRestApiClient({ baseURL: apiEndpoint });
  return client.request({
    method: "GET",
    url: "/proposal"
  }).then(res => res.data).catch(() => {});
}

export default (params) => {
  console.log('fetch home data', params);
  return fetchProposals();
};
