import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import API from "./services/api";
import ProductForm from "./components/ProductForm";

function Layout({ children }) {
  return (
    <>
      <nav className="nav">
        <Link to="/">Products</Link>
        <Link to="/add">Add Product</Link>
        <Link to="/about">API Info</Link>
      </nav>
      <main className="container">{children}</main>
    </>
  );
}

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;
      const response = await API.get("products/", { params });
      setProducts(Array.isArray(response.data) ? response.data : response.data.results || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Could not load products. Is Django running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(load, 250);
    return () => clearTimeout(timer);
  }, [search, category]);

  const remove = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await API.delete(`products/${id}/`);
    load();
  };

  return (
    <>
      <h1>Product Management</h1>
      <div className="filters">
        <input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
        <input placeholder="Category..." value={category} onChange={e => setCategory(e.target.value)} />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="grid">
        {products.map(p => (
          <article className="card" key={p.id}>
            <h2>{p.title}</h2>
            <p>{p.description}</p>
            <p><b>Brand:</b> {p.brand}</p>
            <p><b>Category:</b> {p.category}</p>
            <p><b>Price:</b> ${p.price}</p>
            <p><b>Discount:</b> {p.discountPercentage}%</p>
            <p><b>Rating:</b> {p.rating}</p>
            <p><b>Stock:</b> {p.stock}</p>
            <p><b>Tags:</b> {p.tags?.join(", ")}</p>
            <div className="actions">
              <Link className="button" to={`/edit/${p.id}`}>Edit</Link>
              <button onClick={() => remove(p.id)}>Delete</button>
            </div>
          </article>
        ))}
      </div>
      {!loading && products.length === 0 && <p>No products found.</p>}
    </>
  );
}

function AddProduct() {
  const navigate = useNavigate();
  const create = async data => {
    await API.post("products/", data);
    navigate("/");
  };
  return <><h1>Add Product</h1><ProductForm onSubmit={create} submitText="Create Product" /></>;
}

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`products/${id}/`).then(r => setProduct(r.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const update = async data => {
    await API.put(`products/${id}/`, data);
    navigate("/");
  };

  return <><h1>Edit Product</h1><ProductForm initialData={product} onSubmit={update} submitText="Update Product" /></>;
}

function About() {
  return (
    <>
      <h1>API Information</h1>
      <p>Base URL: http://127.0.0.1:8000/api/</p>
      <ul>
        <li>GET /products/</li>
        <li>POST /products/</li>
        <li>GET /products/:id/</li>
        <li>PUT /products/:id/</li>
        <li>PATCH /products/:id/</li>
        <li>DELETE /products/:id/</li>
      </ul>
    </>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Layout>
  );
}
