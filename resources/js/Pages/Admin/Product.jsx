import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PencilIcon, TrashIcon } from 'lucide-react'; // Import icons if using lucide-react
import ProductAdd from '@/Components/My Components/Admin Comp/ProductAdd';
import ProductDelete from '@/Components/My Components/Admin Comp/ProductDelete';
import ProductUpdate from '@/Components/My Components/Admin Comp/ProductUpdate';


export default function Product({ auth, products, count }) {

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Product Dashboard</h2>}
        >
            <Head title="Product" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Header Section */}
                        <div className="p-6 flex justify-between items-center border-b">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">List Products</h3>
                                <p className="text-sm text-gray-600">
                                    Total Products: {count === 0 ? "No products yet" : count}
                                </p>
                            </div>
                            <ProductAdd className='float-end'/>
                        </div>  
                        
                        {/* Table Section */}
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {products.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{product.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.slug}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{product.description}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    ${Number(product.price).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock_quantity}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {product.image && (
                                                        <img 
                                                            src={`/storage/${product.image}`} 
                                                            alt={product.name}
                                                            className="h-10 w-10 rounded-full object-cover"
                                                        />
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                    <ProductUpdate className="text-blue-600 hover:text-blue-900"
                                                        productId = {`my_modal_3${product.id}`}
                                                        product = {product}
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                        <span>Edit</span>
                                                    </ProductUpdate>

                                                    <ProductDelete className="text-red-600 hover:text-red-900"
                                                        productId = {`my_modal_4${product.id}`}
                                                        product = {product}
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                        <span>Delete</span>
                                                    </ProductDelete>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}