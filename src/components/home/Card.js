import { CartContext } from "@/utils/ContextReducer";
import Image from "next/image";
import Link from "next/link";
import { useState, useContext } from "react";

// const priceOptions = ["regular", "medium", "large"];

function Card(props) {
  const data = props.foodData;

  const { state, dispatch } = useContext(CartContext);

  const priceOptions = Object.keys(data.price);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0]);

  const handleQty = (e) => {
    setQty(e.target.value);
  };
  const handleSize = (e) => {
    setSize(e.target.value);
  };
  const handleAddToCard = async () => {
    let finalPrice = qty * parseInt(data.price[size]);
    const updateItem = await state.find(
      (item) => item.tempId === data["_id"] + size,
    );
    if (!updateItem) {
      dispatch({
        type: "ADD",
        id: data["_id"],
        tempId: data["_id"] + size,
        name: data.name,
        price: finalPrice,
        qty: qty,
        priceOption: size,
        img: data.img,
      });
    }
    if (updateItem) {
      dispatch({
        type: "UPDATE",
        tempId: data["_id"] + size,
        price: finalPrice,
        qty: qty,
      });
    }
  };
  return (
    <div className="box">
      <div className="w-80 rounded-lg bg-white overflow-hidden dark:bg-black border-gradient">
        <Link href={{ pathname: "/Item/[item]" }} as={`Item/${data["_id"]}`}>
          <div className="relative w-full h-80">
            <Image
              src={data.img}
              layout="fill"
              objectFit="cover"
              alt="burger"
            />
          </div>
          <div className="p-4">
            <div className="font-bold mb-2 text-xl uppercase">{data.name}</div>
            <p className="short_description text-green-700 dark:text-gray-400 text-base">
              {data.description}
            </p>
          </div>
        </Link>
        <div className="flex px-4 justify-between">
          <select
            className="h-100 p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-green-300 border border-black dark:border-gray-400 rounded"
            onChange={handleQty}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className="h-100 p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-green-300 border border-black dark:border-gray-400 rounded"
            onChange={handleSize}
          >
            {priceOptions.map((options, index) => {
              return (
                <option key={index} className="uppercase" value={options}>
                  {options}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex p-4 font-bold  justify-between">
          <button
            className="border dark:border-gray-400 border-gray-900 rounded p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700  hover:text-gray-100 "
            onClick={handleAddToCard}
          >
            Add to cart
          </button>
          <p className="p-2 text-xl">${qty * parseInt(data.price[size])}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
