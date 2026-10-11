async function getProduct(id) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Product not found");
  }
  return response.json();
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <main className="page-shell detail-shell">
      <section className="detail-card">
        <div className="detail-image-wrap">
          <img src={product.image} alt={product.title} className="detail-image" />
        </div>

        <div className="detail-content">
          <p className="detail-category">{product.category}</p>
          <h1>{product.title}</h1>
          <div className="detail-rating">
            <span>★ {product.rating?.rate}</span>
            <span>({product.rating?.count} ratings)</span>
          </div>
          <p className="detail-price">${product.price}</p>
          <p className="detail-description">{product.description}</p>
        </div>
      </section>
    </main>
  );
}
