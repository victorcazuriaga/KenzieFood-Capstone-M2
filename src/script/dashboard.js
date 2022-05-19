import { Api } from '../modules/Api.js';
import { Template } from '../modules/Template.js';
Api.token= sessionStorage.getItem('token', Api.token)
console.log(Api.token)
const itensUser=await Api.getPrivate()

Template.templateDashboard(itensUser)
