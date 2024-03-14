import React, { useState } from "react";

import styles from "@styles/focus.module.css";

import Image from "next/image";

function FocusImageView(props) {
  const product = props.product;
  const [activeImage, setActiveImage] = useState(0);
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <button
          className={styles.closeButton}
          onClick={(e) => {
            e.preventDefault();
            props.setShowLightbox(false);
          }}
        >
          <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
              fillRule="evenodd"
            />
          </svg>
        </button>
        <div className={styles.heroImageContainer}>
          <Image
            src={product.imageData[activeImage].productImage}
            alt="hero-image"
            width={500}
            height={500}
            className={styles.heroImage}
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
                  //   stroke="#1D2026"
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
                  //   stroke="#1D2026"
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
                index === activeImage ? styles.active : ""
              }`}
              onClick={() => setActiveImage(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FocusImageView;
