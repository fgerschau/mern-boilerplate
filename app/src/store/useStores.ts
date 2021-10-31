import React from 'react';
import { MobXProviderContext } from 'mobx-react';
import UserStore from './UserStore';

export const useUserStore = (): UserStore => React.useContext(MobXProviderContext).userStore;
