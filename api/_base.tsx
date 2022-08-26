import Cookies from 'js-cookie';

export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || '';
export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_TOKEN = Cookies.get('token');

export const CONFIG_HEADER = {
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    // "X-Envoy-Uuid": 'cd327e7e-d444-4ddc-932e-84f2b0a932ca'
  },
};

// export const CONFIG_HEADER_CREATE = {
//   header: {
//     body: JSON.stringify(articlePost)
//   }
// }

export const DEMO_TOKEN = process.env.NEXT_PUBLIC_API_DEMO_TOKEN;
export const CONFIG_HEADER_DEMO = {
  headers: {
    Authorization: `Bearer ${DEMO_TOKEN}`,
    webhook_url: 'wss',
  },
};
