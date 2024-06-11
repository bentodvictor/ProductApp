import { useEffect, useState } from "react"
import { ProductList } from "../components/ProductList";
import { createProducts, deleteProducts, getProducts, updateProducts } from "../api";
import { ProductModalDelete } from "../components/ProductModalDelete";
import { ProductModalForm } from "../components/ProductModalForm";
import { toast, ToastContainer } from "react-toastify";

export const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const [isModalFormOpen, setIsModalFormOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const response = await getProducts()

        if (response.status !== 200) return;

        setProducts(response.data);
    }

    // Handlers for modals
    const handleForm = (product) => {
        if (product)
            setSelectedProduct(product);
        else
            setSelectedProduct(null);

        setIsModalFormOpen(true);
    }

    const handleDelete = (id) => {
        setSelectedProduct(null);
        setIsModalDeleteOpen(true);
        setProductIdToDelete(id);
    }

    // handlers to comunidade with api
    const addOrUpdateProduct = async (product) => {
        try {
            let response = null;

            if (selectedProduct) {
                response = await updateProducts(selectedProduct.id, {
                    ...product,
                    id: selectedProduct.id
                });
            }
            else
                response = await createProducts(product);

            setIsModalFormOpen(false);
            setSelectedProduct(null);
            loadProducts();

            if (response.data === 'Success')
                toast.success(`${response.status} - ${response.data}`);
            else
                toast.error(`${response.status} - ${response.data}`);
        }
        catch(e) {
            toast.error(`${e.response.status} - ${e.response.data}`);
        }
    }

    const deleteProduct = async () => {
      try {
        const response = await deleteProducts(productIdToDelete);

        loadProducts();
        setIsModalDeleteOpen(false);

        if (response.data)
            toast.success(`${response.status} - Success`);
        else
            toast.error(`${response.status} - Internal Error`);
      }
      catch(e) {
          toast.error(`${e.response.status} - ${e.response.data}`);
      }
    }

    return (
        <div className="container container-fluid p-4">
            <h1 className="text-uppercase text-monospace font-weight-bold title"><i className="bi bi-list"></i> Product List</h1>
            <hr />
            <ProductList products={products} onEdit={handleForm} onDelete={handleDelete} onAdd={handleForm} />
            <ProductModalForm
                show={isModalFormOpen}
                onHide={() => setIsModalFormOpen(false)}
                onSave={addOrUpdateProduct}
                product={selectedProduct} />
            <ProductModalDelete
                show={isModalDeleteOpen}
                onHide={() => setIsModalDeleteOpen(false)}
                onDelete={deleteProduct}
            />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}
