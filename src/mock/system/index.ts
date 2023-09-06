import { Random } from 'mockjs'
import { successResponseWrap } from '../mock'
import dept from './modules/dept'
import user from './modules/user'
import role from './modules/role'

export default [...dept, ...user, ...role]
