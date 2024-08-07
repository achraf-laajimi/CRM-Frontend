import React from 'react';
import Stats from '../Dcomponents/Stats';
import TransactionChart from '../Dcomponents/TransactionChart';
import UsersPieChart from '../Dcomponents/UsersPieChart';
import RecentOrders from '../Dcomponents/RecentOrders';
import PopularProducts from '../Dcomponents/PopularProducts';

function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
			<Stats />
			<div className="flex flex-row gap-4 w-full">
				<TransactionChart />
				<UsersPieChart />
			</div>
			<div className="flex flex-row gap-4 w-full">
				<RecentOrders />
				<PopularProducts />
			</div>
		</div>
  );
}

export default Dashboard;