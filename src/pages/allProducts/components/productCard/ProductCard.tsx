import React from 'react';
import { Product } from '../../../../interfaces/interface';
import 'antd/dist/antd.css';
import { Card } from 'react-bootstrap';
import SubmitButton from '../../../../common/button/SubmitButton';
import './Card.css';
import { useHistory } from 'react-router-dom';
// import { getProduct } from '../../../detailsProductSlice';
// import { useDispatch } from 'react-redux';

interface Props {
  product: Product;
}

const ProductCard = (props: Props) => {
  // const dispatch = useDispatch();
  const history = useHistory();
  const product = props.product;
  return (
    <Card style={{ height: '100%' }} className="card">
      <Card.Img style={{}} variant="top" src={product?.imageUrl} />
      <Card.Body className="cardBody">
        <Card.Title className="cardTitle">{product?.title}</Card.Title>
        {/* <Card.Text className="cardDesc">{product?.desc}</Card.Text> */}
        <Card.Text className="cardPrice">
          Price : <span>{product?.price}.vnd</span>
        </Card.Text>
        <div className="cardSale">
          Sale : <span>{product?.sale}%</span>
        </div>
        <div className="cardCategory">
          Category:<span>{product?.category}</span>
        </div>
        <div
          onClick={() => {
            // dispatch(getProduct(product._id));
            history.push(`/details/${product._id}`);
          }}
        >
          <SubmitButton title="View details" />
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
