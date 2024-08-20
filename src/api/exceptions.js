class ShopException {
    message;

    ShopException(message) {
        this.message = message;
    }
}

class AdminException {
    message;

    AdminException(message) {
        this.message = message;
    }
}

const exceptions = {
    ShopException,
    AdminException
}

export default exceptions;