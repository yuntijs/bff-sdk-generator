// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import notification from 'antd/es/notification';
import { GraphQLError } from 'graphql-request/src/types';

const VERBS_MAP: Record<string, string> = {
  create: '创建',
  delete: '删除',
  update: '更新',
  patch: '更新',
  get: '获取',
  list: '列取',
  watch: '监听',
};
interface ExceptionDetails {
  name?: string;
  kind?: string;
  verb?: string;
}
interface Exception {
  details?: ExceptionDetails;
}
export const showForbiddenNotification = (error: GraphQLError) => {
  const {
    name,
    kind,
    verb = '',
  } = (error.extensions?.exception as Exception)?.details || {};
  let description = '当前用户没有权限';
  description += `${VERBS_MAP[verb] || '操作'}`;
  if (kind) {
    description += ` ${kind}`;
  }
  if (name) {
    description += ` ${name}`;
  }
  notification.warning({
    message: '当前操作未被授权',
    description,
  });
};

export const showGlobalErrorNotification = (error: GraphQLError) => {
  const { message } = error || {};

  notification.warning({
    message: '请求错误',
    description: message,
  });
};
