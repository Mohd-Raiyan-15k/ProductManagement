import { useEffect, useState } from "react";

const empty = {
  title: "", description: "", category: "", price: "",
  discountPercentage: "", rating: "", stock: "", tags: "", brand: ""
};

export default function ProductForm({ initialData, onSubmit, submitText = "Save" }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    setForm(initialData ? {
      ...initialData,
      tags: Array.isArray(initialData.tags) ? initialData.tags.join(", ") : ""
    } : empty);
  }, [initialData]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      price: Number(form.price),
      discountPercentage: Number(form.discountPercentage || 0),
      rating: Number(form.rating || 0),
      stock: Number(form.stock || 0),
      tags: form.tags.split(",").map(x => x.trim()).filter(Boolean)
    });
  };

  return (
    <form className="form" onSubmit={submit}>
      <input name="title" placeholder="Title" value={form.title} onChange={change} required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={change} required />
      <input name="category" placeholder="Category" value={form.category} onChange={change} required />
      <input name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={change} required />
      <input name="discountPercentage" type="number" step="0.01" placeholder="Discount %" value={form.discountPercentage} onChange={change} />
      <input name="rating" type="number" step="0.01" placeholder="Rating" value={form.rating} onChange={change} />
      <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={change} />
      <input name="tags" placeholder="beauty, mascara" value={form.tags} onChange={change} />
      <input name="brand" placeholder="Brand" value={form.brand} onChange={change} required />
      <button type="submit">{submitText}</button>
    </form>
  );
}
