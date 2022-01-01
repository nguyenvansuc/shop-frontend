import React from 'react';
import SubmitButton from '../../common/button/SubmitButton';
import { useForm } from 'react-hook-form';
import './AddNewProduct.css';
import { ProductAdd } from '../../interfaces/interface';
import productApi from '../../app/api/productApi';

interface Props {}

const AddNewProduct = (props: Props) => {
  const [note, setNote] = React.useState('');
  const { register, handleSubmit } = useForm();
  const [imageUrl, setImageUrl] = React.useState<any>(undefined);
  const upload = async (e: any) => {
    console.log(e.target.files[0]);
    const imageFile = e.target.files[0];
    const result: any = await convertBase64(imageFile);
    console.log(result);
    setImageUrl(result);
  };
  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      console.log('1');
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };
  const onSubmit = (data: ProductAdd) => {
    const addNewProduct = async () => {
      const newImageUrl = await convertBase64(data?.imageUrl[0]);
      data.imageUrl = newImageUrl;
      const result = await productApi.addProduct(data);
      console.log(result);
      setNote(result?.message);
    };
    addNewProduct();
    console.log(data, 'new');
  };
  return (
    <div className="addNewProduct">
      <form onSubmit={handleSubmit(onSubmit)} className="addForm">
        <h1>Add new product :</h1>
        <div className="addTitle">
          <label>Title:</label>
          <input type="text" {...register('title')} />
        </div>
        <div className="addDesc">
          <label>Description:</label>
          <textarea {...register('desc')} />
        </div>
        <div className="addPrice">
          <label>Price:</label>
          <input type="number" {...register('price')} />
        </div>
        <div className="addSale">
          <label>Sale:</label>
          <input type="number" {...register('sale')} />
        </div>
        <div className="addCategory">
          <label>Category:</label>
          <select {...register('category')}>
            <option value="t-shirt">T-shirt</option>
            <option value="jeans">Jeans</option>
            <option value="converse">Converse</option>
            <option value="vans">Vans</option>
          </select>
        </div>
        <div className="addImage">
          <label>Upload image :</label>
          <div>
            <input
              type="file"
              {...register('imageUrl')}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                upload(e);
              }}
            />
            <img src={imageUrl} alt="" />
          </div>
        </div>
        <div style={{ textAlign: 'left' }}>
          Note:<p>{note}</p>
        </div>
        <div className="addButton">
          <SubmitButton title="Add new product" />
        </div>
      </form>
    </div>
  );
};

export default AddNewProduct;
