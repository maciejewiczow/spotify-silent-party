import { CurrentUser, ParamOptions, QueryParam } from 'routing-controllers';

export const RequiredCurrentUser = () => CurrentUser({ required: true });
export const RequiredQueryParam = (name: string, options?: ParamOptions) =>
    QueryParam(name, { ...options, required: true });
