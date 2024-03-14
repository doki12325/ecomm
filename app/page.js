"use client";
import { useDataContext } from "@components/ContextProvider";
import FocusImageView from "@components/FocusImageView";
import styles from "@styles/page.module.css";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const dataContext = useDataContext();

  const [showLightbox, setShowLightbox] = useState(false);
  const [product, setProduct] = useState({
    _id: 1,
    name: "Fall Limited Edition Sneakers",
    brand: "SNEAKER COMPANY",
    desc: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
    price: 250.0,
    discount: 50,
    imageData: [
      {
        id: 1,
        productImage: "/assets/image-product-1.jpg",
        thumbImage: "/assets/image-product-1-thumbnail.jpg",
      },
      {
        id: 2,
        productImage: "/assets/image-product-2.jpg",
        thumbImage: "/assets/image-product-2-thumbnail.jpg",
      },
      {
        id: 3,
        productImage: "/assets/image-product-3.jpg",
        thumbImage: "/assets/image-product-3-thumbnail.jpg",
      },
      {
        id: 4,
        productImage: "/assets/image-product-4.jpg",
        thumbImage: "/assets/image-product-4-thumbnail.jpg",
      },
    ],
  });
  const [quantity, setQuantity] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.heroImageContainer}>
            <Image
              src={product.imageData[activeImage].productImage}
              alt="hero-image"
              width={500}
              height={500}
              className={styles.heroImage}
              onClick={() => setShowLightbox(true)}
            />
            <div className={styles.heroImageControls}>
              <button
                className={styles.controlButton}
                onClick={() =>
                  setActiveImage((prev) =>
                    prev === 0 ? product.imageData.length - 1 : activeImage - 1
                  )
                }
              >
                <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11 1 3 9l8 8"
                    stroke="#1D2026"
                    strokeWidth="3"
                    fill="none"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
              <button
                className={styles.controlButton}
                onClick={() =>
                  setActiveImage((prev) =>
                    prev === product.imageData.length - 1 ? 0 : activeImage + 1
                  )
                }
              >
                <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m2 1 8 8-8 8"
                    stroke="#1D2026"
                    strokeWidth="3"
                    fill="none"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className={styles.previewImageContainer}>
            {product.imageData.map((data, index) => (
              <Image
                src={data.thumbImage}
                alt="preview-image"
                width={500}
                height={500}
                key={index}
                className={`${styles.previewImage} ${
                  index === activeImage && styles.active
                }`}
                onClick={() => setActiveImage(index)}
              />
            ))}
          </div>
        </div>
        <div className={styles.rightSection}>
          <h3 className={styles.brandName}>{product.brand}</h3>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productDesc}>{product.desc}</p>
          <h2 className={styles.productPrice}>
            ${product.price * (product.discount / 100)}
            <span>{product.discount}%</span>
          </h2>
          <h3 className={styles.productPriceMain}>${product.price}</h3>
          <div className={styles.buttonGroup}>
            <div className={styles.quantityButton}>
              <button
                onClick={(e) =>
                  setQuantity((prev) => (prev === 0 ? prev : prev - 1))
                }
              >
                -
              </button>
              <span>{quantity}</span>
              <button onClick={(e) => setQuantity((prev) => prev + 1)}>
                +
              </button>
            </div>
            <button
              className={styles.cartButton}
              onClick={(e) => {
                e.preventDefault();
                if (quantity === 0) return;
                dataContext.setCart((prev) => {
                  if (
                    prev.cartData.find(
                      (data) => data.product._id === product._id
                    )
                  ) {
                    return {
                      ...prev,
                      cartData: prev.cartData.map((data) => {
                        if (data.product._id === product._id) {
                          return {
                            ...data,
                            quantity: data.quantity + quantity,
                          };
                        }
                        return data;
                      }),
                      totalQuantity: prev.totalQuantity + quantity,
                    };
                  }
                  return {
                    ...prev,
                    cartData: [...prev.cartData, { product, quantity }],
                    totalQuantity: prev.totalQuantity + quantity,
                  };
                });
                setQuantity(0);
              }}
            >
              <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                  fillRule="nonzero"
                />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {showLightbox && (
        <FocusImageView product={product} setShowLightbox={setShowLightbox} />
      )}
    </main>
  );
}
