import React, { useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUpIcon, PackageIcon, CalendarIcon, DollarSignIcon } from 'lucide-react';
import _ from 'lodash';

export default function SalesDashboard({ orders }) {
    // Calculate monthly sales data
    const monthlySales = useMemo(() => {
        const grouped = _.groupBy(orders, (order) => {
            const date = new Date(order.created_at);
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        });

        return Object.entries(grouped).map(([month, orders]) => ({
            month,
            total: orders.reduce((sum, order) => sum + parseFloat(order.total_price), 0),
            count: orders.length
        })).sort((a, b) => a.month.localeCompare(b.month));
    }, [orders]);

    // Calculate daily sales data (last 7 days)
    const dailySales = useMemo(() => {
        const last7Days = _.groupBy(
            orders.filter(order => {
                const orderDate = new Date(order.created_at);
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                return orderDate >= sevenDaysAgo;
            }),
            order => new Date(order.created_at).toISOString().split('T')[0]
        );

        return Object.entries(last7Days).map(([date, orders]) => ({
            date,
            total: orders.reduce((sum, order) => sum + parseFloat(order.total_price), 0),
            count: orders.length
        })).sort((a, b) => a.date.localeCompare(b.date));
    }, [orders]);

    // Calculate popular products
    const popularProducts = useMemo(() => {
        const productCounts = {};
        orders.forEach(order => {
            order.orderItems?.forEach(item => {
                const productId = item.product_id;
                productCounts[productId] = (productCounts[productId] || 0) + item.quantity;
            });
        });

        return Object.entries(productCounts)
            .map(([productId, quantity]) => ({ productId, quantity }))
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5);
    }, [orders]);

    // Calculate total metrics
    const metrics = useMemo(() => {
        const total = orders.reduce((sum, order) => sum + parseFloat(order.total_price), 0);
        const today = new Date().toISOString().split('T')[0];
        const todayOrders = orders.filter(order =>
            new Date(order.created_at).toISOString().split('T')[0] === today
        );
        const todayTotal = todayOrders.reduce((sum, order) => sum + parseFloat(order.total_price), 0);

        return {
            totalSales: total,
            totalOrders: orders.length,
            averageOrderValue: total / orders.length || 0,
            todaySales: todayTotal
        };
    }, [orders]);

    const formatPrice = (value) => `RM ${parseFloat(value).toFixed(2)}`;

    return (
        <div className="space-y-6">
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Sales */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-600">Total Sales</h3>
                        <DollarSignIcon className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{formatPrice(metrics.totalSales)}</div>
                    <p className="text-xs text-gray-500 mt-1">Lifetime sales value</p>
                </div>

                {/* Today's Sales */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-600">Today's Sales</h3>
                        <CalendarIcon className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{formatPrice(metrics.todaySales)}</div>
                    <p className="text-xs text-gray-500 mt-1">Sales in the last 24h</p>
                </div>

                {/* Total Orders */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-600">Total Orders</h3>
                        <PackageIcon className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{metrics.totalOrders}</div>
                    <p className="text-xs text-gray-500 mt-1">Total number of orders</p>
                </div>

                {/* Average Order Value */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-600">Average Order Value</h3>
                        <TrendingUpIcon className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{formatPrice(metrics.averageOrderValue)}</div>
                    <p className="text-xs text-gray-500 mt-1">Average value per order</p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Sales Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Sales Trend</h3>
                    <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={monthlySales}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip formatter={(value) => formatPrice(value)} />
                                <Legend />
                                <Line type="monotone" dataKey="total" stroke="#2563eb" name="Sales" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Daily Sales Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Sales (Last 7 Days)</h3>
                    <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dailySales}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip formatter={(value) => formatPrice(value)} />
                                <Legend />
                                <Bar dataKey="total" fill="#3b82f6" name="Sales" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Popular Products */}
            <div className="bg-white rounded-lg shadow p-6">
                {/* <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
                <div className="space-y-4">
                    {popularProducts.map((product, index) => (
                        <div key={product.productId} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0">
                            <div className="flex items-center space-x-4">
                                <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
                                <div>
                                    <p className="font-medium text-gray-900">Product ID: {product.productId}</p>
                                    <p className="text-sm text-gray-500">{product.quantity} units sold</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
    );
}