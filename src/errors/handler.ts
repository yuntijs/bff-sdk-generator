import { GraphQLError } from 'graphql-request/src/types';
import { showInvalidTokenModal } from './modal';
import { showForbiddenNotification } from './notification';
import { isBrowser } from '../utils';

export const errorsHandler = (errors: GraphQLError[]) => {
  const gqlErrors = errors.filter(e => typeof e.extensions?.code !== 'undefined');
  console.warn('gql errors =>', errors);
  if (gqlErrors.length === 0 || !isBrowser()) {
    return;
  }
  gqlErrors.forEach(e => {
    switch (e.extensions.code) {
      case 'InvalidToken':
        showInvalidTokenModal(e);
        break;
      case 'Forbidden':
        showForbiddenNotification(e);
        break;
      default:
        // showGlobalErrorNotification(e);
        break;
    }
  });
};

export default errorsHandler;
