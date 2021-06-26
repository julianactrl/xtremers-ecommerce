import React,{useEffect} from "react";


export default function SelectFormCategory({ onCategory, categories, value }) {
  //----------------REDUX-------------------------//

  const ValueCategories = function (e) {
    onCategory(e.target.value);
  
  };


  return (
    <select
      value={value != undefined ? value : categories.id}
      onChange={ValueCategories}
      name="Categories"
      className="elative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option  value={0}>Select Category</option>

      {typeof categories && !categories ? (
        <div>NADAAA</div>
      ) : (
        categories &&
        categories.map((categories, i) => (
          <option key={"categories" + i} value={categories.id}>
            {categories.id} {categories.name}
          </option>
        ))
      )}
    </select>
  );
}
