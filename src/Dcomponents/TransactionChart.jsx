import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
	{
		name: 'Jan',
		Orders: 300,
		Visitors: 5000,
		Income: 2400
	},
	{
		name: 'Feb',
		Orders: 200,
		Visitors: 4000,
		Income: 3200
	},
	{
		name: 'Mar',
		Orders: 350,
		Visitors: 6000,
		Income: 4300
	},
	{
		name: 'Apr',
		Orders: 400,
		Visitors: 7500,
		Income: 5200
	},
	{
		name: 'May',
		Orders: 450,
		Visitors: 8000,
		Income: 6100
	},
	{
		name: 'Jun',
		Orders: 300,
		Visitors: 6500,
		Income: 4200
	},
	{
		name: 'July',
		Orders: 500,
		Visitors: 9000,
		Income: 7200
	},
	{
		name: 'Aug',
		Orders: 600,
		Visitors: 10000,
		Income: 8200
	},
	{
		name: 'Sep',
		Orders: 550,
		Visitors: 9500,
		Income: 7900
	},
	{
		name: 'Oct',
		Orders: 480,
		Visitors: 8500,
		Income: 6800
	},
	{
		name: 'Nov',
		Orders: 520,
		Visitors: 8700,
		Income: 7100
	},
	{
		name: 'Dec',
		Orders: 630,
		Visitors: 12000,
		Income: 9400
	}
]

export default function TransactionChart() {
	return (
		<div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
			<strong className="text-gray-700 font-medium">Stats</strong>
			<div className="mt-3 w-full flex-1 text-xs">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 20,
							right: 10,
							left: -10,
							bottom: 0
						}}
					>
						<CartesianGrid strokeDasharray="3 3" vertical={false} />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="Income" fill="#0ea5e9" />
						<Bar dataKey="Orders" fill="#34d399" />
						<Bar dataKey="Visitors" fill="#facc15" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
