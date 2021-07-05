import axios from 'axios'

interface FlickrImage {
  farm: number
  id: string
  isfamily: number
  isfriend: number
  ispublic: number
  owner: string
  secret: string
  server: string
  title: string
}
enum FlickrMethod {
  searchPhotos = 'flickr.photos.search',
}
const server = 'http://localhost:5000' || process.env.server
const url = `${server}/api/flickr/search`
const fetchFlickr = async (
  flickrMethod: FlickrMethod,
  flickrParams: {
    tags:string,
    page:number,
    extras:string
  }
): Promise<FlickrImage []> =>
  axios.get(url, {
    params: {
      method: flickrMethod,
      params: flickrParams
    }
  })

export default fetchFlickr
