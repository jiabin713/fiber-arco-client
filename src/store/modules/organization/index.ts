import { OrganizationRecord } from './../../../views/system/organization/data.d';
import * as OrganizationService from '@/views/system/organization/service';

import { buildTree } from '@/utils/buildTree';
import { defineStore } from 'pinia';

export const useOrganizationStore = defineStore('organization', {
  state: () => ({ organizationList: <OrganizationRecord[]>[] }),
  getters: {
    organizationTree: (state) => buildTree(state.organizationList),
  },
  actions: {
    async query() {
      this.organizationList = await OrganizationService.query({});
    },
  },
});
