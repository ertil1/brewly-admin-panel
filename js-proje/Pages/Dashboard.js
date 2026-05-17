import { Store } from '../Interfaces/Store.js';
import { createProductCard } from '../Components/ProductCard.js';

export class Dashboard {
  constructor() {
    // DOM Elementleri
    this.grid = document.getElementById('product-grid');
    this.modal = document.getElementById('product-modal');
    this.form = document.getElementById('product-form');
    this.btnAdd = document.getElementById('btn-add-product');
    this.btnCloseModal = document.getElementById('btn-close-modal');
    this.btnCancelModal = document.getElementById('btn-cancel-modal');
    this.modalTitle = document.getElementById('modal-title');

    // Form Alanları
    this.inputId = document.getElementById('product-id');
    this.inputName = document.getElementById('product-name');
    this.inputCategory = document.getElementById('product-category');
    this.inputPrice = document.getElementById('product-price');
    this.inputIcon = document.getElementById('product-icon');

    // Olay Dinleyicileri Bağlama (Binding)
    this.btnAdd.addEventListener('click', () => this.openModal());
    this.btnCloseModal.addEventListener('click', () => this.closeModal());
    this.btnCancelModal.addEventListener('click', () => this.closeModal());
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // İlk Yükleme
    this.render();
  }

  // --- CRUD: READ ---
  render() {
    const products = Store.getProducts();
    this.grid.innerHTML = '';

    if (products.length === 0) {
      this.grid.innerHTML = `
        <div class="empty-state">
          <span>📭</span>
          <h2>Henüz ürün eklenmemiş</h2>
          <p>Yeni bir kahve eklemek için yukarıdaki butonu kullanın.</p>
        </div>
      `;
      return;
    }

    products.forEach(product => {
      // Bileşeni üret ve eventleri gönder
      const card = createProductCard(
        product, 
        (p) => this.openModal(p), // Düzenle (Edit)
        (id) => this.handleDelete(id) // Sil (Delete)
      );
      this.grid.appendChild(card);
    });
  }

  // --- CRUD: CREATE & UPDATE (Form Gönderimi) ---
  handleSubmit(e) {
    e.preventDefault();

    const productData = {
      name: this.inputName.value,
      category: this.inputCategory.value,
      price: parseFloat(this.inputPrice.value),
      icon: this.inputIcon.value
    };

    const editId = this.inputId.value;

    if (editId) {
      // Güncelle (Update)
      productData.id = editId;
      Store.updateProduct(productData);
    } else {
      // Ekle (Create)
      Store.addProduct(productData);
    }

    this.closeModal();
    this.render(); // Listeyi yenile
  }

  // --- CRUD: DELETE ---
  handleDelete(id) {
    Store.removeProduct(id);
    this.render(); // Listeyi yenile
  }

  // --- Modal Yönetimi ---
  openModal(product = null) {
    if (product) {
      // Düzenleme Modu
      this.modalTitle.textContent = 'Ürün Düzenle';
      this.inputId.value = product.id;
      this.inputName.value = product.name;
      this.inputCategory.value = product.category;
      this.inputPrice.value = product.price;
      this.inputIcon.value = product.icon;
    } else {
      // Ekleme Modu
      this.modalTitle.textContent = 'Yeni Ürün Ekle';
      this.form.reset();
      this.inputId.value = '';
    }
    
    this.modal.classList.add('active');
  }

  closeModal() {
    this.modal.classList.remove('active');
    this.form.reset();
  }
}
