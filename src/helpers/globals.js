import {ApiClient} from "../clients/pokecoin/src";

localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNocmlzIiwiaWF0IjoxNjcxNjM1OTA0LCJleHAiOjE2NzE3MjIzMDR9.RJVvFmmTaFLepEU__KMFdMJQ7L2WzWOv5003fVXesKQ')
const _apiClient = new ApiClient("http://localhost:3000/")
let token = _apiClient.authentications['token']
token.apiKey = localStorage.getItem('token')

export default _apiClient