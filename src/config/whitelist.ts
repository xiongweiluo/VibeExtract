export interface WhitelistSite {
  id: string;
  name: string;
  url: string;
  dataPath: string;
}

export const WHITELIST_SITES: WhitelistSite[] = [
  { id: 'apple',        name: 'Apple',         url: 'apple.com',       dataPath: '/data/whitelist/apple.json' },
  { id: 'baidu',        name: 'Baidu',         url: 'baidu.com',       dataPath: '/data/whitelist/baidu.json' },
  { id: 'family',       name: 'Family',        url: 'family',          dataPath: '/data/whitelist/family.json' },
  { id: 'linear',       name: 'Linear',        url: 'linear.app',      dataPath: '/data/whitelist/linear.json' },
  { id: 'minimalgoods', name: 'Minimal Goods', url: 'minimalgoods',    dataPath: '/data/whitelist/minimalgoods.json' },
];
