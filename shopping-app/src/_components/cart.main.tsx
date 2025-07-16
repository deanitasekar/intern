import UseCart from "../_hooks/cart.hook";
import "../App.css";

export default function Home() {
	const {
		data: { cart },
		handler: { addToCart, removeFromCart, getTotalPrice, getTotalItems },
	} = UseCart();

	const sampleProducts = [
		{
			id: 1,
			image: "/placeholder.png",
			name: "Buku React Pemula",
			price: 150000,
		},
		{
			id: 2,
			image: "/placeholder.png",
			name: "Keyboard Mekanik RGB",
			price: 750000,
		},
		{
			id: 3,
			image: "/placeholder.png",
			name: "Mouse Gaming Wireless",
			price: 300000,
		},
		{
			id: 4,
			image: "/placeholder.png",
			name: "Headset Gaming 7.1",
			price: 500000,
		},
		{
			id: 5,
			image: "/placeholder.png",
			name: "Monitor Ultrawide 27",
			price: 2500000,
		},
		{
			id: 6,
			image: "/placeholder.png",
			name: "Webcam Full HD",
			price: 200000,
		},
	];

	return (
		<div className="shopping-cart-app">
			<h1> Simple E-Commerce </h1>

			<div className="product-list-section">
				<h2> Daftar Produk </h2>

				<div className="product-list">
					{sampleProducts.map((product) => (
						<div key={product.id} className="product-item">
							<img
								src={product.image}
								alt={product.name}
								className="product-item-image"
							/>

							<div className="product-item-info">
								<h3>{product.name}</h3>
								<p>Rp {product.price.toLocaleString()}</p>
							</div>
							<div className="product-item-actions">
								<button onClick={() => addToCart(product)}>
									Tambah ke Keranjang
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="cart-section">
				<h2> Keranjang Belanja Anda ({getTotalItems()})</h2>
				<div className="cart-items-list">
					{cart.length === 0 ? (
						<div className="empty-cart-message">
							Keranjang Anda masih kosong
						</div>
					) : (
						<>
							{cart.map((item) => (
								<div key={item.id} className="cart-item">
									<div className="cart-item-details">
										<span className="item-name">
											{item.name} x {item.quantity}
										</span>
										<span className="item-price-each">
											Rp {item.price.toLocaleString()}
										</span>
									</div>
									<div className="cart-item-actions">
										<span className="item-total">
											{" "}
											Rp {(item.price * item.quantity).toLocaleString()}
										</span>
										<button
											className="remove-btn"
											onClick={() => removeFromCart(item.id)}
										>
											x
										</button>
									</div>
								</div>
							))}
						</>
					)}
				</div>
				{cart.length > 0 && (
					<div className="cart-summary">
						Total: Rp {getTotalPrice().toLocaleString()}
					</div>
				)}
			</div>
		</div>
	);
}