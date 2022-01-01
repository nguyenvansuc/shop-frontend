import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { BsFacebook } from 'react-icons/bs';
import { RiInstagramFill } from 'react-icons/ri';
import { BsMessenger } from 'react-icons/bs';
import { MdOutgoingMail } from 'react-icons/md';
import { ImLocation } from 'react-icons/im';
import './Footer.css';
import { useDispatch } from 'react-redux';
import { getFilter } from '../../pages/filterSlice';
import { useHistory } from 'react-router-dom';

interface Props {}

const Footer = (props: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClickTShirt = (category: string) => {
    dispatch(getFilter({ title: null, category: category, sale: 'noSale' }));
    history.push('/allProducts');
  };
  return (
    <div className="footer">
      <Row>
        <Col md={8} xs={24} className="footerDetails">
          <h2>Category</h2>
          <ul>
            <li
              onClick={() => {
                handleClickTShirt('t-shirt');
              }}
            >
              T-shirts
            </li>
            <li
              onClick={() => {
                handleClickTShirt('jeans');
              }}
            >
              Jeans
            </li>
            <li
              onClick={() => {
                handleClickTShirt('converse');
              }}
            >
              Converse
            </li>
            <li
              onClick={() => {
                handleClickTShirt('vans');
              }}
            >
              Vans
            </li>
          </ul>
        </Col>
        <Col md={8} xs={24} className="footerDetails">
          <h2>Contact with us</h2>
          <ul>
            <li>
              <BsFacebook />
              <span>Facebook</span>
            </li>
            <li>
              <RiInstagramFill />
              <span>Instagram</span>
            </li>
            <li>
              <BsMessenger />
              <span> Messenger</span>
            </li>
            <li>
              <MdOutgoingMail />
              <span>shop123@gmail.com</span>
            </li>
            <li>
              <ImLocation />
              <span>Cầu Giấy, Hà Nội</span>
            </li>
          </ul>
        </Col>
        <Col md={8} xs={24} className="footerDetails">
          <h2>NEWSLETTER SIGNUP</h2>
          <ul>
            <li>
              You only live once, but if you do it right, once is enough.
              --------- Mae West
            </li>
            <li>
              {' '}
              There are only two ways to live your life. One is as though
              nothing is a miracle. The other is as though everything is a
              miracle. ― Albert Einstein.
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
