import React from 'react';
import { Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

// Updated handleDownload function to accept an imageURL parameter
const handleDownload = (imageURL) => {
  fetch(imageURL)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'product-image.jpg'); // or use product.name for a more dynamic approach
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    })
    .catch(err => console.error(err));
};

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' className='product-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>

        {/* Download Button */}
        <button onClick={() => handleDownload(product.image)} style={{ marginTop: '10px' }}>Download Image</button>
      </Card.Body>
    </Card>
    
  );
};

export default Product;
