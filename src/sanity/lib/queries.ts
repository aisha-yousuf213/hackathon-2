import { defineQuery } from "next-sanity";

export const queryData  = defineQuery(`*[_type == "products" && "featured" in tags[]] {
      _id,
      title,
      price,
      priceWithoutDiscount,
      badge,
      "image_url": image.asset->url,
      category->{
        _id,
        title
      },
      description,
      inventory,
      tags
    }`
    );

    export const queryCategories = defineQuery(`*[_type == "categories"]{
      _id,
      title,
      "image_url": image.asset->url
    }`);

    export const allProducts = defineQuery(`*[_type == "products"][6...14]{
      _id,
      title,
      price,
      priceWithoutDiscount,
      badge,
      "image_url": image.asset->url,
      category->{
        _id,
        title
      },
      description,
      inventory,
      tags
    }`);


    export const productDetailsQuery = defineQuery(` 
*[_type == "products" && _id == $id]{
  _id,
  title,
  price,
  priceWithoutDiscount,
  description,
  "image_url": image.asset->url,
  inventory,
  tags
}
`);


export const images = defineQuery(`
  *[_type == "products" && "instagram" in tags[]][4...11]
  {"image_url": image.asset->url,
  _id}
  `)
