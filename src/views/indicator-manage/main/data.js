// 获取指定范围随机数
function getRandomIndex(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default function getTableData() {
  const nameList = ['田秀英', '叶强', '陈磊', '董芳', '萧霞', '薛娜', '熊敏', '夏艳', '顾超', '史丽']
  const timeList = [
    '2003-03-19 08:54:17',
    '2015-11-24 02:56:50',
    '1999-05-27 08:36:01',
    '1989-02-10 17:34:13',
    '2008-06-21 22:57:53'
  ]
  const addressList = [
    '天津 天津市 和平区',
    '湖北省 襄阳市 樊城区',
    '山西省 吕梁市 岚县',
    '宁夏回族自治区 固原市 泾源县',
    '吉林省 吉林市 桦甸市',
    '山东省 菏泽市 鄄城县'
  ]
  const statusList = [0, 1, 2]
  const table = []
  for (let i = 0; i <= 100; i++) {
    let obj = {
      key: 'id-' + i,
      name: nameList[getRandomIndex(0, nameList.length - 1)],
      time: timeList[getRandomIndex(0, timeList.length - 1)],
      address: addressList[getRandomIndex(0, addressList.length - 1)],
      status: statusList[getRandomIndex(0, statusList.length - 1)],
      proportion: getRandomIndex(5, 100)
    }
    // if (i == 2 || i == 6 || i == 12) {
    //   obj.children = []
    //   obj.children[0] = {
    //     key: 'id-sub-' + i,
    //     assetName: '获取用户待办数',
    //     assetType: assetTypeList[getRandomIndex(0, assetTypeList.length - 1)],
    //     assetCate: '实例',
    //     providerName: providerList[getRandomIndex(0, providerList.length - 1)],
    //     status: statusList[getRandomIndex(0, statusList.length - 1)],
    //     shareType: shareTypeList[getRandomIndex(0, shareTypeList.length - 1)],
    //     subscribeNum: subscribeNum[getRandomIndex(0, subscribeNum.length - 1)]
    //   }
    // }
    table.push(obj)
  }
  return table
}
