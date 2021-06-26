import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import {
  addCategory,
  editCategory,
  removeCategory,
} from "../../actions/crudCategoriesActions";
import { useDispatch, useSelector } from "react-redux";
import SelectFormCategory from "./SelectFormCategory";
import { getAllCategories } from "../../actions/crudCategoriesActions";
import swal from 'sweetalert';

export default function FormCategory() {
  //------------------------------REDUX------------------------------//
  const dispatch = useDispatch();
  const currentCategories = useSelector(
    (state) => state.categories.allCategories
  );
  //----------------------Categoria----------------------------------//
  const initialFormState = { name: "", description: "" };
  const [category, setCategory] = useState(initialFormState);
  const [categoryId, setCategoryId] = useState();
  const [errors, setErrors] = useState(initialFormState);
  const [select, setSelect] = useState();

  //-------------------------AgregarCategoria-------------------//
  const addcategory = (category) => {
    const newCategory = {
      name: category.name,
      description: category.description,
    };

    dispatch(addCategory(newCategory));
  };

  function TakeCategoryInfo(id) {
    if(id != 0 ){
    const categoryinfo = currentCategories.filter(
      (category) => category.id == id
    );
    const newCategory = {
      name: categoryinfo[0].name,
      description: categoryinfo[0].description,
    };
    setCategory(newCategory);}else{
      console.log('error')
    }
  }

 //---------------------------------------Validadores----------------------------------------------------------//

 function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "name is required";
  } else if (!/^[a-zA-z0-9\s]{3,16}$/.test(input.name)) {
    errors.name = "name is invalid";
  }
  
  if (!input.description) {
    errors.description = "description is required";
  } else if (!/^[a-zA-z0-9\s]{3,200}$/.test(input.description)) {
    errors.description = "description is invalid";
  }
  return errors;
}

console.log(categoryId)
  //------------------------------inputs--------------------------------//
  const onSubmitAdd = (e) => {
    if( !categoryId && !errors.name && !errors.description && category.name.length > 0 && category.description.length > 0){
    e.preventDefault();
    addcategory(category);
    setCategory(initialFormState);
    swal({
           icon: "success",
        })}else{
          e.preventDefault()
          swal({
            icon: "error",
         })
         setErrors(initialFormState)
        }
  
}

  const onSubmitRemove = (e) => {
    if(categoryId != 0  && categoryId !== undefined){
    e.preventDefault();
    dispatch(removeCategory(categoryId));
  setCategoryId(0)
    setCategory(initialFormState)
   
    swal({
      icon: "success",
   })
 setSelect(0)
  
  }else{
e.preventDefault()
     swal({
      icon: "error",
   })
   setErrors(initialFormState)
   };
  };

  console.log(select)


  const onSubmitEdit = (e) => {
    if(!errors.name && !errors.description && categoryId != 0  && categoryId !== undefined){
    e.preventDefault();
    const newCategory = {
      name: category.name,
      description: category.description,
    };
    dispatch(editCategory(categoryId, newCategory));
    setCategory(initialFormState);
    swal({
      icon: "success",
   })}else{
     e.preventDefault();
     swal({
      icon: "error",
   })
   setErrors(initialFormState)
   }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
    setErrors(
            validate({ ...category, [name]: value })
         );
  };

  const handleOnChange = (id) => {
    setCategoryId(id);
    TakeCategoryInfo(id);
  };


  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    setSelect()
  }, [onSubmitAdd, onSubmitEdit, onSubmitRemove]);

  return (
    <div>
      <div className="  ">
        <div >
          <form className="mt-5 md:mt-0 md:col-span-2 border-solid border-4 border-light-blue-500 rounded-md p-2.5 flex justify-center">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label class={errors.name ? "block text-sm font-medium text-red-600" : "block text-sm font-medium text-gray-700" }>
                      Category to Add:
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="name"
                        id="company_website"
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="Give me a name"
                        value={category.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.name && <p className="text-red-600">{errors.name}</p>}
                  </div>
                </div>

                <div>
                  <label class={errors.description ? "block text-sm font-medium text-red-600" : "block text-sm font-medium text-gray-700" }>
                    Description:
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="description"
                      rows="3"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Description"
                      value={category.description}
                      onChange={handleInputChange}
                    ></textarea>
                      {errors.description && <p className="text-red-600">{errors.description}</p>}
                  </div>
                </div>
                <div> Select one category in case to delete or modify:</div>
                {!currentCategories || currentCategories === [] ? (
                  <div>No hay categoriiss </div>
                ) : (
                  <SelectFormCategory
                    onCategory={handleOnChange}
                    categories={currentCategories}
                    value={select}
                  />
                )}

                <br />
                <br />
                <br />
                <br />
              </div>
              <hr></hr>
              <div className="container mx-auto flex flex-col md:flex-row justify-around p-2">
                <button
                  onClick={onSubmitAdd}
                  className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-md transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={ onSubmitEdit}             
                  className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-md transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                >
                  Modify
                </button>
                <button
                  onClick={ onSubmitRemove }                
                  className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-md transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                >
                  Delete
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between">
                        <span className="border-b dark:border-gray-600 w-1/5 md:w-1/4"></span>
                        <Link to={`/products/paneladmin`}>
                            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase hover:underline">Go Back</span>
                        </Link>

                        <span className="border-b dark:border-gray-600 w-1/5 md:w-1/4"></span>
                    </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


