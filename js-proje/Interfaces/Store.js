/**
 * Veri Yönetim Katmanı (Interface / Data Store)
 * LocalStorage kullanarak kalıcı CRUD (Create, Read, Update, Delete) işlemleri yapar.
 */

export class Store {
  static getProducts() {
    let products;
    if (localStorage.getItem('brewly_v2_products') === null) {
      products = [
        { id: '1', name: 'Caramel Latte', category: 'Sıcak İçecek', price: 85, icon: '☕' },
        { id: '2', name: 'Iced Mocha', category: 'Soğuk İçecek', price: 90, icon: '🧋' },
        { id: '3', name: 'Flat White', category: 'Sıcak İçecek', price: 75, icon: '🥤' },
        { id: '4', name: 'Matcha Latte', category: 'Sıcak İçecek', price: 95, icon: '🍵' },
        { id: '5', name: 'Cold Brew', category: 'Soğuk İçecek', price: 70, icon: '🧊' },
        { id: '6', name: 'Strawberry Frappe', category: 'Soğuk İçecek', price: 110, icon: '🍓' }
      ];
      localStorage.setItem('brewly_v2_products', JSON.stringify(products));
    } else {
      products = JSON.parse(localStorage.getItem('brewly_v2_products'));
    }
    return products;
  }

  static addProduct(product) {
    const products = Store.getProducts();
    // Benzersiz ID oluştur
    product.id = Date.now().toString();
    products.push(product);
    localStorage.setItem('brewly_v2_products', JSON.stringify(products));
  }

  static updateProduct(updatedProduct) {
    const products = Store.getProducts();
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      localStorage.setItem('brewly_v2_products', JSON.stringify(products));
    }
  }

  static removeProduct(id) {
    const products = Store.getProducts();
    const filteredProducts = products.filter(product => product.id !== id);
    localStorage.setItem('brewly_v2_products', JSON.stringify(filteredProducts));
  }
}
