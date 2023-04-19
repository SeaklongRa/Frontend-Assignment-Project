import axios from "axios"
import router from "../router"

export const getProduct = ({commit}) => {
  axios.get(`http://localhost:3000/products?_sort=id&_order=desc`)
      .then(response => {
          commit('setProducts',response.data)
      })
      .catch(error=>console.log(error))
}

export const updateProduct = ({commit}, productData) => {
  let id = productData.id
  axios.put(`http://localhost:3000/products/${id}`,{
      name: productData.name,
      description: productData.description,
      price: productData.price,
      quantity: productData.quantity,
      image: productData.image
  })
  .then(response=>{
    router.push({name: 'login'})
    commit('updatedProduct', [response.data])
  })
  .catch(error=>console.log(error))
}

export const insertProduct = ({commit}, productData) => {
  axios.post(`http://localhost:3000/products`,{
    name: productData.name,
    description: productData.description,
    price: productData.price,
    quantity: productData.quantity,
    image: productData.image
  })
  .then( res =>{
    commit('newProduct',res.data)
  })
  .catch(error=>{
    console.log(error)
  })
}

export const deleteProduct = ({commit}, {id}) => {
  axios.delete(`http://localhost:3000/products/${id}`)
  .then( res =>{
    router.push({name: 'login'})
    commit('deletedProduct', id, res.data)
  })
}

export const searchProduct = ({commit}, {search}) => {
  axios.get(`http://localhost:3000/products?_sort=id&_order=desc&q=${search}`)
      .then(res => {
          commit('searchProducts',res.data)
      })
      .catch(error=>console.log(error))
}

export const filterPrice = ({commit},{minPrice,maxPrice}) => {
  axios.get(`http://localhost:3000/products?_sort=id&_order=desc&price_gte=${minPrice}&price_lte=${maxPrice}`)
      .then(res => {
          commit('filterPrice',res.data)
      })
      .catch(error=>console.log(error))
}

export const filterQuantity = ({commit},{minQuantity,maxQuantity}) => {
  axios.get(`http://localhost:3000/products?_sort=id&_order=desc&quantity_gte=${minQuantity}&quantity_lte=${maxQuantity}`)
      .then(res => {
          commit('filterQuantity',res.data)
      })
      .catch(error=>console.log(error))
}