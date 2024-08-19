class ShopException {
    message;

    ShopException(message) {
        this.message = message;
    }
}

const exceptions = {
    ShopException
}

export default exceptions;