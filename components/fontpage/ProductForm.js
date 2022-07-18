import React, { useState,useContext } from "react";
import { formatter } from "../../utils/helpers";
import {CartContext} from '../../context/shopContext'
function ProductForm({ product }) {

  const {addToCard} = useContext(CartContext)
  const allVarientOptions = product.variants.map((variant) => {
    const allOptions = {};

    variant.selectedOptions.map((item) => {
      allOptions[item.name] = item.value;
    });

   
    return {
      id: variant.id,
      title: variant.title,
      handle: variant.handle,
      image: variant.image.src,
      options: allOptions,
      variantsTitle: variant.title,
      variantsPrice: variant.priceV2.amount,
      variantQuantity: 1,
    };
  });

  const defaultValues = {};
  product.options.map((item) => {
    defaultValues[item.name] = item.values[0];
  });

  const [selectedVariant, setSelectedVariant] = useState(allVarientOptions[0]);
  const [selectedOptions, setSelectedOptions] = useState(defaultValues);
  function setOptions(name, value) {
    setSelectedOptions((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    const selection = {
      ...selectedOptions,
      [name]: value,
    }
    allVarientOptions.map((item) => {
      if(JSON.stringify(item.options) === JSON.stringify(selection)){
        setSelectedVariant(item)
      }
    
  })
}
  //   console.log("defaultValues", defaultValues);
  //   console.log("allVarientOptions", allVarientOptions);

  return (
    <div className="rounded-2xl p-4 shadow-lg flex flex-col w-full md:w-1/3">
      <div className="text-4xl font-bold">{product.title.value}</div>
      <span className="pb-6">
        {formatter.format(product.variants[0].priceV2.amount)}
      </span>
      {product.options.map(({ name, values }) => {
        return (
          <fieldset className="flex flex-col">
            <legend className="text-xl font-semibold">{name}</legend>
            <div className="inline-flex items-center flex-wrap">
              {values.map((value) => {
                const id = `option-${name}-${value}`;
                const checked = selectedOptions[name] === value;
                return (
                  <label htmlFor={id} key={id}>
                    <input
                      className="sr-only"
                      type="radio"
                      id={id}
                      name={`option-${name}`}
                      value={value.value}
                      checked={checked}
                      onChange={() => setOptions(name, value)}
                    />
                    <div
                      className={`p-2 my-3 text-lg rounded-full block cursor-pointer mr-3 ${
                        checked
                          ? "text-white bg-gray-900"
                          : "text-gray-900 bg-gray-200"
                      }`}
                    >
                      <span className="px-2">{value.value}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </fieldset>
        );
      })}
      <button onClick={() => {
        addToCard(selectedVariant)
      }} className="bg-black rounded-lg text-white px-2 py-3 hover:bg-gray-800">
        Add To Card
      </button>
    </div>
  );
}

export default ProductForm;
