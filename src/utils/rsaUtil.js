import JsEncrypt from 'jsencrypt/bin/jsencrypt'
import uuidUtil from './onlyidUtil'
import { getCurrentTime } from '@/utils/time'

export default {
  encryption(object) {
    const publicKey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArEvT+FgEn7iVHh8xLTvhRdoX
    bGkkUrLFHedUa8xjZP7Mx91jhMWL180FZ+nKu0ZxPTPLcbcMfrXODso3M8Mbno58mq+xkdBnO/D/+KMdSby8dGS
    T7+RbKQvsFZMBYyqRf5ZjGJPubb0EL+eyqwRJKVC7mqIbS9+J7Aa9DYl04e6muHeKnwc61nqUSh24+G4CasHEmL
    p20iY3XEqWbe1dJHgd24y1guiBqgxFZCtzCeEED/k2VUZsfKnIjz1iJ/lKkr/IKTt1Bcvt13YP3Y6xhW8HmhoHP
    RHBYdPTqOJjL5vr0yWm/brdkWOHyOdT41j2WFq+T3eJSAXu/PgCJEEbUQIDAQAB`
    object = {
      userName: '123456',
      roleId: '3',
      onlyid: uuidUtil.uuid(22, 10),
      ...object
    }
    const jse = new JsEncrypt()
    jse.setPublicKey(publicKey) // 加入rsa public key
    const await1 = JSON.stringify(object)
    const ciphertext = jse.encrypt(await1) // 将文本加密
    return encodeURIComponent(ciphertext)
  },
  encryption2(object) {
    const publicKey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApZzK5VGA68wQcymv9/RTB8gs0iLuHS2L4hSo22pIbZy5Dc4npkEGmx1SAdMODA6JrWyMJSEJZ9lOKw4JetULzjDSjD67Q9lsGFOilZRSkDNF0m4TDFs9t21Ii4kVX9uNnDlDcuZYsUXOg3K3o+TgRB7tmn1ZX+0kqIWfD7PuqOWp1WfvCKE28gg1oaBhz43nV8FJtxq8u6JqyKXoJm/q7QQ5bpB1D1ZJsKrxshtAICk3tHTC7yyIp2TSAK7mNN0sgt2U+6LCiVMk79Uswa0INL/zW9Pg/rNvzlONOlNJlMKtnxDlwhKFoawWlsRalAtHtDaCp+fv8hpcPVQLjMpzNQIDAQAB`
    const jse = new JsEncrypt()
    jse.setPublicKey(publicKey) // 加入rsa public key
    const await1 = JSON.stringify(object)
    const ciphertext = jse.encrypt(await1) // 将文本加密
    return encodeURIComponent(ciphertext)
  },
  encryption3(object) {
    const publicKey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArEvT+FgEn7iVHh8xLTvhRdoX
    bGkkUrLFHedUa8xjZP7Mx91jhMWL180FZ+nKu0ZxPTPLcbcMfrXODso3M8Mbno58mq+xkdBnO/D/+KMdSby8dGS
    T7+RbKQvsFZMBYyqRf5ZjGJPubb0EL+eyqwRJKVC7mqIbS9+J7Aa9DYl04e6muHeKnwc61nqUSh24+G4CasHEmL
    p20iY3XEqWbe1dJHgd24y1guiBqgxFZCtzCeEED/k2VUZsfKnIjz1iJ/lKkr/IKTt1Bcvt13YP3Y6xhW8HmhoHP
    RHBYdPTqOJjL5vr0yWm/brdkWOHyOdT41j2WFq+T3eJSAXu/PgCJEEbUQIDAQAB`
    object = {
      Codetime: getCurrentTime(),
      Onlyid: uuidUtil.uuid(22, 10),
      ...object
    }
    const jse = new JsEncrypt()
    jse.setPublicKey(publicKey) // 加入rsa public key
    const await1 = JSON.stringify(object)
    const ciphertext = jse.encrypt(await1) // 将文本加密
    return encodeURIComponent(ciphertext)
  }
}
