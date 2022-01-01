import React from 'react';
import { FcFilledFilter } from 'react-icons/fc';
import './Search.css';
import { Filter } from '../../../../interfaces/interface';
import { getFilter } from '../../../filterSlice';
import { useDispatch } from 'react-redux';
// import socketIo from '../../../../app/socket';
interface Props {
  baseFilter: Filter;
}
const Search = (props: Props) => {
  // React.useEffect(() => {
  //   console.log({ socketIo });
  //   return () => {};
  // }, []);
  const { baseFilter } = props;
  const dispatch = useDispatch();
  const [filter, setFilter] = React.useState<Filter>(baseFilter);
  React.useEffect(() => {
    setFilter(baseFilter);
  }, [baseFilter]);
  const getCategory = (e: any) => {
    e.preventDefault();
    setFilter({ ...filter, category: e.target.value });
  };
  const getTitle = (e: any) => {
    setFilter({ ...filter, title: e.target.value });
  };
  const getSale = (e: any) => {
    setFilter({ ...filter, sale: e.target.value });
  };
  const getAllFilters = () => {
    dispatch(getFilter(filter));
  };
  const clearFilter = () => {
    setFilter({ title: null, category: null, sale: 'noSale' });
  };
  const listButtonCategory = [
    { title: 'Jeans', value: 'jeans' },
    { title: 'T-shirt', value: 't-shirt' },
    { title: 'Vans', value: 'vans' },
    { title: 'Converse', value: 'converse' },
  ];
  return (
    <div className="search">
      <div className="searchTitle">
        <h2>Enter your title :</h2>
        <input
          type="text"
          placeholder="Enter to search"
          onChange={(e) => {
            getTitle(e);
          }}
        />
      </div>
      <div className="searchCategory">
        <h2>Category :</h2>
        {listButtonCategory.map((buttonCategory) => (
          <button
            value={buttonCategory.value}
            onClick={(e) => {
              getCategory(e);
            }}
            className={
              filter.category === buttonCategory.value ? 'buttonActive' : ''
            }
          >
            {buttonCategory.title}
          </button>
        ))}
        {/* <button
          value="t-shirt"
          onClick={(e) => {
            getCategory(e);
          }}
        >
          T-shirt
        </button>
        <button
          value="jeans"
          onClick={(e) => {
            getCategory(e);
          }}
        >
          Jeans
        </button>
        <button
          value="converse"
          onClick={(e) => {
            getCategory(e);
          }}
        >
          Converse
        </button>
        <button
          value="vans"
          onClick={(e) => {
            getCategory(e);
          }}
        >
          Vans
        </button> */}
      </div>
      <div className="searchSale">
        <h2>Sale:</h2>
        <div>
          <span>
            <input
              type="radio"
              name="sale"
              value="noSale"
              checked={filter.sale === 'noSale'}
              onChange={(e) => {
                getSale(e);
              }}
            />
            <label>noSale</label>
          </span>
          <span>
            <input
              type="radio"
              name="sale"
              value="sale"
              checked={filter.sale === 'sale'}
              onChange={(e) => {
                getSale(e);
              }}
            />
            <label>Sale</label>
          </span>
        </div>
      </div>
      <div className="searchFilter">
        <h2>Filter:</h2>
        <p>Title:{filter.title}</p>
        <span className="filterCategory">Category:{filter.category}</span>
        <p>Sale:{filter.sale}</p>
        <p
          className="clearFilter"
          onClick={() => {
            clearFilter();
          }}
        >
          Clear filters
        </p>
      </div>

      <div
        className="searchBut"
        onClick={() => {
          getAllFilters();
        }}
      >
        Search
        <FcFilledFilter />
      </div>
    </div>
  );
};

export default Search;
