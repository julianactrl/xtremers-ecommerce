import {
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  GET_ALL_CATEGORIES,
  REMOVE_CATEGORY,
  EDIT_CATEGORY,
} from "../constants/categoriesConstants.js";

const categoryReducer = (
  state = {
    allCategories: [],
    error: null,
    loading: false,
  },
  action
) => {
  console.log(action.payload)
  switch (action.type) {
    case ADD_CATEGORY_REQUEST:
      return { loading: true };
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        allCategories: state.allCategories.concat(action.payload),
      };
    case REMOVE_CATEGORY:
      return {
        ...state,
        allCategories: state.allCategories.filter(
          (category) => category.id != action.payload
        ),
      };
    case EDIT_CATEGORY:
      return {
        ...state,
        allCategories: state.allCategories.map((category) =>
          category.id == action.id
            ? Object.assign({}, category, {
                name: action.updates.name,
                description: action.updates.description,
              })
            : category
        ),
      };
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        allCategories: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
