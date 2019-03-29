import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'production' ? 'http://opsbizgw.ppdaicorp.com' : 'http://10.114.16.41:8000'

const commonHeader = {
  Authorization: `Token ca04a1050c644c0c94c7748bb15f0575`
};

const Axios = axios.create({
  baseURL: baseUrl,
  headers: commonHeader
})

export default Axios