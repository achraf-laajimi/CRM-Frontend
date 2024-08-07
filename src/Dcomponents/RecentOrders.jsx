import React from 'react'
import { Link } from 'react-router-dom'
import { getOrderStatus } from '../helpers'

const recentOrderData = [
	{
		id: '1',
		product_id: '4324',
		customer_id: '23143',
		customer_name: 'Shirley A. Lape',
		order_date: '2022-05-17',
		order_total: '$435.50',
		current_order_status: 'PREPARING',
		shipment_address: 'Cottage Grove, OR 97424'
	},
	{
		id: '7',
		product_id: '7453',
		customer_id: '96453',
		customer_name: 'Ryan Carroll',
		order_date: '2022-05-14',
		order_total: '$96.35',
		current_order_status: 'NEW ORDER',
		shipment_address: 'Los Angeles, CA 90017'
	},
	{
		id: '2',
		product_id: '5434',
		customer_id: '65345',
		customer_name: 'Mason Nash',
		order_date: '2022-05-17',
		order_total: '$836.44',
		current_order_status: 'NEW ORDER',
		shipment_address: 'Westminster, CA 92683'
	},
	{
		id: '3',
		product_id: '9854',
		customer_id: '87832',
		customer_name: 'Luke Parkin',
		order_date: '2022-05-16',
		order_total: '$334.50',
		current_order_status: 'PREPARING',
		shipment_address: 'San Mateo, CA 94403'
	},
	{
		id: '4',
		product_id: '8763',
		customer_id: '09832',
		customer_name: 'Anthony Fry',
		order_date: '2022-05-14',
		order_total: '$876.00',
		current_order_status: 'PREPARING',
		shipment_address: 'San Mateo, CA 94403'
	},
]

export default function RecentOrders() {
	return (
		<div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">Recent Orders</strong>
            <div className="border-x border-gray-200 rounded-sm mt-3">
                <table className="w-full text-gray-700 text-sm"> {/* Added space-y-4 for bigger spacing */}
                <thead>
                    <tr className=' bg-slate-100'>
                    <th className="px-2 py-3 text-left border-b">ID</th>
                    <th className="px-2 text-left border-b">Product ID</th>
                    <th className="px-2 text-left border-b">Customer Name</th>
                    <th className="px-2 text-left border-b">Order Date</th>
                    <th className="px-2 text-left border-b">Order Total</th>
                    <th className="px-2 text-left border-b">Shipping Address</th>
                    <th className="px-2 text-left border-b">Order Status</th>
                    </tr>
                </thead>
                <tbody>
                    {recentOrderData.map((order) => (
                    <tr key={order.id}>
                        <td className="px-2 py-3 border-b">
                        <Link to={`/orders/${order.id}`} className="text-blue-400">#{order.id}</Link>
                        </td>
                        <td className="px-2 border-b">
                        <Link to={`/products/${order.product_id}`} className="text-blue-400">#{order.product_id}</Link>
                        </td>
                        <td className="px-2 border-b">
                        <Link to={`/customers/${order.customer_id}`} className="text-blue-400">{order.customer_name}</Link>
                        </td>
                        <td className="px-2 border-b">{order.order_date}</td>
                        <td className="px-2 border-b">{order.order_total}</td>
                        <td className="px-2 border-b">{order.shipment_address}</td>
                        <td className="px-2 border-b">{getOrderStatus(order.current_order_status)}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>

	)
}