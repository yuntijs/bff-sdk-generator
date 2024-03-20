import { GraphQLError } from 'graphql-request/src/types';
import * as Taro from '@tarojs/taro';

let InvalidTokenModal: undefined | Taro.showModal.SuccessCallbackResult;

export const errorsHandler = (errors: GraphQLError[]) => {
  const gqlErrors = errors.filter(e => typeof e.extensions?.code !== 'undefined');
  console.warn('gql errors =>', errors);
  if (gqlErrors.length === 0) {
    return;
  }
  gqlErrors.forEach(async e => {
    switch (e.extensions.code) {
      case 'InvalidToken':
        if (InvalidTokenModal) {
          break;
        }
        InvalidTokenModal = await Taro.showModal({
          title: '登录过期啦',
          content: '用户凭证可能已失效，点击确定重新登录',
          success() {
            Taro.navigateTo({
              url: '/pages/login/index',
            });
          },
          complete() {
            InvalidTokenModal = undefined;
          },
        });
        break;
      case 'Forbidden':
        Taro.showToast({
          title: '当前操作未被授权',
        });
        break;
      default:
        // showGlobalErrorNotification(e);
        break;
    }
  });
};

export default errorsHandler;
