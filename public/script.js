const API_BASE = "http://localhost:3000";
const list = document.getElementById("list");

async function loadProducts() {
  try {
    const res = await fetch(`${API_BASE}/products`);
    const products = await res.json();
    console.log(products); 

    
    list.innerHTML = "";
    products.forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.name} - $${p.price}`;
      list.appendChild(li);
    });
  } catch (err) {
    console.log("Error fetching products:", err);
  }
}

loadProducts();
