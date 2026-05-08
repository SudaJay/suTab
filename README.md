# SuTab

一个自用的现代浏览器新标签页扩展。界面走轻量、柔和、低饱和的玻璃拟态风格，支持搜索、翻译、快捷入口、真实书签、真实历史记录和免费天气查询。

## Features

- 现代 Home 页布局：动态柔和背景、居中时间、问候语、玻璃卡片和深色模式。
- 搜索引擎切换：支持 Google、Bing、Baidu、DuckDuckGo。
- 搜索联想词：根据当前搜索引擎拉取建议词，失败时自动使用本地 fallback。
- 翻译快捷入口：搜索下拉第一项固定为翻译当前输入内容。
- 快捷入口：支持 favicon、添加、删除、拖拽排序和 localStorage 持久化。
- 真实书签：扩展模式下读取浏览器书签栏下的文件夹和书签。
- 真实历史记录：扩展模式下读取最近浏览记录。
- 免费天气：使用 Open-Meteo，无需 API Key，支持自定义城市。

## Tech Stack

- Vue 3 + `<script setup>` + TypeScript
- Vite
- Tailwind CSS + SCSS
- VueUse
- vue-draggable-plus
- Chrome Extension Manifest V3

## Development

```bash
npm install
npm run dev
```

开发模式是普通网页环境，浏览器不会暴露真实书签和历史记录 API，因此书签和历史会使用 demo 数据。

## Build

```bash
npm run build
```

构建产物会输出到 `dist/`。`public/manifest.json` 会被 Vite 自动复制为 `dist/manifest.json`。

## Install As Extension

1. 运行 `npm run build`。
2. 打开 `chrome://extensions/` 或 `edge://extensions/`。
3. 开启「开发者模式」。
4. 点击「加载已解压的扩展程序」。
5. 选择项目下的 `dist/` 目录。
6. 打开一个新标签页。

扩展模式下，书签和历史记录卡片会显示 `Live`，表示正在读取浏览器真实数据。

## Browser Permissions

扩展清单位于 `public/manifest.json`：

```json
{
  "manifest_version": 3,
  "name": "SuTab",
  "version": "1.0.0",
  "permissions": ["bookmarks", "history"],
  "host_permissions": [
    "https://suggestqueries.google.com/*",
    "https://www.baidu.com/*",
    "https://api.bing.com/*",
    "https://duckduckgo.com/*",
    "https://geocoding-api.open-meteo.com/*",
    "https://api.open-meteo.com/*"
  ],
  "chrome_url_overrides": {
    "newtab": "index.html"
  }
}
```

权限用途：

- `bookmarks`：读取浏览器书签栏。
- `history`：读取最近浏览记录。
- `host_permissions`：请求搜索联想词和 Open-Meteo 天气数据。
- `chrome_url_overrides.newtab`：将浏览器新标签页替换为 SuTab。

## Weather

天气使用 [Open-Meteo](https://open-meteo.com/) 免费接口：

- 城市搜索：`geocoding-api.open-meteo.com`
- 当前天气：`api.open-meteo.com`

不需要 API Key。点击天气卡片里的城市名可以切换城市，城市配置会保存到 localStorage。

## Translate Shortcuts

搜索下拉第一项是翻译快捷入口，会根据当前选中的搜索引擎跳转：

- Google：`https://translate.google.com/?sl=auto&tl=en&text=xxx&op=translate`
- Baidu：`https://fanyi.baidu.com/mtpe-individual/transText?query=xxx#/`
- Bing：Bing Translator
- DuckDuckGo：Google Translate fallback

也可以使用 `Alt + Enter` 直接打开翻译。
