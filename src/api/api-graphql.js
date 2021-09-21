export async function getInitData() {
  const q = {
    query: `query getInitData {
      currencies
      categories {
        name
      }
    }`,
  };
  const resp = await post(q);
  return resp.data;
}

export async function getProducts(category) {
  const q = {
    query: `query getProducts($category: CategoryInput) {
      category(input: $category) {
        products {
          id
          name
          inStock
          gallery
          prices {
            currency
            amount
          }
          brand
        }
      }
    }`,
    variables: { category: { title: category } },
  };
  const resp = await post(q);
  return resp.data?.category?.products;
}

export async function getProduct(id) {
  const q = {
    query: `query getProduct($id: String!) {
      product(id: $id) {
        id
        name
        inStock
        gallery
        description
        attributes {
          id
          name
          type
          items {
            id
            value
          }
        }
        prices {
          currency
          amount
        }
        brand
      }
    }`,
    variables: { id },
  };
  const resp = await post(q);
  return resp.data?.product;
}

async function post(body) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  const response = await fetch('https://zelaniki-products-graphql.azurewebsites.net/', options);
  return response.json();
}
