import Modal, { type ModalFuncProps } from 'antd/es/modal';
import { GraphQLError } from 'graphql-request/src/types';

export const logout = () => {
  window.location.href = '/oidc/logout';
};

let InvalidTokenModal:
  | undefined
  | {
      destroy: () => void;
      update: (
        configUpdate: ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps)
      ) => void;
    };

const onInvalidTokenModalCancel = () => {
  InvalidTokenModal?.destroy();
  InvalidTokenModal = undefined;
};

export const showInvalidTokenModal = (error: GraphQLError) => {
  if (InvalidTokenModal) {
    return;
  }
  InvalidTokenModal = Modal.warn({
    okText: '确定',
    content: '用户凭证可能已失效，点击确定重新登录',
    onOk: logout,
    onCancel: onInvalidTokenModalCancel,
  });
};
