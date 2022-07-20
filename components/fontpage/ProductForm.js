import { useState, useEffect, useContext } from "react"
import { formatter } from '../../utils/helpers'
import ProductOptions from "./ProductOptions"
import { CartContext } from "../../context/shopContext"
import axios from "axios"
import useSWR from 'swr'



export default function ProductForm({ product }) {

 

  const { addToCart } = useContext(CartContext)

  const allVariantOptions = product.variants.map(variant => {
    const allOptions = {}

    variant.selectedOptions.map(item => {
      allOptions[item.name] = item.value
    })
   
    return {
      id: variant.id,
      title: product.title,
      handle: product.handle,
      image: variant.image?.src,
      options: allOptions,
      variantTitle: variant.title,
      variantPrice: variant.priceV2.amount,
      variantQuantity: 1
    }
  })

  const defaultValues = {}
  product.options.map(item => {
    defaultValues[item.name] = item.values[0]
  })

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0])
  const [selectedOptions, setSelectedOptions] = useState(defaultValues)

  function setOptions(name, value) {
    setSelectedOptions(prevState => {
      return { ...prevState, [name]: value }
    })

    const selection = {
      ...selectedOptions,
      [name]: value
    }

    allVariantOptions.map(item => {
      if (JSON.stringify(item.options) === JSON.stringify(selection)) {
        setSelectedVariant(item)
      }
    })
  }

 


  return (
    <div className="rounded-2xl p-4 shadow-2xl flex flex-col w-full ">
      <h2 className="text-2xl font-bold">{product.title.value}</h2>
      <span className="pb-3">{formatter.format(product.variants[0].priceV2.amount)}</span>
      {
        product.options.map(({ name, values }) => (
          <ProductOptions
            key={`key-${name}`}
            name={name}
            values={values}
            selectedOptions={selectedOptions}
            setOptions={setOptions}
            selectedVariant={selectedVariant}
          />
        ))
      }
    
    
          <button
            onClick={() => {
              addToCart(selectedVariant)
            }}
            className="bg-black rounded-lg text-white px-2 py-3 mt-3 hover:bg-gray-800">Add To Card
          </button> 
          {/* <button
            className="rounded-lg text-white px-2 py-3 mt-3 bg-gray-800 cursor-not-allowed">
              Sold out!
          </button> */}
    

    </div>
  )
}