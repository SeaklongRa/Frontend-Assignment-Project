// export const isLogin = (state) =>{
//   state.isSnackbar.login = true
// }

export const setProducts = (state, products) =>{
  state.products = products
}

export const updatedProduct = (state, products) =>{
  state.products = products
  state.isSnackbar.update = true
}

export const newProduct = (state, products) =>{
  state.products.unshift(products)
}

export const deletedProduct = (state, id) =>{
  state.products.filter(product => product.id !== id)
  state.isSnackbar.delete = true
}

export const searchProducts = (state, products) => {
  state.products = products
}

export const filterPrice = (state,products) => {
  state.products = products
}

export const filterQuantity = (state,products) => {
  state.products = products
}