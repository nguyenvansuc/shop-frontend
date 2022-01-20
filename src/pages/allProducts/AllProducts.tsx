import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import Search from './components/search/Search';
import { Filter, Product } from '../../interfaces/interface';
import ProductCard from './components/productCard/ProductCard';
import './AllProducts.css';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../interfaces/interface';
import { fetchAllProducts } from '../allProductsSlice';
import { FiLoader } from 'react-icons/fi';
// import { FaSearch } from 'react-icons/fa';

interface Props {}

const AllProducts = (props: Props) => {
  const dispatch = useDispatch();
  const listProducts = useSelector(
    (state: State) => state.allProducts.listProducts
  );
  const isLoading = useSelector((state: State) => state.allProducts.isLoading);
  const filter = useSelector((state: State) => state.filter.filter);
  React.useEffect(() => {
    const getAllProducts = async (filter: Filter) => {
      dispatch(fetchAllProducts(filter));
    };
    getAllProducts(filter);
  }, [dispatch, filter]);
  return (
    <div className="allProducts">
      <Row>
        <Col md={6} xs={24}>
          {/* <div className="mobileSearchIcon">
            <span>
              {' '}
              Search
              <FaSearch />
            </span>
          </div> */}
          <div className="searchAll">
            <Search baseFilter={filter} />
          </div>
        </Col>
        <Col md={18} xs={24}>
          <Row>
            {isLoading && (
              <span style={{ fontSize: '32px' }}>
                <FiLoader />
                loading......
              </span>
            )}
            {listProducts?.map((product: Product, i: number) => (
              <Col
                span={8}
                xs={12}
                md={12}
                lg={8}
                style={{ padding: '8px' }}
                key={i}
              >
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AllProducts;
