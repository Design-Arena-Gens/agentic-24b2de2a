'use client'

import { useState } from 'react'

interface Product {
  id: number
  name: string
  price: number
  description: string
  emoji: string
}

interface CartItem extends Product {
  quantity: number
}

const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    description: 'Premium noise-cancelling headphones with 30-hour battery life',
    emoji: '🎧'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 299.99,
    description: 'Fitness tracking, heart rate monitor, and smart notifications',
    emoji: '⌚'
  },
  {
    id: 3,
    name: 'Laptop Stand',
    price: 49.99,
    description: 'Ergonomic aluminum stand for better posture and comfort',
    emoji: '💻'
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    price: 149.99,
    description: 'RGB backlit mechanical keyboard with custom switches',
    emoji: '⌨️'
  },
  {
    id: 5,
    name: 'Wireless Mouse',
    price: 59.99,
    description: 'Precision optical sensor with ergonomic design',
    emoji: '🖱️'
  },
  {
    id: 6,
    name: 'USB-C Hub',
    price: 79.99,
    description: '7-in-1 hub with HDMI, USB 3.0, and SD card reader',
    emoji: '🔌'
  },
  {
    id: 7,
    name: 'Portable Charger',
    price: 39.99,
    description: '20,000mAh power bank with fast charging support',
    emoji: '🔋'
  },
  {
    id: 8,
    name: 'Bluetooth Speaker',
    price: 89.99,
    description: 'Waterproof speaker with 360° sound and deep bass',
    emoji: '🔊'
  },
  {
    id: 9,
    name: 'Webcam HD',
    price: 69.99,
    description: '1080p HD webcam with auto-focus and built-in microphone',
    emoji: '📷'
  }
]

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, change: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    )
  }

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  return (
    <>
      <header className="header">
        <div className="container header-content">
          <div className="logo">🛒 ShopHub</div>
          <button className="cart-icon" onClick={() => setShowCart(true)}>
            Cart
            {getTotalItems() > 0 && (
              <span className="cart-count">{getTotalItems()}</span>
            )}
          </button>
        </div>
      </header>

      <main className="container">
        <div className="hero">
          <div className="container">
            <h1>Premium Tech Products</h1>
            <p>Discover the latest gadgets and accessories for your digital lifestyle</p>
          </div>
        </div>

        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">{product.emoji}</div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">${product.price}</span>
                  <button
                    className="add-to-cart"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showCart && (
        <div className="cart-modal" onClick={() => setShowCart(false)}>
          <div className="cart-content" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Shopping Cart</h2>
              <button className="close-cart" onClick={() => setShowCart(false)}>
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty</p>
                <button className="checkout-btn" onClick={() => setShowCart(false)}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-info">
                        <h3>{item.emoji} {item.name}</h3>
                        <p className="cart-item-price">${item.price}</p>
                      </div>
                      <div className="cart-item-actions">
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            −
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="remove-item"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-total">
                  <h3>Total:</h3>
                  <span className="cart-total-price">${getTotalPrice().toFixed(2)}</span>
                </div>

                <button className="checkout-btn">
                  Proceed to Checkout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
