"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./products.module.css";

const starArray = (rating) => Array.from({ length: 5 }, (_, index) => index < Math.round(rating));

const formatPrice = (price) => `$${Number(price).toFixed(2)}`;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingBox}>
        <div className={styles.loader} />
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.grid}>
        {products.map((product) => {
          const isRatingHigh = product.rating?.rate >= 4.5;

          return (
            <Link key={product.id} href={`/products/details/${product.id}`} className={styles.cardLink}>
              <article className={styles.card}>
                <div className={styles.imageWrap}>
                  <img src={product.image} alt={product.title} className={styles.image} />
                </div>

                <div className={styles.metaRow}>
                  <span className={styles.shipLabel}>Ships to Ukraine</span>
                </div>

                <p className={styles.titleLink}>{product.title}</p>

                <div className={styles.ratingRow}>
                  <span className={styles.stars} aria-label={`Rating ${product.rating?.rate || 0} out of 5`}>
                    {starArray(product.rating?.rate || 0).map((filled, index) => (
                      <span key={`${product.id}-star-${index}`} className={filled ? styles.filledStar : styles.emptyStar}>
                        ★
                      </span>
                    ))}
                  </span>
                  <span className={styles.reviewCount}>{product.rating?.count || 0} reviews</span>
                </div>

                <div className={styles.priceRow}>
                  <span className={styles.price}>{formatPrice(product.price)}</span>
                  {isRatingHigh && <span className={styles.oldPrice}>${(product.price + 9.99).toFixed(2)}</span>}
                </div>
              </article>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
