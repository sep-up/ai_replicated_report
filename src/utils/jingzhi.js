
/**

为了正常使用 精制js，以vue项目为例：在main.js中

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

修改为：

window.addEventListener('flutterInAppWebViewPlatformReady', function (event) {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
})

 */




//==========================================================================


/**
获取魔方的ip
服务端部署在魔方的时，小程序与魔方上的服务通信的ip与端口通过此方法获取，
ip会根据用户设备的网络(物联网/办公网/外网)情况变动，不是固定。
*/
export async function getBaseurl () {
    const intent = 'getBaseurl'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  
  /**
  获取魔方的websocket地址
  服务端部署在魔方的时，小程序与魔方上的服务通信的ip与端口通过此方法获取，
  ip会根据用户设备的网络(物联网/办公网/外网)情况变动，不是固定。
  */
  export async function getWebSocket () {
    const intent = 'getWebSocket'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  /**
  获取设备所处网络（0:外网 1：办公网 2：物联网）
  */
  export async function netWorkEnvironment () {
    const intent = 'netWorkEnvironment'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  /**
  获取token
  */
  export async function getToken () {
    const intent = 'getToken'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  /**
  获取请求头（X-Request-Host）
  */
  export async function getHeaders () {
    const intent = 'getHeaders'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  /*打开小程序
  appid:小程序在ecm的appid
  ecmCollectionId:小程序在ecm的集合id
  path:xxx/xxx/index.html?xxx=xxx&xxx2=xxx2中的?xxx=xxx&xxx2=xxx2
  */
  // export async function startProgram (appid,ecmCollectionId,path) {
  //   const intent = 'startProgram_v3'
  //   return await window.flutter_inappwebview.callHandler(intent, appid,ecmCollectionId,path)
  // }
  
  /*通过applicationId打开小程序
  applicationId:小程序在ecm的applicationId
  ecmCollectionId:小程序存在ecm集合中，并且把此集合分配给企业时，传入集合id/如果小程序直接分配给企业传 ""
  path:xxx/xxx/index.html?xxx=xxx&xxx2=xxx2中的?xxx=xxx&xxx2=xxx2
  */
  // export async function startProgramWitApplicationId (applicationId,ecmCollectionId,path) {
  //   const intent = 'startProgramWitApplicationId'
  //   return await window.flutter_inappwebview.callHandler(intent, applicationId,ecmCollectionId,path)
  // }
  
  /*通过appId打开小程序
  appId:小程序在ecm的appid
  ecmCollectionId:小程序存在ecm集合中，并且把此集合分配给企业时，传入集合id/如果小程序直接分配给企业传 ""
  path:xxx/xxx/index.html?xxx=xxx&xxx2=xxx2中的?xxx=xxx&xxx2=xxx2
  */
  // export async function startProgramWitAppId (appId,ecmCollectionId,path) {
  //   const intent = 'startProgramWitAppId'
  //   return await window.flutter_inappwebview.callHandler(intent, appId,ecmCollectionId,path)
  // }
  
  
  /*通过applicationId打开小程序
  applicationId:小程序在ecm的applicationId
  path:xxx/xxx/index.html?xxx=xxx&xxx2=xxx2中的?xxx=xxx&xxx2=xxx2
  */
  export async function startProgramWitApplicationId (applicationId,path) {
    const intent = 'startProgramWitApplicationId_v2'
    return await window.flutter_inappwebview.callHandler(intent, applicationId,path)
  }
  
  /*通过appId打开小程序
  appId:小程序在ecm的appid
  path:xxx/xxx/index.html?xxx=xxx&xxx2=xxx2中的?xxx=xxx&xxx2=xxx2
  */
  export async function startProgramWitAppId (appId,path) {
    const intent = 'startProgramWitAppId_v2'
    return await window.flutter_inappwebview.callHandler(intent, appId,path)
  }
  
  
  
  /*获取当前小程序的id
  */
  export async function getadppid () {
    const intent = 'getAppId'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  
  /*获取当前小程序的ReleaseId
  */
  export async function getReleaseId () {
    const intent = 'getReleaseId'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  // /**
  // 获取当前小程序运行环境（精制/精制_测试）
  // */
  // export async function environment () {
  //   const intent = 'environment'
  //   return await window.flutter_inappwebview.callHandler(intent)
  // }
  
  
  /**
  获取当前小程序运行设备（1:pad,2:手机，3:tv,4:pc）
  */
  export async function deviceType () {
    const intent = 'deviceType'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  /**
  获取精制版本号
  */
  export async function getVersionCode () {
    const intent = 'getVersionCode'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  /**
  获取通知栏高度，适用安卓ios，pc为0
  */
  export async function appBarheight () {
    const intent = 'appBarheight_v2'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  
  /**
   获取底部控制栏高度，适配ios手机用到
  */
  export async function bottomBarheight () {
    const intent = 'bottomBarheight_v2'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  /**
  定时刷新小程序
  */
  export async function refresh (minutes) {
    const intent = 'refresh_v2'
    return await window.flutter_inappwebview.callHandler(intent,minutes)
  }
  
  /**
  获取小程序关闭按钮的高度
  */
  export async function closeBarheight () {
    const intent = 'closeBarheight_v2'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  /**
  获取小程序关闭按钮的宽度
  */
  export async function closeBarwidth () {
    const intent = 'closeBarwidth_v2'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  
   /**
   打开相机,获取拍照后文件在手机的地址
   */
   export async function openCamera () {
     const intent = 'openCamera_v2'
     return await window.flutter_inappwebview.callHandler(intent)
   }
  
  /**
  压缩图片
  path:图片文件在手机的地址
  */
  export async function compressImage (path) {
    const intent = 'compressImage_v2'
    return await window.flutter_inappwebview.callHandler(intent,path)
  }
  
  
  /**
  打开相册,获取拍照后文件在手机的地址
  */
  export async function openGallery () {
    const intent = 'openGallery_v2'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  /**
  二维码扫描
  */
  export async function qrCode () {
    const intent = 'qrCode'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  /**
  文件选择
  allowedExtensions：['jpg','pdf']
  */
  export async function pickFiles (allowedExtensions) {
    const intent = 'pickFiles_v2'
    return await window.flutter_inappwebview.callHandler(intent,allowedExtensions)
  }
  
  /**
  获取地理位置，
  返回的位置信息需要在script中定义locationListener(msg)方法，msg为位置信息，定位成功时，此方法会被调用
  */
  export async function getLocation () {
    const intent = 'getLocation_v2'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  /**
  设置屏幕常亮
  */
  export async function wakelock () {
    const intent = 'wakelock_v2'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  /**
  横屏
  */
  export async function landscape () {
    const intent = 'landscape_v2'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  
  /**
  竖屏
  */
  export async function portrait () {
    const intent = 'portrait_v2'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  /**
  自动旋转
  */
  export async function autoOrientation () {
    const intent = 'AutoOrientation'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  
  /**
  全屏
  */
  export async function fullscreen () {
    const intent = 'fullscreen_v2'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  /**
  关闭全屏
  */
  export async function closeFullscreen () {
    const intent = 'closeFullscreen_v2'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  /**
  // methodName: appTabBarControl 导航栏控制
  //参数 1 tabType：leftTab、topTab、fullScreen 类型String
  //参数 2 show：true、false 类型bool
  */
  export async function appTabBarControl (tabType,show) {
    const intent = 'appTabBarControl'
    return await window.flutter_inappwebview.callHandler(intent,tabType,show)
  }
  
  /**
  获取设备唯一编码
  */
  export async function deviceuuid () {
    const intent = 'deviceuuid'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  
  /**
  上传文件
  url:接口地址
  filedata：List<Map<String,String>>  [{"服务端key":"文件1在手机的路径"},{"服务端key":"文件2在手机的路径"}]
  headers：{} 请求头
  data:{} 参数
  */
  export async function upFile (url,filedata,headers,data) {
    const intent = 'upFile_v2'
    return await window.flutter_inappwebview.callHandler(intent,url,filedata,headers,data)
  }
  
  
  /**
  加载pdf文件
  url:文件在网络上的地址或者文件在手机里的路径
  filenema：需要展示的文件名
  */
  export async function openFastPdf (filenema,url) {
    const intent = 'openFastPdf_v2'
    return await window.flutter_inappwebview.callHandler(intent,filenema,url)
  }
  
  /**
  下载文件,获取文件在设备上的路径，框架支持缓存文件
  */
  export async function fileDown (url,headers) {
    const intent = 'fileDown_v2'
    return await window.flutter_inappwebview.callHandler(intent,url,headers)
  }
  
  /**
  下载fastdfs上的文件
  */
  export async function getFastdfsFile (url,headers) {
    const intent = 'getLocalImage_v2'
    return await window.flutter_inappwebview.callHandler(intent,url,headers)
  }
  
  
  /**
  获取企业信息
  获取当前用户登陆精制的企业信息
  */
  export async function getEnterpriseInfo () {
    const intent = 'getEnterpriseInfo_v2'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  
  /**
  获取当前企业的小程序信息
  */
  export async function getEnterpriseApps () {
    const intent = 'getEnterpriseApps'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  /**
  是否运行在跑马灯中
  */
  export async function isNotable () {
    const intent = 'isNotable_v2'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  
  
  
  /**
  扫描usb设备
  返回的设备信息需要在script中定义scanResults(devices)方法，devices为设备列表，搜索成功时，此方法会被调用
  
  export async function startScanUsb () {
    const intent = 'startScanUsb'
    return await window.flutter_inappwebview.callHandler(intent)
  }*/
  
  
  /**
  获取 usb设备
  返回usb设备列表
  */
  export async function getUsbDevice () {
    const intent = 'getUsbDevice'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  /**
  连接usb设备
  device：usb对象
  返回：连接状态
  usb拔出监听： usbClose(device)
  usb接入监听：usbInsert(device)
  */
  export async function connectUsb (device) {
    const intent = 'connectUsb'
    return await window.flutter_inappwebview.callHandler(intent,device)
  }
  
  /*
  usb发送数据（modbus rtu）
  data:byte[] :[0x01 ,0x05 ,0x00 ,0x00 ,0x00 ,0x00 ,0xCD ,0xCA]
  接收usb返回数据： UsbSerialData(device,data)
  */
  
  export async function usbSerialBytes (device,data,baudRate,dataBits,stopBits,parity) {
    const intent = 'usbSerialBytes'
    return await window.flutter_inappwebview.callHandler(intent,device,data,baudRate,dataBits,stopBits,parity)
  }
  
  /*
  usb发送数据（modbus rtu）
  data:byte[]
  [0x01 ,0x05 ,0x00 ,0x00 ,0x00 ,0x00 ,0xCD ,0xCA]
  SerialData(data)  获取数据成功
  SerialDataError(error)   获取数据失败
  
  export async function usbSerialBytes (data,baudRate,dataBits,stopBits,parity) {
    const intent = 'usbSerialBytes'
    return await window.flutter_inappwebview.callHandler(intent,data,baudRate,dataBits,stopBits,parity)
  }*/
  
  
  
  /**
  获取串口列表
  */
  export async function getSerialportDvs () {
    const intent = 'getSerialportDvs'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  
  /**
  打开串口
    * @param device 串口设备
     * @param mBaudRate 波特率 一般是9600
     * @param mCheckDigit 奇偶校验，0 None（默认）； 1 Odd； 2 Even
     * @param mDataBits 数据位，5 ~ 8  （默认8）
     * @param mStopBit 停止位，1 或 2  （默认 1）
  */
  export async function openSerialportDvs (device, mBaudRate,  mCheckDigit,  mDataBits,  mStopBit) {
    const intent = 'openSerialportDvs'
    return await window.flutter_inappwebview.callHandler(intent,device, mBaudRate,  mCheckDigit,  mDataBits,  mStopBit)
  }
  
  
  /**
  串口发送数据
  data:byte[]
  [0x01 ,0x05 ,0x00 ,0x00 ,0x00 ,0x00 ,0xCD ,0xCA]
  接收usb返回数据： UsbSerialData(device,data)
  */
  export async function SerialportDvswrite (data) {
    const intent = 'SerialportDvswrite'
    return await window.flutter_inappwebview.callHandler(intent,data)
  }
  
  
  /**
  usb打印
  config:打印纸信息
         {width：标签宽，单位mm
          height：标签高，单位mm
          column：一行标签有几列
          gap：标签间隙，单位mm
          columns：单哥标签，一行有几列
          lines：单个标签，一列有几行
          command:打印机指令（TSPL/EPL）
          density:打印浓度 1-15(默认15)
          dpi：打印机底部查看}
  data:打印数据
        示例：[[{type: barcode, x: 5, y: 15, content: 00000001}], [{type: barcode, x: 5, y: 15, content: 00000002}], [{type: barcode, x: 5, y: 15, content: 00000003}]] //打印内容
  type
  条形码：barcode，
  二维码： qrcode，
  图片： image，
  标题：title，
  文本：textview
  (使用title类型时，文本会自动居中显示
   图片时传入base64)
  
  x
  int类型，距离打印纸左边的距离mm
  
  
  y
  int类型，距离打印纸上边的距离mm
  
  
  content
  打印的内容
  
  
  size
  int类型，条形码时对应条形码的高度（mm）。
  二维码时对应二维码的宽高（mm）。
  图片时宽设置的大小（mm），高会等比放大缩小。
  标题/文本对应文字大小。
  (条码默认10mm
   二维码默认10mm
   文本默认16
   标题默认19
   图片默认10mm)
  
  underline
  int类型，用于条形码下方是否显示条码内容（1显示，0隐藏）
  
  direction
  int类型，是否旋转内容打印（0：不旋转，1:旋转180度）	默认0
  */
  export async function usbPrint (config,data) {
    const intent = 'usbPrint'
    return await window.flutter_inappwebview.callHandler(intent,config,data)
  }
  
  
  
  
  
  /**
  设置精制菜单里面的按钮
  data:  [
               {
                 name: '大屏设置列表',
                 icon: require('../../assets/images/inventory/overview-number.png'),
               }
             ]
  在script中定义MenuClick(index)方法,用户点击按钮时，此方法会被调用
  */
  export async function setMenu (data) {
    const intent = 'setMenu'
    return await window.flutter_inappwebview.callHandler(intent,data)
  }
  
  /**
  分享
  */
  export async function share (text,url) {
    const intent = 'Share_v2'
    return await window.flutter_inappwebview.callHandler(intent,text,url)
  }
  
  /**
  开启播放器服务，并返回播放器地址,此方法无播放界面，提供http协议的wasm文件(可以播放265的视频)
  */
  export async function videoPlayer () {
    const intent = 'videoPlayer_v2'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  
  
  /**
  外置扫码枪/pda获取扫码内容：
  在script中定义ScanCodeMsg(data)方法,扫码得到结果后，此方法被调用，因为扫码枪本质上上是蓝牙键盘输入，所以小程序上有输入框获取焦点后，此方法会失效
  */
  
  
  /**
  获取TV遥控器事件
  RawKeyDownEvent(key) 单击
  RawKeyOnDoubleDownEvent(key) 双击
  RawKeyOnLongDownEvent(key) 长按
  */
  
  
  /*
  tv上精制如何拦截返回按键（tv上返回按键默认关闭小程序）
  在script中定义onBackPressed()，点击遥控器的返回按钮时被调用，小程序重写onBackPressed方法，返回true则权限给框架，false则返回按钮权限给小程序
  */
  
  
  /**
  获取设备已经配对过的蓝牙设备,得到的设备不代表可连接，可能处于离线状态
  */
  export async function getBondedDevices () {
    const intent = 'getBondedDevices'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  
  /**
  搜索蓝牙设备，蓝牙范围内的在线设备，返回true/false 是否搜索成功，蓝牙未打开必然false
  startDiscovery(device)  搜索监听，搜索到一台设备就调用一次（一台设备可能会被发现多次，建议根据address过滤重复数据）
  discoveryOnDone() 搜索结束监听
  deive ：{"name":"小米手机","address":"70:BB:E9:AE:D6:7E","type":1,"isConnected":false,"bondState":10} bondState=12表示已经配对过，
  type=4为低功耗蓝牙，其余为经典蓝牙，低功耗蓝牙和经典蓝牙发送数据方法不一样
  */
  export async function startDiscovery () {
    const intent = 'startDiscovery'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  
  
  /**
   低功耗蓝牙特征读取
   uuid：特征的uuid
  */
  export async function CharacteristicRead (device,uuid) {
    const intent = 'CharacteristicRead'
    return await window.flutter_inappwebview.callHandler(intent,device,uuid)
  }
  
  
  /**
   低功耗蓝牙特征写入
   uuid：特征的uuid
   byte:[0x01 ,0x05 ,0x00 ,0x00 ,0x00 ,0x00 ,0xCD ,0xCA]
  */
  export async function CharacteristicWrite (device,uuid,byte) {
    const intent = 'CharacteristicWrite'
    return await window.flutter_inappwebview.callHandler(intent,device,uuid,byte)
  }
  
  /**
   设置低功耗蓝牙特征变更监听
   uuid：特征的uuid
   bluetoothDataByte(device,data)  特征变更数据监听
  */
  export async function CharacteristicNotifyValue (device,uuid) {
    const intent = 'CharacteristicNotifyValue'
    return await window.flutter_inappwebview.callHandler(intent,device,uuid)
  }
  
  
  /**
   连接蓝牙设备,返回true/false 连接是否成功
   bluetoothPrintstate(device,1)   蓝牙连接成功监听
   bluetoothPrintstate(device,2)   蓝牙连接断开监听
   bluetoothDataByte(device,data)  蓝牙设备发送数据监听
  */
  export async function BluetoothConnection (device) {
    const intent = 'BluetoothConnection'
    return await window.flutter_inappwebview.callHandler(intent,device)
  }
  
  
  /**
  关闭蓝牙连接，返回true/false 断开连接是否成功
  */
  export async function BluetoothClose (device) {
    const intent = 'BluetoothClose'
    return await window.flutter_inappwebview.callHandler(intent,device)
  }
  
  
  /**
  获取设备的连接状态，返回true/false 表示蓝牙是否连接
  */
  export async function ConnectionStatus (device) {
    const intent = 'ConnectionStatus'
    return await window.flutter_inappwebview.callHandler(intent,device)
  }
  
  
  /**
  给蓝牙设备发送数据。返回true/false 表示数据是否发送成功（经典蓝牙使用）
  data是byte类型：[0x01 ,0x05 ,0x00 ,0x00 ,0x00 ,0x00 ,0xCD ,0xCA]
  */
  export async function BluetoothSendData (device,data) {
    const intent = 'BluetoothSendData'
    return await window.flutter_inappwebview.callHandler(intent,device,data)
  }
  
  
  /**
  蓝牙是否打开，返回true/false 表示蓝牙是否打开
  */
  export async function BluetoothState () {
    const intent = 'BluetoothState'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  
  
  /**
  支持hiprint模版的打印
  data：hiprint的json数据
  device：蓝牙设备
  */
  export async function hiPrint (data,device) {
    const intent = 'hiPrint'
    return await window.flutter_inappwebview.callHandler(intent,data,device)
  }
  
   
  
  /**
  蓝牙打印
  config:打印纸信息
         {width：标签宽，单位mm
          height：标签高，单位mm
          column：一行标签有几列
          gap：标签间隙，单位mm
          columns：单哥标签，一行有几列
          lines：单个标签，一列有几行
          command:打印机指令（TSPL/EPL）
          density:打印浓度 1-15(默认15)
          dpi：打印机底部查看}
  data:打印数据
        示例：[[{type: barcode, x: 5, y: 15, content: 00000001}], [{type: barcode, x: 5, y: 15, content: 00000002}], [{type: barcode, x: 5, y: 15, content: 00000003}]] //打印内容
  type
  条形码：barcode，
  二维码： qrcode，
  图片： image，
  标题：title，
  文本：textview
  (使用title类型时，文本会自动居中显示
   图片时传入base64)
  
  x
  int类型，距离打印纸左边的距离mm
  
  
  y
  int类型，距离打印纸上边的距离mm
  
  
  content
  打印的内容
  
  
  size
  int类型，条形码时对应条形码的高度（mm）。
  二维码时对应二维码的宽高（mm）。
  图片时宽设置的大小（mm），高会等比放大缩小。
  标题/文本对应文字大小。
  (条码默认10mm
   二维码默认10mm
   文本默认16
   标题默认19
   图片默认10mm)
  
  underline
  int类型，用于条形码下方是否显示条码内容（1显示，0隐藏）
  
  direction
  int类型，是否旋转内容打印（0：不旋转，1:旋转180度）	默认0
  */
  export async function bluetoothPrint (config,data,device) {
    const intent = 'bluetoothPrint_v3'
    return await window.flutter_inappwebview.callHandler(intent,config,data,device)
  }
  
  
  /**
  tcp连接，传入ip与端口，返回是否连接成功
  监听： tcpOnData(data,ip,port)  收到消息回调
        tcpOnError(msg,ip,port)  收到错误回调
        tcpOnDone(ip,port)      断开回调
  */
  export async function tcpConnect (ip,port) {
    const intent = 'tcpConnect'
    return await window.flutter_inappwebview.callHandler(intent,ip,port)
  }
  
  /**
  tcp写入数据
  data:obj
  */
  export async function tcpWrite (data,ip,port) {
    const intent = 'tcpWrite'
    return await window.flutter_inappwebview.callHandler(intent,data,ip,port)
  }
  
  /**
  tcp写入数据 byte
  */
  export async function tcpWritebyte (byte,ip,port) {
    const intent = 'tcpWriteByte'
    return await window.flutter_inappwebview.callHandler(intent,byte,ip,port)
  }
  
  
  /**
  tcp断开连接
  */
  export async function tcpClose (ip,port) {
    const intent = 'tcpClose'
    return await window.flutter_inappwebview.callHandler(intent,ip,port)
  }
  
  /**
  加载ocs组件
  folderName:文件名称
  */
  export async function loadOcsComponents (folderName) {
    const intent = 'loadOcsComponents'
    return await window.flutter_inappwebview.callHandler(intent,folderName)
  }
  
  /**
  上传ocs小程序（json文件和本地组件）
  url 上传路径
  componentPaths:组件路径数组
  jsonStr:ocs json 字符
  headers：请求头{},
  data：额外参数
  */
  export async function uploadOcsProgram (url,componentPaths,jsonStr,headers,data) {
    const intent = 'uploadOcsProgram'
    return await window.flutter_inappwebview.callHandler(intent,url,componentPaths,jsonStr,headers,data)
  }
  
  /**
  保存文件
  String folderName:自定义文件夹名称
  String fileName:自定义文件名称
  fileData:需要保存的文件数据
  int type 操作小程序类型 如 1：普通小程序、2:快捷方式小程序 、3:ocs
  */
  export async function saveFile (folderName,fileName,fileData,type) {
    const intent = 'saveFile'
    return await window.flutter_inappwebview.callHandler(intent,folderName,fileName,fileData,type)
  }
  
  /**
  获取本地文件
  String filePath:文件路径
  */
  export async function readFile (filePath) {
    const intent = 'readFile'
    return await window.flutter_inappwebview.callHandler(intent,filePath)
  }
  
  /**
  获取本地文件夹下的所有文件
  String folderName:自定义文件名称
  int type 操作小程序类型 如 1：普通小程序、2:快捷方式小程序 、3:ocs
  */
  export async function getFileList (folderName,type) {
    const intent = 'getFileList'
    return await window.flutter_inappwebview.callHandler(intent,folderName,type)
  }
  
  /**
  删除本地文件
  String path:文件路径
  */
  export async function deleteFile (filePath) {
    const intent = 'deleteFile'
    return await window.flutter_inappwebview.callHandler(intent,filePath)
  }
  
  /**
  文件重命名
  String filePath:文件路径
  String newFileName:自定义文件名称
  int type 操作小程序类型 如 1：普通小程序、2:快捷方式小程序 、3:ocs
  */
  export async function renameFileName (filePath,newFileName,type) {
    const intent = 'renameFileName'
    return await window.flutter_inappwebview.callHandler(intent,filePath,newFileName,type)
  }
  
  
  /**
  获取精制当前运行环境
  */
  export async function getJZCurrentEnvironment () {
    const intent = 'getJZCurrentEnvironment'
    return await window.flutter_inappwebview.callHandler(intent)
  }
  
  
   
  