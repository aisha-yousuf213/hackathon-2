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

    export const allProducts = defineQuery(`*[_type == "products"][0..7]{
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