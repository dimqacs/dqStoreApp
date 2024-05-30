const express = require('express')
const json = require('./database.json')
const app = express()
const port = 3000

const cors = require('cors');
app.use(cors(
  {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
));

app.get('/getFilteredProducts', (req, res) => {
  const { gender, kids, saleArray, sportsId, categoriesId, team, brandsId, colors, prices, sizes} = req.query;

  let filteredProducts = json.Products;

  console.log('Received Query Parameters:');
  console.log('Gender:', gender);
  console.log('Kids:', kids);
  console.log('Sale Array:', saleArray);
  console.log('Sports ID:', sportsId);
  console.log('Categories ID:', categoriesId);
  console.log('Team:', team);
  console.log(`Brands ID:`, brandsId);
  console.log(`Colors ID:`, colors);
  console.log(`Prices:`, prices);
  console.log(`Sizes:`, sizes);

  if (gender) {
    const genderIds = gender.split(`,`);
    filteredProducts = filteredProducts.filter(product => genderIds.includes(product.Gender.toString()));
    console.log('Filtered by Gender:', gender);
  }

  if (kids == `false`) {
    filteredProducts = filteredProducts.filter(product => product.Kids === false);
    console.log('Filtered by Kids:', kids);
  } else {
    filteredProducts = filteredProducts.filter(product => product.Kids === true);
    console.log('Filtered by Kids:', kids);
  }

  if (saleArray) {
    filteredProducts = filteredProducts.filter(product => saleArray.includes(product.Sale));
    console.log('Filtered by Sale Array:', saleArray);
  }

  if (sportsId) {
    const sportsIds = sportsId.split(',');
    filteredProducts = filteredProducts.filter(product => sportsIds.includes(product.SportId.toString()));
    console.log('Filtered by Sports ID:', sportsIds);
  }

  if (categoriesId) {
    const categoriesIds = categoriesId.split(',');
    filteredProducts = filteredProducts.filter(product => categoriesIds.includes(product.CategoryId.toString()));
    console.log('Filtered by Categories ID:', categoriesIds);
  }

  if (team) {
    const teamId = team.split(',');
    filteredProducts = filteredProducts.filter(product => teamId.includes(product.Team));
    console.log('Filtered by Brands ID:', teamId);
  }

  if (brandsId) {
    const brandsIds = brandsId.split(',');
    filteredProducts = filteredProducts.filter(product => brandsIds.includes(product.BrandId.toString()));
    console.log('Filtered by Brands ID:', brandsIds);
  }

  if (colors) {
    const colorsIds = colors.split(',');
    filteredProducts = filteredProducts.filter(product => colorsIds.includes(product.Color));
    console.log('Filtered by Colors:', colorsIds);
  }

  if (prices) {
    const priceRanges = prices.split(',').map(range => {
        if (range.startsWith('>')) {
            return { min: parseFloat(range.slice(1)), max: Infinity };
        } else {
            const [min, max] = range.split('-').map(parseFloat);
            return { min, max };
        }
    });

    filteredProducts = filteredProducts.filter(product => {
        return priceRanges.some(range => product.Price >= range.min && product.Price <= range.max);
    });
    console.log('Filtered by Price Ranges:', priceRanges);
}

if (sizes) {
  const sizesArray = sizes.split(',');
  filteredProducts = filteredProducts.filter(product => {
      return sizesArray.every(size => product.Size.includes(size));
  });
  console.log('Filtered by Sizes:', sizesArray);
}

  res.send(filteredProducts);
});

app.get('/getAllBrands', (req, res) => {
  res.send(json.Brands);
});

app.get('/getAllProducts', (req, res) => {
  res.send(json.Products);
});

app.get('/getAllProductsExcept/:productId', (req, res) => {
  const productId = req.params.productId;

  const productsExcept = json.Products.filter(product => product.Id !== productId);
  
  res.send(productsExcept);
});

app.get('/getProductById/:productId', (req, res) => {
  const productId = req.params.productId;

  console.log(productId)
  
  const filteredProducts = json.Products.filter(product => product.Id == productId);
  
  res.send(filteredProducts);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})