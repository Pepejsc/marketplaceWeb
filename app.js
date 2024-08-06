document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productNameInput = document.getElementById('product-name');
    const productDescriptionInput = document.getElementById('product-description');
    const productPriceInput = document.getElementById('product-price');
    const productList = document.getElementById('product-list');

    productForm.addEventListener('submit', addProduct);

    function addProduct(event) {
        event.preventDefault();

        const name = productNameInput.value;
        const description = productDescriptionInput.value;
        const price = productPriceInput.value;

        if (name && price && description) {
            const productItem = document.createElement('li');
            productItem.classList.add('list-group-item', 'product-item');
            productItem.innerHTML = `
                <span class="product-info">${name} - $${price}</span>
                <div>
                    <button class="btn btn-info btn-sm description-btn mr-2">Ver Descripción</button>
                    <button class="btn btn-primary btn-sm edit-btn mr-2">Editar</button>
                    <button class="btn btn-danger btn-sm delete-btn">Eliminar</button>
                </div>
                <p class="product-description mt-2" style="display: none;">${description}</p>
            `;

            productList.appendChild(productItem);

            productNameInput.value = '';
            productDescriptionInput.value = '';
            productPriceInput.value = '';

            const deleteButton = productItem.querySelector('.delete-btn');
            deleteButton.addEventListener('click', deleteProduct);

            const editButton = productItem.querySelector('.edit-btn');
            editButton.addEventListener('click', editProduct);

            const descriptionButton = productItem.querySelector('.description-btn');
            descriptionButton.addEventListener('click', toggleDescription);
        }
    }

    function deleteProduct(event) {
        const productItem = event.target.parentElement.parentElement;
        productList.removeChild(productItem);
    }

    function editProduct(event) {
        const productItem = event.target.parentElement.parentElement;
        const productInfo = productItem.querySelector('.product-info');
        const [name, price] = productInfo.textContent.split(' - $');
        const description = productItem.querySelector('.product-description').textContent;

        productNameInput.value = name;
        productDescriptionInput.value = description;
        productPriceInput.value = price;

        productForm.removeEventListener('submit', addProduct);
        productForm.addEventListener('submit', (e) => updateProduct(e, productItem));
    }

    function updateProduct(event, productItem) {
        event.preventDefault();

        const name = productNameInput.value;
        const description = productDescriptionInput.value;
        const price = productPriceInput.value;

        if (name && price && description) {
            const productInfo = productItem.querySelector('.product-info');
            productInfo.textContent = `${name} - $${price}`;
            const productDescription = productItem.querySelector('.product-description');
            productDescription.textContent = description;

            productForm.removeEventListener('submit', (e) => updateProduct(e, productItem));
            productForm.addEventListener('submit', addProduct);

            productNameInput.value = '';
            productDescriptionInput.value = '';
            productPriceInput.value = '';
        }
    }

    function toggleDescription(event) {
        const productItem = event.target.parentElement.parentElement;
        const description = productItem.querySelector('.product-description');
        description.style.display = description.style.display === 'none' ? 'block' : 'none';
    }
});

