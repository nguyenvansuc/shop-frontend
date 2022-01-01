import React from 'react';
import Banner from '../../common/banner/Banner';
import { BsStarFill } from 'react-icons/bs';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import './Home.css';
import { useSelector, useDispatch } from 'react-redux';
import { State, Product } from '../../interfaces/interface';
import { fetchAllProducts } from '../allProductsSlice';
import { useHistory } from 'react-router-dom';
import Banner1 from '../../assets/images/banner1.jpg';
// import socketIo from '../../app/socket';
import useCheckAdmin from '../../hooks/useCheckAdmin';
// import { X } from '../../app/test';

interface Props {}

const Home = (props: Props) => {
  // const test = React.useContext(X);
  // console.log(test, 'tesssssssssss');
  const currentUser = useSelector(
    (state: State) => state.currentUser.currentUser
  );
  let checkAdmin = useCheckAdmin();
  console.log(checkAdmin);
  // const [listClothes, setListClothes] = React.useState<Product[]>([]);
  // const [listShoes, setListShoes] = React.useState<Product[]>([]);
  const history = useHistory();
  // if (currentUser) {
  //   socketIo.emit('addUser', {
  //     idUser: currentUser?.id,
  //     rules: currentUser?.rules,
  //   });
  // }
  console.log(currentUser);
  const allProducts = useSelector(
    (state: State) => state.allProducts.listProducts
  );
  console.log(allProducts);
  const dispatch = useDispatch();
  const sliceListClothes = (allProducts: Product[]) => {
    const newList = allProducts.filter(
      (product) =>
        product.category === 'jeans' || product.category === 't-shirt'
    );
    return newList.slice(0, 6);
  };
  const sliceListShoes = (allProducts: Product[]) => {
    const newList = allProducts.filter(
      (product) =>
        product.category === 'vans' || product.category === 'converse'
    );
    return newList.slice(0, 4);
  };
  // if (allProducts) {
  //   setListClothes(sliceListClothes(allProducts));
  //   setListShoes(sliceListShoes(allProducts));
  // }
  React.useEffect(() => {
    const getAllProducts = () => {
      dispatch(fetchAllProducts({}));
    };
    getAllProducts();
  }, [dispatch]);

  return (
    <div>
      <div className="mainBanner">
        <Banner />
      </div>
      <div className="mobileMainBanner">
        <img src={Banner1} alt="Mobile" />
        <h2>Your clothes - Your life</h2>
      </div>
      <div className="home-banner">
        <h2>
          <BsStarFill />
          <span>T-shirt & Jeans</span>
          <BsStarFill />
        </h2>
        <Row>
          {sliceListClothes(allProducts).map((product) => (
            <Col md={6} xs={12} key={product._id}>
              <div
                onClick={() => {
                  history.push(`/details/${product._id}`);
                }}
                className="home-product"
              >
                <img style={{ width: '100%' }} src={product?.imageUrl} alt="" />
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <div className="home-banner">
        <h2>
          <BsStarFill />
          <span>Vans & Converse</span>
          <BsStarFill />
        </h2>
        <Row>
          {sliceListShoes(allProducts).map((product) => (
            <Col md={6} xs={12} key={product._id}>
              <div
                className="home-product"
                onClick={() => {
                  history.push(`/details/${product._id}`);
                }}
              >
                <img style={{ width: '100%' }} src={product?.imageUrl} alt="" />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
