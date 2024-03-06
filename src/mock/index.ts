import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import system_dept from './system/dept'
import system_dict from './system/dict'
import system_menu from './system/menu'
import system_role from './system/role'
import system_user from './system/user'

import user from './user/index'
import person from './person/index'
import file from './file/index'
import test from './test/index'
import cate from './cate/index'
import area from './area/index'

export function setupProdMockServer() {
  createProdMockServer([
    ...system_dept,
    ...system_dict,
    ...system_menu,
    ...system_role,
    ...system_user,
    ...user,
    ...person,
    ...file,
    ...test,
    ...cate,
    ...area
  ])
}
