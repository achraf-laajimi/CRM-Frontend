import React, { useEffect, useState } from 'react';
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
import { getUsers } from '../api/UserMethods';
import { getOrders } from '../api/OrderMethods';
import { getProducts } from '../api/ProductMethods';

export default function Stats() {
	const [totalSales, setTotalSales] = useState(0);
	const [totalOrders, setTotalOrders] = useState(0);
	const [totalCustomers, setTotalCustomers] = useState(0);
	const [totalProducts, setTotalProducts] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
		  try {
			const orders = await getOrders();
			const users = await getUsers();
			const products = await getProducts();
	
			// Calculate total sales from delivered orders
			const sales = orders
			  .filter(order => order.status === 'Delivered') // Adjust status if needed
			  .reduce((acc, order) => acc + order.totalAmount, 0);
	
			setTotalSales(sales);
			setTotalProducts(products.length);
			setTotalOrders(orders.length);
			setTotalCustomers(users.length);
		  } catch (error) {
			console.error('Error fetching data:', error);
		  }
		};
	
		fetchData();
	  }, []);

	return (
		<div className="flex gap-5 w-full">
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
					<IoBagHandle className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Sales</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">${totalSales}</strong>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
					<IoPieChart className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Products</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{totalProducts}</strong>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
					<IoPeople className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Customers</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{totalCustomers}</strong>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
					<IoCart className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Orders</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{totalOrders}</strong>
					</div>
				</div>
			</BoxWrapper>
		</div>
	)
}

function BoxWrapper({ children }) {
	return <div className="bg-white rounded-sm p-4 border border-gray-200 flex items-center w-72">{children}</div>
}