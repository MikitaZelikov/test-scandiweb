export async function findData(activeCategory) {
  const graphqlQuery = {
    query: `query getProd($name: CategoryInput) {
      currencies,
      categories {
        name,
      },
      category(input: $name) {
        products {
          id,
          name,
          inStock,
          gallery,
          description,
          category,
          attributes {
            id,
          }
          prices {
            currency,
            amount,
          }
        }
      }
    }`,
    variables: { name: { title: activeCategory } },
  };
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphqlQuery),
  };
  const response = await fetch('http://localhost:4000/', fetchOptions);
  return response.json();
}

export function getProducts(data) {
  return data.data.category.products;
}
