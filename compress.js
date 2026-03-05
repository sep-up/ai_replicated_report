/*
 * @Author: chenzejie
 * @Date: 2023-09-21 10:39:57
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-09-21 10:42:59
 * @Description:
 *
 * 创建压缩包脚本
 * 1. npm install archiver;
 * 2. package.json 添加指令："compress:dist": "node compress.js",
 * 3. 执行：npm run build:prod ; npm run compress:dist
 *
 */

const archiver = require('archiver')
const fs = require('fs')
const path = require('path')

const distDirectory = 'dist' // 要压缩的dist目录
const outputFilePath = 'dist.zip' // 压缩文件的输出路径和名称

// 删除已存在的压缩包（如果存在）
if (fs.existsSync(outputFilePath)) {
  fs.unlinkSync(outputFilePath)
  console.log(`已删除已存在的压缩包: ${outputFilePath}`)
}

// 创建一个输出流
const output = fs.createWriteStream(outputFilePath)

// 创建一个archiver实例
const archive = archiver('zip', {
  zlib: { level: 6 } // 压缩级别（0-9，9为最高）
})

// 监听所有archive数据写入完成事件
output.on('close', () => {
  console.log(`压缩完成，共计 ${archive.pointer()} 字节`)
})

// 监听压缩过程中出错事件
archive.on('error', err => {
  throw err
})

// 将输出流管道到archive中
archive.pipe(output)

// 将dist目录添加到archive中
archive.directory(distDirectory, false)

// 最后，执行压缩
archive.finalize()
