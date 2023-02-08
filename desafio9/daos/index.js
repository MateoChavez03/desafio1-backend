import MessageContainer from "./MongoDB/messagesContainer.js";
import ProductContainer from "./MongoDB/productsContainer.js";
import FakerContainer from "./FakerJSContainer.js"

const productsFaker = new FakerContainer();
const messages = new MessageContainer();

export { productsFaker, messages};