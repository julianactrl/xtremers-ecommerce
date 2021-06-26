import React from 'react';


const Pagination = ({ prodPerPage, totalProd, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProd / prodPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
   


    <div className='px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between'>
      <ul className='flex items-center '>
        {pageNumbers.map(number => (
          <li key={number} className='w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100'>
            
            <a className='flex flex-center' 
            
            onClick={(e) => {e.preventDefault(); paginate(number)}} className='page-link'>
              {number}
            </a>

          </li>
        ))}
      </ul>
    </div>

  );
  
};

export default Pagination;