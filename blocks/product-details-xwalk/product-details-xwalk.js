/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
// Drop-in Tools
import { initializers } from '@dropins/tools/initializer.js';

// Drop-in APIs
import * as product from '@dropins/storefront-pdp/api.js';
// import { addProductsToCart } from '@dropins/storefront-cart/api.js';
import { addProductsToCart, setFetchGraphQlHeader as setCartDropinRequestHeader } from '@dropins/storefront-cart/api.js';

// Drop-in Providers
import { render as productRenderer } from '@dropins/storefront-pdp/render.js';

// Drop-in Containers
import ProductDetails from '@dropins/storefront-pdp/containers/ProductDetails.js';

// Libs
import { getConfigValue } from '../../scripts/configs.js';
import { getSkuFromUrl } from '../../scripts/commerce.js';

export default async function decorate(block) {
  block.innerHTML = '<div><div><strong>Add-To-Cart-Button</strong></div></div><div><div>text</div><div>Add To Cart</div></div><div><div>loadingText</div><div>Adding To Cart</div></div><div><div>icon</div><div>Cart</div></div><div><div>variant</div><div>primary</div></div><div><div><strong>Carousel-Controls</strong></div></div><div><div>layout</div><div>column</div></div>';
  // const placeholderObject = getBlockPlaceholderInfo(block);
  // const carouselControl = placeholderObject['Carousel-Controls'].layout;
  // block.innerHTML = '';

  // Initialize Drop-ins
  initializers.register(product.initialize, {});

  // Set Fetch Endpoint (Service)
  product.setEndpoint(await getConfigValue('commerce-endpoint'));

  // Set Fetch Headers (Service)
  product.setFetchGraphQlHeaders({
    'Content-Type': 'application/json',
    'Magento-Environment-Id': await getConfigValue('commerce-environment-id'),
    'Magento-Website-Code': await getConfigValue('commerce-website-code'),
    'Magento-Store-View-Code': await getConfigValue('commerce-store-view-code'),
    'Magento-Store-Code': await getConfigValue('commerce-store-code'),
    'Magento-Customer-Group': await getConfigValue('commerce-customer-group'),
    'x-api-key': await getConfigValue('commerce-x-api-key'),
  });

  setCartDropinRequestHeader('store', await getConfigValue('store'));
}
