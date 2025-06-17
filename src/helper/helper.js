const shortenTitle = (text) => {
  return text.split(' ').slice(0, 3).join(" ")
}

const searchProducts = (products, search) => {
  if (!search) return products;

  const searchedProducts = products.filter((p) => p.title.toLowerCase().includes(search)
  )
  return searchedProducts;
}

const filteredProducts = (products, category) => {
  if (!category) return products
  const filtered = products.filter(p => p.category.toLowerCase() === category)
  return filtered
}

const createQueryObject = (currentQuery, newQuery) => {
  if (newQuery.category === "all") {
    const { category, ...rest } = currentQuery
    console.log(rest);
    return rest;
  }
  if (newQuery.search === "") {
    const { search, ...rest } = currentQuery
    console.log(rest);
    return rest;
  }
  return {
    ...currentQuery, ...newQuery
  }
}


const getInitialQuery = (searchParams) => {
  const query = {}
  const category = searchParams.get("category")
  const search = searchParams.get("search")
  if (category) query.category = category
  if (search) query.search = search

  return query;
}
const sumProducts = (products) => {
  const itemsCount = products.reduce((acc, cur) => acc + cur.quantity, 0)
  const total = products.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0).toFixed(2)

  return {
    itemsCount,
    total
  }
}

const productQuantity = (state, id) => {
  const index = state.selectedItem.findIndex((item) => item.id === id)
  if (index === -1) {
    return 0
  } else {
    return state.selectedItem[index].quantity
  }
}



export { shortenTitle, searchProducts, filteredProducts, createQueryObject, getInitialQuery, sumProducts,productQuantity };