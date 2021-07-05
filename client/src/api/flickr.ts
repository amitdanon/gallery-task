import axios from 'axios'

interface ServerResponse {
  data: any
}

const server = 'http://localhost:5000' || process.env.server
const url = `${server}/api/flickr/search`
const fetchFlickr = async (
  flickrMethod: string,
  flickrParams: {
    tags:string,
    page:number,
    perPage:number,
    extras:string
  }
): Promise<ServerResponse> =>
  axios.get(url, {
    params: {
      method: flickrMethod,
      params: flickrParams
    }
  })

export default fetchFlickr
