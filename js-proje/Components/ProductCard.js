/**
 * Ürün Kartı Component'i
 * Gelen ürün verisine göre HTML DOM elemanı üretir.
 */

export function createProductCard(product, onEdit, onDelete) {
  const card = document.createElement('div');
  card.className = 'product-card';
  
  card.innerHTML = `
    <div class="product-icon">${product.icon}</div>
    <div class="product-info">
      <h3>${product.name}</h3>
      <p>${product.category}</p>
    </div>
    <div class="product-price">₺${product.price}</div>
    <div class="card-actions">
      <button class="btn btn-edit edit-btn" data-id="${product.id}">Düzenle</button>
      <button class="btn btn-danger delete-btn" data-id="${product.id}">Sil</button>
    </div>
  `;

  // Event Listeners ekleme
  const editBtn = card.querySelector('.edit-btn');
  const deleteBtn = card.querySelector('.delete-btn');

  editBtn.addEventListener('click', () => onEdit(product));
  deleteBtn.addEventListener('click', () => {
    if (confirm(`'${product.name}' adlı ürünü silmek istediğinize emin misiniz?`)) {
      onDelete(product.id);
    }
  });

  return card;
}
