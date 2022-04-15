const list = [
  {
    id: '001',
    type: 'files',
    name: '文件夹',
    extendName: '',
    src: null,
    updateTime: '2022-01-20 18:30:00',
    isDir: true,
    filePath: '/'
  },
  {
    id: '002',
    type: 'files',
    name: '文件夹1',
    extendName: '',
    src: null,
    updateTime: '2022-01-20 18:30:00',
    isDir: true,
    filePath: '/'
  },
  {
    id: '003',
    type: 'file',
    name: '哈哈',
    extendName: 'doc',
    src: null,
    updateTime: '2022-01-20 18:30:00',
    isDir: false,
    filePath: '/'
  },
  {
    id: '004',
    type: 'file',
    name: '致你-予星',
    extendName: 'mp3',
    src: 'https://webfs.ali.kugou.com/202204012122/dc1d73941a057545cb43e9c91ff57e39/KGTX/CLTX001/f34b98bf8191b1724e3a6d934913b5f2.mp3',
    updateTime: '2022-01-20 18:30:00',
    isDir: false,
    filePath: '/'
  },
  {
    id: '094',
    type: 'file',
    name: '南山南(DJ)-张磊',
    extendName: 'mp3',
    src: 'https://webfs.ali.kugou.com/202204012131/a5e1e865233904049417abf60b48cd9e/G053/M09/1F/08/FZQEAFaMl9KACO9ZAD9wLCIqc70955.mp3',
    updateTime: '2022-01-20 18:30:00',
    isDir: false,
    filePath: '/'
  },
  {
    id: '084',
    type: 'file',
    name: '须尽欢-渡',
    extendName: 'mp3',
    src: 'https://webfs.ali.kugou.com/202204012135/427c74d81057bdc2730e3f839d7d5cfb/KGTX/CLTX001/3b53e2510350f35d9737b4a6228a851d.mp3',
    updateTime: '2022-01-20 18:30:00',
    isDir: false,
    filePath: '/'
  },
  {
    id: '065',
    type: 'file',
    name: '这一生关于你的风景-隔壁老樊',
    extendName: 'mp3',
    src: 'https://webfs.ali.kugou.com/202204012139/f85713b77ac416d4eee3fd582e8f4b6d/KGTX/CLTX001/9af018aea4fba12bf9d18a23dfe996a6.mp3',
    updateTime: '2022-01-20 16:30:00',
    isDir: false,
    filePath: '/'
  },
  {
    id: '005',
    type: 'file',
    name: '老男孩',
    extendName: 'mp4',
    src: 'https://vd2.bdstatic.com/mda-kkj20w77w1wyuxjd/hd/mda-kkj20w77w1wyuxjd.mp4?v_from_s=hkapp-haokan-hna&auth_key=1649941380-0-0-eba98dfae5fb0d636d6b7eaaf1cb5257&bcevod_channel=searchbox_feed&pd=1&cd=0&pt=3&logid=1980393476&vid=2459462156697942509&abtest=100815_2-101454_1-17451_2&klogid=1980393476',
    updateTime: '2022-01-20 18:30:00',
    isDir: false,
    filePath: '/'
  },
  {
    id: '006',
    type: 'file',
    name: '压缩包',
    extendName: 'zip',
    src: null,
    updateTime: '2022-01-20 18:30:00',
    isDir: false,
    filePath: '/'
  },
  {
    id: '007',
    type: 'file',
    name: '项目',
    extendName: 'rar',
    src: null,
    updateTime: '2022-01-20 18:30:00',
    isDir: false,
    filePath: '/'
  },
  {
    id: '008',
    type: 'file',
    name: '数据表格',
    extendName: 'xls',
    src: null,
    updateTime: '2022-01-20 18:30:00',
    isDir: false,
    filePath: '/'
  },
  {
    id: '009',
    type: 'file',
    name: 'PPT演示',
    extendName: 'ppt',
    src: null,
    updateTime: '2022-01-20 18:30:00',
    isDir: false,
    filePath: '/'
  },
  {
    id: '010',
    type: 'file',
    name: '文本',
    extendName: 'txt',
    src: null,
    updateTime: '2022-01-20 18:30:00',
    isDir: false,
    filePath: '/'
  },
  {
    id: '011',
    type: 'file',
    name: '未知文件',
    extendName: '',
    src: null,
    updateTime: '2022-01-20 18:30:00',
    isDir: false,
    filePath: '/'
  },
  {
    id: '012',
    type: 'file',
    name: '首页',
    extendName: 'html',
    src: null,
    updateTime: '2022-01-20 18:30:00',
    filePath: '/'
  },
  {
    id: '013',
    type: 'file',
    name: '样式',
    extendName: 'css',
    src: null,
    updateTime: '2022-01-20 18:30:00',
    isDir: false,
    filePath: '/'
  },
  {
    id: '014',
    type: 'file',
    name: '代码',
    extendName: 'js',
    src: null,
    updateTime: '2022-01-20 18:30:00',
    isDir: false,
    filePath: '/'
  },
  {
    id: '106',
    type: 'file',
    name: '图片',
    extendName: 'png',
    src: 'https://img0.baidu.com/it/u=2746352008,2041591833&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
    updateTime: '2022-01-20 18:30:00',
    isDir: false,
    filePath: '/'
  },
  {
    id: '107',
    type: 'file',
    name: '头像',
    extendName: 'png',
    src: 'https://img2.baidu.com/it/u=304294273,3088990845&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
    updateTime: '2022-01-20 18:30:00',
    isDir: false,
    filePath: '/'
  },
  {
    id: '108',
    type: 'file',
    name: '头像1',
    extendName: 'png',
    src: 'https://img0.baidu.com/it/u=3745738950,3664021749&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    updateTime: '2022-01-20 18:30:00',
    isDir: false,
    filePath: '/'
  },
  {
    id: '109',
    type: 'file',
    name: '头像2',
    extendName: 'png',
    src: 'https://img1.baidu.com/it/u=1817951587,3188870642&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    updateTime: '2022-01-20 18:30:00',
    isDir: false,
    filePath: '/'
  },
  {
    id: '110',
    type: 'file',
    name: '头像3',
    extendName: 'png',
    src: 'https://img0.baidu.com/it/u=2927161611,205964738&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
    updateTime: '2022-01-20 18:30:00',
    isDir: false,
    filePath: '/'
  }
]

export default list
