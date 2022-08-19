import {
  API_URL_AUTH,
  ACCESS_KEY,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPE
} from './const';

// Сборка urlAuth для запроса авторизации. Собирается из search - параметров в соответствии с документацией unsplash
export const urlAuth = new URL(API_URL_AUTH);
urlAuth.searchParams.append('client_id', ACCESS_KEY);
urlAuth.searchParams.append('redirect_uri', REDIRECT_URI);
urlAuth.searchParams.append('response_type', RESPONSE_TYPE);
urlAuth.searchParams.append('scope', SCOPE);
