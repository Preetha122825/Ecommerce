
import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import category1 from '../assets/images/category-1.jpg';
import category2 from '../assets/images/category-2.jpg';
import category3 from '../assets/images/category-3.jpg';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(0);
  const [skip, setSkip] = useState(0);

  const { search } = useSelector(state => state.search);

  const { data, isLoading, error } = useGetProductsQuery({
    limit,
    skip,
    search
  });

  useEffect(() => {
    if (data) {
      setLimit(4);
      setSkip((currentPage - 1) * limit);
      setTotal(data.total);
      setTotalPage(Math.ceil(total / limit));
    }
  }, [currentPage, data, limit, total, search]);

  const pageHandler = pageNum => {
    if (pageNum >= 1 && pageNum <= totalPage && pageNum !== currentPage) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <>
      <Meta />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {/* {!search && <ProductCarousel />} */}

          {/* HERO SECTION */}
          <section className='hero-section'>
            <Container>
              <div className='hero-content'>
                <h1>Discover Premium Collections</h1>
                <p>
                  Shop trendy fashion, premium accessories, and modern lifestyle
                  products with amazing offers.
                </p>

                <div className='hero-buttons'>
                  <Link to='/shop'>
                    <Button className='shop-btn'>Shop Now</Button>
                  </Link>

                  <Link to='/cart'>
                    <Button variant='outline-light'>View Cart</Button>
                  </Link>
                </div>
              </div>
            </Container>
          </section>

          {/* CATEGORY SECTION */}
          <section className='category-section'>
            <Container>
              <h2 className='section-title'>Popular Categories</h2>

              <div className='category-grid'>
                <div className='category-card'>
                  <img
                    src={category1}
                    alt='Electronics'
                  />
                  <h4>Electronics</h4>
                </div>

                <div className='category-card'>
                  <img
                    src={category2}
                    alt='Fashion'
                  />
                  <h4>Fashion</h4>
                </div>

                <div className='category-card'>
                  <img
                    src={category3}
                    alt='Accessories'
                  />
                  <h4>Accessories</h4>
                </div>
              </div>
            </Container>
          </section>

          {/* PRODUCT SECTION */}
          <Container>
            <div className='products-header'>
              <h2 className='section-title'>Latest Products</h2>
              <p>Explore our newest arrivals</p>
            </div>

            <Row>
              {data.products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>

            {totalPage > 1 && !search && (
              <Paginate
                currentPage={currentPage}
                totalPage={totalPage}
                pageHandler={pageHandler}
              />
            )}
          </Container>

          {/* OFFER SECTION */}
          <section className='offer-section'>
            <Container>
              <div className='offer-box'>
                <h2>Special Offer</h2>
                <p>Get up to 50% OFF on selected products</p>
                <Button variant='light'>Explore Deals</Button>
              </div>
            </Container>
          </section>
        </>
      )}
    </>
  );
};

export default HomePage;


